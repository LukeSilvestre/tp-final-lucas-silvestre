
import React from 'react';
import { Page } from '../types';

interface SidebarProps {
  currentPage: Page;
  onNavigate: (page: Page) => void;
  onLogout: () => void;
  userRole?: string | null;
}

const Sidebar: React.FC<SidebarProps> = ({ currentPage, onNavigate, onLogout, userRole }) => {
  const [expandedItems, setExpandedItems] = React.useState<string[]>(['security']);

  const toggleExpand = (id: string) => {
    setExpandedItems(prev =>
      prev.includes(id) ? prev.filter(i => i !== id) : [...prev, id]
    );
  };

  const navItems = [
    { id: Page.DASHBOARD, label: 'Inicio', icon: 'home' },
    { id: Page.CALENDAR, label: 'Calendario', icon: 'calendar_month' },
    { id: Page.HISTORY, label: 'Historias Clínicas', icon: 'clinical_notes' },
    { id: Page.OWNERS, label: 'Dueños y Pacientes', icon: 'group' },
    // Solo mostramos Seguridad si el usuario es Admin
    ...(userRole === 'admin' ? [{
      id: 'security-group',
      label: 'Seguridad',
      icon: 'shield_person',
      children: [
        { id: Page.SECURITY, label: 'Gestión de Accesos', icon: 'admin_panel_settings' },
      ]
    }] : []),
  ];

  return (
    <aside className="w-72 bg-white dark:bg-slate-900 border-r border-slate-200 dark:border-slate-800 hidden lg:flex flex-col">
      <div className="p-6 flex items-center gap-3">
        <div className="size-10 bg-primary rounded-xl flex items-center justify-center text-slate-900 shadow-lg shadow-primary/20">
          <span className="material-symbols-outlined font-bold">pets</span>
        </div>
        <div>
          <h1 className="text-lg font-black tracking-tight leading-none">Patitas Felices</h1>
          <p className="text-[10px] font-bold text-slate-500 uppercase tracking-widest mt-1">Clínica Veterinaria</p>
        </div>
      </div>

      <nav className="flex-1 px-4 py-4 space-y-1">
        {navItems.map((item) => {
          const isExpanded = expandedItems.includes(item.id);
          const hasChildren = 'children' in item;
          const isActive = currentPage === item.id || (hasChildren && item.children?.some(c => c.id === currentPage));

          return (
            <div key={item.id} className="space-y-1">
              <button
                onClick={() => hasChildren ? toggleExpand(item.id) : onNavigate(item.id as Page)}
                className={`w-full flex items-center justify-between px-4 py-3 rounded-xl transition-all ${isActive && !hasChildren
                  ? 'bg-primary text-slate-900 font-bold shadow-md shadow-primary/20'
                  : 'text-slate-600 dark:text-slate-400 hover:bg-slate-100 dark:hover:bg-slate-800'
                  } ${hasChildren && isActive ? 'text-primary font-bold' : ''}`}
              >
                <div className="flex items-center gap-3">
                  <span className={`material-symbols-outlined ${(isActive || isExpanded) ? 'fill-1' : ''}`}>
                    {item.icon}
                  </span>
                  <span className="text-sm">{item.label}</span>
                </div>
                {hasChildren && (
                  <span className={`material-symbols-outlined text-sm transition-transform ${isExpanded ? 'rotate-180' : ''}`}>
                    expand_more
                  </span>
                )}
              </button>

              {hasChildren && isExpanded && (
                <div className="ml-4 pl-4 border-l border-slate-100 dark:border-slate-800 space-y-1 animate-fade-in">
                  {item.children?.map((child) => (
                    <button
                      key={child.id}
                      onClick={() => onNavigate(child.id as Page)}
                      className={`w-full flex items-center gap-3 px-4 py-2.5 rounded-lg text-xs transition-all ${currentPage === child.id
                        ? 'bg-primary/10 text-primary font-bold'
                        : 'text-slate-500 dark:text-slate-500 hover:text-slate-900 dark:hover:text-slate-200'
                        }`}
                    >
                      <span className="material-symbols-outlined text-lg">{child.icon}</span>
                      {child.label}
                    </button>
                  ))}
                </div>
              )}
            </div>
          );
        })}
      </nav>

      <div className="p-4 space-y-4 border-t border-slate-100 dark:border-slate-800">
        <div className="bg-primary/10 rounded-xl p-4">
          <p className="text-xs font-bold text-slate-800 dark:text-slate-200">¿Necesitas ayuda?</p>
          <p className="text-[10px] text-slate-500 mt-1">Soporte disponible 24/7 para tu clínica.</p>
          <button className="w-full mt-3 py-2 bg-white dark:bg-slate-800 text-[10px] font-bold rounded-lg border border-primary/20 hover:bg-slate-50 transition-colors">
            Contactar Soporte
          </button>
        </div>

        <button
          onClick={onLogout}
          className="w-full flex items-center gap-3 px-4 py-3 text-red-500 hover:bg-red-50 dark:hover:bg-red-900/20 rounded-xl transition-all font-bold text-sm"
        >
          <span className="material-symbols-outlined">logout</span>
          Cerrar Sesión
        </button>
      </div>
    </aside>
  );
};

export default Sidebar;
