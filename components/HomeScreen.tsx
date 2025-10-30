import React from 'react';

type UserRole = 'patient' | 'professional';

interface HomeScreenProps {
  onRoleSelect: (role: UserRole) => void;
}

const RoleCard: React.FC<{
  title: string;
  description: string;
  icon: React.ReactNode;
  onClick: () => void;
}> = ({ title, description, icon, onClick }) => (
  <div
    onClick={onClick}
    className="bg-gray-800 border border-gray-700 rounded-xl p-8 flex flex-col items-center text-center cursor-pointer transition-all duration-300 hover:border-cyan-500 hover:scale-105 hover:bg-gray-700"
  >
    <div className="text-cyan-400 mb-4">{icon}</div>
    <h2 className="text-2xl font-bold text-white mb-2">{title}</h2>
    <p className="text-gray-400">{description}</p>
  </div>
);

const FeatureCard: React.FC<{ title: string; description: string; icon: React.ReactNode; }> = ({ title, description, icon }) => (
    <div className="bg-gray-800/50 p-6 rounded-lg text-center border border-transparent hover:border-cyan-500 transition-colors">
        <div className="flex justify-center text-cyan-400 mb-4">{icon}</div>
        <h3 className="text-xl font-semibold text-white mb-2">{title}</h3>
        <p className="text-gray-400">{description}</p>
    </div>
);

const StepCard: React.FC<{ step: string; title: string; description: string; }> = ({ step, title, description }) => (
    <div className="relative flex-1 p-6 bg-gray-800 rounded-lg border border-gray-700">
        <div className="absolute -top-4 -left-4 w-12 h-12 bg-cyan-500 rounded-full flex items-center justify-center text-white font-bold text-xl">{step}</div>
        <h3 className="text-xl font-bold text-white mt-6 mb-2">{title}</h3>
        <p className="text-gray-400">{description}</p>
    </div>
);

const TestimonialCard: React.FC<{ quote: string; name: string; role: string; }> = ({ quote, name, role }) => (
     <div className="bg-gray-800 p-6 rounded-lg border border-gray-700">
        <p className="text-gray-300 italic">"{quote}"</p>
        <div className="mt-4 text-right">
            <p className="font-bold text-white">{name}</p>
            <p className="text-sm text-cyan-400">{role}</p>
        </div>
    </div>
);


const HomeScreen: React.FC<HomeScreenProps> = ({ onRoleSelect }) => {
  return (
    <div className="bg-gray-900">
        {/* Hero Section */}
        <section className="text-center py-20 px-4">
            <h1 className="text-5xl md:text-6xl font-extrabold mb-4 text-white">
              Bem-vindo ao <span className="text-cyan-400">Hospital IA</span>
            </h1>
            <p className="text-lg md:text-xl text-gray-300 max-w-3xl mx-auto">
              Sua plataforma de saúde digital inteligente. Realize uma triagem inicial com nosso assistente virtual avançado e conecte-se com especialistas, tudo em um só lugar.
            </p>
        </section>
        
        {/* Role Selection Section */}
        <section id="start" className="py-16 px-4 bg-gray-800/40">
            <div className="max-w-4xl mx-auto text-center">
                <h2 className="text-3xl font-bold text-white mb-4">Comece Agora</h2>
                <p className="text-gray-400 mb-12">Selecione seu perfil para uma experiência personalizada.</p>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                    <RoleCard
                        title="Acessar como Paciente"
                        description="Inicie uma consulta com nosso assistente virtual ou agende com um especialista."
                        icon={<svg xmlns="http://www.w3.org/2000/svg" className="h-16 w-16" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" /></svg>}
                        onClick={() => onRoleSelect('patient')}
                    />
                    <RoleCard
                        title="Acessar como Profissional"
                        description="Gerencie sua agenda, conecte-se com colegas e acesse ferramentas de IA."
                        icon={<svg xmlns="http://www.w3.org/2000/svg" className="h-16 w-16" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 21V5a2 2 0 00-2-2H7a2 2 0 00-2 2v16m14 0h2m-2 0h-5m-9 0H3m2 0h5M9 7h1m-1 4h1m4-4h1m-1 4h1m-5 10v-5a1 1 0 011-1h2a1 1 0 011 1v5m-4 0h4" /></svg>}
                        onClick={() => onRoleSelect('professional')}
                    />
                </div>
            </div>
        </section>

        {/* Features Section */}
        <section className="py-20 px-4">
             <div className="max-w-6xl mx-auto text-center">
                <h2 className="text-3xl font-bold text-white mb-4">Uma Nova Experiência em Saúde</h2>
                <p className="text-gray-400 mb-12 max-w-2xl mx-auto">Descubra os recursos que tornam o Hospital IA uma ferramenta poderosa para pacientes e profissionais.</p>
                <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
                    <FeatureCard
                        title="Assistente Virtual 24/7"
                        description="Receba uma triagem inicial a qualquer hora do dia, com uma IA conversacional que entende você."
                        icon={<svg xmlns="http://www.w3.org/2000/svg" className="h-12 w-12" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M8 12h.01M12 12h.01M16 12h.01M21 12c0 4.418-4.03 8-9 8a9.863 9.863 0 01-4.255-.949L3 20l1.395-3.72C3.512 15.042 3 13.574 3 12c0-4.418 4.03-8 9-8s9 3.582 9 8z" /></svg>}
                    />
                     <FeatureCard
                        title="Conexão com Especialistas"
                        description="Após a triagem, conecte-se facilmente com médicos qualificados para um atendimento humano e especializado."
                        icon={<svg xmlns="http://www.w3.org/2000/svg" className="h-12 w-12" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.653-.124-1.282-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.653.124-1.282.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0zm6 3a2 2 0 11-4 0 2 2 0 014 0zM7 10a2 2 0 11-4 0 2 2 0 014 0z" /></svg>}
                    />
                     <FeatureCard
                        title="Seguro e Privado"
                        description="Sua privacidade é nossa prioridade. Usamos criptografia de ponta para proteger seus dados de saúde."
                        icon={<svg xmlns="http://www.w3.org/2000/svg" className="h-12 w-12" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z" /></svg>}
                    />
                </div>
            </div>
        </section>

        {/* How It Works Section */}
        <section className="py-20 px-4 bg-gray-800/40">
            <div className="max-w-6xl mx-auto text-center">
                <h2 className="text-3xl font-bold text-white mb-4">Como Funciona?</h2>
                <p className="text-gray-400 mb-12 max-w-2xl mx-auto">Em poucos passos, você recebe a orientação que precisa. É simples, rápido e eficiente.</p>
                <div className="flex flex-col md:flex-row items-center justify-center gap-8 md:gap-4">
                    <StepCard step="1" title="Inicie a Conversa" description="Ative o assistente virtual e descreva seus sintomas de forma natural, como se estivesse falando com um médico." />
                    <div className="h-8 w-px md:h-px md:w-12 bg-gray-700"></div>
                    <StepCard step="2" title="Receba a Triagem" description="Nossa IA analisa suas informações em tempo real para fornecer uma orientação inicial e os próximos passos recomendados." />
                    <div className="h-8 w-px md:h-px md:w-12 bg-gray-700"></div>
                    <StepCard step="3" title="Conecte-se" description="Com base na triagem, escolha continuar a conversa, ser encaminhado para um especialista humano ou receber outras orientações." />
                </div>
            </div>
        </section>
        
        {/* Testimonials Section */}
        <section className="py-20 px-4">
             <div className="max-w-4xl mx-auto text-center">
                <h2 className="text-3xl font-bold text-white mb-4">O Que Dizem Sobre Nós</h2>
                <p className="text-gray-400 mb-12 max-w-2xl mx-auto">A confiança de nossos usuários é o nosso maior orgulho.</p>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                    <TestimonialCard
                        quote="Fiquei impressionado com a precisão do assistente. Em minutos, tive uma orientação clara sobre o que fazer, o que me deu muita tranquilidade."
                        name="Marcos Andrade"
                        role="Paciente"
                    />
                    <TestimonialCard
                        quote="A plataforma otimiza meu tempo, filtrando os casos e me permitindo focar nos pacientes que mais precisam de atenção. É o futuro da medicina."
                        name="Dra. Carolina Furtado"
                        role="Cardiologista"
                    />
                </div>
            </div>
        </section>

        <footer className="bg-gray-800/60 border-t border-gray-700 text-gray-400">
            <div className="max-w-7xl mx-auto py-12 px-4 sm:px-6 lg:px-8">
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
                    <div className="space-y-4">
                        <h3 className="font-bold text-xl text-white">
                            Hospital <span className="text-cyan-400">IA</span>
                        </h3>
                        <p className="text-sm">
                           Revolucionando o acesso à saúde com inteligência artificial de ponta, de forma ética e humanizada.
                        </p>
                    </div>
                    <div>
                        <h4 className="font-semibold text-white tracking-wider uppercase">Navegação</h4>
                        <ul className="mt-4 space-y-2 text-sm">
                            <li><a href="#" className="hover:text-white transition-colors">Sobre Nós</a></li>
                            <li><a href="#" className="hover:text-white transition-colors">Blog</a></li>
                            <li><a href="#" className="hover:text-white transition-colors">Grupos WhatsApp</a></li>
                            <li><a href="#" className="hover:text-white transition-colors">Contato</a></li>
                        </ul>
                    </div>
                    <div>
                        <h4 className="font-semibold text-white tracking-wider uppercase">Legal</h4>
                        <ul className="mt-4 space-y-2 text-sm">
                            <li><a href="#" className="hover:text-white transition-colors">Termos de Serviço</a></li>
                            <li><a href="#" className="hover:text-white transition-colors">Política de Privacidade</a></li>
                        </ul>
                    </div>
                    <div>
                         <h4 className="font-semibold text-white tracking-wider uppercase">Contato</h4>
                         <ul className="mt-4 space-y-3 text-sm">
                             <li className="flex items-center">
                                <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 mr-3" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" /></svg>
                                <span>contato@hospitalia.com</span>
                            </li>
                             <li className="flex items-center">
                                <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 mr-3" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" /><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" /></svg>
                                <span>Av. Inovação Digital, 100</span>
                            </li>
                         </ul>
                    </div>
                </div>
                 <div className="mt-12 pt-8 border-t border-gray-700 text-center text-sm">
                    <p>&copy; {new Date().getFullYear()} Hospital IA. Todos os direitos reservados.</p>
                </div>
            </div>
        </footer>
    </div>
  );
};

export default HomeScreen;