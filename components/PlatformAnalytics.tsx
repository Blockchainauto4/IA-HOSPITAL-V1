import React from 'react';

const PlatformAnalytics: React.FC = () => {
    return (
        <div>
            <header className="mb-8">
                <h1 className="text-3xl font-bold text-white mb-2">Análise da Plataforma</h1>
                <p className="text-gray-400">Métricas e gráficos sobre o uso da plataforma.</p>
            </header>
            
            <div className="text-center bg-gray-800/50 border border-dashed border-gray-700 rounded-lg p-16">
                 <div className="flex justify-center mb-6">
                    <svg xmlns="http://www.w3.org/2000/svg" className="h-16 w-16 text-gray-600" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 7h8m0 0v8m0-8l-8 8-4-4-6 6" /></svg>
                </div>
                <h2 className="text-2xl font-semibold text-white mb-2">Funcionalidade em Breve</h2>
                <p className="text-gray-400 max-w-2xl mx-auto">
                    Em breve, esta área exibirá gráficos interativos e métricas detalhadas sobre o engajamento dos usuários, sessões de IA, horários de pico e muito mais.
                </p>
            </div>
        </div>
    );
};

export default PlatformAnalytics;
