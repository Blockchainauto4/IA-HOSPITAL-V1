import React, { useState, useEffect, useRef } from 'react';
import { TriageSession, TranscriptionEntry } from '../types';

const ConsultationDetailView: React.FC<{ session: TriageSession; onBack: () => void; }> = ({ session, onBack }) => {
    const transcriptEndRef = useRef<HTMLDivElement | null>(null);

    useEffect(() => {
        transcriptEndRef.current?.scrollIntoView({ behavior: 'smooth' });
    }, [session.transcript]);

    const getSpeakerStyle = (speaker: TranscriptionEntry['speaker']) => {
        switch (speaker) {
            case 'user':
                return { container: 'items-end', bubble: 'bg-blue-600', label: 'Você (Paciente)' };
            case 'assistant':
                return { container: 'items-start', bubble: 'bg-gray-700', label: 'Assistente IA' };
            case 'professional':
                return { container: 'items-start', bubble: 'bg-green-600', label: 'Profissional' };
            default:
                return { container: 'items-start', bubble: 'bg-gray-500', label: 'Desconhecido' };
        }
    };

    return (
        <div className="h-full flex flex-col">
            <button onClick={onBack} className="text-cyan-400 hover:text-cyan-300 mb-6 flex items-center group flex-shrink-0">
                <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 mr-2 transition-transform group-hover:-translate-x-1" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
                </svg>
                Voltar para o Histórico
            </button>
            <div className="bg-gray-800 rounded-lg p-6 border border-gray-700 flex flex-col flex-1">
                <div className="flex flex-col sm:flex-row justify-between items-baseline text-gray-400 mb-6 pb-4 border-b border-gray-700">
                    <span className="font-semibold text-lg text-white mb-2 sm:mb-0">Consulta de {session.patientName}</span>
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


const ConsultationHistory: React.FC = () => {
  const [sessions, setSessions] = useState<TriageSession[]>([]);
  const [selectedSession, setSelectedSession] = useState<TriageSession | null>(null);

  useEffect(() => {
    try {
      const storedSessionsRaw = localStorage.getItem('triageSessions');
      const storedSessions: TriageSession[] = storedSessionsRaw ? JSON.parse(storedSessionsRaw) : [];
      setSessions(storedSessions);
    } catch (error) {
      console.error("Failed to load consultation sessions:", error);
    }
  }, []);

  if (selectedSession) {
    return <ConsultationDetailView session={selectedSession} onBack={() => setSelectedSession(null)} />;
  }

  return (
    <div>
      <header className="mb-8">
        <h1 className="text-3xl font-bold">Histórico de Consultas</h1>
        <p className="text-gray-400">Revise suas conversas anteriores com a IA e profissionais.</p>
      </header>

      <main>
          {sessions.length === 0 ? (
               <div className="text-center bg-gray-800/50 border border-dashed border-gray-700 rounded-lg p-12 mt-4">
                  <h2 className="text-2xl font-semibold text-white mb-2">Nenhuma Consulta no Histórico</h2>
                  <p className="text-gray-400 max-w-2xl mx-auto">
                      Seu histórico está vazio. Inicie uma nova consulta com nosso assistente virtual e ela aparecerá aqui.
                  </p>
              </div>
          ) : (
              <div className="space-y-4">
                  {sessions.map((session) => (
                      <div 
                          key={session.id}
                          onClick={() => setSelectedSession(session)}
                          className="bg-gray-800 p-5 rounded-lg border border-gray-700 cursor-pointer transition-all hover:border-cyan-500 hover:bg-gray-700/50 flex justify-between items-center"
                      >
                          <div>
                              <h3 className="text-lg font-bold text-cyan-400">
                                Consulta #{session.id.toString().slice(-5)}
                              </h3>
                              <p className="text-sm text-gray-400">
                                  {new Date(session.date).toLocaleString('pt-BR')}
                              </p>
                          </div>
                          <button className="text-sm text-white font-semibold flex items-center group">
                              Ver Detalhes
                              <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4 ml-2 transition-transform group-hover:translate-x-1" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 7l5 5-5 5M5 12h13" /></svg>
                          </button>
                      </div>
                  ))}
              </div>
          )}
      </main>
    </div>
  );
};

export default ConsultationHistory;