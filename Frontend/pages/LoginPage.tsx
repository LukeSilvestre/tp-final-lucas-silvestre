import React, { useState } from 'react';
import { apiFetch } from '../services/api';

interface LoginPageProps {
  onLogin: () => void;
}

const LoginPage: React.FC<LoginPageProps> = ({ onLogin }) => {
  const [isLoginTab, setIsLoginTab] = useState(true);
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [nombre, setNombre] = useState('');
  const [apellido, setApellido] = useState('');
  const [error, setError] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError(null);
    setLoading(true);

    try {
      const endpoint = isLoginTab ? '/auth/login' : '/auth/registrar';
      const body = isLoginTab
        ? { email, password }
        : { nombre, apellido, email, password };

      const data = await apiFetch(endpoint, {
        method: 'POST',
        body: JSON.stringify(body),
      });

      if (isLoginTab) {
        localStorage.setItem('token', data.token);
        localStorage.setItem('usuario_nombre', data.usuario.nombre);
        localStorage.setItem('usuario_rol', data.usuario.rol); // Guardamos el rol para saber qué mostrar
        onLogin();
      } else {
        // Si es registro exitoso, paso a la pestaña de login
        setIsLoginTab(true);
        setError('Cuenta creada exitosamente. Por favor, inicia sesión.');
      }
    } catch (err: any) {
      setError(err.message || 'Error en la operación');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="flex flex-col lg:flex-row w-full min-h-screen bg-background-light dark:bg-background-dark">
      {/* Sección Hero - Izquierda */}
      <div className="hidden lg:flex lg:w-1/2 relative items-center justify-center p-12 overflow-hidden bg-slate-900">
        {/* Imagen de Fondo (Premium Animal Image) */}
        <div
          className="absolute inset-0 bg-cover bg-center transition-transform duration-1000 hover:scale-105"
          style={{
            backgroundImage: `url('https://images.unsplash.com/photo-1548199973-03cce0bbc87b?q=80&w=2069&auto=format&fit=crop')`, // Imagen de cachorros felices
            filter: 'brightness(0.6) contrast(1.1)'
          }}
        ></div>

        {/* Overlay para mejorar legibilidad */}
        <div className="absolute inset-0 bg-gradient-to-tr from-primary/40 to-transparent mix-blend-multiply opacity-60"></div>

        <div className="relative z-10 text-white max-w-lg">
          {/* <div className="size-20 bg-primary rounded-2xl flex items-center justify-center shadow-2xl mb-8 transform -rotate-0">
            <span className="material-symbols-outlined text-4xl font-bold text-slate-900">monitor_heart</span>
          </div> */}
          <h1 className="text-6xl font-black leading-tight mb-6 drop-shadow-lg">TP Final: Gestión Integral de Clínicas Veterinarias</h1>
          <p className="text-xl font-bold text-white/90 leading-relaxed drop-shadow-md">
            La plataforma más completa para el cuidado de los pacientes más especiales. Centraliza historias clínicas, citas y dueños en un solo lugar.
          </p>
        </div>
      </div>

      {/* Sección Formulario - Derecha */}
      <div className="flex-1 flex items-center justify-center p-6 lg:p-12">
        <div className="w-full max-w-md">
          <div className="bg-emerald-50 dark:bg-slate-900 rounded-3xl shadow-2xl border border-slate-100 dark:border-slate-800 overflow-hidden">

            {/* Tabs */}
            <div className="flex border-b border-slate-100 dark:border-slate-800">
              <button
                onClick={() => { setIsLoginTab(true); setError(null); }}
                className={`flex-1 py-4 text-sm font-black transition-all ${isLoginTab ? 'text-primary border-b-2 border-primary bg-primary/5' : 'text-slate-400 hover:text-slate-600 dark:hover:text-slate-200'}`}
              >
                INICIAR SESIÓN
              </button>
              <button
                onClick={() => { setIsLoginTab(false); setError(null); }}
                className={`flex-1 py-4 text-sm font-black transition-all ${!isLoginTab ? 'text-primary border-b-2 border-primary bg-primary/5' : 'text-slate-400 hover:text-slate-600 dark:hover:text-slate-200'}`}
              >
                REGISTRARSE
              </button>
            </div>

            <div className="p-8">
              <div className="space-y-6">
                <div className="space-y-1">
                  <h2 className="text-2xl font-black">{isLoginTab ? '¡Hola de nuevo!' : 'Únete a nosotros'}</h2>
                  <p className="text-slate-500 text-sm font-medium">
                    {isLoginTab ? 'Ingresa tus credenciales para acceder.' : 'Completa los datos para crear tu cuenta profesional.'}
                  </p>
                </div>

                {error && (
                  <div className={`p-4 rounded-xl text-sm font-bold border ${error.includes('exitosamente') ? 'bg-green-50 text-green-600 border-green-100' : 'bg-red-50 text-red-600 border-red-100'}`}>
                    {error}
                  </div>
                )}

                <form className="space-y-4" onSubmit={handleSubmit}>
                  {!isLoginTab && (
                    <div className="grid grid-cols-2 gap-4">
                      <div className="space-y-2">
                        <label className="text-sm font-bold text-slate-700 dark:text-slate-300">Nombre</label>
                        <input
                          type="text"
                          value={nombre}
                          onChange={(e) => setNombre(e.target.value)}
                          required
                          className="w-full px-4 h-12 bg-slate-50 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 rounded-xl focus:ring-2 focus:ring-primary/20 focus:border-primary transition-all"
                          placeholder="Juan"
                        />
                      </div>
                      <div className="space-y-2">
                        <label className="text-sm font-bold text-slate-700 dark:text-slate-300">Apellido</label>
                        <input
                          type="text"
                          value={apellido}
                          onChange={(e) => setApellido(e.target.value)}
                          required
                          className="w-full px-4 h-12 bg-slate-50 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 rounded-xl focus:ring-2 focus:ring-primary/20 focus:border-primary transition-all"
                          placeholder="Pérez"
                        />
                      </div>
                    </div>
                  )}

                  <div className="space-y-2">
                    <label className="text-sm font-bold text-slate-700 dark:text-slate-300">Correo Electrónico</label>
                    <input
                      type="email"
                      value={email}
                      onChange={(e) => setEmail(e.target.value)}
                      required
                      className="w-full px-4 h-12 bg-slate-50 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 rounded-xl focus:ring-2 focus:ring-primary/20 focus:border-primary transition-all"
                      placeholder="ejemplo@correo.com"
                    />
                  </div>

                  <div className="space-y-2">
                    <label className="text-sm font-bold text-slate-700 dark:text-slate-300">Contraseña</label>
                    <input
                      type="password"
                      value={password}
                      onChange={(e) => setPassword(e.target.value)}
                      required
                      className="w-full px-4 h-12 bg-slate-50 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 rounded-xl focus:ring-2 focus:ring-primary/20 focus:border-primary transition-all"
                      placeholder="••••••••"
                    />
                  </div>

                  <button
                    type="submit"
                    disabled={loading}
                    className="w-full bg-primary text-slate-900 font-black h-12 rounded-xl mt-4 shadow-lg shadow-primary/20 hover:brightness-105 active:scale-[0.98] transition-all disabled:opacity-50"
                  >
                    {loading ? 'Procesando...' : (isLoginTab ? 'INICIAR SESIÓN' : 'CREAR MI CUENTA')}
                  </button>
                </form>
              </div>
            </div>
          </div>

          <p className="text-center mt-8 text-slate-400 text-xs font-medium">
            &copy; 2026 Patitas Felices. Todos los derechos reservados.
          </p>
        </div>
      </div>
    </div>
  );
};

export default LoginPage;