import React from 'react';

const ProfessionalSchedule: React.FC = () => {
    return (
        <div>
            <header className="mb-8">
                <h1 className="text-3xl font-bold text-white mb-2">Agenda</h1>
                <p className="text-gray-400">Gerencie seus horários e consultas.</p>
            </header>
            
            <div className="text-center bg-gray-800/50 border border-dashed border-gray-700 rounded-lg p-16">
                 <div className="flex justify-center mb-6">
                     <svg xmlns="http://www.w3.org/2000/svg" className="h-16 w-16 text-gray-600" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" /></svg>
                </div>
                <h2 className="text-2xl font-semibold text-white mb-2">Funcionalidade em Breve</h2>
                <p className="text-gray-400 max-w-2xl mx-auto">
                    A visualização de calendário e o gerenciamento de agenda estarão disponíveis em breve. Aqui você poderá ver seus horários de atendimento e as consultas marcadas.
                </p>
            </div>
        </div>
    );
};

export default ProfessionalSchedule;
