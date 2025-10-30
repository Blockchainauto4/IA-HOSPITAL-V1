import React from 'react';

const whatsappGroups = [
    {
        name: 'Cardiologia Brasil',
        description: 'Discussão de casos clínicos, artigos e novidades na área de cardiologia. Exclusivo para cardiologistas.',
        icon: (
            <svg xmlns="http://www.w3.org/2000/svg" className="h-10 w-10" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z" />
            </svg>
        ),
        link: 'https://chat.whatsapp.com/example_cardiologia'
    },
    {
        name: 'Pediatria em Foco',
        description: 'Grupo para pediatras trocarem experiências, discutirem casos e se manterem atualizados sobre a saúde infantil.',
        icon: (
             <svg xmlns="http://www.w3.org/2000/svg" className="h-10 w-10" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 4.354a4 4 0 110 5.292M15 21H3v-1a6 6 0 016-6h6a6 6 0 016 6v1h-3" /></svg>
        ),
        link: 'https://chat.whatsapp.com/example_pediatria'
    },
    {
        name: 'Clínica Geral Debates',
        description: 'Espaço para médicos clínicos gerais discutirem o dia a dia, casos desafiadores e as melhores práticas.',
        icon: (
            <svg xmlns="http://www.w3.org/2000/svg" className="h-10 w-10" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M19 21V5a2 2 0 00-2-2H7a2 2 0 00-2 2v16m14 0h2m-2 0h-5m-9 0H3m2 0h5M9 7h1m-1 4h1m4-4h1m-1 4h1m-5 10v-5a1 1 0 011-1h2a1 1 0 011 1v5m-4 0h4" /></svg>
        ),
        link: 'https://chat.whatsapp.com/example_clinicageral'
    },
    {
        name: 'Neurologia Avançada',
        description: 'Comunidade para neurologistas e neurocirurgiões. Compartilhamento de pesquisas e casos complexos.',
        icon: (
            <svg xmlns="http://www.w3.org/2000/svg" className="h-10 w-10" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9.75 17L9 20l-1 1h8l-1-1-.75-3M3 13h18M5 17h14a2 2 0 002-2V5a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" /></svg>
        ),
        link: 'https://chat.whatsapp.com/example_neurologia'
    },
    {
        name: 'Ortopedia e Traumatologia',
        description: 'Grupo focado em ortopedia, para discussão de técnicas cirúrgicas, reabilitação e inovações na área.',
        icon: (
            <svg xmlns="http://www.w3.org/2000/svg" className="h-10 w-10" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4 8V4m0 0h4M4 4l5 5m11-1V4m0 0h-4m4 0l-5 5M4 16v4m0 0h4m-4 0l5-5m11 5v-4m0 0h-4m4 0l-5-5" /></svg>
        ),
        link: 'https://chat.whatsapp.com/example_ortopedia'
    },
    {
        name: 'IA na Medicina',
        description: 'Um hub para profissionais interessados em como a Inteligência Artificial está moldando o futuro da saúde.',
        icon: (
            <svg xmlns="http://www.w3.org/2000/svg" className="h-10 w-10" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 3v2m6-2v2M9 19v2m6-2v2M5 9H3m2 6H3m18-6h-2m2 6h-2M12 6V3m0 18v-3" /><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 15a3 3 0 100-6 3 3 0 000 6z" /></svg>
        ),
        link: 'https://chat.whatsapp.com/example_ia'
    },
];

const GroupCard: React.FC<typeof whatsappGroups[0]> = ({ name, description, icon, link }) => (
    <div className="bg-gray-800 border border-gray-700 rounded-lg p-6 flex flex-col items-start text-left transition-all duration-300 hover:border-cyan-500 hover:scale-105 hover:bg-gray-700/50">
        <div className="text-cyan-400 mb-4">{icon}</div>
        <h3 className="text-xl font-bold text-white mb-2">{name}</h3>
        <p className="text-gray-400 mb-4 flex-grow">{description}</p>
        <a
            href={link}
            target="_blank"
            rel="noopener noreferrer"
            className="mt-auto w-full text-center bg-cyan-500 hover:bg-cyan-600 text-white font-semibold py-2 px-4 rounded-lg transition-colors"
        >
            Entrar no Grupo
        </a>
    </div>
);

const WhatsappGroupsScreen: React.FC = () => {
    return (
        <div className="min-h-screen text-white p-4 sm:p-6 md:p-8">
            <div className="max-w-6xl mx-auto">
                <header className="text-center mb-12">
                    <h1 className="text-5xl font-extrabold text-cyan-400 mb-4">Grupos de WhatsApp Médicos</h1>
                    <p className="text-xl text-gray-300 max-w-3xl mx-auto">
                        Conecte-se com colegas, troque conhecimento e fortaleça sua rede profissional em nossos grupos selecionados.
                    </p>
                </header>

                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
                    {whatsappGroups.map((group, index) => (
                        <GroupCard key={index} {...group} />
                    ))}
                </div>

                 <footer className="mt-12 text-center text-gray-500">
                    <p className="mb-2"><strong>Aviso:</strong> Os grupos são moderados por suas respectivas administrações. O Hospital IA não se responsabiliza pelo conteúdo compartilhado.</p>
                    <p>&copy; {new Date().getFullYear()} Hospital IA. Todos os direitos reservados.</p>
                </footer>
            </div>
        </div>
    );
};

export default WhatsappGroupsScreen;
