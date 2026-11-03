import { useState, useEffect } from 'react';

// Componente de rolagem rápida para o topo
export default function ScrollToTop() {
  // Controle de visibilidade do botão
  const [isVisible, setIsVisible] = useState(false);

  // Efeito que monitora o scroll da página
  useEffect(() => {
    const toggleVisibility = () => {
      if (window.scrollY > 300) {
        setIsVisible(true);
      } else {
        setIsVisible(false);
      }
    };

    window.addEventListener('scroll', toggleVisibility);
    return () => window.removeEventListener('scroll', toggleVisibility);
  }, []);

  // Função de rolagem suave
  const scrollToTop = () => {
    window.scrollTo({
      top: 0,
      behavior: 'smooth'
    });
  };

  if (!isVisible) return null;

  return (
    <button
      onClick={scrollToTop}
      className="fixed bottom-6 right-6 bg-emerald-500 text-white w-12 h-12 rounded-full flex items-center justify-center shadow-lg hover:bg-emerald-600 transition-colors z-50 text-xl font-bold"
      aria-label="Voltar ao topo"
    >
      ↑
    </button>
  );
}
