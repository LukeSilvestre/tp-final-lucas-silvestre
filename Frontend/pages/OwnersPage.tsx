import React, { useState, useEffect } from 'react';
import { apiFetch } from '../services/api';
import { Page } from '../types';

interface Duenio {
  id: number;
  nombre: string;
  apellido: string;
  telefono: string;
  direccion: string;
}

interface Mascota {
  id: number;
  nombre: string;
  especie: string;
  raza: string;
  fecha_nacimiento: string;
}

interface OwnersPageProps {
  onNavigate: (page: Page) => void;
}

const OwnersPage: React.FC<OwnersPageProps> = ({ onNavigate }) => {
  const [searchTerm, setSearchTerm] = useState('');
  const [duenios, setDuenios] = useState<Duenio[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  // Estados para la vista de detalle
  const [selectedDuenio, setSelectedDuenio] = useState<Duenio | null>(null);
  const [mascotas, setMascotas] = useState<Mascota[]>([]);
  const [loadingPets, setLoadingPets] = useState(false);

  // 1. Efecto para cargar los dueños de la base de datos al abrir la página
  useEffect(() => {
    const cargarDuenios = async () => {
      try {
        setLoading(true);
        const data = await apiFetch('/duenios');
        // El backend devuelve { cantidad: X, duenios: [...] }
        setDuenios(data.duenios);
      } catch (err: any) {
        setError('No se pudieron cargar los clientes');
        console.error(err);
      } finally {
        setLoading(false);
      }
    };

    cargarDuenios();
  }, []);

  // 2. Filtramos los dueños en base a lo que el usuario escribe
  const filteredDuenios = duenios.filter(d =>
    `${d.nombre} ${d.apellido}`.toLowerCase().includes(searchTerm.toLowerCase())
  );

  // 3. Función para seleccionar un dueño y cargar sus mascotas
  const handleSelectDuenio = async (duenio: Duenio) => {
    try {
      setSelectedDuenio(duenio);
      setLoadingPets(true);
      const data = await apiFetch(`/mascotas/duenio/${duenio.id}`);
      setMascotas(data.mascotas || []);
    } catch (err) {
      console.error('Error al cargar mascotas:', err);
      setMascotas([]);
    } finally {
      setLoadingPets(false);
    }
  };

  if (selectedDuenio) {
    return (
      <div className="p-8 max-w-6xl mx-auto animate-fade-in">
        <button
          onClick={() => setSelectedDuenio(null)}
          className="flex items-center gap-2 text-slate-500 hover:text-primary transition-colors mb-6 font-bold"
        >
          <span className="material-symbols-outlined">arrow_back</span>
          Volver a la lista
        </button>

        <div className="flex flex-col md:flex-row justify-between items-start gap-6 mb-8">
          <div>
            <h2 className="text-4xl font-black tracking-tight">{selectedDuenio.nombre} {selectedDuenio.apellido}</h2>
            <div className="flex flex-wrap gap-4 mt-4">
              <div className="flex items-center gap-2 bg-slate-100 dark:bg-slate-800 px-4 py-2 rounded-xl text-sm font-medium">
                <span className="material-symbols-outlined text-primary text-sm">call</span>
                {selectedDuenio.telefono}
              </div>
              <div className="flex items-center gap-2 bg-slate-100 dark:bg-slate-800 px-4 py-2 rounded-xl text-sm font-medium">
                <span className="material-symbols-outlined text-primary text-sm">location_on</span>
                {selectedDuenio.direccion}
              </div>
            </div>
          </div>
          <button
            onClick={() => onNavigate(Page.REGISTRATION)}
            className="bg-primary text-slate-900 px-6 py-3 rounded-xl font-black shadow-lg shadow-primary/20 hover:brightness-105 transition-all flex items-center gap-2"
          >
            <span className="material-symbols-outlined">add</span>
            Nueva Mascota
          </button>
        </div>

        <h3 className="text-xl font-bold mb-6 flex items-center gap-2">
          <span className="material-symbols-outlined text-primary">pets</span>
          Mascotas Registradas
        </h3>

        {loadingPets ? (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {[1, 2].map(i => <MockItem key={i} />)}
          </div>
        ) : mascotas.length > 0 ? (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {mascotas.map(pet => (
              <div key={pet.id} className="bg-white dark:bg-slate-900 p-6 rounded-2xl border border-slate-200 dark:border-slate-800 shadow-sm hover:shadow-md transition-all">
                <div className="size-12 bg-primary/10 rounded-xl flex items-center justify-center text-primary mb-4">
                  <span className="material-symbols-outlined">
                    {pet.especie.toLowerCase() === 'perro' ? 'dog' : pet.especie.toLowerCase() === 'gato' ? 'cat' : 'pets'}
                  </span>
                </div>
                <h4 className="text-xl font-black">{pet.nombre}</h4>
                <p className="text-slate-500 text-sm font-bold mt-1 uppercase tracking-wider">{pet.especie}</p>
                <div className="mt-4 pt-4 border-t border-slate-100 dark:border-slate-800 flex justify-between items-center">
                  <span className="text-xs text-slate-400 font-medium whitespace-nowrap overflow-hidden text-ellipsis mr-2">Nacimiento: {pet.fecha_nacimiento ? new Date(pet.fecha_nacimiento).toLocaleDateString() : 'N/A'}</span>
                  <button className="text-primary text-xs font-black hover:underline underline-offset-4">VER HISTORIAL</button>
                </div>
              </div>
            ))}
          </div>
        ) : (
          <div className="bg-slate-50 dark:bg-slate-800/50 rounded-3xl p-12 text-center border-2 border-dashed border-slate-200 dark:border-slate-800">
            <span className="material-symbols-outlined text-6xl text-slate-300 mb-4">potted_plant</span>
            <p className="text-slate-500 font-bold">Este dueño no tiene mascotas registradas todavía.</p>
          </div>
        )}
      </div>
    );
  }

  return (
    <div className="p-8 max-w-6xl mx-auto">
      <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-6 mb-12">
        <div>
          <h2 className="text-4xl font-black tracking-tight">Dueños y Pacientes</h2>
          <p className="text-slate-500 mt-2 text-lg">Administra el directorio de clientes y sus mascotas.</p>
        </div>
        <button
          onClick={() => onNavigate(Page.REGISTRATION)}
          className="bg-primary text-slate-900 px-8 py-4 rounded-2xl font-black shadow-xl shadow-primary/20 hover:scale-[1.02] active:scale-[0.98] transition-all flex items-center gap-3"
        >
          <span className="material-symbols-outlined">person_add</span>
          NUEVO DUEÑO
        </button>
      </div>

      <div className="bg-white dark:bg-slate-900 p-4 rounded-2xl border border-slate-200 dark:border-slate-800 mb-8 flex items-center gap-4 focus-within:ring-2 focus-within:ring-primary/20 transition-all">
        <span className="material-symbols-outlined text-slate-400">search</span>
        <input
          type="text"
          placeholder="Buscar por nombre o apellido del dueño..."
          className="flex-1 bg-transparent border-none focus:ring-0 text-slate-900 dark:text-white font-medium"
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
        />
      </div>

      {loading ? (
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {[1, 2, 3, 4].map(i => <MockItem key={i} />)}
        </div>
      ) : filteredDuenios.length > 0 ? (
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {filteredDuenios.map((duenio) => (
            <DuenioItem
              key={duenio.id}
              duenio={duenio}
              onClick={() => handleSelectDuenio(duenio)}
            />
          ))}
        </div>
      ) : (
        <div className="text-center py-20 bg-slate-50 dark:bg-slate-800/50 rounded-3xl border-2 border-dashed border-slate-200 dark:border-slate-800">
          <span className="material-symbols-outlined text-6xl text-slate-300 mb-4">search_off</span>
          <p className="text-slate-500 font-bold">No se encontraron dueños con ese nombre.</p>
        </div>
      )}
    </div>
  );
};

const DuenioItem: React.FC<{ duenio: Duenio, onClick: () => void }> = ({ duenio, onClick }) => (
  <div
    onClick={onClick}
    className="group bg-white dark:bg-slate-900 p-6 rounded-3xl border border-slate-200 dark:border-slate-800 hover:border-primary/50 hover:shadow-xl hover:shadow-primary/5 transition-all cursor-pointer relative overflow-hidden"
  >
    <div className="absolute top-0 right-0 p-6 opacity-20 group-hover:opacity-100 transition-opacity">
      <span className="material-symbols-outlined text-primary">chevron_right</span>
    </div>

    <div className="flex gap-5">
      <div className="size-16 bg-slate-100 dark:bg-slate-800 rounded-2xl flex items-center justify-center text-slate-400 group-hover:bg-primary group-hover:text-slate-900 transition-colors">
        <span className="material-symbols-outlined text-3xl font-bold">person</span>
      </div>
      <div>
        <h4 className="text-xl font-black leading-none mb-2">{duenio.nombre} {duenio.apellido}</h4>
        <div className="space-y-1">
          <div className="flex items-center gap-2 text-slate-500 text-xs font-bold uppercase tracking-wider">
            <span className="material-symbols-outlined text-sm">call</span>
            {duenio.telefono}
          </div>
          <div className="flex items-center gap-2 text-slate-400 text-xs font-medium">
            <span className="material-symbols-outlined text-sm">location_on</span>
            {duenio.direccion}
          </div>
        </div>
      </div>
    </div>
  </div>
);

const MockItem: React.FC<{ isSkeleton?: boolean }> = ({ isSkeleton }) => (
  <div className={`bg-white dark:bg-slate-900 p-6 rounded-2xl flex items-center gap-6 ${isSkeleton ? 'animate-pulse' : ''}`}>
    <div className="size-16 rounded-full bg-slate-100 dark:bg-slate-800"></div>
    <div className="space-y-3">
      <div className="h-4 w-64 bg-slate-100 dark:bg-slate-800 rounded-full"></div>
      <div className="h-3 w-40 bg-slate-100 dark:bg-slate-800 rounded-full"></div>
    </div>
  </div>
);

export default OwnersPage;
