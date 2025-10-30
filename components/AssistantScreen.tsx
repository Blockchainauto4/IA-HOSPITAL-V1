import React, { useRef, useEffect, useState } from 'react';
import { useGeminiLive } from '../hooks/useGeminiLive';
import { AssistantStatus, TranscriptionEntry, TriageSession } from '../types';

const StatusIndicator: React.FC<{ status: AssistantStatus }> = ({ status }) => {
  const getStatusColor = () => {
    switch (status) {
      case AssistantStatus.Listening:
        return 'bg-green-500';
      case AssistantStatus.Thinking:
        return 'bg-yellow-500 animate-pulse';
      case AssistantStatus.Speaking:
        return 'bg-cyan-500';
      case AssistantStatus.Connecting:
        return 'bg-blue-500 animate-pulse';
      case AssistantStatus.Error:
        return 'bg-red-500';
      default:
        return 'bg-gray-500';
    }
  };

  return (
    <div className="flex items-center space-x-3 px-4 py-2 bg-black bg-opacity-50 rounded-full shadow-lg">
      <div className={`w-4 h-4 rounded-full ${getStatusColor()} transition-colors`}></div>
      <span className="text-white font-medium">{status}</span>
    </div>
  );
};

const TranscriptionOverlay: React.FC<{ history: TranscriptionEntry[] }> = ({ history }) => {
    const endOfMessagesRef = useRef<HTMLDivElement | null>(null);

    useEffect(() => {
        endOfMessagesRef.current?.scrollIntoView({ behavior: 'smooth' });
    }, [history]);

    return (
        <div className="absolute bottom-24 md:bottom-28 left-0 right-0 h-1/3 md:h-2/5 p-4 flex flex-col-reverse overflow-y-auto bg-gradient-to-t from-black/80 via-black/50 to-transparent [mask-image:linear-gradient(to_bottom,transparent_0%,black_20%)]">
            <div className="flex flex-col gap-3 pb-4">
                {history.map((entry, index) => (
                    <div key={index} className={`max-w-xl lg:max-w-3xl p-3 rounded-xl break-words ${entry.speaker === 'user' ? 'bg-blue-600/80 self-end' : 'bg-gray-700/80 self-start'}`}>
                        <p className="text-white text-base md:text-lg">{entry.text}</p>
                    </div>
                ))}
                <div ref={endOfMessagesRef} />
            </div>
        </div>
    );
};


const AssistantScreen: React.FC<{ stream: MediaStream, onSessionEnd: () => void }> = ({ stream, onSessionEnd }) => {
  const videoRef = useRef<HTMLVideoElement>(null);
  const patientSystemInstruction = 'Você é um médico assistente do Hospital IA. Sua tarefa é realizar uma triagem inicial. Apresente-se, seja empático e colete o nome e a idade do paciente. Após a análise inicial dos sintomas, ofereça claramente a opção de continuar a conversa com você para uma pré-análise ou ser encaminhado diretamente para um especialista humano. Mantenha a conversa concisa e em português do Brasil.';
  const { status, transcriptionHistory, startSession, closeSession } = useGeminiLive(stream, patientSystemInstruction);
  const [isSessionActive, setIsSessionActive] = useState(false);

  useEffect(() => {
    if (videoRef.current && stream) {
      videoRef.current.srcObject = stream;
      videoRef.current.play().catch(error => {
          console.error("Error attempting to play video:", error);
      });
    }
  }, [stream]);

  const handleToggleSession = () => {
    if (isSessionActive) {
      // Save the session transcript to localStorage if it's a meaningful conversation
      if (transcriptionHistory.length > 1) {
        const newTriage: TriageSession = {
          id: Date.now(),
          patientName: `Paciente #${Math.floor(1000 + Math.random() * 9000)}`,
          date: new Date().toISOString(),
          transcript: transcriptionHistory,
        };

        try {
          const existingTriagesRaw = localStorage.getItem('triageSessions');
          const existingTriages: TriageSession[] = existingTriagesRaw ? JSON.parse(existingTriagesRaw) : [];
          // Add the new triage to the beginning of the array
          const updatedTriages = [newTriage, ...existingTriages];
          localStorage.setItem('triageSessions', JSON.stringify(updatedTriages));
        } catch (error) {
          console.error("Failed to save triage session:", error);
        }
      }

      closeSession();
      setIsSessionActive(false);
      onSessionEnd();
    } else {
      startSession();
      setIsSessionActive(true);
    }
  };

  return (
    <main className="relative w-screen h-screen overflow-hidden bg-black">
      <video
        ref={videoRef}
        autoPlay
        playsInline
        muted
        className="w-full h-full object-cover transform scaleX-[-1]"
      />
      <div className="absolute inset-0 bg-black bg-opacity-20" />
      
      <TranscriptionOverlay history={transcriptionHistory} />

      <div className="absolute bottom-8 left-1/2 -translate-x-1/2 flex flex-col items-center space-y-4">
        {isSessionActive && <StatusIndicator status={status} />}
        <button
          onClick={handleToggleSession}
          className={`px-8 py-4 rounded-full font-bold text-xl transition-all ${
            isSessionActive 
            ? 'bg-red-600 hover:bg-red-700' 
            : 'bg-green-600 hover:bg-green-700'
          } text-white shadow-lg transform hover:scale-105`}
        >
          {isSessionActive ? 'Encerrar e Ver Especialistas' : 'Iniciar Assistente'}
        </button>
      </div>
    </main>
  );
};

export default AssistantScreen;