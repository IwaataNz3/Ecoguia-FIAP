import { useNavigate } from 'react-router-dom';
import Header from '../components/Header';
import Footer from '../components/Footer';
import Button from '../components/Button';
import almaImg from '../assets/img/alma.png';

// Página 404: aparece em qualquer rota que não existe
const NaoEncontrada: React.FC = () => {
  const navigate = useNavigate();

  return (
    <div className="min-h-screen bg-slate-50 flex flex-col font-sans">
      <Header />

      <main className="flex-1 pt-24 pb-20 flex items-center">
        <section className="max-w-xl mx-auto px-6 text-center">
          <img src={almaImg} alt="Alma Digital" className="w-28 mx-auto mb-6 animate-flutuar opacity-80" />
          <p className="text-emerald-500 font-extrabold text-6xl md:text-7xl mb-2">404</p>
          <h2 className="text-3xl font-bold text-slate-800">Página não encontrada</h2>
          <p className="text-slate-500 text-lg mb-8">
            A página que você procura não existe ou mudou de endereço. Sua Aura continua intacta.
          </p>
          <div className="flex flex-col sm:flex-row gap-3 justify-center">
            <Button onClick={() => navigate('/')}>Voltar para o início</Button>
            <Button variant="outline" onClick={() => navigate('/dashboard')}>Ir para o painel</Button>
          </div>
        </section>
      </main>

      <Footer texto="© 2026 SoulUp - FIAP" />
    </div>
  );
};

export default NaoEncontrada;
