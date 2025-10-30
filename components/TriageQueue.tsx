import React, { useState, useEffect, useRef } from 'react';
import { TriageSession, TranscriptionEntry } from '../types';

const TriageDetailView: React.FC<{ triage: TriageSession; onBack: () => void; onSendMessage: (message: string) => void }> = ({ triage, onBack, onSendMessage }) => {
    const [newMessage, setNewMessage] = useState('');
    const transcriptEndRef = useRef<HTMLDivElement | null>(null);

    useEffect(() => {
        transcriptEndRef.current?.scrollIntoView({ behavior: 'smooth' });
    }, [triage.transcript]);

    const handleSend = (e: React.FormEvent) => {
        e.preventDefault();
        if (newMessage.trim()) {
            onSendMessage(newMessage.trim());
            setNewMessage('');
        }
    };

    const getSpeakerStyle = (speaker: TranscriptionEntry['speaker']) => {
        switch (speaker) {
            case 'user':
                return { container: 'items-start', bubble: 'bg-blue-600', label: 'Paciente' };
            case 'assistant':
                return { container: 'items-start', bubble: 'bg-gray-700', label: 'Assistente IA' };
            case 'professional':
                return { container: 'items-end', bubble: 'bg-green-600', label: 'Você (Profissional)' };
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
                Voltar para a Fila de Triagens
            </button>
            <div className="bg-gray-800 rounded-lg p-6 border border-gray-700 flex flex-col flex-1">
                <div className="flex flex-col sm:flex-row justify-between items-baseline text-gray-400 mb-6 pb-4 border-b border-gray-700">
                    <span className="font-semibold text-lg text-white mb-2 sm:mb-0">Paciente: {triage.patientName}</span>
                    <span>Data: {new Date(triage.date).toLocaleString('pt-BR')}</span>
                </div>
                
                <div className="flex-grow space-y-4 overflow-y-auto pr-4 custom-scrollbar">
                    {triage.transcript.map((entry, index) => {
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
                
                <div className="mt-6 pt-4 border-t border-gray-700">
                    <h3 className="text-lg font-semibold text-white mb-3">Responder ao Paciente</h3>
                    <form onSubmit={handleSend} className="flex space-x-3">
                        <textarea
                            value={newMessage}
                            onChange={(e) => setNewMessage(e.target.value)}
                            rows={2}
                            className="w-full bg-gray-700 border border-gray-600 rounded-lg px-4 py-2 text-white focus:outline-none focus:ring-2 focus:ring-cyan-500 resize-none"
                            placeholder="Digite sua mensagem aqui..."
                        />
                        <button
                            type="submit"
                            className="bg-cyan-500 hover:bg-cyan-600 text-white font-bold py-2 px-6 rounded-lg transition-transform transform hover:scale-105 self-end"
                        >
                            Enviar
                        </button>
                    </form>
                </div>
            </div>
        </div>
    );
};


const TriageQueue: React.FC = () => {
  const [triages, setTriages] = useState<TriageSession[]>([]);
  const [selectedTriage, setSelectedTriage] = useState<TriageSession | null>(null);
  const [newTriageIds, setNewTriageIds] = useState<Set<number>>(new Set());

  useEffect(() => {
    try {
      const storedTriagesRaw = localStorage.getItem('triageSessions');
      const storedTriages: TriageSession[] = storedTriagesRaw ? JSON.parse(storedTriagesRaw) : [];
      setTriages(storedTriages);
      
      const lastVisitTimestamp = localStorage.getItem('lastProfessionalVisit');
      if (lastVisitTimestamp) {
          const newIds = storedTriages
              .filter(t => new Date(t.date).getTime() > parseInt(lastVisitTimestamp, 10))
              .map(t => t.id);
          setNewTriageIds(new Set(newIds));
      } else {
          setNewTriageIds(new Set(storedTriages.map(t => t.id)));
      }
    } catch (error) {
      console.error("Failed to load triage sessions:", error);
    }
  }, []);

  const handleViewTriage = (triage: TriageSession) => {
    setSelectedTriage(triage);
    const updatedNewIds = new Set(newTriageIds);
    if (updatedNewIds.has(triage.id)) {
        updatedNewIds.delete(triage.id);
        setNewTriageIds(updatedNewIds);
        // Set a global timestamp for 'last visit' to any triage
        localStorage.setItem('lastProfessionalVisit', Date.now().toString());
    }
  };
  
  const handleSendMessage = (messageText: string) => {
    if (!selectedTriage) return;

    const newMessage: TranscriptionEntry = {
        speaker: 'professional',
        text: messageText,
    };
    
    const updatedTriage = {
        ...selectedTriage,
        transcript: [...selectedTriage.transcript, newMessage],
    };

    const updatedTriages = triages.map(t => t.id === selectedTriage.id ? updatedTriage : t);

    setTriages(updatedTriages);
    setSelectedTriage(updatedTriage);
    localStorage.setItem('triageSessions', JSON.stringify(updatedTriages));
  };

  if (selectedTriage) {
    return <TriageDetailView triage={selectedTriage} onBack={() => setSelectedTriage(null)} onSendMessage={handleSendMessage} />;
  }

  return (
    <div>
      <header className="flex justify-between items-center mb-8">
        <div>
            <h1 className="text-3xl font-bold">Fila de Triagem</h1>
            <p className="text-gray-400">Aqui estão todas as triagens realizadas pelos pacientes.</p>
        </div>
        {newTriageIds.size > 0 && (
            <div className="flex items-center space-x-2 text-yellow-400" title={`${newTriageIds.size} nova(s) triagem(ns)`}>
                <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6 animate-pulse" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 17h5l-1.405-1.405A2.032 2.032 0 0118 14.158V11a6.002 6.002 0 00-4-5.659V5a2 2 0 10-4 0v.341C7.67 6.165 6 8.388 6 11v3.159c0 .538-.214 1.055-.595 1.436L4 17h5m6 0v1a3 3 0 11-6 0v-1m6 0H9" /></svg>
                <span className="font-semibold">{newTriageIds.size} Nova(s)</span>
            </div>
        )}
      </header>

      <main>
          {triages.length === 0 ? (
               <div className="text-center bg-gray-800/50 border border-dashed border-gray-700 rounded-lg p-12 mt-4">
                  <h2 className="text-2xl font-semibold text-white mb-2">Nenhuma Triagem na Fila</h2>
                  <p className="text-gray-400 max-w-2xl mx-auto">
                      Ainda não há nenhuma triagem realizada por pacientes. Assim que uma consulta com a IA for finalizada, ela aparecerá aqui.
                  </p>
              </div>
          ) : (
              <div className="space-y-4">
                  {triages.map((triage) => (
                      <div 
                          key={triage.id}
                          onClick={() => handleViewTriage(triage)}
                          className="bg-gray-800 p-5 rounded-lg border border-gray-700 cursor-pointer transition-all hover:border-cyan-500 hover:bg-gray-700/50 flex justify-between items-center"
                      >
                          <div className="flex items-center">
                              {newTriageIds.has(triage.id) && (
                                  <span className="w-3 h-3 bg-green-500 rounded-full mr-4" title="Nova Triagem"></span>
                              )}
                              <div>
                                  <h3 className="text-lg font-bold text-cyan-400">{triage.patientName}</h3>
                                  <p className="text-sm text-gray-400">
                                      {new Date(triage.date).toLocaleString('pt-BR')}
                                  </p>
                              </div>
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

export default TriageQueue;