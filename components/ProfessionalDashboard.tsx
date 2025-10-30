import React, { useState } from 'react';
import DashboardOverview from './DashboardOverview';
import TriageQueue from './TriageQueue';
import ProfessionalSchedule from './ProfessionalSchedule';
import ProfessionalProfile from './ProfessionalProfile';

interface ProfessionalDashboardProps {
  onLogout: () => void;
}

type DashboardView = 'overview' | 'triage' | 'schedule' | 'profile';

const NavItem: React.FC<{
    label: string;
    icon: React.ReactNode;
    isActive: boolean;
    onClick: () => void;
}> = ({ label, icon, isActive, onClick }) => (
    <button
        onClick={onClick}
        className={`w-full flex items-center space-x-3 px-4 py-3 rounded-lg transition-colors text-left ${
            isActive
                ? 'bg-cyan-500/20 text-cyan-400 font-semibold'
                : 'text-gray-400 hover:bg-gray-700/50 hover:text-white'
        }`}
    >
        {icon}
        <span>{label}</span>
    </button>
);

const ProfessionalDashboard: React.FC<ProfessionalDashboardProps> = ({ onLogout }) => {
    const [activeView, setActiveView] = useState<DashboardView>('overview');
    const [isSidebarOpen, setIsSidebarOpen] = useState(false);
    
    const professional = {
        name: 'Dr. Profissional',
        imageUrl: `https://i.pravatar.cc/150?u=professional`
    };

    const handleNavigate = (view: DashboardView) => {
        setActiveView(view);
        setIsSidebarOpen(false);
    };

    const viewTitles: Record<DashboardView, string> = {
        overview: 'Visão Geral',
        triage: 'Fila de Triagem',
        schedule: 'Agenda',
        profile: 'Meu Perfil',
    };

    const renderContent = () => {
        switch (activeView) {
            case 'overview':
                return <DashboardOverview setActiveView={setActiveView} />;
            case 'triage':
                return <TriageQueue />;
            case 'schedule':
                return <ProfessionalSchedule />;
            case 'profile':
                return <ProfessionalProfile />;
            default:
                return <DashboardOverview setActiveView={setActiveView} />;
        }
    };

    return (
        <div className="min-h-screen bg-gray-900 text-white flex">
            {/* Sidebar */}
            <aside className={`w-64 bg-gray-800 p-4 flex flex-col border-r border-gray-700 fixed h-full z-40 transform md:translate-x-0 transition-transform duration-300 ease-in-out ${isSidebarOpen ? 'translate-x-0' : '-translate-x-full'}`}>
                <div className="flex items-center space-x-4 p-2 mb-8">
                    <img src={professional.imageUrl} alt={professional.name} className="w-12 h-12 rounded-full border-2 border-cyan-500" />
                    <div>
                        <h2 className="font-bold text-lg text-white">{professional.name}</h2>
                        <p className="text-sm text-gray-400">Cardiologista</p>
                    </div>
                </div>
                
                <nav className="flex-grow space-y-2">
                    <NavItem
                        label="Visão Geral"
                        icon={<svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2H6a2 2 0 01-2-2V6zM14 6a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2h-2a2 2 0 01-2-2V6zM4 16a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2H6a2 2 0 01-2-2v-2zM14 16a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2h-2a2 2 0 01-2-2v-2z" /></svg>}
                        isActive={activeView === 'overview'}
                        onClick={() => handleNavigate('overview')}
                    />
                    <NavItem
                        label="Fila de Triagem"
                        icon={<svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2m-3 7h3m-3 4h3m-6-4h.01M9 16h.01" /></svg>}
                        isActive={activeView === 'triage'}
                        onClick={() => handleNavigate('triage')}
                    />
                    <NavItem
                        label="Agenda"
                        icon={<svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" /></svg>}
                        isActive={activeView === 'schedule'}
                        onClick={() => handleNavigate('schedule')}
                    />
                    <NavItem
                        label="Meu Perfil"
                        icon={<svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" /></svg>}
                        isActive={activeView === 'profile'}
                        onClick={() => handleNavigate('profile')}
                    />
                </nav>
                
                <div className="mt-auto">
                    <button
                        onClick={onLogout}
                        className="w-full flex items-center space-x-3 px-4 py-3 rounded-lg transition-colors text-left text-red-400 hover:bg-red-500/20"
                    >
                        <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 16l4-4m0 0l-4-4m4 4H7m6 4v1a3 3 0 01-3 3H6a3 3 0 01-3-3V7a3 3 0 013-3h4a3 3 0 013 3v1" /></svg>}
                        <span>Sair</span>
                    </button>
                </div>
            </aside>
            
            {isSidebarOpen && <div className="fixed inset-0 bg-black/60 z-30 md:hidden" onClick={() => setIsSidebarOpen(false)}></div>}

            {/* Main Content */}
            <div className="flex flex-col flex-1 md:ml-64 min-h-screen">
                <header className="md:hidden flex justify-between items-center p-4 bg-gray-800 border-b border-gray-700 sticky top-0 z-20">
                    <button onClick={() => setIsSidebarOpen(true)} className="text-white">
                         <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" /></svg>
                    </button>
                    <h1 className="text-lg font-semibold text-white">{viewTitles[activeView]}</h1>
                    <div className="w-6"></div>
                </header>
                <main className="flex-1 p-4 sm:p-6 md:p-8">
                    {renderContent()}
                </main>
            </div>
        </div>
    );
};

export default ProfessionalDashboard;