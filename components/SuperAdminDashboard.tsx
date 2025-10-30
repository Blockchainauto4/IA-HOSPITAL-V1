import React, { useState } from 'react';
import SuperAdminOverview from './SuperAdminOverview';
import UserManagement from './UserManagement';
import SessionManagement from './SessionManagement';
import PlatformAnalytics from './PlatformAnalytics';
import PlatformSettings from './PlatformSettings';

interface SuperAdminDashboardProps {
  onLogout: () => void;
}

type AdminDashboardView = 'overview' | 'users' | 'sessions' | 'analytics' | 'settings';

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
                ? 'bg-purple-500/20 text-purple-400 font-semibold'
                : 'text-gray-400 hover:bg-gray-700/50 hover:text-white'
        }`}
    >
        {icon}
        <span>{label}</span>
    </button>
);

const SuperAdminDashboard: React.FC<SuperAdminDashboardProps> = ({ onLogout }) => {
    const [activeView, setActiveView] = useState<AdminDashboardView>('overview');
    const [isSidebarOpen, setIsSidebarOpen] = useState(false);
    
    const admin = {
        name: 'Super Admin',
        imageUrl: `https://i.pravatar.cc/150?u=superadmin`
    };

    const handleNavigate = (view: AdminDashboardView) => {
        setActiveView(view);
        setIsSidebarOpen(false);
    };

    const viewTitles: Record<AdminDashboardView, string> = {
        overview: 'Visão Geral',
        users: 'Gerenciamento de Usuários',
        sessions: 'Gerenciamento de Sessões',
        analytics: 'Análise da Plataforma',
        settings: 'Configurações',
    };

    const renderContent = () => {
        switch (activeView) {
            case 'overview':
                return <SuperAdminOverview setActiveView={setActiveView} />;
            case 'users':
                return <UserManagement />;
            case 'sessions':
                return <SessionManagement />;
            case 'analytics':
                return <PlatformAnalytics />;
            case 'settings':
                return <PlatformSettings />;
            default:
                return <SuperAdminOverview setActiveView={setActiveView} />;
        }
    };

    return (
        <div className="min-h-screen bg-gray-900 text-white flex">
            {/* Sidebar */}
            <aside className={`w-64 bg-gray-800 p-4 flex flex-col border-r border-gray-700 fixed h-full z-40 transform md:translate-x-0 transition-transform duration-300 ease-in-out ${isSidebarOpen ? 'translate-x-0' : '-translate-x-full'}`}>
                <div className="flex items-center space-x-4 p-2 mb-8">
                    <img src={admin.imageUrl} alt={admin.name} className="w-12 h-12 rounded-full border-2 border-purple-500" />
                    <div>
                        <h2 className="font-bold text-lg text-white">{admin.name}</h2>
                        <p className="text-sm text-gray-400">Administrador</p>
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
                        label="Usuários"
                        icon={<svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 4.354a4 4 0 110 5.292M15 21H3v-1a6 6 0 016-6h6a6 6 0 016 6v1h-3" /></svg>}
                        isActive={activeView === 'users'}
                        onClick={() => handleNavigate('users')}
                    />
                    <NavItem
                        label="Sessões"
                        icon={<svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 12h.01M12 12h.01M16 12h.01M21 12c0 4.418-4.03 8-9 8a9.863 9.863 0 01-4.255-.949L3 20l1.395-3.72C3.512 15.042 3 13.574 3 12c0-4.418 4.03-8 9-8s9 3.582 9 8z" /></svg>}
                        isActive={activeView === 'sessions'}
                        onClick={() => handleNavigate('sessions')}
                    />
                     <NavItem
                        label="Análises"
                        icon={<svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 7h8m0 0v8m0-8l-8 8-4-4-6 6" /></svg>}
                        isActive={activeView === 'analytics'}
                        onClick={() => handleNavigate('analytics')}
                    />
                     <NavItem
                        label="Configurações"
                        icon={<svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10.325 4.317c.426-1.756 2.924-1.756 3.35 0a1.724 1.724 0 002.573 1.066c1.543-.94 3.31.826 2.37 2.37a1.724 1.724 0 001.065 2.572c1.756.426 1.756 2.924 0 3.35a1.724 1.724 0 00-1.066 2.573c.94 1.543-.826 3.31-2.37 2.37a1.724 1.724 0 00-2.572 1.065c-.426 1.756-2.924 1.756-3.35 0a1.724 1.724 0 00-2.573-1.066c-1.543.94-3.31-.826-2.37-2.37a1.724 1.724 0 00-1.065-2.572c-1.756-.426-1.756-2.924 0-3.35a1.724 1.724 0 001.066-2.573c-.94-1.543.826-3.31 2.37-2.37.996.608 2.296.07 2.572-1.065z" /><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" /></svg>}
                        isActive={activeView === 'settings'}
                        onClick={() => handleNavigate('settings')}
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

export default SuperAdminDashboard;