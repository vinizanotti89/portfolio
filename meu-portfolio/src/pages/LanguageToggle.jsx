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

    // Define o novo idioma
    Cookies.set("googtrans", lang, { path: "/" });

    // Salva a rota atual antes do reload
    const currentPath = window.location.pathname + window.location.search + window.location.hash;
    sessionStorage.setItem('translationRedirect', currentPath);
    
    // Remove elementos do Google Translate
    removeGoogleTranslateElements();

    // Força o reload - mas de forma mais segura
    setTimeout(() => {
      try {
        // Tenta recarregar a página atual
        window.location.reload(true);
      } catch (error) {
        console.log("Erro no reload, tentando navegação manual:", error);
        // Se falhar, navega manualmente para a rota atual
        window.location.href = window.location.origin + currentPath;
      }
    }, 100);
  };

  // Função para remover todos os elementos do Google Translate
  const removeGoogleTranslateElements = () => {
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
      "iframe[src*='translate.google']",
      "div[id*='google_translate']",
      ".goog-te-spinner-pos"
    ];

    selectors.forEach((selector) => {
      const elements = document.querySelectorAll(selector);
      elements.forEach((el) => {
        if (el.id !== "google_translate_element") {
          el.remove();
        }
      });
    });

    // Remove iframes do Google Translate
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
    // Remove elementos anteriores
    removeGoogleTranslateElements();

    // Inicializa o Google Translate
    if (window.google && window.google.translate) {
      new window.google.translate.TranslateElement(
        {
          pageLanguage: "pt",
          includedLanguages: "en,pt,es",
          layout: window.google.translate.TranslateElement.InlineLayout.SIMPLE,
          autoDisplay: false,
        },
        "google_translate_element"
      );

      // Remove elementos indesejados após inicialização
      setTimeout(removeGoogleTranslateElements, 1000);
    }
  };

  useEffect(() => {
    if (typeof window !== "undefined") {
      // Verifica se houve redirecionamento após tradução
      const redirectPath = sessionStorage.getItem('translationRedirect');
      if (redirectPath && redirectPath !== window.location.pathname + window.location.search + window.location.hash) {
        sessionStorage.removeItem('translationRedirect');
        // Se a rota não bater, redireciona para a rota correta
        window.history.replaceState(null, '', redirectPath);
      }

      // Remove script anterior se existir
      const existingScript = document.querySelector(
        'script[src*="translate.google.com"]'
      );
      if (existingScript) {
        existingScript.remove();
      }

      // Carrega o script do Google Translate
      const script = document.createElement("script");
      script.src =
        "//translate.google.com/translate_a/element.js?cb=googleTranslateElementInit";
      script.async = true;
      script.onerror = () => {
        console.log("Erro ao carregar Google Translate");
      };
      document.body.appendChild(script);
      
      // Define a função global
      window.googleTranslateElementInit = googleTranslateElementInit;
    }

    return () => {
      const script = document.querySelector(
        'script[src*="translate.google.com"]'
      );
      if (script) {
        script.remove();
      }
      if (window.googleTranslateElementInit) {
        delete window.googleTranslateElementInit;
      }
    };
  }, []);

  // Observer para remover elementos dinâmicos
  useEffect(() => {
    const observer = new MutationObserver((mutations) => {
      mutations.forEach((mutation) => {
        if (mutation.addedNodes.length > 0) {
          mutation.addedNodes.forEach((node) => {
            if (node.nodeType === Node.ELEMENT_NODE) {
              if (
                node.className && 
                (node.className.includes('goog-te') || 
                 node.className.includes('skiptranslate') ||
                 node.className.includes('VIpgJd'))
              ) {
                setTimeout(() => {
                  if (node.parentNode && node.id !== "google_translate_element") {
                    node.remove();
                  }
                }, 100);
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

  // Pega o idioma atual
  const currentLang = Cookies.get("googtrans");

  // Reset inicial
  useEffect(() => {
    removeGoogleTranslateElements();
    
    // Limpa elementos periodicamente
    const interval = setInterval(removeGoogleTranslateElements, 2000);
    
    return () => clearInterval(interval);
  }, []);

  // Função para determinar se está no idioma selecionado
  const isActiveLanguage = (langCode) => {
    return currentLang === langCode || 
           (langCode === "/auto/pt" && (!currentLang || currentLang === "null"));
  };

  return (
    <>
      <div style={{ display: "flex", marginRight: "30px", gap: "10px" }}>
        <img
          src={brasilFlag}
          alt="Português"
          title="Português"
          style={{
            width: "35px",
            cursor: "pointer",
            borderRadius: "50%",
            border: isActiveLanguage("/auto/pt") ? "3px solid green" : "none",
            transition: "all 0.3s ease",
          }}
          onClick={(e) => langChange("/auto/pt", e)}
          onMouseOver={(e) => e.target.style.opacity = "0.7"}
          onMouseOut={(e) => e.target.style.opacity = "1"}
        />
        <img
          src={euaFlag}
          alt="English"
          title="English"
          style={{
            width: "35px",
            cursor: "pointer",
            borderRadius: "50%",
            border: isActiveLanguage("/auto/en") ? "3px solid blue" : "none",
            transition: "all 0.3s ease",
          }}
          onClick={(e) => langChange("/auto/en", e)}
          onMouseOver={(e) => e.target.style.opacity = "0.7"}
          onMouseOut={(e) => e.target.style.opacity = "1"}
        />
        <img
          src={espanhaFlag}
          alt="Español"
          title="Español"
          style={{
            width: "35px",
            cursor: "pointer",
            borderRadius: "50%",
            border: isActiveLanguage("/auto/es") ? "3px solid orange" : "none",
            transition: "all 0.3s ease",
          }}
          onClick={(e) => langChange("/auto/es", e)}
          onMouseOver={(e) => e.target.style.opacity = "0.7"}
          onMouseOut={(e) => e.target.style.opacity = "1"}
        />
      </div>
      
      {/* Elemento escondido para o Google Translate */}
      <div id="google_translate_element" style={{ 
        display: "none",
        visibility: "hidden",
        position: "absolute",
        top: "-9999px",
        left: "-9999px"
      }}></div>

      <style jsx global>{`
        /* Esconde TODOS os elementos do Google Translate */
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
        .goog-te-spinner-pos,
        .goog-te-menu-value,
        .goog-te-menu-frame {
          display: none !important;
          visibility: hidden !important;
          opacity: 0 !important;
          height: 0 !important;
          width: 0 !important;
          overflow: hidden !important;
          position: absolute !important;
          top: -9999px !important;
          left: -9999px !important;
          z-index: -999999 !important;
        }

        /* Remove qualquer elemento com classes do Google Translate */
        [class*="goog-te"]:not(#google_translate_element),
        [class*="VIpgJd"],
        [id*="goog-gt-"],
        [id*=":1."] {
          display: none !important;
          visibility: hidden !important;
        }

        /* Remove iframes */
        iframe[src*="translate.google"],
        iframe[src*="translate_a"] {
          display: none !important;
          visibility: hidden !important;
        }

        /* Garante que o body não seja afetado */
        body {
          top: 0px !important;
          position: relative !important;
          margin-top: 0px !important;
        }

        /* Remove highlights de tradução */
        .goog-text-highlight {
          background-color: transparent !important;
          background: transparent !important;
          box-shadow: none !important;
        }

        /* Remove qualquer tooltip */
        .goog-tooltip,
        .goog-tooltip:hover,
        [class*="goog-tooltip"] {
          display: none !important;
        }

        /* Remove elementos flutuantes */
        .goog-te-ftab-float,
        [style*="position: fixed"][style*="goog"] {
          display: none !important;
        }

        /* Força esconder elementos dinâmicos */
        div[style*="position: absolute"][style*="z-index"][style*="translate"] {
          display: none !important;
        }
      `}</style>
    </>
  );
}