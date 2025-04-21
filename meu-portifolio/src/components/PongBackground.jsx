import React, { useEffect, useRef, useState } from "react";
import '../styles/pong.css';

const PongBackground = () => {
    const [score, setScore] = useState([0, 0]); // Contador de pontos
    const canvasRef = useRef(null);
    const scoreRef = useRef(score); // Referência para acessar score atualizado em callbacks

    // Atualiza a referência quando o score mudar
    useEffect(() => {
        scoreRef.current = score;
    }, [score]);

    useEffect(() => {
        const canvas = canvasRef.current;
        if (!canvas) return;

        // Ajustar canvas para tela inteira
        canvas.width = window.innerWidth;
        canvas.height = window.innerHeight;

        const ctx = canvas.getContext("2d");

        // Redimensionar canvas quando a janela mudar de tamanho
        const handleResize = () => {
            canvas.width = window.innerWidth;
            canvas.height = window.innerHeight;
        };
        window.addEventListener('resize', handleResize);

        // Definindo a bolinha com velocidade inicial aleatória
        const randomDirection = () => (Math.random() > 0.5 ? 1 : -1);
        const randomSpeed = () => Math.random() * 2 + 3; // Velocidade entre 3 e 5

        const ball = {
            x: canvas.width / 2,
            y: canvas.height / 2,
            radius: 10,
            dx: randomSpeed() * randomDirection(),
            dy: randomSpeed() * randomDirection(),
            color: "#ffffff", // Cor branca
            speedMultiplier: 1.05 // Aceleração quando quicar
        };

        // Definindo as raquetes
        const paddleWidth = 10;
        const paddleHeight = 100;
        const paddleSpeed = 5;

        const leftPaddle = {
            x: 40, // Um pouco afastado da borda
            y: canvas.height / 2 - paddleHeight / 2,
            width: paddleWidth,
            height: paddleHeight,
            dy: paddleSpeed,
            aiSpeed: 0.7, // Velocidade da IA (mais baixa que a do jogador)
            reactionDelay: 0 // Contador para atraso de reação
        };

        const rightPaddle = {
            x: canvas.width - paddleWidth - 40, // Um pouco afastado da borda
            y: canvas.height / 2 - paddleHeight / 2,
            width: paddleWidth,
            height: paddleHeight,
            dy: paddleSpeed,
            aiSpeed: 0.8, // Velocidade da IA
            reactionDelay: 0
        };

        // Função para verificar limites das raquetes
        const checkPaddleBounds = (paddle) => {
            if (paddle.y < 0) {
                paddle.y = 0;
            }
            if (paddle.y + paddle.height > canvas.height) {
                paddle.y = canvas.height - paddle.height;
            }
        };

        // IA para mover ambas as raquetes com comportamento mais natural
        const moveAI = () => {
            // Esquerda: Segue a bola com um pouco de atraso e erro
            if (leftPaddle.reactionDelay <= 0) {
                const paddleCenter = leftPaddle.y + (leftPaddle.height / 2);
                const targetY = ball.y + (Math.random() * 30 - 15); // Adiciona um pequeno erro

                if (Math.abs(paddleCenter - targetY) > 10) {
                    if (paddleCenter < targetY) {
                        leftPaddle.y += leftPaddle.dy * leftPaddle.aiSpeed;
                    } else {
                        leftPaddle.y -= leftPaddle.dy * leftPaddle.aiSpeed;
                    }
                    checkPaddleBounds(leftPaddle);
                }

                // Atraso aleatório na reação
                if (Math.random() < 0.01) {
                    leftPaddle.reactionDelay = Math.floor(Math.random() * 30);
                }
            } else {
                leftPaddle.reactionDelay--;
            }

            // Direita: Semelhante, mas com parâmetros diferentes
            if (rightPaddle.reactionDelay <= 0) {
                const paddleCenter = rightPaddle.y + (rightPaddle.height / 2);
                const targetY = ball.y + (Math.random() * 40 - 20); // Erro maior

                if (Math.abs(paddleCenter - targetY) > 15) {
                    if (paddleCenter < targetY) {
                        rightPaddle.y += rightPaddle.dy * rightPaddle.aiSpeed;
                    } else {
                        rightPaddle.y -= rightPaddle.dy * rightPaddle.aiSpeed;
                    }
                    checkPaddleBounds(rightPaddle);
                }

                // Chance aleatória de falhar
                if (Math.random() < 0.005) {
                    rightPaddle.reactionDelay = Math.floor(Math.random() * 45);
                }
            } else {
                rightPaddle.reactionDelay--;
            }
        };

        // Função para resetar a bola com direção aleatória
        const resetBall = () => {
            ball.x = canvas.width / 2;
            ball.y = canvas.height / 2;
            ball.dx = randomSpeed() * randomDirection();
            ball.dy = randomSpeed() * randomDirection();
        };

        // Função para desenhar os elementos (bolinha, raquetes, placar)
        const draw = () => {
            if (!ctx) return;

            ctx.clearRect(0, 0, canvas.width, canvas.height);

            // Bolinha
            ctx.beginPath();
            ctx.arc(ball.x, ball.y, ball.radius, 0, Math.PI * 2);
            ctx.fillStyle = "#ffffff"; // Branco
            ctx.fill();
            ctx.closePath();

            // Efeito de brilho na bolinha
            ctx.beginPath();
            ctx.arc(ball.x, ball.y, ball.radius + 5, 0, Math.PI * 2);
            ctx.fillStyle = "rgba(255, 255, 255, 0.3)";
            ctx.fill();
            ctx.closePath();

            // Linha central pontilhada
            ctx.beginPath();
            ctx.setLineDash([10, 15]);
            ctx.moveTo(canvas.width / 2, 0);
            ctx.lineTo(canvas.width / 2, canvas.height);
            ctx.strokeStyle = "rgba(255, 255, 255, 0.5)";
            ctx.stroke();
            ctx.setLineDash([]);
            ctx.closePath();

            // Raquete esquerda
            ctx.fillStyle = "#ffffff"; // Branco
            ctx.fillRect(leftPaddle.x, leftPaddle.y, leftPaddle.width, leftPaddle.height);

            // Efeito de brilho na raquete esquerda
            ctx.shadowColor = "#ffffff";
            ctx.shadowBlur = 10;
            ctx.strokeStyle = "#ffffff";
            ctx.strokeRect(leftPaddle.x, leftPaddle.y, leftPaddle.width, leftPaddle.height);
            ctx.shadowBlur = 0;

            // Raquete direita
            ctx.fillStyle = "#ffffff"; // Branco
            ctx.fillRect(rightPaddle.x, rightPaddle.y, rightPaddle.width, rightPaddle.height);

            // Efeito de brilho na raquete direita
            ctx.shadowColor = "#ffffff";
            ctx.shadowBlur = 10;
            ctx.strokeStyle = "#ffffff";
            ctx.strokeRect(rightPaddle.x, rightPaddle.y, rightPaddle.width, rightPaddle.height);
            ctx.shadowBlur = 0;

            // Placar
            ctx.font = "24px Orbitron";
            ctx.fillStyle = "#FFF";
            ctx.textAlign = "center";
            ctx.fillText(`${scoreRef.current[0]} - ${scoreRef.current[1]}`, canvas.width / 2, 30);

            // Movimentação da bolinha
            ball.x += ball.dx;
            ball.y += ball.dy;

            // Colisão com as paredes superior e inferior
            if (ball.y + ball.dy > canvas.height - ball.radius || ball.y + ball.dy < ball.radius) {
                ball.dy = -ball.dy;

                // Adiciona variação aleatória sutil quando quica nas paredes
                ball.dy += (Math.random() * 0.4 - 0.2);
                ball.dx += (Math.random() * 0.2 - 0.1);
            }

            // Colisão com as raquetes
            // Raquete esquerda
            if (
                ball.x - ball.radius < leftPaddle.x + leftPaddle.width &&
                ball.x > leftPaddle.x &&
                ball.y > leftPaddle.y &&
                ball.y < leftPaddle.y + leftPaddle.height
            ) {
                // Calcula o ângulo baseado em onde a bola atinge a raquete
                const hitPosition = (ball.y - (leftPaddle.y + leftPaddle.height / 2)) / (leftPaddle.height / 2);
                const angle = hitPosition * (Math.PI / 4); // Max ±45 graus

                const speed = Math.sqrt(ball.dx * ball.dx + ball.dy * ball.dy) * ball.speedMultiplier;
                ball.dx = Math.abs(speed * Math.cos(angle));
                ball.dy = speed * Math.sin(angle);
            }

            // Raquete direita
            if (
                ball.x + ball.radius > rightPaddle.x &&
                ball.x < rightPaddle.x + rightPaddle.width &&
                ball.y > rightPaddle.y &&
                ball.y < rightPaddle.y + rightPaddle.height
            ) {
                // Similar ao anterior, mas invertido para a direita
                const hitPosition = (ball.y - (rightPaddle.y + rightPaddle.height / 2)) / (rightPaddle.height / 2);
                const angle = hitPosition * (Math.PI / 4); // Max ±45 graus

                const speed = Math.sqrt(ball.dx * ball.dx + ball.dy * ball.dy) * ball.speedMultiplier;
                ball.dx = -Math.abs(speed * Math.cos(angle));
                ball.dy = speed * Math.sin(angle);
            }

            // Verifica se a bolinha saiu pela esquerda ou direita
            if (ball.x < 0) {
                // Ponto para o jogador da direita
                setScore(prevScore => [prevScore[0], prevScore[1] + 1]);
                resetBall();
            } else if (ball.x > canvas.width) {
                // Ponto para o jogador da esquerda
                setScore(prevScore => [prevScore[0] + 1, prevScore[1]]);
                resetBall();
            }

            // Move a IA
            moveAI();

            requestAnimationFrame(draw);
        };

        draw(); // Inicia o jogo

        return () => {
            window.removeEventListener('resize', handleResize);
        };
    }, []);

    return (
        <div className="pong-container">
            <canvas ref={canvasRef} className="pong-canvas"></canvas>
        </div>
    );
};

export default PongBackground;