import React, { useEffect, useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import Header from '../components/Header';
import Footer from '../components/Footer';
import Card from '../components/Card';
import Button from '../components/Button';
import StatusMensagem from '../components/StatusMensagem';
import type { Badge, Conquista } from '../types';
import { USUARIO_ID } from '../services/api';
import { buscarBadge } from '../services/badgeService';
import { listarConquistas } from '../services/conquistaService';
import { useUser } from '../context/UserContext';
import { iconeDoMarco, formatarData } from '../utils/marcos';

// Busca o marco e, se ele estiver no perfil, a conquista do usuário
const buscarDetalhe = async (idBadge: number) => {
  const marco = await buscarBadge(idBadge);
  const conquistas = await listarConquistas(USUARIO_ID);
  const conquista = conquistas.find((item) => item.idBadge === idBadge);
  return { marco, conquista };
};

const MarcoDetalhe: React.FC = () => {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();
  const [marco, setMarco] = useState<Badge | null>(null);
  const [conquista, setConquista] = useState<Conquista | undefined>(undefined);
  const [loading, setLoading] = useState(true);
  const [erro, setErro] = useState('');
  const [tentativa, setTentativa] = useState(0);

  // Espera os dados do usuário chegarem antes de buscar o marco
  const { loading: carregandoUsuario } = useUser();

  // Carrega o marco pelo id da URL
  useEffect(() => {
    // Id que não é número vai direto para a página 404
    if (!id || isNaN(parseInt(id))) {
      navigate('/404');
      return;
    }
    if (carregandoUsuario) return;

    buscarDetalhe(parseInt(id))
      .then((dados) => {
        setMarco(dados.marco);
        setConquista(dados.conquista);
        setErro('');
      })
      .catch((error) => {
        console.error(error);
        setErro(error.message);
      })
      .finally(() => setLoading(false));
  }, [id, navigate, tentativa, carregandoUsuario]);

  const naoEncontrado = !loading && !erro && !marco;

  // Marco inexistente: avisa e volta para a lista sozinho
  useEffect(() => {
    if (naoEncontrado) {
      const timer = setTimeout(() => navigate('/marcos'), 4000);
      return () => clearTimeout(timer);
    }
  }, [naoEncontrado, navigate]);

  const tentarNovamente = () => {
    setLoading(true);
    setTentativa(tentativa + 1);
  };

  if (!id) return null;

  return (
    <div className="min-h-screen bg-slate-50 flex flex-col font-sans">
      <Header />

      <main className="flex-1 pt-24 pb-20">
        <section className="max-w-3xl mx-auto px-6">
          <Button variant="outline" onClick={() => navigate('/marcos')} className="mb-8">
            ← Voltar
          </Button>

          {loading && <StatusMensagem status="carregando" mensagem="Carregando marco..." />}

          {!loading && erro && (
            <StatusMensagem status="erro" mensagem={erro} onTentarNovamente={tentarNovamente} />
          )}

          {naoEncontrado && (
            <div className="text-center bg-white border border-slate-200 border-l-4 border-l-amber-500 rounded-2xl p-10">
              <span className="text-5xl block mb-4">🔍</span>
              <h2 className="text-3xl font-bold text-slate-800 mb-2">Marco não encontrado</h2>
              <p className="text-slate-500 mb-6">
                O marco #{id} não existe ou foi removido. Você será levado de volta para a lista de marcos.
              </p>
              <Button onClick={() => navigate('/marcos')}>Voltar para Marcos agora</Button>
            </div>
          )}

          {!loading && !erro && marco && (
            <>
              <Card className="text-center md:text-left md:flex gap-8 items-center border-t-4 border-t-emerald-500">
                <div className={`w-32 h-32 mx-auto md:mx-0 rounded-full flex items-center justify-center text-6xl flex-shrink-0 border-4 ${
                  marco.tipo === 'lendario'
                    ? 'bg-amber-50 border-amber-200 shadow-lg shadow-amber-100'
                    : 'bg-green-50 border-green-200 shadow-lg shadow-green-100'
                }`}>
                  {iconeDoMarco(marco.tipo)}
                </div>

                <div className="flex-1 mt-6 md:mt-0">
                  <span className={`inline-block text-xs font-bold px-3 py-1 rounded-full uppercase mb-3 ${
                    marco.tipo === 'lendario' ? 'bg-amber-100 text-amber-700' : 'bg-slate-100 text-slate-500'
                  }`}>
                    Marco {marco.tipo === 'lendario' ? 'Lendário' : 'Normal'}
                  </span>
                  <h2 className="text-3xl font-extrabold text-slate-800 mb-2">{marco.nome}</h2>
                  <p className="text-slate-500 text-lg mb-0">{marco.descricao}</p>
                </div>
              </Card>

              {/* Situação do marco no perfil */}
              <div className="mt-8 grid md:grid-cols-2 gap-6">
                <Card>
                  <h3 className="text-xl font-bold text-slate-800 mb-4">No seu perfil</h3>
                  {conquista ? (
                    <>
                      <span className="inline-block bg-green-100 text-emerald-600 font-bold px-4 py-1.5 rounded-full uppercase tracking-wider text-sm mb-3">
                        ✓ Exibido no perfil
                      </span>
                      <p className="text-slate-500 text-sm">
                        Desde <strong>{formatarData(conquista.dataConquista)}</strong>
                      </p>
                    </>
                  ) : (
                    <p className="text-slate-500 text-sm leading-relaxed">
                      Este marco ainda não aparece no seu perfil. Você pode exibi-lo pela página de Marcos.
                    </p>
                  )}
                </Card>

                <Card>
                  <h3 className="text-xl font-bold text-slate-800 mb-4">Tipos de marco</h3>
                  <p className="text-slate-500 text-sm leading-relaxed">
                    Todo marco é <strong>normal</strong> ou <strong>lendário</strong>. O tipo aparece como
                    selo no cartão do marco e no seu perfil.
                  </p>
                </Card>
              </div>
            </>
          )}
        </section>
      </main>

      <Footer texto="© 2026 SoulUp - Monitoramento de Impacto Social" />
    </div>
  );
};

export default MarcoDetalhe;
