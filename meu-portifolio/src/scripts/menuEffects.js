document.addEventListener('DOMContentLoaded', () => {
    const boxes = document.querySelectorAll('.menu-box');

    boxes.forEach(box => {
        // Adiciona a classe para ativar o efeito
        box.classList.add('mouse-effect');

        // Manipulador de eventos para efeito 3D no mouse move
        box.addEventListener('mousemove', (e) => {
            // Calculando a posição do cursor relativa à DIV
            const rect = box.getBoundingClientRect();
            const x = e.clientX - rect.left; // x position within the element
            const y = e.clientY - rect.top;  // y position within the element


            // Convertendo para um valor entre -15 e 15 graus
            const rotateY = ((x / rect.width) - 0.5) * 30; // Rotação no eixo Y
            const rotateX = ((y / rect.height) - 0.5) * -30; // Rotação no eixo X (invertida)

            // Aplicando a transformação
            box.style.transform = `
                perspective(1000px) 
                rotateX(${rotateX}deg) 
                rotateY(${rotateY}deg)
                scale3d(1.05, 1.05, 1.05)
                translateZ(10px)
            `;

            // Calculando a posição do brilho baseado na posição do mouse
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
        });

        // Reset da transformação quando o mouse sai
        box.addEventListener('mouseleave', () => {
            box.style.transform = 'perspective(1000px) rotateX(0) rotateY(0) scale3d(1, 1, 1) translateZ(0)';
            box.style.backgroundImage = 'none';
        });

        // Click animation mantida do código original
        box.addEventListener('click', () => {
            box.classList.add('clicked');

            setTimeout(() => {
                // Aqui é onde vai o redirecionamento real
                console.log(`Entrando na seção: ${box.querySelector('h2').innerText}`);
                box.classList.remove('clicked');
            }, 700);
        });
    });

    // Isso cria um efeito de "perseguição do cursor" para a luz na borda
    document.querySelectorAll('.menu-box').forEach(box => {
        box.addEventListener('mousemove', (e) => {
            const rect = box.getBoundingClientRect();
            const x = e.clientX - rect.left;
            const y = e.clientY - rect.top;

            // Calcular o ângulo com base na posição do mouse
            const centerX = rect.width / 2;
            const centerY = rect.height / 2;
            const angleRad = Math.atan2(y - centerY, x - centerX);
            const angleDeg = (angleRad * 180 / Math.PI + 360) % 360;

            // Ajustar a animação da borda baseado na posição do mouse
            box.style.setProperty('--start-angle', `${angleDeg}deg`);
        });
    });
});