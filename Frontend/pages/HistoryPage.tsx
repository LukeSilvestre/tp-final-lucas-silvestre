import React, { useState, useEffect } from 'react';
import { apiFetch } from '../services/api';

const HistoryPage: React.FC = () => {
  // 1. Estados para los datos que traemos de la API
  const [historiales, setHistoriales] = useState<any[]>([]);
  const [mascotas, setMascotas] = useState<any[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  // 2. Estados para el formulario de "Nueva Entrada"
  const [selectedMascota, setSelectedMascota] = useState('');
  const [tipoConsulta, setTipoConsulta] = useState('Chequeo General');
  const [description, setDescription] = useState('');
  const [isSaving, setIsSaving] = useState(false);

  // 3. Efecto inicial: Cargar datos al entrar a la página
  useEffect(() => {
    const cargarDatos = async () => {
      try {
        setIsLoading(true);
        // Traemos historiales y mascotas al mismo tiempo
        const [respHistorial, respMascotas] = await Promise.all([
          apiFetch('/historial'),
          apiFetch('/mascotas')
        ]);

        setHistoriales(respHistorial.historiales || []);
        setMascotas(respMascotas.mascotas || []);
      } catch (err: any) {
        setError('No se pudo cargar la información clínica');
        console.error(err);
      } finally {
        setIsLoading(false);
      }
    };

    cargarDatos();
  }, []);

  // 4. Función para guardar un nuevo registro clínico
  const handleGuardar = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!selectedMascota || !description) {
      alert('Por favor completa todos los campos obligatorios');
      return;
    }

    try {
      setIsSaving(true);
      await apiFetch('/historial', {
        method: 'POST',
        body: JSON.stringify({
          id_mascota: parseInt(selectedMascota),
          tipo_consulta: tipoConsulta,
          descripcion: description
        })
      });

      alert('¡Registro clínico guardado exitosamente!');

      // Limpiar formulario y recargar la lista
      setDescription('');
      setSelectedMascota('');

      // Volver a cargar los historiales para ver el nuevo
      const data = await apiFetch('/historial');
      setHistoriales(data.historiales || []);
    } catch (err: any) {
      alert('Error al guardar: ' + err.message);
    } finally {
      setIsSaving(false);
    }
  };

  if (isLoading) return <div className="p-20 text-center font-bold">Cargando historiales clínicos...</div>;

  return (
    <div className="p-8 max-w-6xl mx-auto">
      <div className="flex justify-between items-end mb-8">
        <div>
          <h2 className="text-4xl font-black tracking-tight">Historiales Clínicos</h2>
          <p className="text-slate-500 mt-2 font-medium">Gestión administrativa y clínica de pacientes.</p>
        </div>
      </div>

      {error && (
        <div className="mb-6 p-4 bg-red-50 text-red-600 rounded-xl border border-red-100 font-bold">
          {error}
        </div>
      )}

      {/* Tabla de Historiales */}
      <div className="bg-white dark:bg-slate-900 rounded-2xl border border-slate-200 dark:border-slate-800 shadow-sm overflow-hidden mb-10">
        <table className="w-full text-left">
          <thead className="bg-slate-50 dark:bg-slate-800/50">
            <tr>
              <th className="px-6 py-4 text-xs font-bold uppercase text-slate-500">Fecha</th>
              <th className="px-6 py-4 text-xs font-bold uppercase text-slate-500">Paciente / Dueño</th>
              <th className="px-6 py-4 text-xs font-bold uppercase text-slate-500">Veterinario</th>
              <th className="px-6 py-4 text-xs font-bold uppercase text-slate-500">Tipo de Consulta</th>
              <th className="px-6 py-4 text-xs font-bold uppercase text-slate-500">Motivo/Resumen</th>
              <th className="px-6 py-4 text-xs font-bold uppercase text-slate-500 text-right">Acción</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-slate-100 dark:divide-slate-800">
            {historiales.length > 0 ? (
              historiales.map((h) => (
                <HistoryRow
                  key={h.id}
                  date={new Date(h.fecha_registro).toLocaleDateString()}
                  patient={h.mascota_nombre}
                  owner={h.duenio_nombre}
                  vet={h.veterinario_nombre}
                  type={h.tipo_consulta}
                  reason={h.descripcion}
                />
              ))
            ) : (
              <tr>
                <td colSpan={6} className="px-6 py-10 text-center text-slate-400 font-medium">
                  No hay registros clínicos todavía.
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>

      {/* Formulario de Nueva Entrada */}
      <section className="max-w-4xl">
        <div className="flex items-center gap-3 mb-6">
          <div className="size-10 bg-primary/20 rounded-xl flex items-center justify-center text-primary">
            <span className="material-symbols-outlined font-bold">add_box</span>
          </div>
          <h3 className="text-2xl font-black">Nueva Entrada Clínica</h3>
        </div>

        <div className="bg-white dark:bg-slate-900 rounded-2xl border border-slate-200 dark:border-slate-800 shadow-xl p-8">
          <form className="space-y-6" onSubmit={handleGuardar}>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div className="space-y-2">
                <label className="text-sm font-bold">Paciente (Mascota)</label>
                <select
                  className="w-full bg-slate-50 dark:bg-slate-800 border-slate-200 rounded-xl p-3 focus:ring-primary"
                  value={selectedMascota}
                  onChange={(e) => setSelectedMascota(e.target.value)}
                  required
                >
                  <option value="">Seleccionar mascota...</option>
                  {mascotas.map(m => (
                    <option key={m.id} value={m.id}>{m.nombre} (ID: {m.id})</option>
                  ))}
                </select>
              </div>
              <div className="space-y-2">
                <label className="text-sm font-bold">Tipo de Consulta</label>
                <select
                  className="w-full bg-slate-50 dark:bg-slate-800 border-slate-200 rounded-xl p-3 focus:ring-primary"
                  value={tipoConsulta}
                  onChange={(e) => setTipoConsulta(e.target.value)}
                >
                  <option value="Chequeo General">Chequeo General</option>
                  <option value="Urgencia">Urgencia</option>
                  <option value="Cirugía">Cirugía</option>
                  <option value="Vacunación">Vacunación</option>
                </select>
              </div>
            </div>

            <div className="space-y-4">
              <label className="text-sm font-bold">Observaciones Clínicas</label>
              <textarea
                rows={5}
                value={description}
                onChange={(e) => setDescription(e.target.value)}
                className="w-full bg-slate-50 dark:bg-slate-800 border-slate-200 rounded-xl p-4 focus:ring-primary"
                placeholder="Escriba los detalles clínicos aquí..."
                required
              ></textarea>
            </div>

            <div className="flex justify-end gap-3 pt-6 border-t border-slate-100 dark:border-slate-800">
              <button
                type="button"
                onClick={() => { setDescription(''); setSelectedMascota(''); }}
                className="px-6 py-3 font-bold text-slate-400"
              >
                Limpiar
              </button>
              <button
                type="submit"
                disabled={isSaving}
                className="px-10 py-3 bg-primary text-slate-900 font-black rounded-xl shadow-lg shadow-primary/20 hover:scale-[1.02] active:scale-95 transition-all disabled:opacity-50"
              >
                {isSaving ? 'Guardando...' : 'Guardar Registro'}
              </button>
            </div>
          </form >
        </div >
      </section >
    </div >
  );
};

const HistoryRow = ({ date, patient, owner, vet, type, reason }: any) => (
  <tr className="hover:bg-slate-50 dark:hover:bg-slate-800 transition-colors group">
    <td className="px-6 py-5 text-sm font-bold text-slate-400">{date}</td>
    <td className="px-6 py-5">
      <div className="flex flex-col">
        <span className="text-sm font-black">{patient}</span>
        <span className="text-[10px] text-slate-500 font-bold uppercase tracking-tight">{owner}</span>
      </div>
    </td>
    <td className="px-6 py-5">
      <div className="flex items-center gap-2">
        <div className="size-8 bg-primary/10 rounded-full flex items-center justify-center text-[10px] font-black text-primary">
          {vet.split(' ').map((n: string) => n[0]).join('')}
        </div>
        <span className="text-sm font-bold">{vet}</span>
      </div>
    </td>
    <td className="px-6 py-5">
      <span className={`text-[10px] font-black px-2 py-1 rounded-lg uppercase tracking-wider ${type === 'Urgencia' ? 'bg-red-100 text-red-600' :
        type === 'Cirugía' ? 'bg-purple-100 text-purple-600' :
          'bg-blue-100 text-blue-600'
        }`}>
        {type}
      </span>
    </td>
    <td className="px-6 py-5 text-sm text-slate-600 dark:text-slate-400 max-w-xs truncate" title={reason}>
      {reason}
    </td>
    <td className="px-6 py-5 text-right opacity-0 group-hover:opacity-100 transition-all">
      <button className="p-2 text-slate-300 hover:text-primary transition-colors">
        <span className="material-symbols-outlined text-lg">visibility</span>
      </button>
    </td>
  </tr>
);

export default HistoryPage;
