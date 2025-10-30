import React, { useRef, useEffect, useState, useMemo } from 'react';
import { GoogleGenAI, Modality } from '@google/genai';
import { useGeminiLive } from '../hooks/useGeminiLive';
import { AssistantStatus, TranscriptionEntry, OnboardingSession, UserRole } from '../types';
import { decode, decodeAudioData } from '../utils/audio';

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

const TranscriptionOverlay: React.FC<{ history: TranscriptionEntry[]; role: UserRole }> = ({ history, role }) => {
    const endOfMessagesRef = useRef<HTMLDivElement | null>(null);

    useEffect(() => {
        endOfMessagesRef.current?.scrollIntoView({ behavior: 'smooth' });
    }, [history]);
    
    const userBubbleColor = role === 'patient' ? 'bg-blue-600/80' : 'bg-indigo-600/80';

    return (
        <div className="absolute bottom-24 md:bottom-28 left-0 right-0 h-1/3 md:h-2/5 p-4 flex flex-col-reverse overflow-y-auto bg-gradient-to-t from-black/80 via-black/50 to-transparent [mask-image:linear-gradient(to_bottom,transparent_0%,black_20%)]">
            <div className="flex flex-col gap-3 pb-4">
                {history.map((entry, index) => (
                    <div key={index} className={`max-w-xl lg:max-w-3xl p-3 rounded-xl break-words ${entry.speaker === 'user' ? `${userBubbleColor} self-end` : 'bg-gray-700/80 self-start'}`}>
                        <p className="text-white text-base md:text-lg">{entry.text}</p>
                    </div>
                ))}
                <div ref={endOfMessagesRef} />
            </div>
        </div>
    );
};


const OnboardingAssistantScreen: React.FC<{ stream: MediaStream, onOnboardingEnd: () => void, role: UserRole }> = ({ stream, onOnboardingEnd, role }) => {
  const videoRef = useRef<HTMLVideoElement>(null);
  
  const systemInstruction = useMemo(() => {
    const professionalInstruction = "Você é um assistente de integração da plataforma Hospital IA. Sua missão é cadastrar novos profissionais de saúde de forma rápida e conversacional, exclusivamente por voz e vídeo. Seja cordial, profissional e eficiente. Siga estes passos: 1. Apresente-se e explique o objetivo da conversa: realizar o cadastro na plataforma. 2. Peça para o profissional confirmar o nome completo. 3. Solicite a especialidade médica principal (ex: Cardiologia, Clínica Geral). 4. Peça o número de registro no conselho de medicina (CRM), incluindo o estado. 5. Para otimizar a conexão com pacientes, peça permissão para acessar a localização. Diga: 'Para otimizar a conexão com pacientes em sua região, por favor, clique no botão \"Compartilhar Localização\" na tela.'. 6. Após o compartilhamento da localização, o sistema irá verbalizar o endereço encontrado e perguntar se está correto. Sua tarefa é apenas ouvir a resposta do profissional. Se ele confirmar, prossiga para os próximos passos. Se disser que o endereço está incorreto, peça para que ele dite o endereço correto para seu registro. 7. Após a confirmação, pergunte sobre os horários de atendimento. Você precisa capturar os dias da semana e os horários de início e fim para cada dia. 8. Ao final, resuma todas as informações coletadas (Nome, Especialidade, CRM, Horários) e peça confirmação. 9. Se o profissional confirmar, agradeça e informe que o cadastro foi concluído com sucesso e que ele será redirecionado para o painel de controle. Mantenha a conversa focada no cadastro.";
    const patientInstruction = "Você é um assistente de integração da plataforma Hospital IA. Sua missão é cadastrar novos pacientes de forma conversacional, por voz e vídeo. Seja cordial, acolhedor e paciente. Siga estes passos: 1. Apresente-se e explique que irá realizar o cadastro inicial de forma rápida. 2. Peça para o paciente confirmar o nome completo. 3. Peça permissão para acessar a localização para serviços de emergência e recomendações. Diga algo como: 'Para começar, e para que possamos oferecer serviços de emergência e recomendações locais, peço sua permissão para acessar sua localização. Por favor, clique no botão \"Compartilhar Localização\" na tela.'. 4. Após o compartilhamento da localização, o sistema irá verbalizar o endereço encontrado e perguntar se está correto. Sua tarefa é apenas ouvir a resposta do paciente. 5. Se o paciente confirmar, prossiga. Se ele disser que está incorreto, peça para ele ditar o endereço correto. 6. Em seguida, peça um telefone para contato. 7. Pergunte sobre informações adicionais opcionais, como plano de saúde ou alergias. 8. Ao final, resuma as informações coletadas (Nome, Endereço confirmado, Telefone) e peça uma confirmação final. 9. Se o paciente confirmar, agradeça e informe que o cadastro foi concluído e que ele será encaminhado para a primeira conversa com nosso assistente médico virtual.";
    
    return role === 'professional' ? professionalInstruction : patientInstruction;
  }, [role]);
  
  const { status, transcriptionHistory, startSession, closeSession } = useGeminiLive(stream, systemInstruction);
  const [isSessionActive, setIsSessionActive] = useState(false);
  const [locationShared, setLocationShared] = useState(false);
  const [fetchedAddress, setFetchedAddress] = useState<string | null>(null);

  const playFetchedAddress = async (address: string, userRole: UserRole) => {
    if (!process.env.API_KEY) {
        console.error("API_KEY not found for TTS.");
        return;
    }
    try {
        const ai = new GoogleGenAI({ apiKey: process.env.API_KEY });
        const textToSpeak = userRole === 'patient'
            ? `Ótimo, muito obrigado! Com base na sua localização, encontrei o seguinte endereço: ${address}. Por favor, me confirme se está tudo certo.`
            : `Perfeito, obrigado! O endereço que identifiquei para seu local de atendimento foi: ${address}. Está correto?`;
        
        const response = await ai.models.generateContent({
            model: "gemini-2.5-flash-preview-tts",
            contents: [{ parts: [{ text: textToSpeak }] }],
            config: {
                responseModalities: [Modality.AUDIO],
                speechConfig: {
                    voiceConfig: {
                        prebuiltVoiceConfig: { voiceName: 'Zephyr' }, // Match the live voice
                    },
                },
            },
        });

        const base64Audio = response.candidates?.[0]?.content?.parts?.[0]?.inlineData?.data;
        if (base64Audio) {
            const outputAudioContext = new (window.AudioContext || (window as any).webkitAudioContext)({ sampleRate: 24000 });
            const audioBuffer = await decodeAudioData(
                decode(base64Audio),
                outputAudioContext,
                24000,
                1,
            );
            const source = outputAudioContext.createBufferSource();
            source.buffer = audioBuffer;
            source.connect(outputAudioContext.destination);
            source.start();
        }
    } catch (error) {
        console.error("Failed to speak address:", error);
    }
  };

  useEffect(() => {
    if (fetchedAddress) {
        playFetchedAddress(fetchedAddress, role);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [fetchedAddress]);

  useEffect(() => {
    if (videoRef.current && stream) {
      videoRef.current.srcObject = stream;
      videoRef.current.play().catch(error => {
          console.error("Error attempting to play onboarding video:", error);
      });
    }
  }, [stream]);

  const handleShareLocation = () => {
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(
        async (position) => {
          const { latitude, longitude } = position.coords;
          console.log('Location captured:', { latitude, longitude });

          try {
            // Reverse geocoding using OpenStreetMap Nominatim API
            const response = await fetch(
              `https://nominatim.openstreetmap.org/reverse?format=json&lat=${latitude}&lon=${longitude}`
            );
            const data = await response.json();
            
            if (data && data.display_name) {
              setFetchedAddress(data.display_name);
            } else {
              setFetchedAddress('Não foi possível encontrar um endereço correspondente.');
            }
          } catch (error) {
            console.error("Reverse geocoding failed:", error);
            setFetchedAddress('Ocorreu um erro ao buscar o endereço.');
          }

          setLocationShared(true);
        },
        (error) => {
          console.error("Error getting location: ", error);
          alert("Não foi possível obter a localização. Verifique as permissões do seu navegador.");
        }
      );
    } else {
      alert("Geolocalização não é suportada por este navegador.");
    }
  };

  const handleToggleSession = () => {
    if (isSessionActive) {
      if (transcriptionHistory.length > 1) {
        const newOnboarding: OnboardingSession = {
          id: Date.now(),
          userName: `${role === 'patient' ? 'Paciente' : 'Profissional'} #${Math.floor(1000 + Math.random() * 9000)}`,
          userRole: role,
          date: new Date().toISOString(),
          transcript: transcriptionHistory,
        };
        const existingOnboardingsRaw = localStorage.getItem('onboardingSessions');
        const existingOnboardings: OnboardingSession[] = existingOnboardingsRaw ? JSON.parse(existingOnboardingsRaw) : [];
        const updatedOnboardings = [newOnboarding, ...existingOnboardings];
        localStorage.setItem('onboardingSessions', JSON.stringify(updatedOnboardings));
      }
      closeSession();
      setIsSessionActive(false);
      onOnboardingEnd();
    } else {
      startSession();
      setIsSessionActive(true);
    }
  };
  
  const buttonStyles = role === 'patient'
    ? 'bg-green-600 hover:bg-green-700'
    : 'bg-indigo-600 hover:bg-indigo-700';

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
      
      <TranscriptionOverlay history={transcriptionHistory} role={role}/>

      <div className="absolute bottom-8 left-1/2 -translate-x-1/2 flex flex-col items-center space-y-4 w-full px-4">
        {isSessionActive && fetchedAddress && (
            <div className="bg-black/80 border border-gray-600 p-3 rounded-lg mb-2 text-center max-w-md shadow-lg animate-fade-in">
                <p className="text-sm text-cyan-400">Endereço Encontrado:</p>
                <p className="text-white font-medium text-base">{fetchedAddress}</p>
            </div>
        )}
        {isSessionActive && <StatusIndicator status={status} />}
        <div className="flex items-center justify-center flex-wrap gap-4">
            {isSessionActive && (
              <button
                onClick={handleShareLocation}
                disabled={locationShared}
                className={`px-6 py-3 rounded-full font-bold text-lg transition-all text-white shadow-lg transform hover:scale-105 flex items-center space-x-2 ${
                  locationShared 
                  ? 'bg-gray-500 cursor-not-allowed' 
                  : 'bg-teal-500 hover:bg-teal-600'
                }`}
              >
                <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" /><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" /></svg>
                <span>{locationShared ? 'Localização OK' : 'Compartilhar Localização'}</span>
              </button>
            )}
            <button
              onClick={handleToggleSession}
              className={`px-8 py-4 rounded-full font-bold text-xl transition-all ${
                isSessionActive 
                ? 'bg-red-600 hover:bg-red-700' 
                : buttonStyles
              } text-white shadow-lg transform hover:scale-105`}
            >
              {isSessionActive ? 'Finalizar Cadastro' : 'Iniciar Cadastro por Voz'}
            </button>
        </div>
      </div>
    </main>
  );
};

export default OnboardingAssistantScreen;