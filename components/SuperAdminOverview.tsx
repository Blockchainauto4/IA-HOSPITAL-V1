import React, { useState, useEffect } from 'react';
import { TriageSession, OnboardingSession } from '../types';

type AdminDashboardView = 'overview' | 'users' | 'sessions' | 'analytics' | 'settings';

interface SuperAdminOverviewProps {
    setActiveView: (view: AdminDashboardView) => void;
}

const StatCard: React.FC<{ title: string; value: string; icon: React.ReactNode }> = ({ title, value, icon }) => (
    <div className="bg-gray-800 p-6 rounded-lg border border-gray-700 flex items-center space-x-4">
        <div className="bg-gray-700 p-3 rounded-full">
            {icon}
        </div>
        <div>
            <p className="text-sm text-gray-400">{title}</p>
            <p className="text-2xl font-bold text-white">{value}</p>
        </div>
    </div>
);

const SuperAdminOverview: React.FC<SuperAdminOverviewProps> = ({ setActiveView }) => {
    const [triageCount, setTriageCount] = useState(0);
    const [onboardingCount, setOnboardingCount] = useState(0);
    
    // In a real app, this would come from a database.
    const totalUsers = 15; 

    useEffect(() => {
        try {
            const storedTriagesRaw = localStorage.getItem('triageSessions');
            const storedTriages: TriageSession[] = storedTriagesRaw ? JSON.parse(storedTriagesRaw) : [];
            setTriageCount(storedTriages.length);

            const storedOnboardingsRaw = localStorage.getItem('onboardingSessions');
            const storedOnboardings: OnboardingSession[] = storedOnboardingsRaw ? JSON.parse(storedOnboardingsRaw) : [];
            setOnboardingCount(storedOnboardings.length);
        } catch (error) {
            console.error("Failed to load session counts:", error);
        }
    }, []);

    return (
        <div>
            <header className="mb-8">
                <h1 className="text-3xl font-bold text-white mb-2">Visão Geral da Plataforma</h1>
                <p className="text-gray-400">Bem-vindo(a) ao painel de superadministrador.</p>
            </header>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mb-8">
                <StatCard 
                    title="Total de Usuários"
                    value={totalUsers.toString()}
                    icon={<svg xmlns="http://www.w3.org/2000/svg" className="h-7 w-7 text-purple-400" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 4.354a4 4 0 110 5.292M15 21H3v-1a6 6 0 016-6h6a6 6 0 016 6v1h-3" /></svg>}
                />
                <StatCard 
                    title="Sessões de Triagem"
                    value={triageCount.toString()}
                    icon={<svg xmlns="http://www.w3.org/2000/svg" className="h-7 w-7 text-purple-400" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2" /></svg>}
                />
                <StatCard 
                    title="Cadastros por IA"
                    value={onboardingCount.toString()}
                    icon={<svg xmlns="http://www.w3.org/2000/svg" className="h-7 w-7 text-purple-400" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 12h.01M12 12h.01M16 12h.01M21 12c0 4.418-4.03 8-9 8a9.863 9.863 0 01-4.255-.949L3 20l1.395-3.72C3.512 15.042 3 13.574 3 12c0-4.418 4.03-8 9-8s9 3.582 9 8z" /></svg>}
                />
            </div>
            
            <div className="bg-gray-800 p-6 rounded-lg border border-gray-700">
                 <h2 className="text-xl font-bold text-white mb-4">Ações Rápidas</h2>
                 <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
                     <button onClick={() => setActiveView('users')} className="bg-gray-700 hover:bg-gray-600 text-white font-semibold p-4 rounded-lg text-left transition-colors">
                        Gerenciar Usuários
                        <p className="text-sm text-gray-400 mt-1">Ver, editar ou remover usuários.</p>
                    </button>
                    <button onClick={() => setActiveView('sessions')} className="bg-gray-700 hover:bg-gray-600 text-white font-semibold p-4 rounded-lg text-left transition-colors">
                        Ver Sessões
                        <p className="text-sm text-gray-400 mt-1">Analisar transcrições de IA.</p>
                    </button>
                    <button onClick={() => setActiveView('analytics')} className="bg-gray-700 hover:bg-gray-600 text-white font-semibold p-4 rounded-lg text-left transition-colors">
                        Ver Análises
                        <p className="text-sm text-gray-400 mt-1">Métricas de uso da plataforma.</p>
                    </button>
                    <button onClick={() => setActiveView('settings')} className="bg-gray-700 hover:bg-gray-600 text-white font-semibold p-4 rounded-lg text-left transition-colors">
                        Configurações
                        <p className="text-sm text-gray-400 mt-1">Ajustes gerais do sistema.</p>
                    </button>
                 </div>
            </div>
        </div>
    );
};

export default SuperAdminOverview;