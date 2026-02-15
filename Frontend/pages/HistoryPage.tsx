import React, { useState, useEffect } from 'react';
import { apiFetch } from '../services/api';

const HistoryPage: React.FC = () => {
  // 1. Estados para los datos que traemos de la API
  const [historiales, setHistoriales] = useState<any[]>([]);
  const [mascotas, setMascotas] = useState<any[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  // 2. Estados para el formulario de entradas
  const [selectedMascota, setSelectedMascota] = useState('');
  const [tipoConsulta, setTipoConsulta] = useState('Chequeo General');
  const [description, setDescription] = useState('');
  const [isSaving, setIsSaving] = useState(false);

  // Estado para saber si estamos EDITANDO
  const [editingId, setEditingId] = useState<number | null>(null);

  // 3. Efecto inicial: Cargar datos al entrar a la página
  const cargarTodo = async () => {
    try {
      setIsLoading(true);
      const [respHistorial, respMascotas] = await Promise.all([
        apiFetch('/historial'),
        apiFetch('/mascotas')
      ]);
      setHistoriales(respHistorial.historiales || []);
      setMascotas(respMascotas.mascotas || []);
    } catch (err: any) {
      setError('No se pudo cargar la información clínica');
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    cargarTodo();
  }, []);

  // 4. Funciones de CRUD
  const handleGuardar = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!selectedMascota || !description) {
      alert('Por favor completa todos los campos obligatorios');
      return;
    }

    try {
      setIsSaving(true);
      const endpoint = editingId ? `/historial/${editingId}` : '/historial';
      const method = editingId ? 'PATCH' : 'POST';

      await apiFetch(endpoint, {
        method,
        body: JSON.stringify({
          id_mascota: parseInt(selectedMascota),
          tipo_consulta: tipoConsulta,
          descripcion: description
        })
      });

      alert(editingId ? '¡Registro actualizado!' : '¡Registro guardado!');
      resetForm();
      const data = await apiFetch('/historial');
      setHistoriales(data.historiales || []);
    } catch (err: any) {
      alert('Error en la operación: ' + err.message);
    } finally {
      setIsSaving(false);
    }
  };

  const handleEliminar = async (id: number) => {
    if (!confirm('¿Estás seguro de eliminar este registro clínico? esta acción no se puede deshacer.')) return;

    try {
      await apiFetch(`/historial/${id}`, { method: 'DELETE' });
      setHistoriales(prev => prev.filter(h => h.id !== id));
      alert('Registro eliminado correctamente');
    } catch (err: any) {
      alert('Error al eliminar: ' + err.message);
    }
  };

  const handleIniciarEdicion = (h: any) => {
    setEditingId(h.id);
    setSelectedMascota(h.id_mascota.toString());
    setTipoConsulta(h.tipo_consulta);
    setDescription(h.descripcion);
    // Hacemos scroll suave hasta el formulario
    window.scrollTo({ top: document.body.scrollHeight, behavior: 'smooth' });
  };

  const resetForm = () => {
    setEditingId(null);
    setDescription('');
    setSelectedMascota('');
    setTipoConsulta('Chequeo General');
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
                  historial={h}
                  onDelete={() => handleEliminar(h.id)}
                  onEdit={() => handleIniciarEdicion(h)}
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

      {/* Formulario */}
      <section className="max-w-4xl">
        <div className="flex items-center gap-3 mb-6">
          <div className={`size-10 ${editingId ? 'bg-amber-100 text-amber-600' : 'bg-primary/20 text-primary'} rounded-xl flex items-center justify-center`}>
            <span className="material-symbols-outlined font-bold">{editingId ? 'edit_note' : 'add_box'}</span>
          </div>
          <h3 className="text-2xl font-black">{editingId ? 'Editar Entrada Clínica' : 'Nueva Entrada Clínica'}</h3>
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
                  disabled={!!editingId} // No permitimos cambiar la mascota en edición por seguridad del dato
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
                onClick={resetForm}
                className="px-6 py-3 font-bold text-slate-400"
              >
                {editingId ? 'Cancelar Edición' : 'Limpiar'}
              </button>
              <button
                type="submit"
                disabled={isSaving}
                className={`px-10 py-3 ${editingId ? 'bg-amber-500 text-white' : 'bg-primary text-slate-900'} font-black rounded-xl shadow-lg hover:scale-[1.02] active:scale-95 transition-all disabled:opacity-50`}
              >
                {isSaving ? 'Guardando...' : editingId ? 'Actualizar Registro' : 'Guardar Registro'}
              </button>
            </div>
          </form >
        </div >
      </section >
    </div >
  );
};

const HistoryRow = ({ historial, onDelete, onEdit }: any) => {
  const date = new Date(historial.fecha_registro).toLocaleDateString();
  const patient = historial.mascota_nombre;
  const owner = historial.duenio_nombre;
  const vet = historial.veterinario_nombre;
  const type = historial.tipo_consulta;
  const reason = historial.descripcion;

  return (
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
      <td className="px-6 py-5 text-right opacity-0 group-hover:opacity-100 transition-all flex justify-end gap-1">
        <button
          onClick={onEdit}
          className="p-2 text-slate-300 hover:text-amber-500 transition-colors"
          title="Editar registro"
        >
          <span className="material-symbols-outlined text-lg">edit</span>
        </button>
        <button
          onClick={onDelete}
          className="p-2 text-slate-300 hover:text-red-500 transition-colors"
          title="Eliminar registro"
        >
          <span className="material-symbols-outlined text-lg">delete</span>
        </button>
      </td>
    </tr>
  );
};

export default HistoryPage;
