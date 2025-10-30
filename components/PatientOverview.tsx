import React from 'react';
import { TriageSession } from '../types';
import { PatientDashboardView } from './PatientDashboard';

interface PatientOverviewProps {
    setActiveView: (view: PatientDashboardView) => void;
    onStartNewSession: () => void;
}

const PatientOverview: React.FC<PatientOverviewProps> = ({ setActiveView, onStartNewSession }) => {
    
    const latestTriage: TriageSession | null = (() => {
        try {
            const storedTriagesRaw = localStorage.getItem('triageSessions');
            return storedTriagesRaw ? JSON.parse(storedTriagesRaw)[0] : null;
        } catch {
            return null;
        }
    })();

    return (
        <div>
            <header className="mb-8">
                <h1 className="text-3xl font-bold text-white mb-2">Visão Geral</h1>
                <p className="text-gray-400">Bem-vindo(a) ao seu painel de saúde pessoal.</p>
            </header>

            <div className="bg-gradient-to-r from-cyan-500 to-blue-600 p-8 rounded-lg mb-8 text-white text-center shadow-lg">
                <h2 className="text-3xl font-bold mb-4">Pronto para começar?</h2>
                <p className="max-w-xl mx-auto mb-6">Inicie uma conversa com nosso assistente virtual para uma triagem rápida e inteligente a qualquer momento.</p>
                <button 
                    onClick={onStartNewSession}
                    className="bg-white text-cyan-600 font-bold py-3 px-8 rounded-lg text-lg transition-transform transform hover:scale-105 shadow-md"
                >
                    Iniciar Nova Consulta com IA
                </button>
            </div>
            
            <div className="bg-gray-800 p-6 rounded-lg border border-gray-700">
                <div className="flex justify-between items-center mb-4">
                     <h2 className="text-xl font-bold text-white">Última Consulta</h2>
                     <button onClick={() => setActiveView('history')} className="text-sm font-semibold text-cyan-400 hover:text-cyan-300 flex items-center">
                        Ver Histórico Completo
                        <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4 ml-1" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" /></svg>
                    </button>
                </div>
                {latestTriage ? (
                    <div className="bg-gray-700/50 p-4 rounded-md">
                        <div className="flex justify-between items-center mb-3">
                            <p className="font-semibold text-white">Consulta com {latestTriage.transcript.some(t => t.speaker === 'professional') ? 'IA e Profissional' : 'Assistente IA'}</p>
                            <p className="text-xs text-gray-400">{new Date(latestTriage.date).toLocaleString('pt-BR')}</p>
                        </div>
                        <p className="text-gray-300 text-sm italic truncate">
                           "...{latestTriage.transcript[latestTriage.transcript.length - 1]?.text}"
                        </p>
                    </div>
                ) : (
                    <p className="text-gray-500 text-center py-4">Nenhuma consulta encontrada no seu histórico.</p>
                )}
            </div>
        </div>
    );
};

export default PatientOverview;
