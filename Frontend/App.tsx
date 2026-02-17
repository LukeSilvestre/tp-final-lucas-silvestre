
import React, { useState, useEffect } from 'react';
import { Page } from './types';
import LoginPage from './pages/LoginPage';
import Sidebar from './components/Sidebar';
import Header from './components/Header';
import RegistrationPage from './pages/RegistrationPage';
import SecurityPage from './pages/SecurityPage';
import HistoryPage from './pages/HistoryPage';
import CalendarPage from './pages/CalendarPage';
import OwnersPage from './pages/OwnersPage';

const App: React.FC = () => {
  // 1. Inicializo la página revisando si ya hay un token
  // Si hay token, voy al DASHBOARD, si no, al LOGIN
  const [currentPage, setCurrentPage] = useState<Page>(localStorage.getItem('token') ? Page.DASHBOARD : Page.LOGIN);
  const [userRole, setUserRole] = useState<string | null>(localStorage.getItem('usuario_rol'));
  const [isDarkMode, setIsDarkMode] = useState(false);

  // 2. Función para Cerrar Sesión (Vaciar el localStorage)
  const handleLogout = () => {
    localStorage.removeItem('token');
    localStorage.removeItem('usuario_nombre');
    localStorage.removeItem('usuario_rol');
    setUserRole(null);
    setCurrentPage(Page.LOGIN);
  };

  const toggleDarkMode = () => {
    setIsDarkMode(!isDarkMode);
    document.documentElement.classList.toggle('dark');
  };

  const handleNavigate = (page: Page) => {
    setCurrentPage(page);
  };

  if (currentPage === Page.LOGIN) {
    return <LoginPage onLogin={() => {
      setUserRole(localStorage.getItem('usuario_rol'));
      handleNavigate(Page.DASHBOARD);
    }} />;
  }

  const renderContent = () => {
    switch (currentPage) {
      case Page.REGISTRATION:
        return <RegistrationPage />;
      case Page.SECURITY:
        return <SecurityPage />;
      case Page.HISTORY:
        return <HistoryPage />;
      case Page.CALENDAR:
        return <CalendarPage />;
      case Page.OWNERS:
        return <OwnersPage onNavigate={handleNavigate} />;
      case Page.DASHBOARD:
      default:
        return (
          <div className="p-8">
            <h1 className="text-3xl font-black mb-4">Bienvenido al Panel de Control</h1>
            <p className="text-slate-500">Selecciona una opción del menú para comenzar a gestionar tu clínica.</p>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mt-8">
              <DashboardCard
                icon="monitor_heart"
                title="Pacientes hoy"
                value="24"
                trend="+12%"
                onClick={() => handleNavigate(Page.REGISTRATION)}
              />
              <DashboardCard
                icon="calendar_month"
                title="Citas programadas"
                value="8"
                trend="Normal"
                onClick={() => handleNavigate(Page.CALENDAR)}
              />
              <DashboardCard
                icon="medical_services"
                title="Consultas completadas"
                value="156"
                trend="+5%"
                onClick={() => handleNavigate(Page.HISTORY)}
              />
            </div>
          </div>
        );
    }
  };

  return (
    <div className="flex h-screen overflow-hidden bg-background-light dark:bg-background-dark">
      <Sidebar currentPage={currentPage} onNavigate={handleNavigate} onLogout={handleLogout} userRole={userRole} />
      <div className="flex-1 flex flex-col overflow-hidden">
        <Header
          /* isDarkMode={isDarkMode} */
          onToggleDarkMode={toggleDarkMode}
          onSearch={() => handleNavigate(Page.OWNERS)}
          onLogout={handleLogout}
          userName={localStorage.getItem('usuario_nombre') || 'Usuario'}
          userRole={userRole}
        />
        <main className="flex-1 overflow-y-auto">
          {renderContent()}
        </main>
      </div>
    </div>
  );
};

interface DashboardCardProps {
  icon: string;
  title: string;
  value: string;
  trend: string;
  onClick: () => void;
}

const DashboardCard: React.FC<DashboardCardProps> = ({ icon, title, value, trend, onClick }) => (
  <button
    onClick={onClick}
    className="bg-white dark:bg-slate-900 p-6 rounded-2xl border border-slate-200 dark:border-slate-800 text-left hover:shadow-lg transition-all"
  >
    <div className="flex justify-between items-start mb-4">
      <div className="size-12 bg-primary/10 rounded-xl flex items-center justify-center text-primary">
        <span className="material-symbols-outlined">{icon}</span>
      </div>
      <span className="text-xs font-bold text-primary bg-primary/10 px-2 py-1 rounded-lg">{trend}</span>
    </div>
    <h3 className="text-slate-500 text-sm font-semibold">{title}</h3>
    <p className="text-3xl font-black mt-1">{value}</p>
  </button>
);

export default App;
