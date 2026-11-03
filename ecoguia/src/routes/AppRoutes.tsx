import { Routes, Route } from 'react-router-dom';
import Home from '../pages/Home';
import Sobre from '../pages/Sobre';
import FAQ from '../pages/FAQ';
import Contato from '../pages/Contato';
import Integrantes from '../pages/Integrantes';
import Dashboard from '../pages/Dashboard';
import EditarPerfil from '../pages/EditarPerfil';
import Marcos from '../pages/Marcos';
import MarcoDetalhe from '../pages/MarcoDetalhe';
import Beneficios from '../pages/Beneficios';
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

      {/* Páginas da solução (dados da API Java) */}
      <Route path="/dashboard" element={<Dashboard />} />
      <Route path="/perfil/editar" element={<EditarPerfil />} />
      <Route path="/marcos" element={<Marcos />} />
      <Route path="/marcos/:id" element={<MarcoDetalhe />} />
      <Route path="/beneficios" element={<Beneficios />} />

      {/* Qualquer outra rota cai na página 404 */}
      <Route path="*" element={<NaoEncontrada />} />
    </Routes>
  );
}
