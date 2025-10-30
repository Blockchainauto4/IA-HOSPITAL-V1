import React from 'react';

const blogPosts = [
    {
        title: 'IA na Saúde: 5 Mitos e Verdades',
        excerpt: 'A inteligência artificial está transformando a medicina, mas o que é fato e o que é ficção? Desvendamos os principais mitos...',
        imageUrl: `https://images.unsplash.com/photo-1504439218292-6011409f5835?q=80&w=800&auto=format&fit=crop`,
        author: 'Dr. IA',
        date: '10 de Julho, 2024',
    },
    {
        title: 'Como se Preparar para uma Teleconsulta',
        excerpt: 'Maximize a eficiência da sua consulta online com estas dicas simples e práticas. Garanta que você e seu médico aproveitem ao máximo...',
        imageUrl: `https://images.unsplash.com/photo-1584515933413-149c42463f25?q=80&w=800&auto=format&fit=crop`,
        author: 'Equipe Hospital IA',
        date: '05 de Julho, 2024',
    },
    {
        title: 'Entendendo a Triagem com Assistente Virtual',
        excerpt: 'Saiba como nossa IA realiza a triagem inicial, quais os benefícios para o paciente e como isso agiliza o atendimento médico.',
        imageUrl: `https://images.unsplash.com/photo-1612198039233-6d7c6035a133?q=80&w=800&auto=format&fit=crop`,
        author: 'Dr. IA',
        date: '01 de Julho, 2024',
    },
     {
        title: 'Privacidade de Dados no Setor de Saúde Digital',
        excerpt: 'Sua segurança é nossa prioridade. Entenda as medidas que tomamos para proteger suas informações em cada etapa do processo.',
        imageUrl: `https://images.unsplash.com/photo-1550643442-f54b638843c0?q=80&w=800&auto=format&fit=crop`,
        author: 'Equipe de Segurança',
        date: '25 de Junho, 2024',
    }
];

const BlogPostCard: React.FC<typeof blogPosts[0]> = ({ title, excerpt, imageUrl, author, date }) => (
    <div className="bg-gray-800 border border-gray-700 rounded-lg overflow-hidden flex flex-col group">
        <img src={imageUrl} alt={title} className="h-48 w-full object-cover group-hover:opacity-80 transition-opacity" />
        <div className="p-6 flex flex-col flex-grow">
            <h3 className="text-xl font-bold text-white mb-2 group-hover:text-cyan-400 transition-colors">{title}</h3>
            <p className="text-gray-400 mb-4 flex-grow">{excerpt}</p>
            <div className="mt-auto pt-4 border-t border-gray-700 flex items-center justify-between text-sm text-gray-500">
                <span>Por <strong>{author}</strong></span>
                <span>{date}</span>
            </div>
        </div>
    </div>
);


const BlogScreen: React.FC = () => {
    return (
        <div className="min-h-screen text-white p-4 sm:p-6 md:p-8">
            <div className="max-w-6xl mx-auto">
                <header className="text-center mb-12">
                    <h1 className="text-5xl font-extrabold text-cyan-400 mb-4">Blog do Hospital IA</h1>
                    <p className="text-xl text-gray-300">
                        Artigos e novidades sobre saúde, tecnologia e bem-estar.
                    </p>
                </header>

                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-2 gap-8">
                    {blogPosts.map((post, index) => (
                        <BlogPostCard key={index} {...post} />
                    ))}
                </div>
                 <footer className="mt-12 text-center text-gray-500">
                    <p>&copy; {new Date().getFullYear()} Hospital IA. Todos os direitos reservados.</p>
                </footer>
            </div>
        </div>
    );
};

export default BlogScreen;
