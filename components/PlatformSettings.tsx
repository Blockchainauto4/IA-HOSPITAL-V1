import React from 'react';

const PlatformSettings: React.FC = () => {
    return (
        <div>
            <header className="mb-8">
                <h1 className="text-3xl font-bold text-white mb-2">Configurações da Plataforma</h1>
                <p className="text-gray-400">Ajustes e configurações globais do sistema.</p>
            </header>
            
            <div className="text-center bg-gray-800/50 border border-dashed border-gray-700 rounded-lg p-16">
                 <div className="flex justify-center mb-6">
                    <svg xmlns="http://www.w3.org/2000/svg" className="h-16 w-16 text-gray-600" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10.325 4.317c.426-1.756 2.924-1.756 3.35 0a1.724 1.724 0 002.573 1.066c1.543-.94 3.31.826 2.37 2.37a1.724 1.724 0 001.065 2.572c1.756.426 1.756 2.924 0 3.35a1.724 1.724 0 00-1.066 2.573c.94 1.543-.826 3.31-2.37 2.37a1.724 1.724 0 00-2.572 1.065c-.426 1.756-2.924 1.756-3.35 0a1.724 1.724 0 00-2.573-1.066c-1.543.94-3.31-.826-2.37-2.37a1.724 1.724 0 00-1.065-2.572c-1.756-.426-1.756-2.924 0-3.35a1.724 1.724 0 001.066-2.573c-.94-1.543.826-3.31 2.37-2.37.996.608 2.296.07 2.572-1.065z" /><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" /></svg>
                </div>
                <h2 className="text-2xl font-semibold text-white mb-2">Funcionalidade em Breve</h2>
                <p className="text-gray-400 max-w-2xl mx-auto">
                    Futuramente, esta seção permitirá que o administrador configure aspectos globais da plataforma, como integrações, limites de uso, prompts do sistema de IA e muito mais.
                </p>
            </div>
        </div>
    );
};

export default PlatformSettings;
