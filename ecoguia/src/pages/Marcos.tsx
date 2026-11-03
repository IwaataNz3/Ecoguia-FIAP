import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import Header from '../components/Header';
import Footer from '../components/Footer';
import Button from '../components/Button';
import Card from '../components/Card';
import StatusMensagem from '../components/StatusMensagem';
import almaImg from '../assets/img/alma.png';
import type { Badge, Conquista, MarcoComConquista } from '../types';
import { useUser } from '../context/UserContext';
import { iconeDoMarco } from '../utils/marcos';
import { USUARIO_ID } from '../services/api';
import { listarBadges } from '../services/badgeService';
import { listarConquistas, criarConquista, excluirConquista } from '../services/conquistaService';

interface MarcoCardProps {
  marco: MarcoComConquista;
  salvando: boolean;
  onAlternarPerfil: (marco: MarcoComConquista) => void;
}

const MarcoCard: React.FC<MarcoCardProps> = ({ marco, salvando, onAlternarPerfil }) => {
  const navigate = useNavigate();
  const noPerfil = marco.conquista !== undefined;
  const lendario = marco.tipo === 'lendario';

  return (
    <Card className={`p-6 transition-all duration-300 ${
      noPerfil
        ? 'border-l-4 border-l-emerald-500 border-slate-200 shadow-md'
        : 'border-slate-200 shadow-sm'
    }`}>
      <div className="flex flex-col sm:flex-row gap-4">
        <div className={`w-14 h-14 rounded-xl flex items-center justify-center text-2xl flex-shrink-0 border ${
          lendario ? 'bg-amber-50 border-amber-200' : 'bg-green-50 border-green-100'
        }`}>
          {iconeDoMarco(marco.tipo)}
        </div>
        <div className="flex-1 min-w-0">
          <div className="flex flex-wrap items-center gap-2 mb-1">
            <h3 className="text-base font-bold text-slate-800 mb-0">{marco.nome}</h3>
            <span className={`text-xs font-bold px-2 py-0.5 rounded-full uppercase ${
              lendario ? 'bg-amber-100 text-amber-700' : 'bg-slate-100 text-slate-500'
            }`}>
              {lendario ? 'Lendário' : 'Normal'}
            </span>
          </div>
          <p className="text-sm text-slate-500 mb-3 leading-snug">{marco.descricao}</p>

          {noPerfil ? (
            <span className="inline-block bg-green-100 text-emerald-600 text-xs font-bold px-3 py-1 rounded-full uppercase">
              ✓ No seu perfil
            </span>
          ) : (
            <span className="inline-block bg-slate-100 text-slate-500 text-xs font-bold px-3 py-1 rounded-full uppercase">
              Fora do perfil
            </span>
          )}
        </div>

        {/* Ações do marco */}
        <div className="flex sm:flex-col gap-2 flex-shrink-0 sm:justify-center">
          <Button
            variant={noPerfil ? 'outline' : 'primary'}
            disabled={salvando}
            onClick={() => onAlternarPerfil(marco)}
            className="text-sm disabled:opacity-50 disabled:cursor-not-allowed"
          >
            {noPerfil ? 'Tirar do perfil' : 'Exibir no perfil'}
          </Button>
          <Button variant="outline" onClick={() => navigate(`/marcos/${marco.idBadge}`)} className="text-sm">
            Ver detalhes
          </Button>
        </div>
      </div>
    </Card>
  );
};

// Hook do timer sazonal
const useContador = (horasIniciais: number, minutosIniciais: number) => {
  const totalSegundos = horasIniciais * 3600 + minutosIniciais * 60;
  const [segundosRestantes, setSegundosRestantes] = useState(totalSegundos);

  useEffect(() => {
    const intervalo = setInterval(() => {
      setSegundosRestantes((s) => (s > 0 ? s - 1 : 0));
    }, 1000);
    return () => clearInterval(intervalo);
  }, []);

  const horas = Math.floor(segundosRestantes / 3600);
  const minutos = Math.floor((segundosRestantes % 3600) / 60);
  const segundos = segundosRestantes % 60;

  return {
    display: `${String(horas).padStart(2, '0')}h ${String(minutos).padStart(2, '0')}m ${String(segundos).padStart(2, '0')}s`,
    encerrado: segundosRestantes === 0,
  };
};

// Junta cada marco com a conquista do usuário (se ele estiver no perfil)
const juntarMarcos = (badges: Badge[], conquistas: Conquista[]): MarcoComConquista[] =>
  badges.map((badge) => ({
    ...badge,
    conquista: conquistas.find((conquista) => conquista.idBadge === badge.idBadge),
  }));

// Busca os marcos e as conquistas do usuário e junta os dois
const buscarMarcos = async () => {
  const badges = await listarBadges();
  const conquistas = await listarConquistas(USUARIO_ID);
  return juntarMarcos(badges, conquistas);
};

const Marcos: React.FC = () => {
  const contador = useContador(47, 12);

  const [marcos, setMarcos] = useState<MarcoComConquista[]>([]);
  const [loading, setLoading] = useState(true);
  const [erro, setErro] = useState('');
  const [salvando, setSalvando] = useState(false);
  const [aviso, setAviso] = useState('');

  // Muda de valor quando o usuário clica em "Tentar novamente"
  const [tentativa, setTentativa] = useState(0);

  // Espera os dados do usuário chegarem antes de buscar os marcos
  const { loading: carregandoUsuario } = useUser();

  // Busca os marcos e as conquistas do usuário na API
  useEffect(() => {
    if (carregandoUsuario) return;

    buscarMarcos()
      .then((dados) => {
        setMarcos(dados);
        setErro('');
      })
      .catch((error) => {
        console.error(error);
        setErro(error.message);
      })
      .finally(() => setLoading(false));
  }, [tentativa, carregandoUsuario]);

  const tentarNovamente = () => {
    setLoading(true);
    setTentativa(tentativa + 1);
  };

  // Coloca ou tira o marco do perfil
  const alternarPerfil = async (marco: MarcoComConquista) => {
    setSalvando(true);
    setAviso('');
    try {
      if (marco.conquista) {
        await excluirConquista(marco.conquista.idConquista);
        setAviso(`"${marco.nome}" saiu do seu perfil.`);
      } else {
        await criarConquista({ idUsuario: USUARIO_ID, idBadge: marco.idBadge });
        setAviso(`"${marco.nome}" agora aparece no seu perfil.`);
      }
      // A API não devolve o id da conquista criada, então buscamos a lista de novo
      const conquistas = await listarConquistas(USUARIO_ID);
      setMarcos(juntarMarcos(marcos, conquistas));
    } catch (error) {
      console.error(error);
      if (error instanceof Error) {
        setAviso(error.message);
      }
    } finally {
      setSalvando(false);
    }
  };

  const totalNoPerfil = marcos.filter((marco) => marco.conquista).length;

  return (
    <div className="min-h-screen bg-slate-50 flex flex-col font-sans">
      <Header />

      <main className="flex-1 pt-24 pb-20">
        <section className="max-w-[700px] xl:max-w-[1100px] mx-auto px-6">

          {/* Cabeçalho */}
          <div className="flex flex-col items-center text-center mb-8">
            <img src={almaImg} alt="Alma Digital" className="w-[140px] h-auto mb-4 animate-flutuar drop-shadow-lg" />
            <h2 className="text-3xl font-extrabold text-slate-800 mb-2">
              Marcos de <span className="text-emerald-500">Reputação</span>
            </h2>
            <p className="text-slate-500 text-base max-w-md">
              Sua estante de troféus. Escolha quais marcos aparecem no seu perfil e mostre a sua evolução.
            </p>
          </div>

          {/* Banner de Evento Sazonal */}
          {!contador.encerrado && (
            <div className="bg-amber-50 border border-amber-200 border-l-4 border-l-amber-500 rounded-2xl p-5 mb-8">
              <div className="flex items-start gap-3">
                <span className="text-2xl">🌱</span>
                <div className="flex-1">
                  <span className="inline-block bg-amber-100 text-amber-700 text-xs font-bold px-2 py-0.5 rounded-full uppercase tracking-wide mb-1.5">
                    Evento Sazonal
                  </span>
                  <h3 className="font-bold text-slate-800 text-base mb-1">Semana do Reflorestamento</h3>
                  <p className="text-sm text-slate-500 leading-snug">
                    Complete o plantio de uma muda antes do tempo acabar para desbloquear o{' '}
                    <span className="font-bold text-amber-700">Selo Lendário: Guardião da Floresta</span>.{' '}
                    Nunca mais estará disponível.
                  </p>
                  <div className="flex items-center gap-1.5 mt-3 text-amber-700 font-bold text-sm">
                    <span>⏱</span>
                    <span>Termina em {contador.display}</span>
                  </div>
                </div>
              </div>
            </div>
          )}

          {/* Aviso depois de colocar ou tirar um marco do perfil */}
          {aviso && (
            <div className="bg-green-50 border border-green-200 border-l-4 border-l-emerald-500 rounded-2xl px-5 py-3 mb-6 animate-slide-in-left">
              <p className="text-slate-800 text-sm font-medium">{aviso}</p>
            </div>
          )}

          {/* Lista de Marcos */}
          <div className="mb-16">
            {loading && <StatusMensagem status="carregando" mensagem="Carregando marcos..." />}

            {!loading && erro && (
              <StatusMensagem status="erro" mensagem={erro} onTentarNovamente={tentarNovamente} />
            )}

            {!loading && !erro && marcos.length === 0 && (
              <StatusMensagem status="vazio" mensagem="Nenhum marco cadastrado ainda." />
            )}

            {!loading && !erro && marcos.length > 0 && (
              <>
                <p className="text-sm text-slate-500 mb-4">
                  {totalNoPerfil} de {marcos.length} marcos no seu perfil
                </p>
                <div className="grid grid-cols-1 xl:grid-cols-2 gap-4">
                  {marcos.map((marco) => (
                    <MarcoCard
                      key={marco.idBadge}
                      marco={marco}
                      salvando={salvando}
                      onAlternarPerfil={alternarPerfil}
                    />
                  ))}
                </div>
              </>
            )}
          </div>

          {/* Explicação Técnica */}
          <div className="pt-10 border-t border-slate-200">
            <h3 className="text-xl font-extrabold text-slate-800 text-center mb-6">
              Sobre os Marcos de Reputação
            </h3>
            <div className="grid md:grid-cols-2 gap-6">
              <Card>
                <h4 className="text-emerald-500 font-bold text-base mb-3">O Problema</h4>
                <p className="text-slate-500 text-sm leading-relaxed">
                  A falta de progressão clara e de registro histórico dificulta a manutenção de práticas sustentáveis. Sem um sistema de validação de constância e metas, a evasão e o abandono de hábitos ecológicos por parte dos usuários são altos.
                </p>
              </Card>
              <Card>
                <h4 className="text-emerald-500 font-bold text-base mb-3">A Solução</h4>
                <p className="text-slate-500 text-sm leading-relaxed">
                  Cada marco é uma conquista permanente, liberada por ações validadas, ciclos fechados ou desafios cumpridos. Os lendários vêm de eventos sazonais e trilhas especiais. Você escolhe quais ficam à mostra no perfil, sem precisar postar nada no feed.
                </p>
              </Card>
            </div>
          </div>

        </section>
      </main>

      <Footer texto="© 2026 SoulUp - Monitoramento de Impacto Social" />
    </div>
  );
};

export default Marcos;