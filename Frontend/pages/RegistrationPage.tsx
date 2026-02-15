import React, { useState } from 'react';
import { apiFetch } from '../services/api';

const RegistrationPage: React.FC = () => {
  const [step, setStep] = useState(1);
  const [isSuccess, setIsSuccess] = useState(false);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  // Estados para el Dueño
  const [ownerData, setOwnerData] = useState({
    nombre: '',
    apellido: '',
    telefono: '',
    direccion: ''
  });

  // Identificador del dueño guardado
  const [ownerId, setOwnerId] = useState<number | null>(null);

  // Estados para la Mascota
  const [petData, setPetData] = useState({
    nombre: '',
    especie: '',
    raza: '', // La raza no está en tu modelo actual, pero la mantengo en el estado por si la agregas luego
    fecha_nacimiento: '',
    sexo: 'Macho'
  });

  const handleNext = async () => {
    setError(null);
    if (step === 1) {
      // Paso 1: Registrar Dueño
      try {
        setLoading(true);
        const data = await apiFetch('/duenios', {
          method: 'POST',
          body: JSON.stringify(ownerData)
        });
        setOwnerId(data.id);
        setStep(2);
      } catch (err: any) {
        setError(err.message || 'Error al registrar al dueño');
      } finally {
        setLoading(false);
      }
    } else {
      // Paso 2: Registrar Mascota
      if (!ownerId) {
        setError('Error: No se encontró el ID del dueño.');
        return;
      }

      try {
        setLoading(true);
        await apiFetch('/mascotas', {
          method: 'POST',
          body: JSON.stringify({
            nombre: petData.nombre,
            especie: petData.especie,
            fecha_nacimiento: petData.fecha_nacimiento || null,
            id_duenio: ownerId
          })
        });

        setIsSuccess(true);
        setTimeout(() => setIsSuccess(false), 5000);

        // Resetear formulario
        setStep(1);
        setOwnerData({ nombre: '', apellido: '', telefono: '', direccion: '' });
        setPetData({ nombre: '', especie: '', raza: '', fecha_nacimiento: '', sexo: 'Macho' });
        setOwnerId(null);
      } catch (err: any) {
        setError(err.message || 'Error al registrar la mascota');
      } finally {
        setLoading(false);
      }
    }
  };

  return (
    <div className="p-8 max-w-4xl mx-auto">
      {isSuccess && (
        <div className="fixed top-6 right-6 z-50 animate-bounce">
          <div className="flex items-center gap-3 bg-white dark:bg-slate-800 border-l-4 border-primary px-4 py-3 rounded-lg shadow-xl">
            <span className="material-symbols-outlined text-primary text-2xl">check_circle</span>
            <div>
              <p className="text-sm font-bold leading-none text-slate-900 dark:text-white">Registro completado</p>
              <p className="text-xs text-slate-500 mt-1">Los datos se han guardado exitosamente.</p>
            </div>
          </div>
        </div>
      )}

      <div className="flex items-center gap-2 text-slate-400 text-sm mb-6">
        <span>Administración</span>
        <span className="material-symbols-outlined text-xs">chevron_right</span>
        <span className="text-slate-900 dark:text-slate-200 font-medium">Registro de Nuevo Ingreso</span>
      </div>

      <div className="mb-8">
        <h2 className="text-4xl font-black tracking-tight">Registro de Nuevo Ingreso</h2>
        <p className="text-slate-500 mt-2">Completa los datos necesarios para dar de alta a un nuevo paciente.</p>
      </div>

      {error && (
        <div className="mb-6 p-4 bg-red-50 text-red-600 rounded-xl border border-red-100 font-bold">
          {error}
        </div>
      )}

      <div className="flex border-b border-slate-200 dark:border-slate-800 mb-8 overflow-x-auto">
        <button
          onClick={() => step === 2 && setStep(1)}
          className={`flex items-center gap-2 px-8 py-4 border-b-2 transition-all ${step === 1 ? 'border-primary text-slate-900 dark:text-white font-bold' : 'border-transparent text-slate-400'}`}
        >
          <span className={`size-6 rounded-full flex items-center justify-center text-xs font-bold ${step === 1 ? 'bg-primary text-slate-900' : 'bg-slate-200 dark:bg-slate-800'}`}>1</span>
          <span className="uppercase tracking-wide text-sm">ALTA DE DUEÑO</span>
        </button>
        <button
          disabled={!ownerId}
          className={`flex items-center gap-2 px-8 py-4 border-b-2 transition-all ${step === 2 ? 'border-primary text-slate-900 dark:text-white font-bold' : 'border-transparent text-slate-400 opacity-50'}`}
        >
          <span className={`size-6 rounded-full flex items-center justify-center text-xs font-bold ${step === 2 ? 'bg-primary text-slate-900' : 'bg-slate-200 dark:bg-slate-800'}`}>2</span>
          <span className="uppercase tracking-wide text-sm">ALTA DE PACIENTE</span>
        </button>
      </div>

      <div className="space-y-8">
        {step === 1 && (
          <section className="bg-white dark:bg-slate-900 rounded-2xl border border-slate-200 dark:border-slate-800 shadow-sm overflow-hidden animate-fade-in">
            <div className="p-6 border-b border-slate-100 dark:border-slate-800 flex items-center gap-3">
              <span className="material-symbols-outlined text-primary">person</span>
              <h3 className="font-bold text-lg">Información del Propietario</h3>
            </div>
            <div className="p-8 grid grid-cols-1 md:grid-cols-2 gap-6">
              <InputGroup
                label="Nombre"
                placeholder="Ej. Juan"
                value={ownerData.nombre}
                onChange={(e) => setOwnerData({ ...ownerData, nombre: e.target.value })}
              />
              <InputGroup
                label="Apellidos"
                placeholder="Ej. Pérez"
                value={ownerData.apellido}
                onChange={(e) => setOwnerData({ ...ownerData, apellido: e.target.value })}
              />
              <div className="space-y-2">
                <label className="text-sm font-bold text-slate-700 dark:text-slate-300">Teléfono</label>
                <div className="flex">
                  <span className="inline-flex items-center px-4 text-sm font-bold text-slate-500 bg-slate-50 dark:bg-slate-800 border border-r-0 border-slate-200 dark:border-slate-700 rounded-l-xl">+54</span>
                  <input
                    className="w-full rounded-r-xl border-slate-200 dark:border-slate-700 dark:bg-slate-800 focus:ring-primary focus:border-primary p-2.5"
                    placeholder="11 1234 5678"
                    type="tel"
                    value={ownerData.telefono}
                    onChange={(e) => setOwnerData({ ...ownerData, telefono: e.target.value })}
                  />
                </div>
              </div>
              <InputGroup
                label="Dirección"
                placeholder="Calle, número, colonia..."
                value={ownerData.direccion}
                onChange={(e) => setOwnerData({ ...ownerData, direccion: e.target.value })}
              />
            </div>
            <div className="px-8 pb-8 flex justify-end gap-3">
              <button
                disabled={loading || !ownerData.nombre || !ownerData.apellido}
                className="px-8 py-3 bg-primary text-slate-900 font-black rounded-xl hover:shadow-lg transition-all disabled:opacity-50"
                onClick={handleNext}
              >
                {loading ? 'Guardando...' : 'Guardar y Continuar'}
              </button>
            </div>
          </section>
        )}

        {step === 2 && (
          <section className="bg-white dark:bg-slate-900 rounded-2xl border border-slate-200 dark:border-slate-800 shadow-sm overflow-hidden animate-fade-in">
            <div className="p-6 border-b border-slate-100 dark:border-slate-800 flex items-center gap-3">
              <span className="material-symbols-outlined text-primary">pet_supplies</span>
              <h3 className="font-bold text-lg">Información del Paciente</h3>
            </div>
            <div className="p-8 grid grid-cols-1 md:grid-cols-3 gap-6">
              <InputGroup
                label="Nombre de Mascota"
                placeholder="Ej. Firulais"
                value={petData.nombre}
                onChange={(e) => setPetData({ ...petData, nombre: e.target.value })}
              />
              <div className="space-y-2">
                <label className="text-sm font-bold">Especie</label>
                <select
                  className="w-full rounded-xl border-slate-200 dark:border-slate-700 dark:bg-slate-800 focus:ring-primary focus:border-primary p-2.5"
                  value={petData.especie}
                  onChange={(e) => setPetData({ ...petData, especie: e.target.value })}
                >
                  <option value="">Seleccione...</option>
                  <option value="Perro">Perro</option>
                  <option value="Gato">Gato</option>
                  <option value="Ave">Ave</option>
                  <option value="Reptil">Reptil</option>
                </select>
              </div>
              <InputGroup
                label="Raza"
                placeholder="Ej. Golden Retriever"
                value={petData.raza}
                onChange={(e) => setPetData({ ...petData, raza: e.target.value })}
              />
              <InputGroup
                label="Fecha de Nacimiento"
                type="date"
                value={petData.fecha_nacimiento}
                onChange={(e) => setPetData({ ...petData, fecha_nacimiento: e.target.value })}
              />
              <div className="space-y-2">
                <label className="text-sm font-bold">Sexo</label>
                <div className="flex gap-4 p-2 bg-slate-50 dark:bg-slate-800 rounded-xl border border-slate-200 dark:border-slate-700">
                  <label className="flex-1 flex items-center justify-center gap-2 cursor-pointer py-1 rounded-lg hover:bg-white dark:hover:bg-slate-700 transition-all">
                    <input
                      type="radio"
                      name="sex"
                      checked={petData.sexo === 'Macho'}
                      onChange={() => setPetData({ ...petData, sexo: 'Macho' })}
                      className="text-primary focus:ring-primary"
                    />
                    <span className="text-xs font-bold">Macho</span>
                  </label>
                  <label className="flex-1 flex items-center justify-center gap-2 cursor-pointer py-1 rounded-lg hover:bg-white dark:hover:bg-slate-700 transition-all">
                    <input
                      type="radio"
                      name="sex"
                      checked={petData.sexo === 'Hembra'}
                      onChange={() => setPetData({ ...petData, sexo: 'Hembra' })}
                      className="text-primary focus:ring-primary"
                    />
                    <span className="text-xs font-bold">Hembra</span>
                  </label>
                </div>
              </div>
            </div>
            <div className="px-8 pb-8 flex justify-end gap-3">
              <button className="px-6 py-3 font-bold text-slate-500 hover:text-slate-700" onClick={() => setStep(1)}>Volver</button>
              <button
                disabled={loading || !petData.nombre || !petData.especie}
                className="px-8 py-3 bg-primary text-slate-900 font-black rounded-xl hover:shadow-lg transition-all disabled:opacity-50"
                onClick={handleNext}
              >
                {loading ? 'Registrando...' : 'Finalizar Registro'}
              </button>
            </div>
          </section>
        )}
      </div>
    </div>
  );
};

const InputGroup = ({ label, placeholder, type = "text", value, onChange }: {
  label: string,
  placeholder?: string,
  type?: string,
  value: string,
  onChange: (e: React.ChangeEvent<HTMLInputElement>) => void
}) => (
  <div className="space-y-2">
    <label className="text-sm font-bold text-slate-700 dark:text-slate-300">{label}</label>
    <input
      type={type}
      value={value}
      onChange={onChange}
      className="w-full rounded-xl border-slate-200 dark:border-slate-700 dark:bg-slate-800 focus:ring-primary focus:border-primary p-2.5 transition-all"
      placeholder={placeholder}
    />
  </div>
);

export default RegistrationPage;
