import React, { useEffect } from 'react';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import PongBackground from './components/PongBackground';
import Home from './pages/Home';
import About from './pages/About';
import Projects from './pages/Projects';
import Formation from './pages/Formation';
import Skills from './pages/Skills';
import HeaderTop from './pages/Header/HeaderTop';

// Importando scripts
import { initMenuEffects } from './scripts/menuEffects';
import { initTypingEffect } from './scripts/typingEffect';

//Importando as imagens
import whatsappIcon from './assets/icons/whatsapp.png';
import linkedinIcon from './assets/icons/linkedin.png';
import githubIcon from './assets/icons/github.png';

const App = () => {
  useEffect(() => {
    // Inicializar efeitos após um pequeno atraso para garantir que o DOM esteja pronto
    const typingCleanup = initTypingEffect();
    
    // Iniciar os efeitos de menu após um pequeno atraso
    const menuEffectsTimeout = setTimeout(() => {
      initMenuEffects();
    }, 500);
    
    // Função de limpeza para useEffect
    return () => {
      typingCleanup && typingCleanup();
      clearTimeout(menuEffectsTimeout);
    };
  }, []);

  

  return (
    <BrowserRouter>
      {/* PongBackground fica visível em todas as páginas */}
      <PongBackground />

      {/* Topo fixo com seletor de idioma */}
      <HeaderTop />

      {/* Roteamento para diferentes páginas */}
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/sobre" element={<About />} />
        <Route path="/projetos" element={<Projects />} />
        <Route path="/formacao" element={<Formation />} />
        <Route path="/skills" element={<Skills />} />
      </Routes>

      {/* Componentes fixos que aparecem em todas as páginas */}
      <div className="typing-footer">
        <p className="typing-langs"></p>
      </div>

      <div className="social-fixed">
        <a href="http://wa.me/5541998258938" target="_blank" rel="noopener noreferrer">
        <img src={whatsappIcon} alt="WhatsApp" />
        </a>
        <a href="https://www.linkedin.com/in/vinicius-zanotti/" target="_blank" rel="noopener noreferrer">
        <img src={linkedinIcon} alt="LinkedIn" />
        </a>
        <a href="https://github.com/vinizanotti89" target="_blank" rel="noopener noreferrer">
        <img src={githubIcon} alt="GitHub" />
        </a>
      </div>
    </BrowserRouter>
  );
};

export default App;