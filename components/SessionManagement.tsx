import React, { useState, useEffect, useRef } from 'react';
import { TriageSession, OnboardingSession, TranscriptionEntry, UserRole } from '../types';

type CombinedSession = (TriageSession | OnboardingSession) & { type: 'Triage' | 'Onboarding' };

const SessionDetailView: React.FC<{ session: CombinedSession; onBack: () => void; }> = ({ session, onBack }) => {
    const transcriptEndRef = useRef<HTMLDivElement | null>(null);

    useEffect(() => {
        transcriptEndRef.current?.scrollIntoView({ behavior: 'smooth' });
    }, [session.transcript]);

    const getSpeakerStyle = (speaker: TranscriptionEntry['speaker']) => {
        switch (speaker) {
            case 'user':
                return { container: 'items-end', bubble: 'bg-blue-600', label: 'Usuário' };
            case 'assistant':
                return { container: 'items-start', bubble: 'bg-gray-700', label: 'Assistente IA' };
            case 'professional':
                return { container: 'items-start', bubble: 'bg-green-600', label: 'Profissional' };
            default:
                return { container: 'items-start', bubble: 'bg-gray-500', label: 'Desconhecido' };
        }
    };
    
    const userName = 'patientName' in session ? session.patientName : session.userName;

    return (
        <div className="h-full flex flex-col">
            <button onClick={onBack} className="text-purple-400 hover:text-purple-300 mb-6 flex items-center group flex-shrink-0">
                <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 mr-2 transition-transform group-hover:-translate-x-1" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
                </svg>
                Voltar para Todas as Sessões
            </button>
            <div className="bg-gray-800 rounded-lg p-6 border border-gray-700 flex flex-col flex-1">
                <div className="flex flex-col sm:flex-row justify-between items-baseline text-gray-400 mb-6 pb-4 border-b border-gray-700">
                    <span className="font-semibold text-lg text-white mb-2 sm:mb-0">
                        Sessão de {session.type} | Usuário: {userName}
                    </span>
                    <span>Data: {new Date(session.date).toLocaleString('pt-BR')}</span>
                </div>
                
                <div className="flex-grow space-y-4 overflow-y-auto pr-4 custom-scrollbar">
                    {session.transcript.map((entry, index) => {
                        const styles = getSpeakerStyle(entry.speaker);
                        return (
                            <div key={index} className={`flex flex-col ${styles.container}`}>
                                <div className={`max-w-xl lg:max-w-2xl p-4 rounded-xl break-words ${styles.bubble}`}>
                                    <p className="text-white text-base">{entry.text}</p>
                                </div>
                                <span className="text-xs text-gray-500 mt-1 capitalize">{styles.label}</span>
                            </div>
                        );
                    })}
                     <div ref={transcriptEndRef} />
                </div>
            </div>
        </div>
    );
};

const SessionManagement: React.FC = () => {
    const [allSessions, setAllSessions] = useState<CombinedSession[]>([]);
    const [selectedSession, setSelectedSession] = useState<CombinedSession | null>(null);

    useEffect(() => {
        try {
            const storedTriagesRaw = localStorage.getItem('triageSessions');
            const triages: TriageSession[] = storedTriagesRaw ? JSON.parse(storedTriagesRaw) : [];

            const storedOnboardingsRaw = localStorage.getItem('onboardingSessions');
            const onboardings: OnboardingSession[] = storedOnboardingsRaw ? JSON.parse(storedOnboardingsRaw) : [];

            const combined: CombinedSession[] = [
                ...triages.map(t => ({ ...t, type: 'Triage' as const })),
                ...onboardings.map(o => ({ ...o, type: 'Onboarding' as const }))
            ];
            
            combined.sort((a, b) => new Date(b.date).getTime() - new Date(a.date).getTime());

            setAllSessions(combined);
        } catch (error) {
            console.error("Failed to load sessions:", error);
        }
    }, []);

    if (selectedSession) {
        return <SessionDetailView session={selectedSession} onBack={() => setSelectedSession(null)} />;
    }

    return (
        <div>
            <header className="mb-8">
                <h1 className="text-3xl font-bold text-white mb-2">Gerenciamento de Sessões</h1>
                <p className="text-gray-400">Visualize todas as sessões de IA (triagens e cadastros) da plataforma.</p>
            </header>

            <div className="bg-gray-800 rounded-lg border border-gray-700 overflow-hidden">
                <table className="w-full text-sm text-left text-gray-300">
                     <thead className="text-xs text-gray-400 uppercase bg-gray-700/50">
                        <tr>
                            <th scope="col" className="px-6 py-3">ID da Sessão</th>
                            <th scope="col" className="px-6 py-3">Nome do Usuário</th>
                            <th scope="col" className="px-6 py-3">Tipo de Sessão</th>
                            <th scope="col" className="px-6 py-3">Data</th>
                            <th scope="col" className="px-6 py-3 text-center">Ação</th>
                        </tr>
                    </thead>
                    <tbody>
                        {allSessions.map((session) => {
                            const userName = 'patientName' in session ? session.patientName : session.userName;
                            return (
                                <tr key={`${session.type}-${session.id}`} className="border-b border-gray-700 hover:bg-gray-700/40">
                                    <td className="px-6 py-4 font-mono text-xs">#{session.id}</td>
                                    <td className="px-6 py-4 font-medium text-white">{userName}</td>
                                    <td className="px-6 py-4">
                                        <span className={`px-2 py-1 text-xs font-semibold rounded-full ${session.type === 'Triage' ? 'bg-cyan-500/20 text-cyan-300' : 'bg-yellow-500/20 text-yellow-300'}`}>
                                            {session.type}
                                        </span>
                                    </td>
                                    <td className="px-6 py-4">{new Date(session.date).toLocaleString('pt-BR')}</td>
                                    <td className="px-6 py-4 text-center">
                                        <button onClick={() => setSelectedSession(session)} className="font-medium text-purple-400 hover:underline">
                                            Ver Transcrição
                                        </button>
                                    </td>
                                </tr>
                            );
                        })}
                    </tbody>
                </table>
                 {allSessions.length === 0 && (
                    <p className="text-center text-gray-500 py-8">Nenhuma sessão encontrada.</p>
                )}
            </div>
        </div>
    );
};

export default SessionManagement;