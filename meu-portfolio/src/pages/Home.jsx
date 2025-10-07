import { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import '../styles/pages/Home.css';

const Home = () => {
  const navigate = useNavigate();

  useEffect(() => {
    console.log("Home montada — iniciando efeitos diretamente no componente");

    const menuTexts = {
      sobre: { initial: "Sobre Mimimimmm", final: "Sobre Mim" },
      projetos: { initial: "ProGÉTO$", final: "Projetos" },
      formacao: { initial: "Form@c:Ao", final: "Formação" },
      skills: { initial: "kill- OPS", final: "Skills" }
    };

    function typeEffect(element, fullText, cb, keepText = true) {
      if (!element) return;
      const original = element.textContent;
      element.innerHTML = '';
      let i = 0;
      function type() {
        if (i <= fullText.length) {
          element.innerHTML = `<span class="cursor">${fullText.slice(0, i)}</span>`;
          i++;
          setTimeout(type, 80);
        } else {
          setTimeout(() => {
            element.innerHTML = keepText ? fullText : original;
            cb?.();
          }, 600);
        }
      }
      type();
    }

    function glitchEffect(element, wrong, right) {
      if (!element) return;
      typeEffect(element, wrong, () => {
        let glitchRounds = 3;
        function shuffle(str) {
          const arr = str.split('');
          for (let i = arr.length - 1; i > 0; i--) {
            const j = Math.floor(Math.random() * (i + 1));
            [arr[i], arr[j]] = [arr[j], arr[i]];
          }
          return arr.join('');
        }

        function glitchStep() {
          if (glitchRounds > 0) {
            element.innerHTML = `<span class="cursor">${shuffle(wrong)}</span>`;
            glitchRounds--;
            setTimeout(glitchStep, 150);
          } else {
            typeEffect(element, right, () => {
              element.innerHTML = right;
            }, true);
          }
        }

        setTimeout(glitchStep, 600);
      }, true);
    }

    function heroTypingEffect() {
      const el = document.querySelector('.hero-box p');
      if (el) {
        const text = 'Desenvolvedor Full-Stack apaixonado por soluções criativas e eficientes';
        typeEffect(el, text, null, true);
      }
    }

    function menuGlitchEffects() {
      const elements = {
        sobre: document.querySelector('.menu-sobre h2'),
        projetos: document.querySelector('.menu-projetos h2'),
        formacao: document.querySelector('.menu-formacao h2'),
        skills: document.querySelector('.menu-skills h2')
      };

      let delay = 0;
      Object.keys(menuTexts).forEach(key => {
        setTimeout(() => {
          glitchEffect(elements[key], menuTexts[key].initial, menuTexts[key].final);
        }, delay);
        delay += 600;
      });
    }

    function footerTypingEffect() {
      const langs = ['JavaScript', 'React', 'TypeScript', 'Python', 'Node.js', 'Swift', 'Bootstrap', 'Git', 'GitHub', 'MongoDB', 'SQL', 'Oracle', 'HTML', 'CSS', 'Vite'];
      const target = document.querySelector('.typing-langs');
      if (!target) return;

      let index = 0;
      let typed = [];

      function typeLang(lang, cb) {
        let i = 0;
        function typeChar() {
          if (i <= lang.length) {
            target.innerHTML = [...typed, `<span class="cursor">${lang.slice(0, i)}</span>`].join(' • ');
            i++;
            setTimeout(typeChar, 80);
          } else {
            typed.push(lang);
            cb?.();
          }
        }
        typeChar();
      }

      function eraseLangs(cb) {
        let i = typed.length;
        function erase() {
          if (i >= 0) {
            target.innerHTML = typed.slice(0, i).join(' • ') + ' <span class="cursor"></span>';
            i--;
            setTimeout(erase, 40);
          } else {
            typed = [];
            cb?.();
          }
        }
        erase();
      }

      function loop() {
        if (index < langs.length) {
          typeLang(langs[index], () => {
            index++;
            setTimeout(loop, 400);
          });
        } else {
          setTimeout(() => {
            eraseLangs(() => {
              index = 0;
              loop();
            });
          }, 2500);
        }
      }

      loop();
    }

    // Orquestrador geral
    function startAll() {
      heroTypingEffect();
      setTimeout(menuGlitchEffects, 1000);
      footerTypingEffect();
    }

    // Tenta iniciar com até 10 tentativas
    let attempts = 0;
    function tryStart() {
      const hero = document.querySelector('.hero-box p');
      const menus = document.querySelectorAll('.menu-box h2');
      const footer = document.querySelector('.typing-langs');
      if (hero && menus.length && footer) {
        startAll();
      } else if (attempts < 10) {
        attempts++;
        setTimeout(tryStart, 200);
      } else {
        console.warn("Elementos incompletos após 10 tentativas.");
        startAll(); // tenta rodar com o que tiver
      }
    }

    tryStart();

    // Opcional: retornar função de cleanup se usar timeouts/intervals com clear
    return () => {
      console.log("Cleanup de efeitos aqui, se necessário futuramente");
    };
  }, []);

  const handleMenuClick = (path) => {
    console.log(`Clique no menu detectado. Navegando para: ${path}`);

    // Adicione a classe para animação
    const menuBoxes = document.querySelectorAll('.menu-box');
    menuBoxes.forEach(box => box.classList.add('clicked'));

    // Determine a direção da transição com base no path
    let direction;

    // Define direções específicas para cada página
    switch (path) {
      case '/sobre':
        direction = 'right';
        break;
      case '/projetos':
        direction = 'left';
        break;
      case '/formacao':
        direction = 'right';
        break;
      case '/skills':
        direction = 'left';
        break;
      default:
        direction = 'left';
    }

    // Use a nova função de transição e depois navegue
    if (window.performPageTransition) {
      window.performPageTransition(direction, path).then(() => {
        navigate(path);
      });
    } else {
      // Fallback caso a função não esteja disponível
      setTimeout(() => {
        console.log(`Tempo expirado, navegando agora para: ${path}`);
        navigate(path);
      }, 600);
    }
  };


  return (
    <main>
      <section className="hero-box">
        <h1>Vinícius Zanotti</h1>
        <p></p> {/* Aqui o efeito de digitação entra */}
      </section>

      <section className="menu-row">
        <div className="menu-box menu-sobre" onClick={() => handleMenuClick('/sobre')}>
          <h2>Sobre Mim</h2>
          <p>Quem sou, trajetória e motivações</p>
        </div>
        <div className="menu-box menu-projetos" onClick={() => handleMenuClick('/projetos')}>
          <h2>Projetos</h2>
          <p>Veja os trabalhos que desenvolvi</p>
        </div>
        <div className="menu-box menu-formacao" onClick={() => handleMenuClick('/formacao')}>
          <h2>Formação</h2>
          <p>Formação acadêmica e especializações</p>
        </div>
        <div className="menu-box menu-skills" onClick={() => handleMenuClick('/skills')}>
          <h2>Skills</h2>
          <p>Minhas ferramentas, stacks e linguagens</p>
        </div>
      </section>

      <div className="typing-footer">
        <span className="typing-langs"></span>
      </div>
    </main>
  );
};

export default Home;