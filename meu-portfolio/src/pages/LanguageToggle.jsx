import React, { useEffect } from "react";
import Cookies from "js-cookie";

// Images
import brasilFlag from "../assets/icons/brasil.png";
import euaFlag from "../assets/icons/eua.png";
import espanhaFlag from "../assets/icons/espanha.png";

export default function LanguageToggle() {
  const langChange = (lang, evt) => {
    evt.preventDefault();

    // Limpa todos os cookies relacionados ao Google Translate
    Cookies.remove("googtrans", { path: "/" });
    Cookies.remove("googtrans", { path: "/", domain: ".vinizanotti.dev" });
    Cookies.remove("googtrans", {
      path: "/",
      domain: window.location.hostname,
    });

    // Remove cookies do Google Translate com diferentes paths
    const cookiesToRemove = [
      "googtrans",
      "googtrans/",
      "googtrans/auto",
      "goog-gt-tt",
    ];
    cookiesToRemove.forEach((cookieName) => {
      Cookies.remove(cookieName, { path: "/" });
      Cookies.remove(cookieName, {
        path: "/",
        domain: window.location.hostname,
      });
      if (window.location.hostname.includes(".")) {
        Cookies.remove(cookieName, {
          path: "/",
          domain: `.${window.location.hostname}`,
        });
      }
    });

    // Aguarda um pouco antes de definir o novo cookie
    setTimeout(() => {
      Cookies.set("googtrans", lang, { path: "/" });

      // Remove elementos do Google Translate antes de reinicializar
      removeGoogleTranslateElements();

      // Força a reconstrução do tradutor
      const translateElement = document.getElementById(
        "google_translate_element"
      );
      if (translateElement) {
        translateElement.innerHTML = "";
      }

      // Reinicializa o tradutor
      if (window.google && window.google.translate) {
        try {
          new window.google.translate.TranslateElement(
            {
              pageLanguage: "pt",
              includedLanguages: "en,pt,es",
              layout:
                window.google.translate.TranslateElement.InlineLayout.SIMPLE,
              autoDisplay: false,
            },
            "google_translate_element"
          );
          
          // Remove elementos após inicialização
          setTimeout(removeGoogleTranslateElements, 500);
        } catch (error) {
          console.log("Erro ao reinicializar tradutor:", error);
        }
      }

      // Recarrega a página após um pequeno delay
      setTimeout(() => {
        window.location.reload();
      }, 100);
    }, 50);
  };

  // Função para remover todos os elementos do Google Translate
  const removeGoogleTranslateElements = () => {
    // Lista de todos os possíveis elementos do Google Translate
    const selectors = [
      ".goog-te-banner-frame",
      ".goog-te-ftab",
      ".goog-te-balloon-frame",
      ".goog-te-gadget",
      ".goog-te-combo",
      ".goog-te-menu",
      ".goog-te-menu2",
      ".goog-te-wmfooter",
      ".goog-tooltip",
      ".VIpgJd-ZVi9od-ORHb-OEVmcd",
      "[class*='goog-te']",
      ".skiptranslate",
      // Adiciona seletores mais específicos
      "iframe[src*='translate.google']",
      "div[id*='google_translate']",
      ".goog-te-spinner-pos"
    ];

    selectors.forEach((selector) => {
      const elements = document.querySelectorAll(selector);
      elements.forEach((el) => {
        if (el.id !== "google_translate_element") { // Não remove o elemento principal
          el.remove();
        }
      });
    });

    // Remove também qualquer iframe do Google Translate
    const iframes = document.querySelectorAll('iframe');
    iframes.forEach(iframe => {
      if (iframe.src && iframe.src.includes('translate.google')) {
        iframe.remove();
      }
    });

    // Restaura o body
    document.body.style.top = "0px";
    document.body.classList.remove('goog-te-ftab-float');
    document.documentElement.classList.remove('goog-te-ftab-float');
  };

  const googleTranslateElementInit = () => {
    // Limpa qualquer instância anterior
    removeGoogleTranslateElements();

    new window.google.translate.TranslateElement(
      {
        pageLanguage: "pt",
        includedLanguages: "en,pt,es",
        layout: window.google.translate.TranslateElement.InlineLayout.SIMPLE,
        autoDisplay: false,
      },
      "google_translate_element"
    );

    // Remove elementos após a inicialização
    setTimeout(removeGoogleTranslateElements, 1000);
  };

  useEffect(() => {
    if (typeof window !== "undefined") {
      // Remove script anterior se existir
      const existingScript = document.querySelector(
        'script[src*="translate.google.com"]'
      );
      if (existingScript) {
        existingScript.remove();
      }

      const script = document.createElement("script");
      script.src =
        "//translate.google.com/translate_a/element.js?cb=googleTranslateElementInit";
      script.async = true;
      document.body.appendChild(script);
      window.googleTranslateElementInit = googleTranslateElementInit;
    }

    // Cleanup function
    return () => {
      // Remove o script quando o componente for desmontado
      const script = document.querySelector(
        'script[src*="translate.google.com"]'
      );
      if (script) {
        script.remove();
      }
    };
  }, []);

  // Observer para remover elementos que aparecem dinamicamente
  useEffect(() => {
    const observer = new MutationObserver((mutations) => {
      mutations.forEach((mutation) => {
        if (mutation.addedNodes.length > 0) {
          mutation.addedNodes.forEach((node) => {
            if (node.nodeType === Node.ELEMENT_NODE) {
              // Verifica se é um elemento do Google Translate
              if (
                node.className && 
                (node.className.includes('goog-te') || 
                 node.className.includes('skiptranslate') ||
                 node.className.includes('VIpgJd'))
              ) {
                setTimeout(() => node.remove(), 100);
              }
            }
          });
        }
      });
    });

    observer.observe(document.body, {
      childList: true,
      subtree: true
    });

    return () => observer.disconnect();
  }, []);

  const currentLang = Cookies.get("googtrans");

  // Função para resetar completamente o tradutor
  const resetTranslator = () => {
    removeGoogleTranslateElements();
  };

  useEffect(() => {
    // Reset do tradutor quando o componente monta
    resetTranslator();
    
    // Adiciona um intervalo para remover elementos que podem aparecer
    const interval = setInterval(removeGoogleTranslateElements, 2000);
    
    return () => clearInterval(interval);
  }, []);

  return (
    <>
      <div style={{ display: "flex", marginRight: "30px", gap: "10px" }}>
        <img
          src={brasilFlag}
          alt="Português"
          style={{
            width: "35px",
            cursor: "pointer",
            borderRadius: "50%",
            border: currentLang === "/auto/pt" ? "3px solid green" : "none",
          }}
          onClick={(e) => langChange("/auto/pt", e)}
          onMouseOver={(e) => e.target.style.opacity = "0.8"}
          onMouseOut={(e) => e.target.style.opacity = "1"}
        />
        <img
          src={euaFlag}
          alt="English"
          style={{
            width: "35px",
            cursor: "pointer",
            borderRadius: "50%",
            border: currentLang === "/auto/en" ? "3px solid blue" : "none",
          }}
          onClick={(e) => langChange("/auto/en", e)}
          onMouseOver={(e) => e.target.style.opacity = "0.8"}
          onMouseOut={(e) => e.target.style.opacity = "1"}
        />
        <img
          src={espanhaFlag}
          alt="Español"
          style={{
            width: "35px",
            cursor: "pointer",
            borderRadius: "50%",
            border: currentLang === "/auto/es" ? "3px solid yellow" : "none",
          }}
          onClick={(e) => langChange("/auto/es", e)}
          onMouseOver={(e) => e.target.style.opacity = "0.8"}
          onMouseOut={(e) => e.target.style.opacity = "1"}
        />
      </div>
      <div id="google_translate_element" style={{ display: "none" }}></div>

      <style jsx global>{`
        /* Esconde todos os elementos do Google Translate */
        .goog-te-banner-frame,
        .goog-te-banner-frame.skiptranslate,
        .goog-te-ftab,
        .goog-te-balloon-frame,
        .goog-te-gadget,
        .goog-te-combo,
        .goog-te-menu,
        .goog-te-menu2,
        .goog-te-wmfooter,
        .goog-tooltip,
        .VIpgJd-ZVi9od-ORHb-OEVmcd,
        .skiptranslate,
        .goog-te-spinner-pos {
          display: none !important;
          visibility: hidden !important;
          opacity: 0 !important;
          height: 0 !important;
          width: 0 !important;
          overflow: hidden !important;
          position: absolute !important;
          top: -9999px !important;
          left: -9999px !important;
        }

        /* Força esconder qualquer elemento do Google Translate */
        [class*="goog-te"]:not(#google_translate_element) {
          display: none !important;
          visibility: hidden !important;
        }

        /* Remove qualquer iframe do Google Translate */
        iframe[src*="translate.google"] {
          display: none !important;
          visibility: hidden !important;
        }

        /* Restaura o body */
        body {
          top: 0px !important;
          position: relative !important;
        }

        /* Remove highlight de tradução */
        .goog-text-highlight {
          background-color: transparent !important;
          background: transparent !important;
          box-shadow: none !important;
        }

        /* Esconde tooltips */
        .goog-tooltip,
        .goog-tooltip:hover {
          display: none !important;
        }

        /* Remove qualquer elemento flutuante */
        .goog-te-ftab-float {
          display: none !important;
        }

        /* Esconde elementos específicos que podem aparecer */
        div[style*="position: absolute"][style*="z-index"] {
          display: none !important;
        }

        /* Força esconder elementos que podem ter IDs dinâmicos */
        div[id^="goog-gt-"],
        span[id^="goog-gt-"],
        iframe[id^="goog-gt-"] {
          display: none !important;
        }
      `}</style>
    </>
  );
}