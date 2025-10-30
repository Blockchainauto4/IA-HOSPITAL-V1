import React, { useState, useCallback } from 'react';
import AssistantScreen from './components/AssistantScreen';
import ProfessionalSelectionScreen from './components/ProfessionalSelectionScreen';
import HomeScreen from './components/HomeScreen';
import LoginScreen from './components/LoginScreen';
import ProfessionalDashboard from './components/ProfessionalDashboard';
import OnboardingAssistantScreen from './components/OnboardingAssistantScreen';
import AboutScreen from './components/AboutScreen';
import BlogScreen from './components/BlogScreen';
import ContactScreen from './components/ContactScreen';
import Header from './components/Header';
import WhatsappGroupsScreen from './components/WhatsappGroupsScreen';
import RegistrationScreen from './components/RegistrationFormScreen';
import PatientDashboard from './components/PatientDashboard';
import SuperAdminDashboard from './components/SuperAdminDashboard';
import { UserRole } from './types';

export type AppState = 'home' | 'login' | 'registration' | 'promptingPermissions' | 'permissionDenied' | 'assistant' | 'professionalSelection' | 'professionalDashboard' | 'patientDashboard' | 'onboarding' | 'about' | 'blog' | 'contact' | 'whatsappGroups' | 'superAdminDashboard';

const PermissionPrompt: React.FC<{ onRequest: () => void }> = ({ onRequest }) => (
  <div className="flex flex-col items-center justify-center h-screen bg-gray-900 text-white p-4">
    <div className="text-center max-w-2xl bg-gray-800 p-8 rounded-2xl shadow-lg border border-gray-700">
      <h1 className="text-4xl font-bold mb-4 text-cyan-400">Bem-vindo ao Hospital IA</h1>
      <p className="text-lg text-gray-300 mb-6">
        Nosso assistente virtual precisa de acesso à sua câmera e microfone para uma experiência completa. Sua privacidade é nossa prioridade.
      </p>
      <button
        onClick={onRequest}
        className="bg-cyan-500 hover:bg-cyan-600 text-white font-bold py-3 px-8 rounded-lg text-lg transition-transform transform hover:scale-105"
      >
        Permitir Acesso
      </button>
    </div>
  </div>
);

const PermissionDenied: React.FC = () => (
    <div className="flex flex-col items-center justify-center h-screen bg-gray-900 text-white p-4">
      <div className="text-center max-w-2xl bg-red-900/50 p-8 rounded-2xl shadow-lg border border-red-700">
        <h2 className="text-3xl font-bold mb-4 text-red-400">Acesso Negado</h2>
        <p className="text-lg text-gray-300">
          Você precisa permitir o acesso à câmera e ao microfone nas configurações do seu navegador para usar o assistente virtual.
        </p>
      </div>
    </div>
);

const App: React.FC = () => {
  const [mediaStream, setMediaStream] = useState<MediaStream | null>(null);
  const [appState, setAppState] = useState<AppState>('home');
  const [userRole, setUserRole] = useState<UserRole | null>(null);
  const [nextStateAfterPermissions, setNextStateAfterPermissions] = useState<AppState | null>(null);

  const getPermissions = useCallback(async () => {
    try {
      const stream = await navigator.mediaDevices.getUserMedia({
        video: true,
        audio: true,
      });
      setMediaStream(stream);
      if (nextStateAfterPermissions) {
        setAppState(nextStateAfterPermissions);
        setNextStateAfterPermissions(null);
      } else {
         setAppState('assistant'); // Fallback default
      }
    } catch (error) {
      console.error("Error accessing media devices.", error);
      setAppState('permissionDenied');
    }
  }, [nextStateAfterPermissions]);

  const handleRoleSelect = (role: UserRole) => {
    setUserRole(role);
    setAppState('login');
  };

  const handleLogin = (email?: string, password?: string) => {
    // Super Admin Check
    if (email === 'admin@hospitalia.com' && password === 'supersecret') {
        setUserRole('superadmin');
        setAppState('superAdminDashboard');
        return;
    }

    // Regular user flow
    const profileComplete = localStorage.getItem(`profileComplete_${userRole}`);
    if (profileComplete) {
      if (userRole === 'patient') {
        setAppState('patientDashboard');
      } else if (userRole === 'professional') {
        setAppState('professionalDashboard');
      }
    } else {
      setNextStateAfterPermissions('onboarding');
      setAppState('promptingPermissions');
    }
  };

  const handleRegistration = () => {
    setNextStateAfterPermissions('onboarding');
    setAppState('promptingPermissions');
  };

  const handleOnboardingComplete = () => {
     localStorage.setItem(`profileComplete_${userRole!}`, 'true');
     if (userRole === 'patient') {
        setAppState('patientDashboard');
     } else if (userRole === 'professional') {
        setAppState('professionalDashboard');
     }
  };

  const handleLogout = () => {
    localStorage.removeItem('profileComplete_patient');
    localStorage.removeItem('profileComplete_professional');
    setUserRole(null);
    setAppState('home');
    if (mediaStream) {
        mediaStream.getTracks().forEach(track => track.stop());
        setMediaStream(null);
    }
  };
  
  const handleStartNewSession = () => {
      if (mediaStream) {
          setAppState('assistant');
      } else {
          setNextStateAfterPermissions('assistant');
          setAppState('promptingPermissions');
      }
  }

  const navigate = (page: AppState) => {
    setAppState(page);
  };
  
  const handleGoToDashboard = () => {
    if (userRole === 'patient') setAppState('patientDashboard');
    else if (userRole === 'professional') setAppState('professionalDashboard');
    else if (userRole === 'superadmin') setAppState('superAdminDashboard');
  };

  const handleLoginRegisterClick = () => {
    document.getElementById('start')?.scrollIntoView({ behavior: 'smooth' });
  };

  const renderContent = () => {
    const showHeader = ['home', 'about', 'blog', 'contact', 'whatsappGroups'].includes(appState);
    const isLoggedIn = userRole !== null;
    const userName = userRole === 'patient' ? 'Paciente' : userRole === 'professional' ? 'Dr(a).' : 'Admin';
    const userAvatarUrl = userRole ? `https://i.pravatar.cc/150?u=${userRole}` : '';

    const pageContent = () => {
        switch (appState) {
          case 'home':
            return <HomeScreen onRoleSelect={handleRoleSelect} />;
          case 'about':
            return <AboutScreen />;
          case 'blog':
            return <BlogScreen />;
          case 'whatsappGroups':
            return <WhatsappGroupsScreen />;
          case 'contact':
            return <ContactScreen />;
          case 'login':
            return <LoginScreen role={userRole!} onLogin={handleLogin} onBack={() => setAppState('home')} onNavigateToRegister={() => setAppState('registration')} />;
          case 'registration':
            return <RegistrationScreen role={userRole!} onRegister={handleRegistration} onBack={() => setAppState('login')} />;
          case 'promptingPermissions':
            return <PermissionPrompt onRequest={getPermissions} />;
          case 'permissionDenied':
            return <PermissionDenied />;
          case 'assistant':
            return <AssistantScreen stream={mediaStream!} onSessionEnd={() => setAppState('patientDashboard')} />;
          case 'onboarding':
            return <OnboardingAssistantScreen stream={mediaStream!} onOnboardingEnd={handleOnboardingComplete} role={userRole!} />;
          case 'professionalSelection':
              return <ProfessionalSelectionScreen onStartNewSession={handleStartNewSession} />;
          case 'professionalDashboard':
            return <ProfessionalDashboard onLogout={handleLogout} />;
          case 'patientDashboard':
            return <PatientDashboard onLogout={handleLogout} onStartNewSession={handleStartNewSession} />;
          case 'superAdminDashboard':
            return <SuperAdminDashboard onLogout={handleLogout} />;
          default:
            return <HomeScreen onRoleSelect={handleRoleSelect} />;
        }
    }
    
    return (
        <div className="bg-gray-900">
            {showHeader && <Header 
                onNavigate={navigate} 
                activePage={appState}
                isLoggedIn={isLoggedIn}
                userName={userName}
                userAvatarUrl={userAvatarUrl}
                onGoToDashboard={handleGoToDashboard}
                onLogout={handleLogout}
                onLoginRegisterClick={handleLoginRegisterClick}
             />}
            <main>{pageContent()}</main>
        </div>
    );
  };
  
  return <>{renderContent()}</>;
};

export default App;