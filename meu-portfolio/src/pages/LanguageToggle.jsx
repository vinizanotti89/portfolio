import React, { useEffect } from 'react'
import Cookies from 'js-cookie'

// Images
import brasilFlag from '../assets/icons/brasil.png';
import euaFlag from '../assets/icons/eua.png';
import espanhaFlag from '../assets/icons/espanha.png';

export default function LanguageToggle() {
  const langChange = (lang, evt) => {
    evt.preventDefault()
    if (Cookies.get('googtrans')) {
      Cookies.set('googtrans', decodeURI(lang))
    } else {
      Cookies.set('googtrans', lang)
    }
    window.location.reload()
  }

  const googleTranslateElementInit = () => {
    new window.google.translate.TranslateElement(
      {
        pageLanguage: 'pt',
        includedLanguages: 'en,pt,es',
        layout: window.google.translate.TranslateElement.InlineLayout.SIMPLE,
        autoDisplay: false
      },
      'google_translate_element'
    )
  }

  useEffect(() => {
    if (typeof window !== 'undefined') {
      const script = document.createElement('script')
      script.src = '//translate.google.com/translate_a/element.js?cb=googleTranslateElementInit'
      document.body.appendChild(script)
      window.googleTranslateElementInit = googleTranslateElementInit
    }
  }, [])

  const currentLang = Cookies.get('googtrans')

  return (
    <>
      <div style={{ display: 'flex', marginRight: '30px', gap: '10px' }}>
        <img
          src={brasilFlag}
          alt="Português"
          style={{
            width: '32px',
            cursor: 'pointer',
            borderRadius: '50%',
            border: currentLang === '/auto/pt' ? '2px solid white' : 'none'
          }}
          onClick={(e) => langChange('/auto/pt', e)}
        />
        <img
          src={euaFlag}
          alt="English"
          style={{
            width: '32px',
            cursor: 'pointer',
            borderRadius: '50%',
            border: currentLang === '/auto/en' ? '2px solid white' : 'none'
          }}
          onClick={(e) => langChange('/auto/en', e)}
        />
        <img
          src={espanhaFlag}
          alt="Español"
          style={{
            width: '32px',
            cursor: 'pointer',
            borderRadius: '50%',
            border: currentLang === '/auto/es' ? '2px solid white' : 'none'
          }}
          onClick={(e) => langChange('/auto/es', e)}
        />
      </div>
      <div id="google_translate_element" style={{ display: 'none' }}></div>
      
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
          display: none;
        }
        
        .VIpgJd-ZVi9od-ORHb-OEVmcd.skiptranslate {
          display: none;
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
      `}</style>
    </>
  )
}