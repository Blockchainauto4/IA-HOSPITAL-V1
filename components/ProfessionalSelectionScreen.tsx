import React from 'react';

const professionals = [
    {
        name: 'Dr. Ana Oliveira',
        specialty: 'Clínica Geral',
        status: 'Online',
        imageUrl: `https://i.pravatar.cc/150?u=anaoliveira`
    },
    {
        name: 'Dr. Carlos Souza',
        specialty: 'Cardiologia',
        status: 'Online',
        imageUrl: `https://i.pravatar.cc/150?u=carlossouza`
    },
    {
        name: 'Dra. Beatriz Lima',
        specialty: 'Pediatria',
        status: 'Offline',
        imageUrl: `https://i.pravatar.cc/150?u=beatrizlima`
    },
    {
        name: 'Dr. Ricardo Pereira',
        specialty: 'Ortopedia',
        status: 'Online',
        imageUrl: `https://i.pravatar.cc/150?u=ricardopereira`
    },
    {
        name: 'Dra. Fernanda Costa',
        specialty: 'Dermatologia',
        status: 'Offline',
        imageUrl: `https://i.pravatar.cc/150?u=fernandacosta`
    },
     {
        name: 'Dr. Lucas Martins',
        specialty: 'Neurologia',
        status: 'Online',
        imageUrl: `https://i.pravatar.cc/150?u=lucasmartins`
    }
];

const ProfessionalCard: React.FC<typeof professionals[0]> = ({ name, specialty, status, imageUrl }) => {
    const isOnline = status === 'Online';
    return (
        <div className="bg-gray-800 border border-gray-700 rounded-lg p-4 flex flex-col items-center text-center transition-transform transform hover:scale-105 hover:border-cyan-500">
            <img src={imageUrl} alt={name} className="w-24 h-24 rounded-full mb-4 border-4 border-gray-600" />
            <h3 className="text-xl font-bold text-white">{name}</h3>
            <p className="text-cyan-400 mb-2">{specialty}</p>
            <div className="flex items-center space-x-2 mb-4">
                <span className={`w-3 h-3 rounded-full ${isOnline ? 'bg-green-500' : 'bg-gray-500'}`}></span>
                <span className={`text-sm ${isOnline ? 'text-green-400' : 'text-gray-400'}`}>{status}</span>
            </div>
            <button
                disabled={!isOnline}
                className={`w-full py-2 px-4 rounded-lg font-semibold ${
                    isOnline
                        ? 'bg-cyan-500 hover:bg-cyan-600 text-white cursor-pointer'
                        : 'bg-gray-600 text-gray-400 cursor-not-allowed'
                }`}
            >
                Conectar
            </button>
        </div>
    );
};

const ProfessionalSelectionScreen: React.FC<{ onStartNewSession: () => void }> = ({ onStartNewSession }) => {
    return (
        <div className="min-h-screen bg-gray-900 text-white p-4 sm:p-6 md:p-8">
            <div className="max-w-6xl mx-auto">
                <header className="text-center mb-8">
                    <h1 className="text-4xl font-bold text-cyan-400 mb-2">Especialistas Disponíveis</h1>
                    <p className="text-lg text-gray-300">Selecione um profissional para iniciar um atendimento humano.</p>
                </header>
                
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 mb-8">
                    {professionals.map((prof, index) => (
                        <ProfessionalCard key={index} {...prof} />
                    ))}
                </div>

                <footer className="text-center border-t border-gray-700 pt-6">
                     <p className="text-gray-400 mb-4">Ou, se preferir, você pode começar uma nova consulta com nosso assistente virtual.</p>
                    <button
                        onClick={onStartNewSession}
                        className="bg-gray-700 hover:bg-gray-600 text-white font-bold py-3 px-8 rounded-lg text-lg transition-transform transform hover:scale-105"
                    >
                        Iniciar Nova Consulta com IA
                    </button>
                </footer>
            </div>
        </div>
    );
};

export default ProfessionalSelectionScreen;
