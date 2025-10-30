import React from 'react';
import { UserRole } from '../types';

interface MockUser {
    id: number;
    name: string;
    email: string;
    role: Exclude<UserRole, 'superadmin'>;
    status: 'Ativo' | 'Inativo';
    joinedDate: string;
}

const mockUsers: MockUser[] = [
    { id: 1, name: 'Paciente Exemplo', email: 'paciente@email.com', role: 'patient', status: 'Ativo', joinedDate: '2024-07-15' },
    { id: 2, name: 'Dr. Profissional', email: 'profissional@email.com', role: 'professional', status: 'Ativo', joinedDate: '2024-07-14' },
    { id: 3, name: 'Maria Silva', email: 'maria.s@email.com', role: 'patient', status: 'Ativo', joinedDate: '2024-07-12' },
    { id: 4, name: 'Dr. Carlos Souza', email: 'carlos.souza@email.com', role: 'professional', status: 'Inativo', joinedDate: '2024-07-10' },
    { id: 5, name: 'João Pereira', email: 'joao.p@email.com', role: 'patient', status: 'Ativo', joinedDate: '2024-07-09' },
    { id: 6, name: 'Dra. Ana Oliveira', email: 'ana.oliveira@email.com', role: 'professional', status: 'Ativo', joinedDate: '2024-07-08' },
];

const UserManagement: React.FC = () => {
    
    const handleAction = (action: string, userName: string) => {
        alert(`${action} o usuário ${userName}. (Ação simulada)`);
    };

    return (
        <div>
            <header className="mb-8">
                <h1 className="text-3xl font-bold text-white mb-2">Gerenciamento de Usuários</h1>
                <p className="text-gray-400">Visualize e administre todos os usuários da plataforma.</p>
            </header>

            <div className="bg-gray-800 rounded-lg border border-gray-700 overflow-x-auto">
                <table className="w-full text-sm text-left text-gray-300">
                    <thead className="text-xs text-gray-400 uppercase bg-gray-700/50">
                        <tr>
                            <th scope="col" className="px-6 py-3">Nome</th>
                            <th scope="col" className="px-6 py-3">Email</th>
                            <th scope="col" className="px-6 py-3">Perfil</th>
                            <th scope="col" className="px-6 py-3">Status</th>
                            <th scope="col" className="px-6 py-3">Data de Cadastro</th>
                            <th scope="col" className="px-6 py-3 text-center">Ações</th>
                        </tr>
                    </thead>
                    <tbody>
                        {mockUsers.map((user) => (
                            <tr key={user.id} className="border-b border-gray-700 even:bg-gray-800/50 hover:bg-gray-700/40">
                                <th scope="row" className="px-6 py-4 font-medium text-white whitespace-nowrap">
                                    {user.name}
                                </th>
                                <td className="px-6 py-4">{user.email}</td>
                                <td className="px-6 py-4">
                                    <span className={`px-2 py-1 text-xs font-semibold rounded-full ${user.role === 'patient' ? 'bg-blue-500/20 text-blue-300' : 'bg-green-500/20 text-green-300'}`}>
                                        {user.role === 'patient' ? 'Paciente' : 'Profissional'}
                                    </span>
                                </td>
                                <td className="px-6 py-4">
                                     <span className={`flex items-center space-x-2 ${user.status === 'Ativo' ? 'text-green-400' : 'text-gray-500'}`}>
                                        <span className={`w-2 h-2 rounded-full ${user.status === 'Ativo' ? 'bg-green-500' : 'bg-gray-500'}`}></span>
                                        <span>{user.status}</span>
                                    </span>
                                </td>
                                <td className="px-6 py-4">{new Date(user.joinedDate).toLocaleDateString('pt-BR')}</td>
                                <td className="px-6 py-4 text-center">
                                    <div className="flex justify-center space-x-2">
                                        <button onClick={() => handleAction('Visualizar', user.name)} className="font-medium text-purple-400 hover:underline">Ver</button>
                                        <button onClick={() => handleAction('Editar', user.name)} className="font-medium text-purple-400 hover:underline">Editar</button>
                                        <button onClick={() => handleAction('Excluir', user.name)} className="font-medium text-red-400 hover:underline">Excluir</button>
                                    </div>
                                </td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>
        </div>
    );
};

export default UserManagement;