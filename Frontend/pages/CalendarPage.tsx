import React, { useState, useEffect } from 'react';
import { apiFetch } from '../services/api';

const CalendarPage: React.FC = () => {
  const [turnos, setTurnos] = useState<any[]>([]);
  const [mascotas, setMascotas] = useState<any[]>([]);
  const [veterinarios, setVeterinarios] = useState<any[]>([]);
  const [selectedAppointment, setSelectedAppointment] = useState<any>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [isModalOpen, setIsModalOpen] = useState(false);

  // Estado para la navegación del calendario
  const [baseDate, setBaseDate] = useState(new Date());

  // Estados para el nuevo turno
  const [newMascota, setNewMascota] = useState('');
  const [newVet, setNewVet] = useState('');
  const [newFecha, setNewFecha] = useState(new Date().toISOString().split('T')[0]);
  const [newHora, setNewHora] = useState('09:00');
  const [newMotivo, setNewMotivo] = useState('');

  useEffect(() => {
    fetchTurnos();
    fetchInitialData();
  }, []);

  const fetchTurnos = async () => {
    try {
      setIsLoading(true);
      const data = await apiFetch('/turnos');
      setTurnos(data.turnos || []);
    } catch (err) {
      console.error('Error al cargar turnos:', err);
    } finally {
      setIsLoading(false);
    }
  };

  const fetchInitialData = async () => {
    try {
      const [_mascotas, _vets] = await Promise.all([
        apiFetch('/mascotas'),
        apiFetch('/veterinarios')
      ]);
      setMascotas(_mascotas.mascotas || _mascotas || []);
      setVeterinarios(_vets || []);
    } catch (err) {
      console.error('Error al cargar datos iniciales:', err);
    }
  };

  const handleCreateTurno = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      await apiFetch('/turnos', {
        method: 'POST',
        body: JSON.stringify({
          id_mascota: parseInt(newMascota),
          id_veterinario: parseInt(newVet),
          fecha: newFecha,
          hora: newHora,
          motivo: newMotivo
        })
      });
      alert('¡Turno agendado!');
      setIsModalOpen(false);
      fetchTurnos();
    } catch (err: any) {
      alert('Error: ' + err.message);
    }
  };

  // Navegación
  const proximaSemana = () => {
    const next = new Date(baseDate);
    next.setDate(baseDate.getDate() + 7);
    setBaseDate(next);
  };

  const semanaAnterior = () => {
    const prev = new Date(baseDate);
    prev.setDate(baseDate.getDate() - 7);
    setBaseDate(prev);
  };

  const hoyRegresar = () => setBaseDate(new Date());

  // Lógica para mostrar los días de la semana según la fecha base
  const obtenerDias = () => {
    const startOfWeek = new Date(baseDate);
    // Ajustar al lunes de esa semana
    const day = baseDate.getDay();
    const diff = baseDate.getDate() - day + (day === 0 ? -6 : 1);
    startOfWeek.setDate(diff);

    return [...Array(5)].map((_, i) => {
      const d = new Date(startOfWeek);
      d.setDate(startOfWeek.getDate() + i);
      const isToday = d.toDateString() === new Date().toDateString();
      return {
        name: d.toLocaleDateString('es-ES', { weekday: 'short' }).replace('.', ''),
        num: d.getDate().toString(),
        fullDate: d.toISOString().split('T')[0],
        active: isToday
      };
    });
  };

  const getMonthName = () => {
    return baseDate.toLocaleDateString('es-ES', { month: 'long', year: 'numeric' });
  };

  const dias = obtenerDias();
  const timeSlots = ['09:00', '10:00', '11:00', '12:00', '13:00', '14:00'];

  // Helper para posicionar los turnos en el grid
  const obtenerCita = (hora: string) => {
    const [h, m] = hora.split(':').map(Number);
    const startHour = 9;
    const pixelsPerHour = 96; // h-24 = 6rem = 96px
    const top = (h - startHour) * pixelsPerHour + (m / 60) * pixelsPerHour;
    return { top: `${top}px`, height: '80px' };
  };

  const handleDeleteTurno = async (id: number) => {
    if (!confirm('¿Estás seguro de que deseas cancelar este turno?')) return;
    try {
      await apiFetch(`/turnos/${id}`, { method: 'DELETE' });
      alert('Turno cancelado.');
      setSelectedAppointment(null);
      fetchTurnos();
    } catch (err: any) {
      alert('Error: ' + err.message);
    }
  };

  return (
    <div className="flex h-full overflow-hidden bg-background-light dark:bg-background-dark">
      <div className="flex-1 overflow-y-auto p-8">
        <div className="flex justify-between items-center mb-8">
          <div>
            <h2 className="text-4xl font-black tracking-tight">Gestión de Turnos</h2>
            <p className="text-sm text-slate-500 font-medium capitalize">{getMonthName()}</p>
          </div>
          <div className="flex items-center gap-4">
            <div className="flex bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 p-1 rounded-xl shadow-sm mr-4">
              <button
                onClick={semanaAnterior}
                className="p-2 hover:bg-slate-50 dark:hover:bg-slate-800 rounded-lg text-slate-600 transition-colors"
              >
                <span className="material-symbols-outlined text-sm">arrow_back_ios</span>
              </button>
              <button
                onClick={hoyRegresar}
                className="px-4 py-1 text-xs font-black uppercase tracking-tight hover:bg-slate-50 dark:hover:bg-slate-800 rounded-lg transition-colors"
              >
                Hoy
              </button>
              <button
                onClick={proximaSemana}
                className="p-2 hover:bg-slate-50 dark:hover:bg-slate-800 rounded-lg text-slate-600 transition-colors"
              >
                <span className="material-symbols-outlined text-sm">arrow_forward_ios</span>
              </button>
            </div>
            <button
              onClick={() => setIsModalOpen(true)}
              className="bg-primary px-8 py-2 text-slate-900 font-black rounded-xl shadow-lg shadow-primary/20 hover:scale-105 transition-all"
            >
              Nuevo Turno
            </button>
          </div>
        </div>

        {isLoading ? (
          <div className="flex items-center justify-center h-64">
            <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-primary"></div>
          </div>
        ) : (
          <div className="bg-white dark:bg-slate-900 rounded-3xl border border-slate-200 dark:border-slate-800 shadow-sm overflow-hidden">
            <div className="grid grid-cols-[80px_repeat(5,1fr)] border-b border-slate-200 dark:border-slate-800 bg-slate-50/50 dark:bg-slate-800/30">
              <div className="p-4"></div>
              {dias.map(day => (
                <div key={day.fullDate} className={`p-4 text-center border-l border-slate-100 dark:border-slate-800 ${day.active ? 'bg-primary/5' : ''}`}>
                  <p className={`text-[10px] font-black uppercase tracking-widest ${day.active ? 'text-primary' : 'text-slate-400'}`}>{day.name}</p>
                  <p className={`text-2xl font-black ${day.active ? 'text-primary' : ''}`}>{day.num}</p>
                </div>
              ))}
            </div>

            <div className="grid grid-cols-[80px_repeat(5,1fr)] relative">
              <div className="flex flex-col border-r border-slate-100 dark:border-slate-800">
                {timeSlots.map(time => (
                  <div key={time} className="h-24 border-b border-slate-100 dark:border-slate-800 p-2 text-right">
                    <span className="text-[10px] font-black text-slate-400">{time}</span>
                  </div>
                ))}
              </div>

              {dias.map((day, colIndex) => (
                <div key={day.fullDate} className={`relative border-r border-slate-100 dark:border-slate-800 ${day.active ? 'bg-primary/5' : ''}`}>
                  {[...Array(6)].map((_, row) => (
                    <div key={row} className="h-24 border-b border-slate-100 dark:border-slate-800 hover:bg-slate-50 dark:hover:bg-slate-800 cursor-pointer transition-colors"></div>
                  ))}

                  {turnos
                    .filter(t => t.fecha.split('T')[0] === day.fullDate)
                    .map(t => (
                      <AppointmentBlock
                        key={t.id}
                        {...obtenerCita(t.hora)}
                        color={t.estado === 'Realizado' ? 'bg-slate-100 text-slate-500 border-slate-300' : 'bg-primary/20 text-slate-900 border-primary'}
                        title={`${t.mascota_nombre}`}
                        type={t.motivo || 'Consulta'}
                        onClick={() => setSelectedAppointment(t)}
                      />
                    ))}
                </div>
              ))}
            </div>
          </div>
        )}
      </div>

      {/* Side Panel */}
      {selectedAppointment && (
        <aside className="w-[400px] border-l border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-900 shadow-2xl animate-slide-left flex flex-col">
          <div className="p-6 border-b border-slate-100 dark:border-slate-800 flex justify-between items-center">
            <h3 className="text-xl font-black">Detalles del Turno</h3>
            <button onClick={() => setSelectedAppointment(null)} className="text-slate-400 hover:text-slate-900"><span className="material-symbols-outlined">close</span></button>
          </div>
          <div className="flex-1 overflow-y-auto">
            <div className="p-6 bg-slate-50 dark:bg-slate-800/40 border-b border-slate-100 dark:border-slate-800">
              <div className="flex items-center gap-4 mb-6">
                <div className="size-20 rounded-2xl bg-indigo-500 flex items-center justify-center text-white shadow-md">
                  <span className="material-symbols-outlined text-4xl">pets</span>
                </div>
                <div>
                  <h4 className="text-2xl font-black">{selectedAppointment.mascota_nombre}</h4>
                  <p className="text-slate-500 font-bold text-sm">Dueño: {selectedAppointment.duenio_nombre}</p>
                </div>
              </div>
              <div className="grid grid-cols-2 gap-4">
                <div className="bg-white dark:bg-slate-900 p-3 rounded-xl border border-slate-100 dark:border-slate-800 shadow-sm">
                  <p className="text-[10px] font-black text-slate-400 uppercase mb-1">Veterinario</p>
                  <p className="text-sm font-black">{selectedAppointment.veterinario_nombre}</p>
                </div>
                <div className="bg-white dark:bg-slate-900 p-3 rounded-xl border border-slate-100 dark:border-slate-800 shadow-sm">
                  <p className="text-[10px] font-black text-slate-400 uppercase mb-1">Horario</p>
                  <p className="text-sm font-black">{selectedAppointment.hora.substring(0, 5)}</p>
                </div>
              </div>
            </div>
            <div className="p-6 space-y-6">
              <div className="space-y-2">
                <label className="text-[10px] font-black text-slate-400 uppercase tracking-widest">Motivo</label>
                <p className="bg-slate-50 dark:bg-slate-800 p-4 rounded-xl italic text-slate-600 dark:text-slate-300 text-sm">"{selectedAppointment.motivo || 'Sin observaciones'}"</p>
              </div>
              <div className="flex gap-2">
                <button className="flex-1 bg-primary py-4 text-slate-900 font-black rounded-xl shadow-lg shadow-primary/20 hover:scale-[1.02] transition-all">Atender</button>
                <button
                  onClick={() => handleDeleteTurno(selectedAppointment.id)}
                  className="bg-slate-100 dark:bg-slate-800 p-4 rounded-xl text-slate-500 hover:text-red-500 transition-colors"
                >
                  <span className="material-symbols-outlined">delete</span>
                </button>
              </div>
            </div>
          </div>
        </aside>
      )}

      {/* Modal Nuevo Turno */}
      {isModalOpen && (
        <div className="fixed inset-0 bg-slate-900/60 backdrop-blur-sm z-50 flex items-center justify-center p-4">
          <div className="bg-white dark:bg-slate-900 rounded-3xl w-full max-w-md shadow-2xl overflow-hidden animate-in fade-in zoom-in duration-200">
            <div className="p-6 border-b border-slate-100 dark:border-slate-800 flex justify-between items-center bg-primary/5">
              <h3 className="text-xl font-black">Agendar Nuevo Turno</h3>
              <button onClick={() => setIsModalOpen(false)} className="text-slate-400 hover:text-slate-900"><span className="material-symbols-outlined">close</span></button>
            </div>
            <form onSubmit={handleCreateTurno} className="p-6 space-y-4">
              <div>
                <label className="text-[10px] font-black text-slate-400 uppercase mb-1 block">Mascota / Paciente</label>
                <select
                  className="w-full bg-slate-50 dark:bg-slate-800 border-none rounded-xl p-3 text-sm font-bold"
                  value={newMascota}
                  onChange={(e) => setNewMascota(e.target.value)}
                  required
                >
                  <option value="">Seleccionar...</option>
                  {mascotas.map(m => <option key={m.id} value={m.id}>{m.nombre}</option>)}
                </select>
              </div>
              <div>
                <label className="text-[10px] font-black text-slate-400 uppercase mb-1 block">Veterinario</label>
                <select
                  className="w-full bg-slate-50 dark:bg-slate-800 border-none rounded-xl p-3 text-sm font-bold"
                  value={newVet}
                  onChange={(e) => setNewVet(e.target.value)}
                  required
                >
                  <option value="">Seleccionar...</option>
                  //Voy a crear una ruta nueva para traer todos los veterinarios existentes en la tabla
                  {veterinarios.map(v => <option key={v.id} value={v.id}>{v.nombre} {v.apellido}</option>)}
                </select>
              </div>
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="text-[10px] font-black text-slate-400 uppercase mb-1 block">Fecha</label>
                  <input
                    type="date"
                    className="w-full bg-slate-50 dark:bg-slate-800 border-none rounded-xl p-3 text-sm font-bold"
                    value={newFecha}
                    onChange={(e) => setNewFecha(e.target.value)}
                    required
                  />
                </div>
                <div>
                  <label className="text-[10px] font-black text-slate-400 uppercase mb-1 block">Hora</label>
                  <input
                    type="time"
                    className="w-full bg-slate-50 dark:bg-slate-800 border-none rounded-xl p-3 text-sm font-bold"
                    value={newHora}
                    onChange={(e) => setNewHora(e.target.value)}
                    step="1800"
                    required
                  />
                </div>
              </div>
              <div>
                <label className="text-[10px] font-black text-slate-400 uppercase mb-1 block">Motivo</label>
                <textarea
                  className="w-full bg-slate-50 dark:bg-slate-800 border-none rounded-xl p-3 text-sm font-bold h-24"
                  placeholder="Ej: Vacunación, Cirugía..."
                  value={newMotivo}
                  onChange={(e) => setNewMotivo(e.target.value)}
                ></textarea>
              </div>
              <button type="submit" className="w-full bg-primary py-4 text-slate-900 font-black rounded-xl shadow-lg shadow-primary/20 hover:scale-[1.02] active:scale-95 transition-all">
                Confirmar Turno
              </button>
            </form>
          </div>
        </div>
      )}
    </div>
  );
};

const AppointmentBlock = ({ top, height, color, title, type, active = false, onClick }: any) => (
  <button
    onClick={onClick}
    className={`absolute left-2 right-2 rounded-xl p-3 text-left border-l-4 shadow-sm transition-all hover:brightness-95 z-10 overflow-hidden ${color}`}
    style={{ top, height }}
  >
    <div className="flex justify-between items-start mb-1">
      <span className="font-black text-sm truncate">{title}</span>
      {active && <span className="bg-white/40 px-1.5 py-0.5 rounded text-[8px] font-black uppercase">En curso</span>}
    </div>
    <span className="text-[10px] font-bold block opacity-80">{type}</span>
  </button>
);

export default CalendarPage;
