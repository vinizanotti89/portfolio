import { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { initTypingBatch } from '../scripts/typingEffect';
import '../styles/pages/About.css';

import familyPhoto from '../assets/img/family-photo.jpeg';

const About = () => {
    const navigate = useNavigate();

    useEffect(() => {
        console.log("About component rendered");
        const typingConfigs = [
            {
                selector: '.essence p',
                text: `A base de tudo que sou começa e termina com minha família. É onde me encontro, me fortaleço e me inspiro. Minha fé também é parte essencial do meu ser — sem Deus, nada disso seria possível. Renovar minha energia na igreja todo fim de semana é como reiniciar o sistema com propósito e amor. 🙏❤️`,
                duration: 3000
            },
            {
                selector: '.likes p',
                text: `Sou movido por tecnologia, café forte e boa música — de preferência com guitarras distorcidas. 🎸 Curto cozinhar, fazer aquele churrasco raiz, mergulhar em games e maratonar uns bons filmes e séries. Mas o que realmente expande minha mente é brincar com meu filho — ele ativa meu modo criativo como ninguém. E claro, programar pensando totalmente fora da caixinha: se é óbvio demais, não me serve. 🚀`,
                duration: 3000
            },
            {
                selector: '.journey p',
                text: `Por muito tempo, não entendi meu jeito intenso e acelerado de viver — até conhecer o TDAH. Hoje, vejo isso como parte do meu superpoder: um hiperfoco poderoso que me ajuda a enxergar soluções onde antes via obstáculos. Minha mente funciona diferente, e é exatamente isso que faz tudo isso ser possível. ⚡🧠`,
                duration: 3000
            },
            {
                selector: '.superpowers p',
                text: `<span class="keyword">const</span> <span class="variable">devProfile</span> <span class="operator">=</span> <span class="bracket">{</span><br/>
&nbsp;&nbsp;<span class="property">superPoderes</span>: <span class="bracket">[</span><br/>
&nbsp;&nbsp;&nbsp;&nbsp;"<span class="string">criatividade que não cabe em wireframes ✨</span>",<br/>
&nbsp;&nbsp;&nbsp;&nbsp;"<span class="string">hiperfoco ativado: dark mode + Ritalina 💊🚀</span>",<br/>
&nbsp;&nbsp;&nbsp;&nbsp;"<span class="string">intensidade emocional com commit diário 💥</span>"<br/>
&nbsp;&nbsp;<span class="bracket">]</span>,<br/>
&nbsp;&nbsp;<span class="property">bugsConhecidos</span>: <span class="bracket">[</span><br/>
&nbsp;&nbsp;&nbsp;&nbsp;"<span class="string">UI caótica com lógica de outro plano 🧩</span>",<br/>
&nbsp;&nbsp;&nbsp;&nbsp;"<span class="string">teimosia com breakpoint de resiliência 😅</span>",<br/>
&nbsp;&nbsp;&nbsp;&nbsp;"<span class="string">overthinking sem limite de stack 🤯</span>"<br/>
&nbsp;&nbsp;<span class="bracket">]</span>,<br/>
&nbsp;&nbsp;<span class="property">modoDeDebug</span>: <span class="keyword">() =></span> <span class="bracket">{</span><br/>
&nbsp;&nbsp;&nbsp;&nbsp;<span class="function">console</span>.<span class="method">log</span>(<span class="string">"Pensando fora da caixa... e do componente."</span>);<br/>
&nbsp;&nbsp;<span class="bracket">}</span><br/>
<span class="bracket">}</span>;`,
                duration: 5000
            },
        ];

        initTypingBatch(typingConfigs);

        // Adicione transição ao botão voltar
        const backButton = document.querySelector('.back-button');
        if (backButton) {
            backButton.addEventListener('mouseover', () => {
                backButton.style.transform = 'scale(1.05)';
                backButton.style.boxShadow = '0 0 15px #0ff, 0 0 25px #0ff5';
            });

            backButton.addEventListener('mouseout', () => {
                backButton.style.transform = '';
                backButton.style.boxShadow = '';
            });
        }

        // ===== INÍCIO DAS CONFIGURAÇÕES DE PROTEÇÃO DE IMAGEM =====

        // Desabilitar o menu de contexto (botão direito) para a foto
        const familyPhotoEl = document.querySelector('.family-photo');
        if (familyPhotoEl) {
            familyPhotoEl.addEventListener('contextmenu', (e) => {
                e.preventDefault();
                return false;
            });
        }

        // Desabilitar atalhos de teclado comuns para print e salvar
        const handleKeyDown = (e) => {
            // Ctrl+S (salvar), Ctrl+P (imprimir), PrintScreen
            if ((e.ctrlKey && (e.key === 's' || e.key === 'p')) || e.key === 'PrintScreen') {
                e.preventDefault();
                return false;
            }
        };

        document.addEventListener('keydown', handleKeyDown);

        // Bloquear drag and drop da imagem
        const imgElement = document.querySelector('.family-photo img');
        if (imgElement) {
            imgElement.addEventListener('dragstart', (e) => {
                e.preventDefault();
                return false;
            });
        }

        // Aviso de proteção ao tentar copiar
        const handleCopy = (e) => {
            // Apenas se o alvo estiver dentro do container da foto
            if (e.target.closest('.family-photo-container')) {
                e.preventDefault();
                console.log('Cópia de conteúdo protegido bloqueada');
                return false;
            }
        };

        document.addEventListener('copy', handleCopy);

        // ===== FIM DAS CONFIGURAÇÕES DE PROTEÇÃO DE IMAGEM =====

        // Função de limpeza para remover os event listeners quando o componente for desmontado
        return () => {
            if (backButton) {
                backButton.removeEventListener('mouseover', () => { });
                backButton.removeEventListener('mouseout', () => { });
            }

            document.removeEventListener('keydown', handleKeyDown);
            document.removeEventListener('copy', handleCopy);

            if (familyPhotoEl) {
                familyPhotoEl.removeEventListener('contextmenu', () => { });
            }

            if (imgElement) {
                imgElement.removeEventListener('dragstart', () => { });
            }
        };
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
        <div className="about-container">
            <button
                className="about-back-button"
                onClick={handleBackClick}
            >
                Voltar
            </button>

            {/* Foto de família com proteção */}
            <div className="family-photo-container">
                <div className="family-photo">
                    <img
                        src={familyPhoto}
                        alt="Minha família"
                        onContextMenu={(e) => e.preventDefault()}
                        draggable="false"
                    />
                    {/* Elemento invisível que cobre a imagem para proteção adicional */}
                    <div className="photo-protection-overlay"></div>
                </div>
            </div>

            {/* Conteúdo em layout alternado vertical */}
            <div className="about-content">
                {/* Seção 1 - Lado esquerdo */}
                <div className="about-section essence left-align">
                    <h2>Essência</h2>
                    <p></p>
                </div>

                {/* Seção 2 - Lado direito */}
                <div className="about-section likes right-align">
                    <h2>O que eu curto</h2>
                    <p></p>
                </div>

                {/* Seção 3 - Lado esquerdo */}
                <div className="about-section journey left-align">
                    <h2>Minha jornada</h2>
                    <p></p>
                </div>

                {/* Seção 4 - Lado direito */}
                <div className="about-section superpowers right-align big-box">
                    <h2>Superpoderes e bugs</h2>
                    <p></p>
                </div>
            </div>
        </div>
    );
};

export default About;