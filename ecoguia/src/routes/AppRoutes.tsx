import { Routes, Route } from 'react-router-dom';
import Home from '../pages/Home';
import Sobre from '../pages/Sobre';
import FAQ from '../pages/FAQ';
import Contato from '../pages/Contato';
import Integrantes from '../pages/Integrantes';
import NaoEncontrada from '../pages/NaoEncontrada';

// Todas as rotas do site
export default function AppRoutes() {
  return (
    <Routes>
      {/* Páginas institucionais */}
      <Route path="/" element={<Home />} />
      <Route path="/sobre" element={<Sobre />} />
      <Route path="/faq" element={<FAQ />} />
      <Route path="/contato" element={<Contato />} />
      <Route path="/integrantes" element={<Integrantes />} />

      {/* Qualquer outra rota cai na página 404 */}
      <Route path="*" element={<NaoEncontrada />} />
    </Routes>
  );
}
