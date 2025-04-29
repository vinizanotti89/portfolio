import { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { initTypingBatch } from '../scripts/typingEffect';
import '../styles/pages/Formation.css';

export default function Formation() {
    const navigate = useNavigate();

    useEffect(() => {
        const typingConfigs = [
          {
            selector: '.formation-title-1',
            text: '📚 Formação Acadêmica',
            duration: 1500
          },
          {
            selector: '.formation-academic p',
            text: `
      <strong>Engenharia da Computação</strong> – Universidade Norte do Paraná – <em>Junho/2013</em><br/>
      <strong>MBA Gestão Empresarial</strong> – Universidade Tuiuti do Paraná – <em>Abril/2022</em>`,
            duration: 2500
          },
          {
            selector: '.formation-title-2',
            text: '💻 Cursos Complementares',
            duration: 1500
          },
          {
            selector: '.formation-courses p',
            text: `
      <strong>Programação FullStack</strong> – DevClub – <em>Outubro/2024</em><br/>
      <strong>Introdução ao Python</strong> – Banco Santander – <em>Março/2025</em><br/>
      <strong>Programação Java JSE</strong> – Adetec – <em>Junho/2012</em>`,
            duration: 2500
          },
          {
            selector: '.formation-title-3',
            text: '🌐 Idiomas',
            duration: 1000
          },
          {
            selector: '.formation-language p',
            text: `
      <strong>Inglês</strong> – Desenvolvido na prática, com foco em leitura técnica e conversação.</em><br/>
      <strong>Espanhol</strong> - No básico da prática, mas já consigo me virar bem com docs e idéias.</em>
      `,
            duration: 1500
          }
        ];
      
        initTypingBatch(typingConfigs); 
        
      
        // Efeito botão voltar
        const backButton = document.querySelector('.back-button');
        if (backButton) {
          backButton.addEventListener('mouseover', () => {
            backButton.style.transform = 'scale(1.05)';
            backButton.style.boxShadow = '0 0 15px rgb(197, 191, 8), 0 0 25px #fcf403';
          });
      
          backButton.addEventListener('mouseout', () => {
            backButton.style.transform = '';
            backButton.style.boxShadow = '';
          });
        }
      }, []);

      const handleBackClick = () => {
        console.log("Botão voltar clicado");

        // Use a função de transição se disponível
        if (window.performPageTransition) {
            window.performPageTransition('left', '/').then(() => {
                navigate('/');
            });
        } else {
            navigate('/');
        }
    };

    return (
        <>
          <button
            className="formation-back-button"
            onClick={handleBackClick}
          >
            Voltar
          </button>
      
          <section className="formation-section">
            {/* Div 1 - Esquerda */}
            <div className="formation-block left">
              <h2 className="formation-title formation-title-1"></h2>
              <div className="formation-content formation-academic">
                <p></p>
              </div>
            </div>
      
            {/* Div 2 - Direita */}
            <div className="formation-block right">
              <h2 className="formation-title formation-title-2"></h2>
              <div className="formation-content formation-courses">
                <p></p>
              </div>
            </div>
      
            {/* Div 3 - Esquerda */}
            <div className="formation-block left">
              <h2 className="formation-title formation-title-3"></h2>
              <div className="formation-content formation-language">
                <p></p>
              </div>
            </div>
          </section>
        </>
      );
}