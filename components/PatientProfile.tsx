import React from 'react';

const PatientProfile: React.FC = () => {
    return (
        <div>
            <header className="mb-8">
                <h1 className="text-3xl font-bold text-white mb-2">Meu Perfil</h1>
                <p className="text-gray-400">Visualize e edite suas informações pessoais.</p>
            </header>
            
            <div className="text-center bg-gray-800/50 border border-dashed border-gray-700 rounded-lg p-16">
                <div className="flex justify-center mb-6">
                    <svg xmlns="http://www.w3.org/2000/svg" className="h-16 w-16 text-gray-600" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" /></svg>
                </div>
                <h2 className="text-2xl font-semibold text-white mb-2">Funcionalidade em Breve</h2>
                <p className="text-gray-400 max-w-2xl mx-auto">
                    Em breve, você poderá visualizar e editar suas informações de perfil, como endereço, telefone de contato, plano de saúde e alergias.
                </p>
            </div>
        </div>
    );
};

export default PatientProfile;
