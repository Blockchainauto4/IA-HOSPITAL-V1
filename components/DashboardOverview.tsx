import React, { useState, useEffect } from 'react';
import { TriageSession } from '../types';

type DashboardView = 'overview' | 'triage' | 'schedule' | 'profile';

interface DashboardOverviewProps {
    setActiveView: (view: DashboardView) => void;
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

const DashboardOverview: React.FC<DashboardOverviewProps> = ({ setActiveView }) => {
    const [newTriageCount, setNewTriageCount] = useState(0);

    useEffect(() => {
        try {
            const storedTriagesRaw = localStorage.getItem('triageSessions');
            const storedTriages: TriageSession[] = storedTriagesRaw ? JSON.parse(storedTriagesRaw) : [];
            
            const lastVisitTimestamp = localStorage.getItem('lastProfessionalVisit');
            if (lastVisitTimestamp) {
                const newCount = storedTriages.filter(t => new Date(t.date).getTime() > parseInt(lastVisitTimestamp, 10)).length;
                setNewTriageCount(newCount);
            } else {
                setNewTriageCount(storedTriages.length);
            }
        } catch (error) {
            console.error("Failed to load triage counts:", error);
        }
    }, []);

    const recentTriages: TriageSession[] = (() => {
        try {
            const storedTriagesRaw = localStorage.getItem('triageSessions');
            return storedTriagesRaw ? JSON.parse(storedTriagesRaw).slice(0, 3) : [];
        } catch {
            return [];
        }
    })();

    return (
        <div>
            <header className="mb-8">
                <h1 className="text-3xl font-bold text-white mb-2">Visão Geral</h1>
                <p className="text-gray-400">Bem-vindo ao seu painel de controle, doutor(a).</p>
            </header>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mb-8">
                <StatCard 
                    title="Novas Triagens"
                    value={newTriageCount.toString()}
                    icon={<svg xmlns="http://www.w3.org/2000/svg" className="h-7 w-7 text-cyan-400" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 17h5l-1.405-1.405A2.032 2.032 0 0118 14.158V11a6.002 6.002 0 00-4-5.659V5a2 2 0 10-4 0v.341C7.67 6.165 6 8.388 6 11v3.159c0 .538-.214 1.055-.595 1.436L4 17h5m6 0v1a3 3 0 11-6 0v-1m6 0H9" /></svg>}
                />
                <StatCard 
                    title="Pacientes em Atendimento"
                    value="12" // Placeholder
                    icon={<svg xmlns="http://www.w3.org/2000/svg" className="h-7 w-7 text-cyan-400" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 4.354a4 4 0 110 5.292M15 21H3v-1a6 6 0 016-6h6a6 6 0 016 6v1h-3" /></svg>}
                />
                <StatCard 
                    title="Consultas Hoje"
                    value="3" // Placeholder
                    icon={<svg xmlns="http://www.w3.org/2000/svg" className="h-7 w-7 text-cyan-400" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" /></svg>}
                />
            </div>
            
            <div className="bg-gray-800 p-6 rounded-lg border border-gray-700">
                <div className="flex justify-between items-center mb-4">
                     <h2 className="text-xl font-bold text-white">Triagens Recentes</h2>
                     <button onClick={() => setActiveView('triage')} className="text-sm font-semibold text-cyan-400 hover:text-cyan-300 flex items-center">
                        Ver Todas
                        <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4 ml-1" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" /></svg>
                    </button>
                </div>
                {recentTriages.length > 0 ? (
                    <div className="space-y-3">
                        {recentTriages.map(triage => (
                            <div key={triage.id} className="bg-gray-700/50 p-4 rounded-md flex justify-between items-center">
                                <div>
                                    <p className="font-semibold text-white">{triage.patientName}</p>
                                    <p className="text-xs text-gray-400">{new Date(triage.date).toLocaleString('pt-BR')}</p>
                                </div>
                                <button onClick={() => setActiveView('triage')} className="bg-cyan-500/50 hover:bg-cyan-500 text-white text-xs font-bold px-3 py-1 rounded-full">
                                    Ver
                                </button>
                            </div>
                        ))}
                    </div>
                ) : (
                    <p className="text-gray-500 text-center py-4">Nenhuma triagem recente encontrada.</p>
                )}
            </div>
        </div>
    );
};

export default DashboardOverview;
