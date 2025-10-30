import { useState, useRef, useCallback, useEffect } from 'react';
import { GoogleGenAI, LiveServerMessage, Modality, Blob, CloseEvent, ErrorEvent } from '@google/genai';
import { AssistantStatus, TranscriptionEntry } from '../types';
import { encode, decode, decodeAudioData, createBlob } from '../utils/audio';

export const useGeminiLive = (stream: MediaStream | null, systemInstruction: string) => {
  const [status, setStatus] = useState<AssistantStatus>(AssistantStatus.Idle);
  const [transcriptionHistory, setTranscriptionHistory] = useState<TranscriptionEntry[]>([]);
  
  const aiRef = useRef<GoogleGenAI | null>(null);
  const sessionPromiseRef = useRef<any | null>(null);
  const inputAudioContextRef = useRef<AudioContext | null>(null);
  const outputAudioContextRef = useRef<AudioContext | null>(null);
  const scriptProcessorRef = useRef<ScriptProcessorNode | null>(null);
  const mediaStreamSourceRef = useRef<MediaStreamAudioSourceNode | null>(null);
  
  const currentInputTranscriptionRef = useRef('');
  const currentOutputTranscriptionRef = useRef('');
  const nextStartTimeRef = useRef(0);
  const sourcesRef = useRef<Set<AudioBufferSourceNode>>(new Set());

  useEffect(() => {
    if (process.env.API_KEY) {
      aiRef.current = new GoogleGenAI({ apiKey: process.env.API_KEY });
    } else {
        console.error("API_KEY environment variable not set.");
    }
  }, []);

  const playAudio = useCallback(async (base64Audio: string) => {
    if (!outputAudioContextRef.current) return;
    
    try {
        const audioBuffer = await decodeAudioData(
            decode(base64Audio),
            outputAudioContextRef.current,
            24000,
            1
        );

        const source = outputAudioContextRef.current.createBufferSource();
        source.buffer = audioBuffer;
        source.connect(outputAudioContextRef.current.destination);
        source.onended = () => {
            sourcesRef.current.delete(source);
        };

        const currentTime = outputAudioContextRef.current.currentTime;
        nextStartTimeRef.current = Math.max(nextStartTimeRef.current, currentTime);

        source.start(nextStartTimeRef.current);
        nextStartTimeRef.current += audioBuffer.duration;
        sourcesRef.current.add(source);
    } catch(e) {
        console.error("Error playing audio:", e);
    }
  }, []);
  
  const closeSession = useCallback(() => {
    sessionPromiseRef.current?.then((session: any) => session.close());
    sessionPromiseRef.current = null;
    
    scriptProcessorRef.current?.disconnect();
    scriptProcessorRef.current = null;
    mediaStreamSourceRef.current?.disconnect();
    mediaStreamSourceRef.current = null;

    inputAudioContextRef.current?.close().catch(console.error);
    inputAudioContextRef.current = null;
    outputAudioContextRef.current?.close().catch(console.error);
    outputAudioContextRef.current = null;

    sourcesRef.current.forEach(source => source.stop());
    sourcesRef.current.clear();
    
    setTranscriptionHistory([]);
    currentInputTranscriptionRef.current = '';
    currentOutputTranscriptionRef.current = '';
    setStatus(AssistantStatus.Idle);
  }, []);

  const startSession = useCallback(async () => {
    if (!aiRef.current || !stream) {
      setStatus(AssistantStatus.Error);
      console.error("AI client or media stream not initialized.");
      return;
    }

    setStatus(AssistantStatus.Connecting);

    inputAudioContextRef.current = new (window.AudioContext || (window as any).webkitAudioContext)({ sampleRate: 16000 });
    outputAudioContextRef.current = new (window.AudioContext || (window as any).webkitAudioContext)({ sampleRate: 24000 });
    nextStartTimeRef.current = 0;
    
    sessionPromiseRef.current = aiRef.current.live.connect({
      model: 'gemini-2.5-flash-native-audio-preview-09-2025',
      config: {
        responseModalities: [Modality.AUDIO],
        speechConfig: { voiceConfig: { prebuiltVoiceConfig: { voiceName: 'Zephyr' } } },
        inputAudioTranscription: {},
        outputAudioTranscription: {},
        systemInstruction: systemInstruction,
      },
      callbacks: {
        onopen: () => {
          setStatus(AssistantStatus.Listening);
          mediaStreamSourceRef.current = inputAudioContextRef.current!.createMediaStreamSource(stream);
          scriptProcessorRef.current = inputAudioContextRef.current!.createScriptProcessor(4096, 1, 1);

          scriptProcessorRef.current.onaudioprocess = (event: AudioProcessingEvent) => {
            const inputData = event.inputBuffer.getChannelData(0);
            const pcmBlob: Blob = createBlob(inputData);
            sessionPromiseRef.current?.then((session: any) => session.sendRealtimeInput({ media: pcmBlob }));
          };
          
          mediaStreamSourceRef.current.connect(scriptProcessorRef.current);
          scriptProcessorRef.current.connect(inputAudioContextRef.current!.destination);
        },
        onmessage: (message: LiveServerMessage) => {
            if (message.serverContent?.modelTurn) setStatus(AssistantStatus.Speaking);

            if (message.serverContent?.inputTranscription?.text) {
              // Fix: Set status directly to avoid stale closures.
              setStatus(AssistantStatus.Listening);
              const text = message.serverContent.inputTranscription.text;
              currentInputTranscriptionRef.current += text;
              setTranscriptionHistory(prev => {
                const last = prev[prev.length - 1];
                if (last?.speaker === 'user') {
                  const updated = { ...last, text: currentInputTranscriptionRef.current.trim() };
                  return [...prev.slice(0, -1), updated];
                } else {
                  return [...prev, { speaker: 'user', text: currentInputTranscriptionRef.current.trim() }];
                }
              });
            }

            if (message.serverContent?.outputTranscription?.text) {
                const text = message.serverContent.outputTranscription.text;
                currentOutputTranscriptionRef.current += text;
                setTranscriptionHistory(prev => {
                    const last = prev[prev.length - 1];
                    if (last?.speaker === 'assistant') {
                        const updated = { ...last, text: currentOutputTranscriptionRef.current.trim() };
                        return [...prev.slice(0, -1), updated];
                    } else {
                        return [...prev, { speaker: 'assistant', text: currentOutputTranscriptionRef.current.trim() }];
                    }
                });
            }

            if (message.serverContent?.turnComplete) {
                currentInputTranscriptionRef.current = '';
                currentOutputTranscriptionRef.current = '';
                setStatus(AssistantStatus.Listening);
            }

            const audio = message.serverContent?.modelTurn?.parts[0]?.inlineData?.data;
            if (audio) {
                playAudio(audio);
            }
        },
        onerror: (e: ErrorEvent) => {
          console.error('Session error:', e);
          setStatus(AssistantStatus.Error);
          closeSession();
        },
        onclose: (e: CloseEvent) => {
          setStatus(AssistantStatus.Idle);
        },
      }
    });

  }, [stream, playAudio, closeSession, systemInstruction]);

  useEffect(() => {
    return () => {
      closeSession();
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return { status, transcriptionHistory, startSession, closeSession };
};
