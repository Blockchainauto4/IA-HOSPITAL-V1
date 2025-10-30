import React, { useState } from 'react';
import PatientOverview from './PatientOverview';
import ConsultationHistory from './ConsultationHistory';
import FindSpecialists from './FindSpecialists';
import PatientProfile from './PatientProfile';


interface PatientDashboardProps {
  onLogout: () => void;
  onStartNewSession: () => void;
}

export type PatientDashboardView = 'overview' | 'history' | 'specialists' | 'profile';

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

const PatientDashboard: React.FC<PatientDashboardProps> = ({ onLogout, onStartNewSession }) => {
    const [activeView, setActiveView] = useState<PatientDashboardView>('overview');
    const [isSidebarOpen, setIsSidebarOpen] = useState(false);
    
    const patient = {
        name: 'Paciente Exemplo',
        imageUrl: `https://i.pravatar.cc/150?u=patient`
    };

    const handleNavigate = (view: PatientDashboardView) => {
        setActiveView(view);
        setIsSidebarOpen(false);
    };

     const viewTitles: Record<PatientDashboardView, string> = {
        overview: 'Visão Geral',
        history: 'Histórico de Consultas',
        specialists: 'Encontrar Especialistas',
        profile: 'Meu Perfil',
    };


    const renderContent = () => {
        switch (activeView) {
            case 'overview':
                return <PatientOverview setActiveView={setActiveView} onStartNewSession={onStartNewSession} />;
            case 'history':
                return <ConsultationHistory />;
            case 'specialists':
                return <FindSpecialists />;
            case 'profile':
                return <PatientProfile />;
            default:
                return <PatientOverview setActiveView={setActiveView} onStartNewSession={onStartNewSession}/>;
        }
    };

    return (
        <div className="min-h-screen bg-gray-900 text-white flex">
            {/* Sidebar */}
             <aside className={`w-64 bg-gray-800 p-4 flex flex-col border-r border-gray-700 fixed h-full z-40 transform md:translate-x-0 transition-transform duration-300 ease-in-out ${isSidebarOpen ? 'translate-x-0' : '-translate-x-full'}`}>
                <div className="flex items-center space-x-4 p-2 mb-8">
                    <img src={patient.imageUrl} alt={patient.name} className="w-12 h-12 rounded-full border-2 border-cyan-500" />
                    <div>
                        <h2 className="font-bold text-lg text-white">{patient.name}</h2>
                        <p className="text-sm text-gray-400">Paciente</p>
                    </div>
                </div>
                
                 <button 
                    onClick={onStartNewSession}
                    className="w-full bg-cyan-500 hover:bg-cyan-600 text-white font-bold py-3 px-4 rounded-lg text-lg transition-transform transform hover:scale-105 mb-6 flex items-center justify-center space-x-2"
                >
                    <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 12h.01M12 12h.01M16 12h.01M21 12c0 4.418-4.03 8-9 8a9.863 9.863 0 01-4.255-.949L3 20l1.395-3.72C3.512 15.042 3 13.574 3 12c0-4.418 4.03-8 9-8s9 3.582 9 8z" /></svg>
                    <span>Nova Consulta IA</span>
                </button>
                
                <nav className="flex-grow space-y-2">
                    <NavItem
                        label="Visão Geral"
                        icon={<svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2H6a2 2 0 01-2-2V6zM14 6a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2h-2a2 2 0 01-2-2V6zM4 16a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2H6a2 2 0 01-2-2v-2zM14 16a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2h-2a2 2 0 01-2-2v-2z" /></svg>}
                        isActive={activeView === 'overview'}
                        onClick={() => handleNavigate('overview')}
                    />
                    <NavItem
                        label="Histórico"
                        icon={<svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 6.253v13m0-13C10.832 5.477 9.246 5 7.5 5S4.168 5.477 3 6.253v13C4.168 18.477 5.754 18 7.5 18s3.332.477 4.5 1.253m0-13C13.168 5.477 14.754 5 16.5 5c1.747 0 3.332.477 4.5 1.253v13C19.832 18.477 18.247 18 16.5 18c-1.746 0-3.332.477-4.5 1.253" /></svg>}
                        isActive={activeView === 'history'}
                        onClick={() => handleNavigate('history')}
                    />
                    <NavItem
                        label="Especialistas"
                        icon={<svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.653-.124-1.282-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.653.124-1.282.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0zm6 3a2 2 0 11-4 0 2 2 0 014 0zM7 10a2 2 0 11-4 0 2 2 0 014 0z" /></svg>}
                        isActive={activeView === 'specialists'}
                        onClick={() => handleNavigate('specialists')}
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

export default PatientDashboard;