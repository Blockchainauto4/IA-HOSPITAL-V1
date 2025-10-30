import React from 'react';

const InfoCard: React.FC<{ title: string; children: React.ReactNode; icon: React.ReactNode }> = ({ title, children, icon }) => (
    <div className="bg-gray-800 p-6 rounded-lg border border-gray-700">
        <div className="flex items-center mb-4">
            <div className="text-cyan-400 mr-4">{icon}</div>
            <h3 className="text-2xl font-bold text-white">{title}</h3>
        </div>
        <p className="text-gray-400">{children}</p>
    </div>
);

const AboutScreen: React.FC = () => {
    return (
        <div className="min-h-screen text-white p-4 sm:p-6 md:p-8">
            <div className="max-w-4xl mx-auto">
                <header className="text-center mb-12">
                    <h1 className="text-5xl font-extrabold text-cyan-400 mb-4">Sobre o Hospital IA</h1>
                    <p className="text-xl text-gray-300 max-w-3xl mx-auto">
                        Revolucionando o acesso à saúde com inteligência artificial de ponta, de forma ética e humanizada.
                    </p>
                </header>

                <div className="space-y-8">
                    <InfoCard
                        title="Nossa Missão"
                        icon={<svg xmlns="http://www.w3.org/2000/svg" className="h-8 w-8" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5.121 17.804A13.937 13.937 0 0112 16c2.5 0 4.847.655 6.879 1.804M15 10a3 3 0 11-6 0 3 3 0 016 0z" /><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 14c-5.456 0-9.923 4.33-9.923 9.634V24h19.846v-0.366C21.923 18.33 17.456 14 12 14z" /></svg>}
                    >
                        Democratizar o acesso a uma triagem médica de qualidade, oferecendo um assistente virtual inteligente, disponível 24/7. Nosso objetivo é fornecer orientação inicial segura e eficiente, conectando pacientes a especialistas quando necessário e otimizando o sistema de saúde como um todo.
                    </InfoCard>

                    <InfoCard
                        title="Nossa Visão"
                        icon={<svg xmlns="http://www.w3.org/2000/svg" className="h-8 w-8" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 7h8m0 0v8m0-8l-8 8-4-4-6 6" /></svg>}
                    >
                        Ser a principal plataforma de saúde digital da América Latina, reconhecida por nossa inovação em inteligência artificial, compromisso com a privacidade do paciente e pela criação de uma ponte sólida e confiável entre a tecnologia e o cuidado humano.
                    </InfoCard>
                    
                    <InfoCard
                        title="Nossa Tecnologia"
                        icon={<svg xmlns="http://www.w3.org/2000/svg" className="h-8 w-8" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 12h14M12 5l7 7-7 7" /></svg>}
                    >
                        Utilizamos modelos de linguagem avançados do Google Gemini para conversas em tempo real, processando áudio e vídeo para uma interação natural. Nossa plataforma é construída com as mais recentes tecnologias web, garantindo uma experiência segura, responsiva e acessível em qualquer dispositivo.
                    </InfoCard>
                </div>
                 <footer className="mt-12 text-center text-gray-500">
                    <p>&copy; {new Date().getFullYear()} Hospital IA. Todos os direitos reservados.</p>
                </footer>
            </div>
        </div>
    );
};

export default AboutScreen;
