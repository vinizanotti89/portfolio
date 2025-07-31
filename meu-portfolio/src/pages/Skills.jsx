import { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { initTypingBatch } from '../scripts/typingEffect';
import '../styles/pages/Skills.css';

// Linguagens
import javascriptIcon from '../assets/img/skills/js.png';
import htmlIcon from '../assets/img/skills/html.png';
import cssIcon from '../assets/img/skills/css.png';
import tailwindIcon from '../assets/img/skills/tailwind.png';
import typescriptIcon from '../assets/img/skills/typescript.png';
import swiftIcon from '../assets/img/skills/swift.jpg';
import pythonIcon from '../assets/img/skills/python.png';


// Frameworks
import reactIcon from '../assets/img/skills/react.png';
import nodejsIcon from '../assets/img/skills/nodejs.png';
import bootstrapIcon from '../assets/img/skills/bootstrap.png';

// Databases
import mongodbIcon from '../assets/img/skills/mongodb.png';
import postgreIcon from '../assets/img/skills/postgre.png';
import mysqlIcon from '../assets/img/skills/mysql.png';
import oracleIcon from '../assets/img/skills/oracle.png';
import sqlServerIcon from '../assets/img/skills/sqlserver.png';

// DevOps & Ferramentas
import visualStudioCodeIcon from '../assets/img/skills/vscode.png';
import githubIcon from '../assets/img/skills/github.png';
import gitIcon from '../assets/img/skills/git.png';
import viteIcon from '../assets/img/skills/vite.png';
import dockerIcon from '../assets/img/skills/docker.png';
import vercelIcon from '../assets/img/skills/vercel.png';
import prismaIcon from '../assets/img/skills/prisma.png';
import renderIcon from '../assets/img/skills/render.png';
import ciCdIcon from '../assets/img/skills/ci-cd.png';
import awsIcon from '../assets/img/skills/aws.png';
import azureIcon from '../assets/img/skills/azure.png';




const Skills = () => {
    const navigate = useNavigate();

    useEffect(() => {
        console.log("Skills component rendered");
        const typingConfigs = [
            {
                selector: '.languages h2',
                text: 'Linguagens de Programação',
                duration: 1500
            },
            {
                selector: '.frameworks h2',
                text: 'Bibliotecas & Frameworks',
                duration: 1500
            },
            {
                selector: '.databases h2',
                text: 'Banco de Dados',
                duration: 1500
            },
            {
                selector: '.tools h2',
                text: 'DevOps & Ferramentas',
                duration: 1500
            },
        ];

        initTypingBatch(typingConfigs);

        // Efeito de hover para o botão voltar
        const backButton = document.querySelector('.back-button');
        if (backButton) {
            backButton.addEventListener('mouseover', () => {
                backButton.style.transform = 'scale(1.05)';
                backButton.style.boxShadow = '0 0 15px #ff6700, 0 0 25px #ff6705';
            });

            backButton.addEventListener('mouseout', () => {
                backButton.style.transform = '';
                backButton.style.boxShadow = '';
            });
        }

        // Efeito de aparecimento para os ícones de skills
        const skillItems = document.querySelectorAll('.skill-item');
        skillItems.forEach((item, index) => {
            setTimeout(() => {
                item.classList.add('visible');
            }, 1000 + (index * 100)); // Delay progressivo para cada item
        });

        // Função de limpeza para remover os event listeners
        return () => {
            if (backButton) {
                backButton.removeEventListener('mouseover', () => { });
                backButton.removeEventListener('mouseout', () => { });
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
                className="skills-back-button"
                onClick={handleBackClick}
            >
                Voltar
            </button>

            <div className="skills-content">
                {/* Seção 1 - Linguagens de Programação */}
                <div className="skills-section languages left-align">
                    <h2></h2>
                    <div className="skills-grid">
                        <div className="skill-item">
                            <div className="skill-icon">
                                <img src={javascriptIcon} alt="JavaScript" />
                                <span className="placeholder-img"></span>
                            </div>
                            <p>JavaScript</p>
                        </div>
                        <div className="skill-item">
                            <div className="skill-icon">
                                <img src={htmlIcon} alt="HTML5" />
                                <span className="placeholder-img"></span>
                            </div>
                            <p>HTML5</p>
                        </div>
                        <div className="skill-item">
                            <div className="skill-icon">
                                <img src={cssIcon} alt="CSS3" />
                                <span className="placeholder-img"></span>
                            </div>
                            <p>CSS3</p>
                        </div>
                        <div className="skill-item">
                            <div className="skill-icon">
                                <img src={tailwindIcon} alt="Tailwind" />
                                <span className="placeholder-img"></span>
                            </div>
                            <p>Tailwind</p>
                        </div>
                        <div className="skill-item">
                            <div className="skill-icon">
                                <img src={typescriptIcon} alt="TypeScript" />
                                <span className="placeholder-img"></span>
                            </div>
                            <p>TypeScript</p>
                        </div>
                        <div className="skill-item">
                            <div className="skill-icon">
                                <img src={swiftIcon} alt="Python" />
                                <span className="placeholder-img"></span>
                            </div>
                            <p>Swift</p>
                        </div>
                        <div className="skill-item">
                            <div className="skill-icon">
                                <img src={pythonIcon} alt="Python" />
                                <span className="placeholder-img"></span>
                            </div>
                            <p>Python</p>
                        </div>
                    </div>
                </div>

                {/* Seção 2 - Bibliotecas e Frameworks */}
                <div className="skills-section frameworks right-align">
                    <h2></h2>
                    <div className="skills-grid">
                        <div className="skill-item">
                            <div className="skill-icon">
                                <img src={reactIcon} alt="React" />
                                <span className="placeholder-img"></span>
                            </div>
                            <p>React</p>
                        </div>
                        <div className="skill-item">
                            <div className="skill-icon">
                                <img src={nodejsIcon} alt="Node.js" />
                                <span className="placeholder-img"></span>
                            </div>
                            <p>Node.js</p>
                        </div>
                        <div className="skill-item">
                            <div className="skill-icon">
                                <img src={bootstrapIcon} alt="Bootstrap" />
                                <span className="placeholder-img"></span>
                            </div>
                            <p>Bootstrap</p>
                        </div>
                    </div>
                </div>

                {/* Seção 3 - Banco de Dados */}
                <div className="skills-section databases left-align">
                    <h2></h2>
                    <div className="skills-grid">
                        <div className="skill-item">
                            <div className="skill-icon">
                                <img src={mongodbIcon} alt="MongoDB" />
                                <span className="placeholder-img"></span>
                            </div>
                            <p>MongoDB</p>
                        </div>
                        <div className="skill-item">
                            <div className="skill-icon">
                                <img src={postgreIcon} alt="PostgreSQL" />
                                <span className="placeholder-img"></span>
                            </div>
                            <p>PostgreSQL</p>
                        </div>
                        <div className="skill-item">
                            <div className="skill-icon">
                                <img src={mysqlIcon} alt="MySQL" />
                                <span className="placeholder-img"></span>
                            </div>
                            <p>MySQL</p>
                        </div>
                        <div className="skill-item">
                            <div className="skill-icon">
                                <img src={oracleIcon} alt="oracle" />
                                <span className="placeholder-img"></span>
                            </div>
                            <p>Oracle</p>
                        </div>
                        <div className="skill-item">
                            <div className="skill-icon">
                                <img src={sqlServerIcon} alt="SQL Server" />
                                <span className="placeholder-img"></span>
                            </div>
                            <p>SQL Server</p>
                        </div>
                    </div>
                </div>

                {/* Seção 4 - DevOps & Ferramentas */}
                <div className="skills-section tools right-align">
                    <h2></h2>
                    <div className="skills-grid">
                        <div className="skill-item">
                            <div className="skill-icon">
                                <img src={visualStudioCodeIcon} alt="Visual Studio Code" />
                                <span className="placeholder-img"></span>
                            </div>
                            <p>Visual Studio Code</p>
                        </div>
                        <div className="skill-item">
                            <div className="skill-icon">
                                <img src={githubIcon} alt="GitHub" />
                                <span className="placeholder-img"></span>
                            </div>
                            <p>GitHub</p>
                        </div>
                        <div className="skill-item">
                            <div className="skill-icon">
                                <img src={gitIcon} alt="Git" />
                                <span className="placeholder-img"></span>
                            </div>
                            <p>Git</p>
                        </div>
                        <div className="skill-item">
                            <div className="skill-icon">
                                <img src={viteIcon} alt="Vite" />
                                <span className="placeholder-img"></span>
                            </div>
                            <p>Vite</p>
                        </div>
                        <div className="skill-item">
                            <div className="skill-icon">
                                <img src={dockerIcon} alt="Docker" />
                                <span className="placeholder-img"></span>
                            </div>
                            <p>Docker</p>
                        </div>
                        <div className="skill-item">
                            <div className="skill-icon">
                                <img src={vercelIcon} alt="Vercel" />
                                <span className="placeholder-img"></span>
                            </div>
                            <p>Vercel</p>
                        </div>
                        <div className="skill-item">
                            <div className="skill-icon">
                                <img src={prismaIcon} alt="Prisma" />
                                <span className="placeholder-img"></span>
                            </div>
                            <p>Prisma</p>
                        </div>
                        <div className="skill-item">
                            <div className="skill-icon">
                                <img src={renderIcon} alt="Render" />
                                <span className="placeholder-img"></span>
                            </div>
                            <p>Render</p>
                        </div>
                        <div className="skill-item">
                            <div className="skill-icon">
                                <img src={ciCdIcon} alt="CI/CD" />
                                <span className="placeholder-img"></span>
                            </div>
                            <p>CI/CD</p>
                        </div>
                        <div className="skill-item">
                            <div className="skill-icon">
                                <img src={awsIcon} alt="AWS" />
                                <span className="placeholder-img"></span>
                            </div>
                            <p>AWS</p>
                        </div>
                        <div className="skill-item">
                            <div className="skill-icon">
                                <img src={azureIcon} alt="Azure" />
                                <span className="placeholder-img"></span>
                            </div>
                            <p>Azure</p>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Skills;