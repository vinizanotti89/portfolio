export function initTypingEffect(element, text, duration = 1500) {
    if (!element || !text) return;

    // Primeiro, limpar o conteúdo existente
    element.innerHTML = '';

    const totalChars = text.length;
    const delay = duration / totalChars;
    let currentChar = 0;

    const interval = setInterval(() => {
        if (currentChar < totalChars) {
            // Importante: redefinir o texto completo em vez de concatenar
            element.innerHTML = text.substring(0, currentChar + 1);
            currentChar++;
        } else {
            clearInterval(interval);
        }
    }, delay);

    // Retornar uma função de limpeza para usar em useEffect
    return () => clearInterval(interval);
}

export function initTypingBatch(configs) {
    const intervals = configs.map(cfg => {
        const el = document.querySelector(cfg.selector);
        if (el) {
            return initTypingEffect(el, cfg.text, cfg.duration);
        }
        return null;
    });

    // Retornar função de limpeza para todos os intervalos
    return () => intervals.forEach(cleanup => cleanup && cleanup());
}