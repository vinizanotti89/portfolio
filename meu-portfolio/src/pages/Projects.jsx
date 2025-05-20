import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { initTypingBatch } from '../scripts/typingEffect';
import '../styles/pages/Projects.css';

//IMAGENS

// Linguagens
import javascriptIcon from '../assets/img/skills/js.png';
import htmlIcon from '../assets/img/skills/html.png';
import cssIcon from '../assets/img/skills/css.png';

// Frameworks
import reactIcon from '../assets/img/skills/react.png';
import nodejsIcon from '../assets/img/skills/nodejs.png';

// Databases
import mongodbIcon from '../assets/img/skills/mongodb.png';

// DevOps & Ferramentas
import viteIcon from '../assets/img/skills/vite.png';
import dockerIcon from '../assets/img/skills/docker.png';
import vercelIcon from '../assets/img/skills/vercel.png';
import prismaIcon from '../assets/img/skills/prisma.png';
import renderIcon from '../assets/img/skills/render.png';

//Imagens de projetos

//Painel Influenciadores
import Dashboard from '../assets/img/projects/painel-influenciadores/Dashboard.png';
import DashboardDark from '../assets/img/projects/painel-influenciadores/DashboardDark.png';
import Claims from '../assets/img/projects/painel-influenciadores/Claims.png';
import Analytics from '../assets/img/projects/painel-influenciadores/Analytics.png';
import Leaderboard from '../assets/img/projects/painel-influenciadores/Leaderboard.png';


//cadastro de usuarios
import loginOk from '../assets/img/projects/cadastro-usuarios/loginOk.png';
import loginBad from '../assets/img/projects/cadastro-usuarios/loginBad.png';
import newUser from '../assets/img/projects/cadastro-usuarios/newUser.png';
import selectAvatar from '../assets/img/projects/cadastro-usuarios/selectAvatar.png';
import changeAvatar from '../assets/img/projects/cadastro-usuarios/changeAvatar.png';
import dashboard from '../assets/img/projects/cadastro-usuarios/dashboard.png';

//Projeto Profissional
import telaInicio from '../assets/img/projects/projeto-profissional/telaInicio.png';
import carrossel1 from '../assets/img/projects/projeto-profissional/carrossel1.png';
import carrossel2 from '../assets/img/projects/projeto-profissional/carrossel2.png';
import carrosselVertical from '../assets/img/projects/projeto-profissional/carrosselVertical.png';
import modal from '../assets/img/projects/projeto-profissional/modal.png';
import contato from '../assets/img/projects/projeto-profissional/contato.png';

//Cronômetro
import contVoltas from '../assets/img/projects/cronometro/contVoltas.png';
import whiteTheme from '../assets/img/projects/cronometro/whiteTheme.png';
import exportInformation from '../assets/img/projects/cronometro/exportInformation.png';
import whiteMobile from '../assets/img/projects/cronometro/whiteMobile.png';
import darkMobile from '../assets/img/projects/cronometro/darkMobile.png';

//JokenPo
import startJP from '../assets/img/projects/jokenPo/start.png';
import winJP from '../assets/img/projects/jokenPo/win.png';
import loseJP from '../assets/img/projects/jokenPo/lose.png';
import drawJP from '../assets/img/projects/jokenPo/draw.png';
import endWinner from '../assets/img/projects/jokenPo/endWinner.png';
import endLoser from '../assets/img/projects/jokenPo/endLoser.png';

//MarioKart Bagunça Generalizada
import telaBagunca from '../assets/img/projects/marioKart/telaBagunca.png';
import contatoBagunca from '../assets/img/projects/marioKart/contatoBagunca.png';

//Sorteio de Números
import telaSorteio from '../assets/img/projects/sorteio-numeros/telaSorteio.png';
import resultado from '../assets/img/projects/sorteio-numeros/resultado.png';
import erroUsuario from '../assets/img/projects/sorteio-numeros/erroUsuario.png';

//Conversor de Moedas
import dolar from '../assets/img/projects/conversor-moedas/dolar.png';
import euro from '../assets/img/projects/conversor-moedas/euro.png';
import librasEsterlinas from '../assets/img/projects/conversor-moedas/librasEsterlinas.png';
import yene from '../assets/img/projects/conversor-moedas/yene.png';
import real from '../assets/img/projects/conversor-moedas/real.png';

const Projects = () => {
    const navigate = useNavigate();

    useEffect(() => {
        console.log("Projects component rendered");
        const typingConfigs = [
            {
                selector: '.projects-intro p',
                text: `Aqui você encontra alguns dos meus projetos mais recentes. Cada um deles representa um desafio único que me ajudou a crescer como desenvolvedor. Explore e descubra como transformo problemas em soluções criativas. 🚀✨`,
                duration: 3000
            }
        ];

        initTypingBatch(typingConfigs);

        // Adicione transição ao botão voltar
        const backButton = document.querySelector('.back-button');
        if (backButton) {
            backButton.addEventListener('mouseover', () => {
                backButton.style.transform = 'scale(1.05)';
                backButton.style.boxShadow = '0 0 15px var(--neon-purple), 0 0 25px #9d00ff5';
            });

            backButton.addEventListener('mouseout', () => {
                backButton.style.transform = '';
                backButton.style.boxShadow = '';
            });
        }

        return () => {
            if (backButton) {
                backButton.removeEventListener('mouseover', () => { });
                backButton.removeEventListener('mouseout', () => { });
            }
        };
    }, []);

    const [isImageModalOpen, setIsImageModalOpen] = useState(false);
    const [currentModalImage, setCurrentModalImage] = useState('');

    const openImageModal = (image) => {
        setCurrentModalImage(image);
        setIsImageModalOpen(true);
        document.body.style.overflow = 'hidden'; // Evita rolagem quando o modal está aberto
    };

    const closeImageModal = (e) => {
        if (e) {
            e.stopPropagation(); // Evita que o clique se propague
        }
        setIsImageModalOpen(false);
        document.body.style.overflow = 'auto'; // Restaura a rolagem
    };

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

    // Dados dos projetos
    const projects = [
        {
            id: 1,
            name: "Full Stack Painel Influenciadores",
            description: "Desenvolver uma plataforma completo que permitisse pesquisar e analisar influenciadores médicos com base em critérios de confiabilidade, número de seguidores, curtidas e quantidade de vídeos",
            images: [Dashboard, DashboardDark, Claims, Analytics, Leaderboard], 
            vercelLink: "https://painel-administrativo-influenciadores-d7h5.vercel.app/",
            githubLink: "https://github.com/vinizanotti89/influencers-frontend/",
            githubLink: "https://github.com/vinizanotti89/influencers-backend",
            youtubeLink: "https://youtu.be/hNf1EHZBeeg",
            difficulties: "Criar plataformas gratuitas integrando APIs gratuitas e servidor gratuito. Fazer tudo isso rodar sem delay é improvável",
            solutions: "Como não tive acesso à todas as principais plataformas, optei por usar YouTube, Instagram e LinkedIn como fornecedoras de informação, banco de dados MongDB e servidor AWS.",
            stack: [
                { icon: reactIcon, name: "React" },
                { icon: javascriptIcon, name: "JavaScript" },
                { icon: cssIcon, name: "CSS" },
                { icon: nodejsIcon, name: "Node.js" },
                { icon: mongodbIcon, name: "MongoDB" },
                { icon: viteIcon, name: "Vite" },
                { icon: vercelIcon, name: "Vercel" },
                { icon: dockerIcon, name: "Docker" }
            ]
        },
        {
            id: 2,
            name: "Full Stack Cadastro de Usuários / Dashboard",
            description: "Era pra ser só um projeto de curso, mas eu quis mais: criei uma aplicação funcional, com jeitão de produto real, pra mostrar que sei construir experiências de verdade.",
            images: [loginOk, loginBad, newUser, selectAvatar, changeAvatar, dashboard], 
            vercelLink: "https://fullstack-cadastro-usuarios.vercel.app/",
            githubLink: "https://github.com/vinizanotti89/fullstack-cadastro-usuarios",
            youtubeLink: "https://youtu.be/jgFAlLA98ZI",
            difficulties: "Mostrar centenas de avatares na tela? Sem chance. Tive que bolar outra ideia.",
            solutions: "Mostrei só alguns avatares por vez e criei um botão pra recarregar as opções. Depois, se quiser trocar de avatar, o usuário pode fazer isso direto pelo dashboard.",
            stack: [
                { icon: reactIcon, name: "React" },
                { icon: javascriptIcon, name: "JavaScript" },
                { icon: cssIcon, name: "CSS" },
                { icon: nodejsIcon, name: "Node.js" },
                { icon: mongodbIcon, name: "MongoDB" },
                { icon: viteIcon, name: "Vite" },
                { icon: vercelIcon, name: "Vercel" },
                { icon: prismaIcon, name: "Prisma" },
                { icon: renderIcon, name: "Render" }
            ]
        },
        {
            id: 3,
            name: "Projeto Proffisional",
            description: "Site institucional responsivo criado para a Elitte Group. Layout adaptativo, vídeos otimizados para cada tipo de tela e carrossel que muda dinamicamente de horizontal para vertical.",
            images: [telaInicio, carrossel1, carrossel2, carrosselVertical, modal, contato], 
            vercelLink: "https://elittegroup.vercel.app/",
            githubLink: "https://github.com/vinizanotti89/elittegroup",
            // youtubeLink: "https://youtu.be/jgFAlLA98ZI",
            difficulties: "Adaptar o carrossel para diferentes formatos de tela sem quebrar o layout foi o principal desafio.",
            solutions: "Dominei o funcionamento do carrossel, ajustei para diferentes resoluções e ainda ensinei a técnica para colegas em estudo.",
            stack: [
                { icon: javascriptIcon, name: "JavaScript" },
                { icon: htmlIcon, name: "HTML" },
                { icon: cssIcon, name: "CSS" }
            ]
        },
        {
            id: 4,
            name: "Cronômetro Completo",
            description: "Cronômetro evoluído, com gravação de voltas, troca de temas e exportação de dados em CSV, JSON e Texto Plano.",
            images: [contVoltas, whiteTheme, exportInformation, whiteMobile, darkMobile], 
            vercelLink: "https://cronometro-bay.vercel.app/",
            githubLink: "https://github.com/vinizanotti89/cronometro",
            //youtubeLink: "https://youtube.com/watch?v=seuVideo3",
            difficulties: "Aplicar temas dinâmicos e exportar as voltas de maneira organizada foram os principais desafios.",
            solutions: "Implementei botões super funcionais e entreguei uma experiência que vai além do que foi proposto inicialmente.",
            stack: [
                { icon: javascriptIcon, name: "JavaScript" },
                { icon: htmlIcon, name: "HTML" },
                { icon: cssIcon, name: "CSS" }
            ]
        },
        {
            id: 5,
            name: "Joken Pô",
            description: "Era só pra ser um joguinho simples, mas resolvi deixar mais legal: adicionei placar, animações e até final de partida pra ficar com cara de jogo de verdade.",
            images: [startJP, winJP, loseJP, drawJP, endWinner, endLoser], 
            vercelLink: "https://jokenpo-seven-beta.vercel.app/",
            githubLink: "https://github.com/vinizanotti89/jokenpo",
            //youtubeLink: "https://youtube.com/watch?v=seuVideo2",
            difficulties: "Sem limite de vitórias o jogo nunca acabava, podia ficar jogando pra sempre.",
            solutions: "Coloquei um limite de 5 vitórias e criei uma animação especial pra quando o jogo termina, com botão pra recomeçar se quiser.",
            stack: [
                { icon: javascriptIcon, name: "JavaScript" },
                { icon: htmlIcon, name: "HTML" },
                { icon: cssIcon, name: "CSS" }
            ]
        },
        {
            id: 6,
            name: "MarioKart Mini Portfolio",
            description: "Mini portfólio experimental inspirado no universo Mario Bros, com fundo em vídeo, links rápidos e muita criatividade solta ALEATORIAMENTE kkkk.",
            images: [telaBagunca, contatoBagunca], 
            vercelLink: "https://mariokart-six.vercel.app/",
            githubLink: "https://github.com/vinizanotti89/mariokart",
            youtubeLink: "https://youtu.be/VfTWlEa8v_o",
            difficulties: "Organizar (ou tentar pelo menos) múltiplos elementos animados sem poluir a experiência foi o principal desafio (e a principal bagunça).",
            solutions: "Implementei uma página funcional e divertida, focando mais em criatividade e liberdade de construção.",
            stack: [
                { icon: javascriptIcon, name: "JavaScript" },
                { icon: htmlIcon, name: "HTML" },
                { icon: cssIcon, name: "CSS" }
            ]
        },
        {
            id: 7,
            name: "Sorteio de Números",
            description: "Sorteador de Números com validação de entradas, exibição visual amigável e geração aleatória confiável.",
            images: [telaSorteio, resultado, erroUsuario], 
            vercelLink: "https://vercel.com/vinicius-zanottis-projects/sorteionumero",
            githubLink: "https://github.com/vinizanotti89/sorteionumero",
            //youtubeLink: "https://youtube.com/watch?v=seuVideo2",
            difficulties: "Entender como garantir aleatoriedade real e validar corretamente os dados digitados pelo usuário.",
            solutions: "Implementei lógica de verificação, telas de erro, e um sorteio 100% funcional mesmo com entrada maluca.",
            stack: [
                { icon: javascriptIcon, name: "JavaScript" },
                { icon: htmlIcon, name: "HTML" },
                { icon: cssIcon, name: "CSS" }
            ]
        },
        {
            id: 8,
            name: "Conversor de Moedas",
            description: "O Projeto Que Me Fez Acreditar Que Eu Podia Ser Dev",
            images: [dolar, euro, librasEsterlinas, yene, real], 
            vercelLink: "https://conversordemoedas-seven.vercel.app/",
            githubLink: "https://github.com/vinizanotti89/conversordemoedas",
            youtubeLink: "https://youtu.be/3fuaAt5NjHQ",
            difficulties: "Desafios com a integração da API de câmbio, formatação dos dados recebidos e criação de backgrounds visuais diferentes para cada moeda.",
            solutions: "Estudei bastante sobre consumo de APIs com JavaScript puro e desenvolvi uma lógica personalizada para aplicar um background temático a cada moeda convertida.",
            stack: [
                { icon: javascriptIcon, name: "JavaScript" },
                { icon: htmlIcon, name: "HTML" },
                { icon: cssIcon, name: "CSS" }
            ]
        },
       
    ];

    return (
        <div className="projects-container">
            <button
                className="projects-back-button"
                onClick={handleBackClick}
            >
                Voltar
            </button>

            <div className="projects-intro">
                <h1>MEUS PROJETOS</h1>
                <div className="intro-text-container">
                    <p></p>
                </div>
            </div>

            <div className="projects-grid">
                {projects.map((project, index) => (
                    <div
                        key={project.id}
                        className={`project-card ${index % 2 === 0 ? 'left-align' : 'right-align'}`}
                    >
                        <div className="project-content">
                            <div className="project-image-container">
                                <div className="project-images-grid">
                                    {project.images && project.images.map((image, i) => (
                                        <div key={i} className="project-image-wrapper" onClick={() => openImageModal(image)}>
                                            <img
                                                src={image}
                                                className="project-screenshot"
                                            />
                                            <div className="image-overlay">
                                                <span className="view-icon">🔍</span>
                                            </div>
                                        </div>
                                    ))}
                                </div>
                            </div>

                            {/* Modal para imagem ampliada */}
                            {isImageModalOpen && (
                                <div className="image-modal-overlay" onClick={closeImageModal}>
                                    <div className="image-modal">
                                        <button className="close-modal" onClick={closeImageModal}>✖</button>
                                        <img src={currentModalImage} className="modal-image" />
                                    </div>
                                </div>
                            )}

                            <div className="project-info">
                                <h2>{project.name}</h2>
                                <p className="project-description">{project.description}</p>

                                <div className="project-links">
                                    <a href={project.vercelLink} target="_blank" rel="noopener noreferrer" className="project-link vercel-link">
                                        Veja Online
                                    </a>
                                    <a href={project.githubLink} target="_blank" rel="noopener noreferrer" className="project-link github-link">
                                        Código Fonte
                                    </a>
                                    {project.youtubeLink && (
                                        <a href={project.youtubeLink} target="_blank" rel="noopener noreferrer" className="project-link youtube-link">
                                            Vídeo Explicação
                                        </a>
                                    )}
                                </div>
                            </div>
                        </div>

                        <div className="project-details">
                            <div className="project-section">
                                <h3>Dificuldades Enfrentadas</h3>
                                <p>{project.difficulties}</p>
                            </div>

                            <div className="project-section">
                                <h3>Soluções Criativas</h3>
                                <p>{project.solutions}</p>
                            </div>

                            <div className="project-section tech-section">
                                <h3>Stack Utilizada</h3>
                                <div className="tech-stack">
                                    {project.stack.map((tech, i) => (
                                        <img
                                            key={i}
                                            src={tech.icon}
                                            title={tech.name}
                                            className="tech-icon"
                                        />
                                    ))}
                                </div>
                            </div>
                        </div>
                    </div>
                ))}
            </div>
        </div>
    );
};

export default Projects;