
import React, { useState } from 'react';

const CalendarPage: React.FC = () => {
  const [selectedAppointment, setSelectedAppointment] = useState<any>(null);

  const days = [
    { name: 'Lun', num: '23' },
    { name: 'Mar', num: '24', active: true },
    { name: 'Mié', num: '25' },
    { name: 'Jue', num: '26' },
    { name: 'Vie', num: '27' },
  ];

  const timeSlots = ['09:00 AM', '10:00 AM', '11:00 AM', '12:00 PM', '01:00 PM', '02:00 PM'];

  return (
    <div className="flex h-full overflow-hidden bg-background-light dark:bg-background-dark">
      <div className="flex-1 overflow-y-auto p-8">
        <div className="flex justify-between items-center mb-8">
          <div>
            <h2 className="text-4xl font-black tracking-tight">Gestión de Turnos</h2>
            <p className="text-sm text-slate-500 font-medium">Administración central de citas.</p>
          </div>
          <div className="flex gap-4">
             <div className="flex bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 p-1 rounded-xl shadow-sm">
                <button className="px-6 py-2 bg-slate-100 dark:bg-slate-800 font-bold rounded-lg">Semana</button>
                <button className="px-6 py-2 text-slate-400 font-bold rounded-lg hover:bg-slate-50 transition-all">Mes</button>
             </div>
             <button className="bg-primary px-8 py-2 text-slate-900 font-black rounded-xl shadow-lg shadow-primary/20 hover:scale-105 transition-all">Nuevo Turno</button>
          </div>
        </div>

        <div className="bg-white dark:bg-slate-900 rounded-3xl border border-slate-200 dark:border-slate-800 shadow-sm overflow-hidden">
          <div className="grid grid-cols-[80px_repeat(5,1fr)] border-b border-slate-200 dark:border-slate-800 bg-slate-50/50 dark:bg-slate-800/30">
            <div className="p-4"></div>
            {days.map(day => (
              <div key={day.num} className={`p-4 text-center border-l border-slate-100 dark:border-slate-800 ${day.active ? 'bg-primary/5' : ''}`}>
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
            
            {/* Grid Cells */}
            {[...Array(5)].map((_, col) => (
              <div key={col} className={`relative border-r border-slate-100 dark:border-slate-800 ${col === 1 ? 'bg-primary/5' : ''}`}>
                {[...Array(6)].map((_, row) => (
                  <div key={row} className="h-24 border-b border-slate-100 dark:border-slate-800 hover:bg-slate-50 dark:hover:bg-slate-800 cursor-pointer transition-colors"></div>
                ))}
                
                {/* Specific Appointments */}
                {col === 0 && (
                  <AppointmentBlock 
                    top="104px" 
                    height="80px" 
                    color="bg-blue-100 text-blue-700 border-blue-400" 
                    title="Coco (Caniche)" 
                    type="Vacuna"
                    onClick={() => setSelectedAppointment({ name: 'Coco', breed: 'Caniche', owner: 'Juan P.', time: '10:00 AM' })}
                  />
                )}
                {col === 1 && (
                  <AppointmentBlock 
                    top="8px" 
                    height="180px" 
                    color="bg-primary/20 text-slate-900 border-primary" 
                    title="Firulais" 
                    type="Cirugía"
                    active
                    onClick={() => setSelectedAppointment({ name: 'Firulais', breed: 'Golden', owner: 'Carlos P.', time: '09:00 AM' })}
                  />
                )}
                {col === 2 && (
                  <AppointmentBlock 
                    top="200px" 
                    height="80px" 
                    color="bg-orange-100 text-orange-700 border-orange-400" 
                    title="Milo (Gato)" 
                    type="Urgencia"
                    onClick={() => setSelectedAppointment({ name: 'Milo', breed: 'Siames', owner: 'Ana R.', time: '11:00 AM' })}
                  />
                )}
              </div>
            ))}
          </div>
        </div>
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
                <div className="size-20 rounded-2xl bg-slate-200 border-4 border-white dark:border-slate-700 shadow-md bg-cover" style={{ backgroundImage: `url('https://picsum.photos/seed/${selectedAppointment.name}/200/200')` }}></div>
                <div>
                  <h4 className="text-2xl font-black">{selectedAppointment.name}</h4>
                  <p className="text-slate-500 font-bold text-sm">{selectedAppointment.breed} • 3 años</p>
                </div>
              </div>
              <div className="grid grid-cols-2 gap-4">
                <div className="bg-white dark:bg-slate-900 p-3 rounded-xl border border-slate-100 dark:border-slate-800 shadow-sm">
                  <p className="text-[10px] font-black text-slate-400 uppercase mb-1">Dueño</p>
                  <p className="text-sm font-black">{selectedAppointment.owner}</p>
                </div>
                <div className="bg-white dark:bg-slate-900 p-3 rounded-xl border border-slate-100 dark:border-slate-800 shadow-sm">
                  <p className="text-[10px] font-black text-slate-400 uppercase mb-1">Horario</p>
                  <p className="text-sm font-black">{selectedAppointment.time}</p>
                </div>
              </div>
            </div>
            <div className="p-6 space-y-6">
               <div className="space-y-2">
                  <label className="text-[10px] font-black text-slate-400 uppercase tracking-widest">Motivo de consulta</label>
                  <p className="bg-slate-50 dark:bg-slate-800 p-4 rounded-xl italic text-slate-600 dark:text-slate-300 text-sm">"Revisión periódica y seguimiento clínico post-intervención."</p>
               </div>
               <button className="w-full bg-primary py-4 text-slate-900 font-black rounded-xl shadow-lg shadow-primary/20">Iniciar Consulta</button>
               <button className="w-full border border-slate-200 dark:border-slate-700 py-3 text-slate-500 font-bold rounded-xl">Cancelar Turno</button>
            </div>
          </div>
        </aside>
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
