import { useState, useCallback, useEffect } from 'react';
import { NavLink } from 'react-router-dom';
import almaImg from '../assets/img/alma.png';

// Componente de navegação principal (Header)
export default function Header() {
  // Controle do menu mobile
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  const toggleMenu = useCallback(() => {
    setIsMenuOpen((prev) => !prev);
  }, []);

  const closeMenu = useCallback(() => {
    setIsMenuOpen(false);
  }, []);

  // Efeito para fechar menu ao redimensionar tela
  useEffect(() => {
    const handleResize = () => {
      if (window.innerWidth >= 1024) {
        closeMenu();
      }
    };
    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, [closeMenu]);

  // Estilização dinâmica do link ativo
  const navLinkClass = ({ isActive }: { isActive: boolean }) =>
    `font-bold text-sm block py-2 lg:py-0 transition-colors ${
      isActive ? 'text-emerald-500' : 'hover:text-emerald-500'
    }`;

  return (
    <header className="sticky top-0 z-50 bg-white border-b-2 border-emerald-500">
      <div className="max-w-[1200px] mx-auto px-4 flex justify-between items-center h-16">
        <NavLink to="/" className="flex items-center gap-2" onClick={closeMenu}>
          <img src={almaImg} alt="Logo EcoGuia" className="h-8 w-auto" />
          <span className="font-extrabold text-xl tracking-tight text-slate-800">EcoGuia</span>
        </NavLink>

        {/* Botão menu mobile */}
        <button
          className="lg:hidden p-2 text-slate-800 focus:outline-none text-xl"
          onClick={toggleMenu}
          aria-label="Alternar Menu"
        >
          {isMenuOpen ? '✕' : '☰'}
        </button>

        {/* Navegação principal */}
        <nav
          className={`${
            isMenuOpen ? 'block' : 'hidden'
          } absolute lg:static top-16 left-0 w-full lg:w-auto bg-white lg:bg-transparent shadow-md lg:shadow-none p-4 lg:p-0 lg:flex lg:items-center lg:gap-6 text-slate-800 transition-all`}
        >
          <NavLink to="/" className={navLinkClass} onClick={closeMenu}>Início</NavLink>
          <NavLink to="/sobre" className={navLinkClass} onClick={closeMenu}>Sobre o Motor</NavLink>
          <NavLink to="/faq" className={navLinkClass} onClick={closeMenu}>FAQ</NavLink>
          <NavLink to="/contato" className={navLinkClass} onClick={closeMenu}>Contato</NavLink>
          <NavLink to="/integrantes" className={navLinkClass} onClick={closeMenu}>Equipe</NavLink>

          <div className="hidden lg:block w-px h-6 bg-slate-200 border-dashed border-l mx-2"></div>
          <hr className="lg:hidden border-slate-200 border-dashed my-2" />

          <NavLink to="/dashboard" className={navLinkClass} onClick={closeMenu}>Painel do Usuário</NavLink>
          <NavLink to="/marcos" className={navLinkClass} onClick={closeMenu}>Marcos</NavLink>
          <NavLink to="/beneficios" className={navLinkClass} onClick={closeMenu}>Benefícios</NavLink>
        </nav>
      </div>
    </header>
  );
}
