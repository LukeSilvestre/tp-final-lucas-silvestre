
import React from 'react';

interface HeaderProps {
  isDarkMode: boolean;
  onToggleDarkMode: () => void;
  onSearch: () => void;
  onLogout: () => void;
  userName: string;
  userRole?: string | null;
}

const Header: React.FC<HeaderProps> = ({ isDarkMode, onToggleDarkMode, onSearch, onLogout, userName, userRole }) => {
  return (
    <header className="h-16 bg-white dark:bg-slate-900 border-b border-slate-200 dark:border-slate-800 px-8 flex items-center justify-between sticky top-0 z-40">
      <div className="flex-1 max-w-xl">
        <div className="relative group">
          <span className="material-symbols-outlined absolute left-3 top-1/2 -translate-y-1/2 text-slate-400 group-focus-within:text-primary transition-colors">search</span>
          <input
            type="text"
            placeholder="Buscar pacientes, citas..."
            onClick={onSearch}
            className="w-full pl-10 pr-4 py-2 bg-slate-100 dark:bg-slate-800 border-none rounded-xl focus:ring-2 focus:ring-primary/50 text-sm placeholder:text-slate-500"
          />
        </div>
      </div>

      <div className="flex items-center gap-4 ml-8">
        <button className="p-2 text-slate-500 hover:bg-slate-100 dark:hover:bg-slate-800 rounded-xl relative">
          <span className="material-symbols-outlined">notifications</span>
          <span className="absolute top-2 right-2 size-2 bg-primary rounded-full border-2 border-white dark:border-slate-900"></span>
        </button>
        <div className="h-8 w-px bg-slate-200 dark:bg-slate-800"></div>
        <div className="flex items-center gap-3">
          <div className="text-right hidden sm:block">
            <p className="text-sm font-bold leading-none">{userName}</p>
            <p className="text-[10px] text-slate-500 font-medium uppercase tracking-wider mt-1 border-b border-primary/30 inline-block">
              {userRole === 'admin' ? 'Administrador' : 'Veterinario'}
            </p>
          </div>
          <div
            className="size-10 rounded-full bg-slate-200 border border-slate-300 dark:border-slate-700 bg-cover bg-center cursor-pointer hover:ring-2 hover:ring-primary transition-all"
            style={{ backgroundImage: `url('https://picsum.photos/seed/doctor/100/100')` }}
            onClick={onLogout}
            title="Cerrar Sesión"
          ></div>
          <button
            onClick={onLogout}
            className="p-2 text-slate-400 hover:text-red-500 transition-colors"
            title="Cerrar Sesión"
          >
            <span className="material-symbols-outlined">logout</span>
          </button>
        </div>
      </div>
    </header>
  );
};

export default Header;
