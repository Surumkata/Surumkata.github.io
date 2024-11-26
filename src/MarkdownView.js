import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';  // Para acessar os parâmetros da URL
import { marked } from 'marked';  // Para converter o markdown em HTML
import './MarkdownView.css';

const MarkdownView = () => {
    const { markdown_file } = useParams();  // Obtém o nome do arquivo da URL
    const [content, setContent] = useState("");  // Estado para armazenar o conteúdo do markdown
    const [loading, setLoading] = useState(true);  // Estado de loading

    // UseEffect para carregar o markdown quando o componente é montado ou a URL mudar
    useEffect(() => {
        const loadMarkdown = async () => {
            setLoading(true);  // Começa o carregamento
            try {
                const response = await fetch(`/data/projects/${markdown_file}`);
                const text = await response.text();  // Obtém o texto do arquivo markdown
                setContent(text);  // Atualiza o conteúdo
            } catch (error) {
                setContent("Erro ao carregar o projeto.");  // Se algo der errado
            }
            setLoading(false);  // Finaliza o carregamento
        };

        loadMarkdown();
    }, [markdown_file]);  // Recarrega quando o parâmetro mudar

    // Converte o conteúdo markdown para HTML
    const renderedContent = marked(content);

    return (
        <div
            style={{
                padding: '20px',
                maxWidth: '900px',
                margin: '0 auto',
                backgroundColor: '#fff',
                borderRadius: '8px',
                boxShadow: '0 4px 6px rgba(0, 0, 0, 0.1)',
                overflowY: 'auto',
                height: '100vh',
            }}
            className='markdown-view'
        >
            {loading ? (
                <p>Carregando...</p>  // Exibe enquanto carrega
            ) : (
                <div
                    dangerouslySetInnerHTML={{ __html: renderedContent }}  // Renderiza o HTML gerado
                />
            )}
        </div>
    );
};

export default MarkdownView;
