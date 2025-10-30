import React, { useState } from 'react';
import { AppState } from '../App';
import { UserRole } from '../types';

interface HeaderProps {
    onNavigate: (page: AppState) => void;
    activePage: AppState;
    isLoggedIn: boolean;
    userName: string;
    userAvatarUrl: string;
    onGoToDashboard: () => void;
    onLogout: () => void;
    onLoginRegisterClick: () => void;
}

const navItems: { page: AppState; label: string }[] = [
    { page: 'home', label: 'Início' },
    { page: 'about', label: 'Sobre Nós' },
    { page: 'blog', label: 'Blog' },
    { page: 'whatsappGroups', label: 'Grupos WhatsApp' },
    { page: 'contact', label: 'Contato' },
];

const NavLink: React.FC<{
    page: AppState;
    label: string;
    activePage: AppState;
    onClick: () => void;
    isMobile?: boolean;
}> = ({ page, label, activePage, onClick, isMobile = false }) => (
    <button
        onClick={onClick}
        className={`transition-colors duration-200 ${
            isMobile
            ? `block w-full text-left px-4 py-3 text-lg ${activePage === page ? 'text-cyan-400 font-semibold' : 'text-gray-300 hover:bg-gray-800'}`
            : `px-3 py-2 rounded-md text-sm font-medium ${activePage === page ? 'bg-cyan-500 text-white' : 'text-gray-300 hover:bg-gray-700 hover:text-white'}`
        }`}
    >
        {label}
    </button>
);

const AuthButtons: React.FC<{
    isLoggedIn: boolean;
    userName: string;
    userAvatarUrl: string;
    onGoToDashboard: () => void;
    onLogout: () => void;
    onLoginRegisterClick: () => void;
    isMobile?: boolean;
}> = ({ isLoggedIn, userName, userAvatarUrl, onGoToDashboard, onLogout, onLoginRegisterClick, isMobile = false }) => {
    if (isLoggedIn) {
        return (
            <div className={`flex items-center gap-4 ${isMobile ? 'flex-col w-full p-4 mt-4 border-t border-gray-700' : ''}`}>
                <div className="flex items-center gap-2">
                    <img src={userAvatarUrl} alt="Avatar" className="w-8 h-8 rounded-full border-2 border-gray-600" />
                    <span className="text-white text-sm font-medium">Olá, {userName}</span>
                </div>
                 <button 
                    onClick={onGoToDashboard} 
                    className={`font-medium text-sm transition-colors ${isMobile ? 'w-full bg-gray-700 text-white py-3 rounded-lg' : 'text-gray-300 hover:text-white'}`}
                >
                    Meu Painel
                </button>
                <button 
                    onClick={onLogout} 
                    className={`font-medium text-sm transition-colors ${isMobile ? 'w-full text-red-400 py-2' : 'text-red-400 hover:text-red-300'}`}
                >
                    Sair
                </button>
            </div>
        );
    }
    return (
        <div className={`flex items-center gap-2 ${isMobile ? 'flex-col w-full p-4 mt-4 border-t border-gray-700' : ''}`}>
             <button 
                onClick={onLoginRegisterClick} 
                className={`font-medium text-sm transition-colors ${isMobile ? 'w-full text-white py-3 rounded-lg' : 'text-gray-300 hover:text-white px-3 py-2'}`}
            >
                Login
            </button>
            <button 
                onClick={onLoginRegisterClick} 
                className={`text-sm font-medium transition-colors ${isMobile ? 'w-full bg-cyan-500 text-white py-3 rounded-lg' : 'bg-cyan-500 hover:bg-cyan-600 text-white px-4 py-2 rounded-md'}`}
            >
                Cadastre-se
            </button>
        </div>
    );
};

const MobileMenu: React.FC<HeaderProps & { onClose: () => void }> = (props) => {
    const { onNavigate, activePage, onClose } = props;
    return (
        <div className="fixed inset-0 z-50 bg-gray-900 p-4 flex flex-col md:hidden">
            <div className="flex items-center justify-between pb-4 border-b border-gray-700">
                <span className="font-bold text-xl text-white">
                    Hospital <span className="text-cyan-400">IA</span>
                </span>
                <button onClick={onClose} className="text-gray-400 hover:text-white">
                     <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" /></svg>
                </button>
            </div>
            <nav className="flex-grow mt-6 flex flex-col">
                {navItems.map((item) => (
                    <NavLink
                        key={item.label}
                        page={item.page}
                        label={item.label}
                        activePage={activePage}
                        onClick={() => { onNavigate(item.page); onClose(); }}
                        isMobile
                    />
                ))}
                 <div className="mt-auto">
                    <AuthButtons {...props} isMobile />
                 </div>
            </nav>
        </div>
    );
}

const Header: React.FC<HeaderProps> = (props) => {
    const { onNavigate, activePage } = props;
    const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

    return (
        <>
            <header className="bg-gray-800/80 backdrop-blur-sm border-b border-gray-700 sticky top-0 z-40">
                <nav className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                    <div className="flex items-center justify-between h-16">
                        <div className="flex items-center">
                            <button className="font-bold text-xl text-white" onClick={() => onNavigate('home')}>
                                Hospital <span className="text-cyan-400">IA</span>
                            </button>
                        </div>
                        <div className="hidden md:block">
                            <div className="ml-10 flex items-center space-x-4">
                                {navItems.map((item) => (
                                    <NavLink
                                        key={item.label}
                                        page={item.page}
                                        label={item.label}
                                        activePage={activePage}
                                        onClick={() => onNavigate(item.page)}
                                    />
                                ))}
                            </div>
                        </div>
                        <div className="hidden md:block">
                            <AuthButtons {...props} />
                        </div>
                        <div className="md:hidden">
                            <button
                                onClick={() => setIsMobileMenuOpen(true)}
                                className="inline-flex items-center justify-center p-2 rounded-md text-gray-400 hover:text-white hover:bg-gray-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-offset-gray-800 focus:ring-white"
                            >
                                <span className="sr-only">Abrir menu principal</span>
                                <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" /></svg>
                            </button>
                        </div>
                    </div>
                </nav>
            </header>
            {isMobileMenuOpen && <MobileMenu {...props} onClose={() => setIsMobileMenuOpen(false)} />}
        </>
    );
};

export default Header;