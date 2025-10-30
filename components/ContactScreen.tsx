import React from 'react';

const ContactScreen: React.FC = () => {

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        // Em uma aplicação real, aqui seria a lógica para enviar o formulário.
        alert('Obrigado pelo seu contato! (Esta é uma simulação)');
    };

    return (
        <div className="min-h-screen text-white p-4 sm:p-6 md:p-8">
            <div className="max-w-4xl mx-auto">
                <header className="text-center mb-12">
                    <h1 className="text-5xl font-extrabold text-cyan-400 mb-4">Entre em Contato</h1>
                    <p className="text-xl text-gray-300">
                        Tem alguma dúvida, sugestão ou feedback? Adoraríamos ouvir você.
                    </p>
                </header>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-12 bg-gray-800 border border-gray-700 rounded-lg p-8">
                    {/* Formulário de Contato */}
                    <div>
                        <h2 className="text-2xl font-bold text-white mb-6">Envie uma Mensagem</h2>
                        <form onSubmit={handleSubmit} className="space-y-6">
                            <div>
                                <label htmlFor="name" className="block text-sm font-medium text-gray-300 mb-2">Seu Nome</label>
                                <input type="text" id="name" required className="w-full bg-gray-700 border border-gray-600 rounded-lg px-4 py-3 text-white focus:outline-none focus:ring-2 focus:ring-cyan-500" />
                            </div>
                            <div>
                                <label htmlFor="email" className="block text-sm font-medium text-gray-300 mb-2">Seu Email</label>
                                <input type="email" id="email" required className="w-full bg-gray-700 border border-gray-600 rounded-lg px-4 py-3 text-white focus:outline-none focus:ring-2 focus:ring-cyan-500" />
                            </div>
                            <div>
                                <label htmlFor="message" className="block text-sm font-medium text-gray-300 mb-2">Sua Mensagem</label>
                                <textarea id="message" rows={5} required className="w-full bg-gray-700 border border-gray-600 rounded-lg px-4 py-3 text-white focus:outline-none focus:ring-2 focus:ring-cyan-500" />
                            </div>
                            <button type="submit" className="w-full bg-cyan-500 hover:bg-cyan-600 text-white font-bold py-3 px-4 rounded-lg text-lg transition-transform transform hover:scale-105">
                                Enviar
                            </button>
                        </form>
                    </div>

                    {/* Informações de Contato */}
                    <div className="space-y-6">
                         <h2 className="text-2xl font-bold text-white mb-6">Informações de Contato</h2>
                         <div className="flex items-start space-x-4">
                            <div className="text-cyan-400 mt-1"><svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" /><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" /></svg></div>
                            <div>
                                <h4 className="font-semibold text-white">Endereço</h4>
                                <p className="text-gray-400">Av. Inovação Digital, 100, São Paulo, SP</p>
                            </div>
                         </div>
                         <div className="flex items-start space-x-4">
                            <div className="text-cyan-400 mt-1"><svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" /></svg></div>
                            <div>
                                <h4 className="font-semibold text-white">Email</h4>
                                <p className="text-gray-400">contato@hospitalia.com</p>
                            </div>
                         </div>
                         <div className="flex items-start space-x-4">
                            <div className="text-cyan-400 mt-1"><svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.473 4.42-1.999 1.999a11.042 11.042 0 005.57 5.57l1.999-1.999 4.42 1.473c.345.115.684.346.948.948V19a2 2 0 01-2 2h-1.58c-8.456-1.042-15.42-7.97-16.462-16.462V5z" /></svg></div>
                            <div>
                                <h4 className="font-semibold text-white">Telefone</h4>
                                <p className="text-gray-400">+55 (11) 99999-9999</p>
                            </div>
                         </div>
                    </div>
                </div>
                <footer className="mt-12 text-center text-gray-500">
                    <p>&copy; {new Date().getFullYear()} Hospital IA. Todos os direitos reservados.</p>
                </footer>
            </div>
        </div>
    );
};

export default ContactScreen;
