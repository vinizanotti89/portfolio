export function initMenuEffects() {
    const boxes = document.querySelectorAll('.menu-box');
    console.log("Inicializando efeitos para", boxes.length, "caixas de menu");

    // Se não houver caixas, não faz nada
    if (boxes.length === 0) {
        console.log("Nenhuma caixa de menu encontrada");
        return () => { };
    }

    // Função para adicionar efeitos sem substituir o elemento
    function addEffectsToBox(box) {
        // Adiciona a classe para ativar o efeito
        box.classList.add('mouse-effect');

        // Manipulador de eventos para efeito 3D no mouse move
        const mousemoveHandler = (e) => {
            // Calculando a posição do cursor relativa à DIV
            const rect = box.getBoundingClientRect();
            const x = e.clientX - rect.left;
            const y = e.clientY - rect.top;

            // Convertendo para um valor entre -15 e 15 graus
            const rotateY = ((x / rect.width) - 0.5) * 30;
            const rotateX = ((y / rect.height) - 0.5) * -30;

            // Aplicando a transformação
            box.style.transform = `
                perspective(1000px) 
                rotateX(${rotateX}deg) 
                rotateY(${rotateY}deg)
                scale3d(1.05, 1.05, 1.05)
                translateZ(10px)
            `;

            // Calculando a posição do brilho
            const percentX = Math.floor((x / rect.width) * 100);
            const percentY = Math.floor((y / rect.height) * 100);

            // Atualizando a posição do gradiente de luz
            box.style.backgroundImage = `
                radial-gradient(
                    circle at ${percentX}% ${percentY}%,
                    rgba(255, 255, 255, 0.1) 0%,
                    rgba(0, 0, 0, 0) 60%
                )
            `;

            // Efeito de perseguição do cursor
            const centerX = rect.width / 2;
            const centerY = rect.height / 2;
            const angleRad = Math.atan2(y - centerY, x - centerX);
            const angleDeg = (angleRad * 180 / Math.PI + 360) % 360;
            box.style.setProperty('--start-angle', `${angleDeg}deg`);
        };

        // Reset quando o mouse sai
        const mouseleaveHandler = () => {
            box.style.transform = 'perspective(1000px) rotateX(0) rotateY(0) scale3d(1, 1, 1) translateZ(0)';
            box.style.backgroundImage = 'none';
        };

        // Adicionando event listeners
        box.addEventListener('mousemove', mousemoveHandler);
        box.addEventListener('mouseleave', mouseleaveHandler);

        // Retorna uma função para remover os event listeners se necessário
        return () => {
            box.removeEventListener('mousemove', mousemoveHandler);
            box.removeEventListener('mouseleave', mouseleaveHandler);
        };
    }

    // Armazena as funções de limpeza para cada box
    const cleanupFunctions = [];
    boxes.forEach(box => {
        cleanupFunctions.push(addEffectsToBox(box));
    });

    // Mapeamento de páginas para cores
    const pageColors = {
        '/sobre': '#00ffff',           
        '/projetos': '#9d00ff',     
        '/formacao': '#fcf403',     
        '/skills': '#ff6700',       
        '/contato': '#ff6700',      
        '/': '#39ff14'                 
    };

    // Adicionar o efeito de transição de página
    window.performPageTransition = (direction = 'right', path = '/') => {
        console.log(`Iniciando transição de página, direção: ${direction}, caminho: ${path}`);

        // Determinar a cor com base no caminho
        const color = pageColors[path] || '#0ff';

        // Criar elemento de transição
        const transitionEl = document.createElement('div');
        transitionEl.className = `page-transition ${direction}`;

        // Aplicar a cor da página ao elemento de transição
        const colorRgba = color.replace('#', '').match(/.{2}/g);
        let r, g, b;

        if (colorRgba && colorRgba.length === 3) {
            r = parseInt(colorRgba[0], 16);
            g = parseInt(colorRgba[1], 16);
            b = parseInt(colorRgba[2], 16);
        } else {
            // Cor padrão (ciano) se não conseguir parsear
            r = 0;
            g = 255;
            b = 255;
        }

        transitionEl.style.background = `linear-gradient(90deg, 
            rgba(${r}, ${g}, ${b}, 0.3), 
            rgba(${r}, ${g}, ${b}, 0.8))`;

        transitionEl.style.boxShadow = `0 0 30px ${color}, 0 0 60px ${color}`;

        document.body.appendChild(transitionEl);

        // Forçar reflow para permitir que a animação inicie
        void transitionEl.offsetWidth;

        // Iniciar a animação
        transitionEl.classList.add('active');

        // Retornar uma Promise que resolverá quando a animação terminar
        return new Promise(resolve => {
            setTimeout(() => {
                console.log("Transição de página concluída");
                transitionEl.classList.add('completed');
                setTimeout(() => {
                    document.body.removeChild(transitionEl);
                    resolve();
                }, 100);
            }, 600); // Este tempo deve corresponder à duração da animação CSS
        });
    };

    return () => {
        // Executa todas as funções de limpeza
        cleanupFunctions.forEach(cleanup => cleanup && cleanup());
        console.log("Removendo efeitos de menu");
    };
}