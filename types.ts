import { Blob } from '@google/genai';

export enum AssistantStatus {
  Idle = 'Aguardando Início',
  Connecting = 'Conectando...',
  Listening = 'Ouvindo...',
  Thinking = 'Pensando...',
  Speaking = 'Falando...',
  Error = 'Erro na Conexão',
}

export interface TranscriptionEntry {
  speaker: 'user' | 'assistant' | 'professional';
  text: string;
}

export interface TriageSession {
  id: number;
  patientName: string;
  date: string;
  transcript: TranscriptionEntry[];
}

export type UserRole = 'patient' | 'professional' | 'superadmin';

export interface OnboardingSession {
  id: number;
  userName: string;
  userRole: UserRole;
  date: string;
  transcript: TranscriptionEntry[];
}