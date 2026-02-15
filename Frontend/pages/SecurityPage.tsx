
import React, { useState } from 'react';
import { apiFetch } from '../services/api';

const SecurityPage: React.FC = () => {
  const [selectedRole, setSelectedRole] = useState<'Admin' | 'Veterinario'>('Admin');
  const [isLoading, setIsLoading] = useState(false);
  const [formData, setFormData] = useState({
    nombre: '',
    apellido: '',
    email: '',
    password: '',
    matricula: '',
    especialidad: ''
  });

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);

    try {
      // mapeo el rol para el backend
      const rolBackend = selectedRole === 'Admin' ? 'admin' : 'veterinario';

      // filtra datos para enviar solo lo necesario si es admin
      const bodyData: any = {
        nombre: formData.nombre,
        apellido: formData.apellido,
        email: formData.email,
        password: formData.password,
        rol: rolBackend
      };

      if (rolBackend === 'veterinario') {
        bodyData.matricula = formData.matricula;
        bodyData.especialidad = formData.especialidad;
      }

      await apiFetch('/auth/registrar', {
        method: 'POST',
        body: JSON.stringify(bodyData),
      });

      alert(`¡Usuario ${formData.nombre} ${formData.apellido} registrado exitosamente!`);

      // Limpia formulario
      setFormData({
        nombre: '',
        apellido: '',
        email: '',
        password: '',
        matricula: '',
        especialidad: ''
      });
    } catch (error: any) {
      console.error('Error al registrar:', error);
      alert(error.message || 'Error al conectar con el servidor');
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="p-8 max-w-5xl mx-auto">
      <div className="mb-8">
        <h2 className="text-4xl font-black tracking-tight">Crear Nuevo Usuario</h2>
        <p className="text-slate-500 mt-2 text-lg">Configure los accesos y permisos para el nuevo personal de la clínica.</p>
      </div>

      <div className="bg-white dark:bg-slate-900 rounded-2xl border border-slate-200 dark:border-slate-800 shadow-sm overflow-hidden">
        <form className="p-8 space-y-8" onSubmit={handleSubmit}>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            <div className="space-y-2">
              <label className="text-sm font-bold">Nombre</label>
              <input
                name="nombre"
                value={formData.nombre}
                onChange={handleInputChange}
                className="w-full bg-slate-50 dark:bg-slate-800 border-slate-200 dark:border-slate-700 rounded-xl px-4 py-3 focus:ring-2 focus:ring-primary transition-all"
                placeholder="Ej. Martha"
                required
              />
            </div>
            <div className="space-y-2">
              <label className="text-sm font-bold">Apellido</label>
              <input
                name="apellido"
                value={formData.apellido}
                onChange={handleInputChange}
                className="w-full bg-slate-50 dark:bg-slate-800 border-slate-200 dark:border-slate-700 rounded-xl px-4 py-3 focus:ring-2 focus:ring-primary transition-all"
                placeholder="Ej. Reyes"
                required
              />
            </div>
            <div className="space-y-2">
              <label className="text-sm font-bold">Correo Electrónico</label>
              <input
                name="email"
                type="email"
                value={formData.email}
                onChange={handleInputChange}
                className="w-full bg-slate-50 dark:bg-slate-800 border-slate-200 dark:border-slate-700 rounded-xl px-4 py-3 focus:ring-2 focus:ring-primary transition-all"
                placeholder="martha@patitas.com"
                required
              />
            </div>
            <div className="space-y-2">
              <label className="text-sm font-bold">Contraseña</label>
              <input
                name="password"
                type="password"
                value={formData.password}
                onChange={handleInputChange}
                className="w-full bg-slate-50 dark:bg-slate-800 border-slate-200 dark:border-slate-700 rounded-xl px-4 py-3 focus:ring-2 focus:ring-primary transition-all"
                placeholder="********"
                required
              />
            </div>

            {selectedRole === 'Veterinario' && (
              <>
                <div className="space-y-2">
                  <label className="text-sm font-bold">Matrícula</label>
                  <input
                    name="matricula"
                    value={(formData as any).matricula || ''}
                    onChange={handleInputChange}
                    className="w-full bg-slate-50 dark:bg-slate-800 border-slate-200 dark:border-slate-700 rounded-xl px-4 py-3 focus:ring-2 focus:ring-primary transition-all"
                    placeholder="Ej. M.P. 1234"
                    required
                  />
                </div>
                <div className="space-y-2">
                  <label className="text-sm font-bold">Especialidad</label>
                  <input
                    name="especialidad"
                    value={(formData as any).especialidad || ''}
                    onChange={handleInputChange}
                    className="w-full bg-slate-50 dark:bg-slate-800 border-slate-200 dark:border-slate-700 rounded-xl px-4 py-3 focus:ring-2 focus:ring-primary transition-all"
                    placeholder="Ej. Cirugía, Fisioterapia"
                    required
                  />
                </div>
              </>
            )}
          </div>

          <div className="space-y-4">
            <label className="text-sm font-bold">Asignar Rol de Usuario</label>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
              <RoleCard
                icon="verified_user"
                title="Admin"
                desc="Acceso total a funciones y ajustes."
                active={selectedRole === 'Admin'}
                onClick={() => setSelectedRole('Admin')}
              />
              <RoleCard
                icon="medical_services"
                title="Veterinario"
                desc="Gestión de expedientes y clínica."
                active={selectedRole === 'Veterinario'}
                onClick={() => setSelectedRole('Veterinario')}
              />
            </div>
          </div>

          <div className="flex justify-end gap-4 pt-4">
            <button type="button" className="px-6 py-3 font-bold text-slate-400 hover:text-slate-600 transition-all">Cancelar</button>
            <button
              type="submit"
              disabled={isLoading}
              className="px-10 py-3 bg-primary text-slate-900 font-black rounded-xl shadow-lg shadow-primary/20 hover:scale-[1.02] transition-all disabled:opacity-50"
            >
              {isLoading ? 'Creando...' : 'Crear'}
            </button>
          </div>
        </form>
      </div>

      {/* <div className="mt-12 grid grid-cols-1 md:grid-cols-3 gap-6">
        <SecurityInfo icon="lock_clock" title="Contraseñas Expirables" desc="Las contraseñas expiran cada 90 días por seguridad." color="bg-primary/20 text-primary" />
        <SecurityInfo icon="policy" title="Privacidad de Datos" desc="Asegúrese de que el rol coincida con las responsabilidades." color="bg-blue-100 text-blue-500" />
        <SecurityInfo icon="history" title="Registro de Auditoría" desc="Todas las acciones serán registradas para seguimiento." color="bg-amber-100 text-amber-500" />
      </div> */}
    </div>
  );
};

const RoleCard = ({ icon, title, desc, active = false, onClick }: { icon: string, title: string, desc: string, active?: boolean, onClick: () => void }) => (
  <label
    className={`relative flex flex-col p-5 border-2 rounded-2xl cursor-pointer transition-all hover:border-primary/50 ${active ? 'border-primary bg-primary/5' : 'border-slate-100 dark:border-slate-800'}`}
    onClick={onClick}
  >
    <input type="radio" name="role" className="absolute top-4 right-4 text-primary focus:ring-primary" checked={active} onChange={() => { }} />
    <span className={`material-symbols-outlined mb-3 ${active ? 'text-primary' : 'text-slate-400'}`}>{icon}</span>
    <span className="font-bold text-sm block mb-1">{title}</span>
    <span className="text-[10px] text-slate-500 leading-tight">{desc}</span>
  </label>
);

const SecurityInfo = ({ icon, title, desc, color }: { icon: string, title: string, desc: string, color: string }) => (
  <div className="flex gap-4 items-start p-2">
    <div className={`p-3 rounded-xl ${color}`}>
      <span className="material-symbols-outlined">{icon}</span>
    </div>
    <div>
      <h4 className="text-sm font-bold">{title}</h4>
      <p className="text-xs text-slate-500 mt-1 leading-relaxed">{desc}</p>
    </div>
  </div>
);

export default SecurityPage;
