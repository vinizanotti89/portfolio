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

  const googleTranslateElementInit = () => {
    // Limpa qualquer instância anterior
    const existingFrame = document.querySelector(".goog-te-banner-frame");
    if (existingFrame) {
      existingFrame.remove();
    }

    new window.google.translate.TranslateElement(
      {
        pageLanguage: "pt",
        includedLanguages: "en,pt,es",
        layout: window.google.translate.TranslateElement.InlineLayout.SIMPLE,
        autoDisplay: false,
      },
      "google_translate_element"
    );
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

  const currentLang = Cookies.get("googtrans");

  // Função para resetar completamente o tradutor
  const resetTranslator = () => {
    // Remove todos os elementos do Google Translate
    const elementsToRemove = [
      ".goog-te-banner-frame",
      ".goog-te-ftab",
      ".goog-te-balloon-frame",
      ".goog-te-gadget",
    ];

    elementsToRemove.forEach((selector) => {
      const elements = document.querySelectorAll(selector);
      elements.forEach((el) => el.remove());
    });

    // Restaura o body top
    document.body.style.top = "0px";
  };

  useEffect(() => {
    // Reset do tradutor quando o componente monta
    resetTranslator();
  }, []);

  return (
    <>
      <div style={{ display: "flex", marginRight: "30px", gap: "10px" }}>
        <img
          src={brasilFlag}
          alt="Português"
          style={{
            width: "32px",
            cursor: "pointer",
            borderRadius: "50%",
            border: currentLang === "/auto/pt" ? "2px solid white" : "none",
          }}
          onClick={(e) => langChange("/auto/pt", e)}
        />
        <img
          src={euaFlag}
          alt="English"
          style={{
            width: "32px",
            cursor: "pointer",
            borderRadius: "50%",
            border: currentLang === "/auto/en" ? "2px solid white" : "none",
          }}
          onClick={(e) => langChange("/auto/en", e)}
        />
        <img
          src={espanhaFlag}
          alt="Español"
          style={{
            width: "32px",
            cursor: "pointer",
            borderRadius: "50%",
            border: currentLang === "/auto/es" ? "2px solid white" : "none",
          }}
          onClick={(e) => langChange("/auto/es", e)}
        />
      </div>
      <div id="google_translate_element" style={{ display: "none" }}></div>

      <style jsx>{`
        .goog-te-banner-frame.skiptranslate {
          display: none !important;
        }

        .goog-te-gadget {
          display: none !important;
        }

        body {
          top: 0px !important;
        }

        .goog-te-balloon-frame {
          display: none !important;
        }

        .goog-te-ftab {
          display: none !important;
        }

        .VIpgJd-ZVi9od-ORHb-OEVmcd {
          display: none !important;
        }

        .VIpgJd-ZVi9od-ORHb-OEVmcd.skiptranslate {
          display: none !important;
        }

        .goog-tooltip {
          display: none !important;
        }

        .goog-tooltip:hover {
          display: none !important;
        }

        .goog-text-highlight {
          background-color: transparent !important;
          background: transparent !important;
          box-shadow: none !important;
        }

        /* Força esconder qualquer elemento do Google Translate */
        [class*="goog-te"] {
          display: none !important;
        }

        /* Esconde elementos que podem aparecer dinamicamente */
        .skiptranslate {
          display: none !important;
        }
      `}</style>
    </>
  );
}
