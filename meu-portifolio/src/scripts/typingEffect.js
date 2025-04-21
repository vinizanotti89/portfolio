document.addEventListener('DOMContentLoaded', () => {
    const targets = [
        { selector: '.hero-box p', text: 'Desenvolvedor Full-Stack apaixonado por soluções criativas e eficientes' },
        { selector: '.menu-sobre h2', initial: 'Sobre Mimmmm', final: 'Sobre Mim' },
        { selector: '.menu-projetos h2', initial: 'ProjETO$', final: 'Projetos' },
        { selector: '.menu-formacao h2', initial: 'Formac:Ao', final: 'Formação' },
        { selector: '.menu-skills h2', initial: 'kill- OPS', final: 'Skills' },
        { selector: '.menu-contato h2', initial: 'Contcto', final: 'Contato' }
    ];



    function typeEffect(element, fullText, cb) {
        let index = 0;
        function type() {
            if (index <= fullText.length) {
                element.innerHTML = `<span class="cursor">${fullText.slice(0, index)}</span>`;
                index++;
                setTimeout(type, 80);
            } else if (cb) {
                cb();
            }
        }
        type();
    }


    function glitchEffect(element, wrongText, finalText, cb) {
        typeEffect(element, wrongText, () => {
            setTimeout(() => {
                let glitchRounds = 3;
                let currentGlitch = wrongText;

                function glitchStep() {
                    if (glitchRounds > 0) {
                        currentGlitch = shuffleString(currentGlitch);
                        element.innerHTML = `<span class="cursor">${currentGlitch}</span>`;
                        glitchRounds--;
                        setTimeout(glitchStep, 150);
                    } else {
                        typeEffect(element, finalText, cb);
                    }
                }

                glitchStep();
            }, 600);
        });
    }

    function shuffleString(str) {
        const arr = str.split('');
        for (let i = arr.length - 1; i > 0; i--) {
            const j = Math.floor(Math.random() * (i + 1));
            [arr[i], arr[j]] = [arr[j], arr[i]];
        }
        return arr.join('');
    }

    targets.forEach(({ selector, text, initial, final }) => {
        const el = document.querySelector(selector);
        if (!el) return;

        if (text) {
            typeEffect(el, text);
        } else {
            glitchEffect(el, initial, final);
        }
    });

    // Terminal de linguagens no rodapé
    const langs = ['JavaScript', 'React', 'TypeScript', 'Python', 'Node.js', 'Swift', 'Bootstrap', 'Git', 'GitHub', 'MongoDB', 'SQL', 'Oracle', 'HTML', 'CSS', 'Vite'];
    const footerTarget = document.querySelector('.typing-langs');
    let langIndex = 0;
    let allLines = [];

    function typeLangInline(lang, cb) {
        let temp = '';
        let i = 0;

        function typeChar() {
            if (i <= lang.length) {
                temp = lang.slice(0, i);
                const display = [...allLines, `<span class="cursor">${temp}</span>`].join(' • ');
                footerTarget.innerHTML = display;

                // Corrigido: Usando typingAudio ao invés de typingSound
                // typingAudio.currentTime = 0; - Comentado pois já estamos usando startTypingSound
                // typingAudio.play().catch(() => { }); - Comentado pois já estamos usando startTypingSound

                i++;
                setTimeout(typeChar, 80);
            } else {
                allLines.push(lang);
                if (cb) cb();
            }
        }

        typeChar();
    }

    function clearLangs(cb) {
        let i = allLines.length;

        function erase() {
            if (i >= 0) {
                footerTarget.innerHTML = allLines.slice(0, i).join(' • ') + ' <span class="cursor"></span>';
                i--;
                setTimeout(erase, 40);
            } else {
                allLines = [];
                if (cb) cb();
            }
        }

        erase();
    }

    function startLangLoop() {
        if (langIndex < langs.length) {
            typeLangInline(langs[langIndex], () => {
                langIndex++;
                setTimeout(startLangLoop, 400);
            });
        } else {
            setTimeout(() => {
                clearLangs(() => {
                    langIndex = 0;
                    startLangLoop();
                });
            }, 2500);
        }
    }

    startLangLoop();
});