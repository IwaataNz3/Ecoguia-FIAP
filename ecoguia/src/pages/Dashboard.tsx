import { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { useForm } from 'react-hook-form';
import Header from '../components/Header';
import Footer from '../components/Footer';
import Card from '../components/Card';
import Button from '../components/Button';
import StatusMensagem from '../components/StatusMensagem';
import almaImg from '../assets/img/alma.png';
import { useUser } from '../context/UserContext';
import type { Badge } from '../types';
import { USUARIO_ID } from '../services/api';
import { atualizarAvatar } from '../services/avatarService';
import { atualizarUsuario } from '../services/usuarioService';
import { listarBadges } from '../services/badgeService';
import { listarConquistas } from '../services/conquistaService';
import { iconeDoMarco } from '../utils/marcos';

// Dados das ações sustentáveis
const acoes = [
  { id: 1, icone: '🚲', label: 'Fui de bicicleta ou a pé', co2: 2.1, residuos: 0, pontos: 120 },
  { id: 2, icone: '♻️', label: 'Descartei resíduo corretamente', co2: 0, residuos: 1.5, pontos: 90 },
  { id: 3, icone: '🌱', label: 'Evitei carne no almoço', co2: 1.3, residuos: 0, pontos: 70 },
  { id: 4, icone: '💡', label: 'Reduzi consumo de energia', co2: 0.8, residuos: 0, pontos: 50 },
];

// XP necessário para subir um nível (mesma regra do Java)
const XP_POR_NIVEL = 1000;

// CO2 e resíduos são calculados só no site e não ficam salvos no banco
const CO2_INICIAL = 12.5;
const RESIDUOS_INICIAL = 8.2;

interface RegistroActionForm {
  acaoId: string;
}

// Busca os marcos que o usuário escolheu exibir no perfil
const buscarMarcosDoPerfil = async () => {
  const badges = await listarBadges();
  const conquistas = await listarConquistas(USUARIO_ID);
  return badges.filter((badge) => conquistas.find((conquista) => conquista.idBadge === badge.idBadge));
};

const Dashboard: React.FC = () => {
  const { usuario, avatar, loading, erro, setUsuario, setAvatar, recarregar } = useUser();

  // Métricas locais
  const [co2, setCo2] = useState(CO2_INICIAL);
  const [residuos, setResiduos] = useState(RESIDUOS_INICIAL);

  // Marcos exibidos no perfil
  const [marcosPerfil, setMarcosPerfil] = useState<Badge[]>([]);
  const [loadingMarcos, setLoadingMarcos] = useState(true);
  const [erroMarcos, setErroMarcos] = useState('');

  // Formulário de registro
  const { register, handleSubmit, reset, formState: { errors, isValid } } = useForm<RegistroActionForm>({
    mode: 'onChange',
  });
  const [painelAberto, setPainelAberto] = useState(false);
  const [salvando, setSalvando] = useState(false);
  const [erroAcao, setErroAcao] = useState('');
  const [feedback, setFeedback] = useState<{ pontos: number; mensagem: string; subiuNivel: boolean; somouCiclo: boolean } | null>(null);

  // Eco-Ciclo: só a primeira ação do dia aumenta a ofensiva
  const [cicloDeHoje, setCicloDeHoje] = useState(false);

  // Espera os dados do usuário chegarem antes de buscar os marcos
  useEffect(() => {
    if (loading) return;

    buscarMarcosDoPerfil()
      .then((dados) => setMarcosPerfil(dados))
      .catch((error) => {
        console.error(error);
        setErroMarcos(error.message);
      })
      .finally(() => setLoadingMarcos(false));
  }, [loading]);

  // Soma o XP da ação e salva o avatar na API
  const onSubmit = async (data: RegistroActionForm) => {
    const acao = acoes.find((a) => a.id === parseInt(data.acaoId));
    if (!acao || !avatar || !usuario) return;

    setSalvando(true);
    setErroAcao('');
    try {
      const avatarSalvo = await atualizarAvatar({ ...avatar, xpAtual: avatar.xpAtual + acao.pontos });

      // Primeira ação do dia: soma +1 no Eco-Ciclo do usuário
      if (!cicloDeHoje) {
        const usuarioSalvo = await atualizarUsuario({ ...usuario, ofensivaAtual: usuario.ofensivaAtual + 1 });
        setUsuario(usuarioSalvo);
        setCicloDeHoje(true);
      }

      setFeedback({
        pontos: acao.pontos,
        mensagem: acao.label,
        subiuNivel: avatarSalvo.nivelAtual > avatar.nivelAtual,
        somouCiclo: !cicloDeHoje,
      });
      setAvatar(avatarSalvo);
      setCo2((prev) => parseFloat((prev + acao.co2).toFixed(1)));
      setResiduos((prev) => parseFloat((prev + acao.residuos).toFixed(1)));
      setPainelAberto(false);
      reset();
    } catch (error) {
      console.error(error);
      if (error instanceof Error) {
        setErroAcao(error.message);
      }
    } finally {
      setSalvando(false);
    }
  };

  // Temporizador do alerta de feedback
  useEffect(() => {
    if (feedback) {
      const timer = setTimeout(() => setFeedback(null), 5000);
      return () => clearTimeout(timer);
    }
  }, [feedback]);

  // Tela de carregamento ou erro enquanto os dados do usuário não chegam
  if (loading || erro || !usuario || !avatar) {
    return (
      <div className="min-h-screen bg-slate-50 flex flex-col font-sans">
        <Header />
        <main className="flex-1 pt-24 pb-20">
          <section className="container mx-auto px-6 max-w-[950px]">
            {loading ? (
              <StatusMensagem status="carregando" mensagem="Carregando seu painel..." />
            ) : (
              <StatusMensagem status="erro" mensagem={erro || 'Usuário não encontrado'} onTentarNovamente={recarregar} />
            )}
          </section>
        </main>
        <Footer texto="© 2026 SoulUp - Dashboard de Impacto Verificado" />
      </div>
    );
  }

  const nivel = avatar.nivelAtual;
  const pontos = Math.round(avatar.xpAtual % XP_POR_NIVEL);
  const progressoPct = Math.round((pontos / XP_POR_NIVEL) * 100);
  const streak = usuario.ofensivaAtual;

  return (
    <div className="min-h-screen bg-slate-50 flex flex-col font-sans">
      <Header />

      <main className="flex-1 pt-24 pb-20">
        <section className="container mx-auto px-6 flex flex-col items-center">

          {/* Feedback de ação registrada */}
          {feedback && (
            <div className="w-full max-w-[950px] mb-6 bg-green-50 border border-green-200 border-l-4 border-l-emerald-500 rounded-2xl px-6 py-4 flex items-center gap-4 animate-slide-in-left">
              <span className="text-3xl">{feedback.subiuNivel ? '🎉' : '✅'}</span>
              <div>
                <p className="font-bold text-slate-800">
                  {feedback.subiuNivel ? `Subiu de nível! Seu avatar está no nível ${nivel}.` : 'Motor registrou sua ação!'}
                </p>
                <p className="text-slate-500 text-sm">"{feedback.mensagem}":&nbsp;
                  <span className="text-emerald-500 font-bold">+{feedback.pontos} XP</span> adicionados à sua Aura.
                  {feedback.somouCiclo && <span className="text-orange-600 font-bold"> 🔥 Eco-Ciclo +1 dia!</span>}
                </p>
              </div>
            </div>
          )}

          {/* Profile Card */}
          <div className="bg-white w-full max-w-[950px] rounded-3xl shadow-md border border-slate-200 p-8 md:p-12 mb-8 flex flex-col md:flex-row items-center gap-8 md:gap-12 relative overflow-hidden">

            {/* Avatar */}
            <div className="relative flex-shrink-0">
              <div className="w-32 h-32 rounded-full bg-green-50 flex items-center justify-center text-6xl shadow-inner relative z-10 border-4 border-white">
                👤
              </div>
              <div className="absolute top-0 left-0 w-full h-full rounded-full bg-emerald-500/20 animate-pulsar-aura blur-xl z-0 scale-150"></div>
              <div className="absolute -bottom-2 -right-2 bg-emerald-500 text-white w-10 h-10 rounded-full flex items-center justify-center font-bold border-4 border-white z-20">
                {nivel}
              </div>
            </div>

            {/* Info */}
            <div className="flex-1 text-center md:text-left z-10 w-full">
              <h2 className="text-3xl font-bold text-slate-800 mb-1">{usuario.nome}</h2>
              <p className="text-slate-500 text-sm mb-1">📍 {usuario.cidade || 'Cidade não informada'}</p>
              <p className="text-slate-500 text-sm mb-3">
                Eco-Ciclo de {streak} {streak === 1 ? 'dia' : 'dias'}. Registre uma ação por dia: se parar, a pontuação cai um pouco.
              </p>
              <div className="flex flex-wrap justify-center md:justify-start items-center gap-3 mb-4">
                <span className="inline-block bg-orange-100 text-orange-600 px-4 py-1.5 rounded-full font-bold text-sm">
                  🔥 Eco-Ciclo: {streak} {streak === 1 ? 'dia' : 'dias'}
                </span>
                <Link to="/perfil/editar" className="text-sm font-bold text-emerald-500 hover:text-emerald-600">
                  ✏️ Editar perfil
                </Link>
              </div>

              {/* Barra de XP */}
              <div className="w-full">
                <div className="flex justify-between text-sm font-medium text-slate-500 mb-1.5">
                  <span>Progresso da Aura</span>
                  <span className="text-emerald-500 font-bold">{pontos} / {XP_POR_NIVEL} XP</span>
                </div>
                <div className="w-full bg-gray-100 rounded-full h-3 overflow-hidden">
                  {/* Largura dinâmica: depende do XP, por isso fica no style */}
                  <div
                    className="bg-emerald-500 h-3 rounded-full transition-all duration-700"
                    style={{ width: `${progressoPct}%` }}
                  />
                </div>
                <p className="text-xs text-slate-500 mt-1">Nível {nivel} → {progressoPct}% concluído · {avatar.xpAtual} XP no total</p>
              </div>
            </div>

            {/* Alma / Avatar */}
            <div className="md:border-l-2 md:border-dashed md:border-slate-200 md:pl-12 flex flex-col items-center z-10">
              <img src={almaImg} alt="Alma Digital" className="w-28 mb-3 animate-flutuar" />
              <span className="text-sm font-bold text-emerald-500 bg-green-50 px-3 py-1 rounded-full uppercase tracking-wider">
                {avatar.nome} · Nível {nivel}
              </span>
              <Link to="/beneficios" className="text-xs font-bold text-emerald-500 hover:text-emerald-600 mt-2">
                Ver benefícios do nível →
              </Link>
            </div>
          </div>

          <div className="w-full max-w-[950px] mb-8">
            <Button
              fullWidth
              onClick={() => { setPainelAberto(!painelAberto); setErroAcao(''); reset(); }}
              className="py-4 rounded-md font-semibold text-base"
            >
              {painelAberto ? 'Cancelar' : 'Registrar Ação Ecológica'}
            </Button>

            {/* Painel de seleção de ação (usando React Hook Form) */}
            {painelAberto && (
              <form onSubmit={handleSubmit(onSubmit)} className="bg-white border border-slate-200 rounded-2xl p-6 mt-3 shadow-sm">
                <p className="text-slate-800 font-bold mb-1">O que você fez hoje?</p>
                <p className="text-slate-500 text-sm mb-4">Selecione a ação. No app da SoulUp, ela é comprovada com uma foto tirada na hora.</p>

                <div className="grid sm:grid-cols-2 gap-3 mb-4">
                  {acoes.map((acao) => (
                    <label
                      key={acao.id}
                      className="cursor-pointer flex items-center gap-3 p-4 rounded-xl border-2 transition-all border-slate-200 hover:border-emerald-500/50 has-checked:border-emerald-500 has-checked:bg-green-50 has-checked:shadow-sm"
                    >
                      <input
                        type="radio"
                        value={acao.id}
                        {...register("acaoId", { required: "Selecione uma ação válida" })}
                        className="hidden"
                      />
                      <span className="text-2xl">{acao.icone}</span>
                      <div>
                        <p className="font-semibold text-slate-800 text-sm">{acao.label}</p>
                        <p className="text-emerald-500 text-xs font-bold">+{acao.pontos} XP</p>
                      </div>
                    </label>
                  ))}
                </div>
                {errors.acaoId && <p className="text-red-500 text-sm mb-3 font-bold">{errors.acaoId.message}</p>}
                {erroAcao && <p className="text-red-500 text-sm mb-3 font-bold">⚠️ {erroAcao}</p>}

                <Button
                  type="submit"
                  fullWidth
                  disabled={!isValid || salvando}
                  className="disabled:bg-slate-300 disabled:shadow-none disabled:cursor-not-allowed"
                >
                  {salvando ? 'Enviando ao Motor...' : 'Confirmar e Enviar ao Motor'}
                </Button>
              </form>
            )}
          </div>

          {/* Metrics Row usando Componente Reutilizável Card */}
          <div className="w-full max-w-[950px] grid md:grid-cols-3 gap-6 mb-8">
            <Card className="text-center p-6">
              <p className="text-3xl font-bold text-emerald-500 mb-2">{co2} kg</p>
              <p className="text-slate-500 text-sm font-medium uppercase tracking-wider">CO2 Evitado</p>
            </Card>

            <Card className="text-center p-6">
              <p className="text-3xl font-bold text-emerald-500 mb-2">{residuos} kg</p>
              <p className="text-slate-500 text-sm font-medium uppercase tracking-wider">Resíduos Desviados</p>
            </Card>

            <Card className="text-center p-6">
              <p className="text-3xl font-bold text-emerald-500 mb-2">Nível {nivel}</p>
              <p className="text-slate-500 text-sm font-medium uppercase tracking-wider">Status do Avatar</p>
            </Card>
          </div>

          {/* Marcos exibidos no perfil */}
          <div className="w-full max-w-[950px] mb-16">
            <div className="flex justify-between items-center mb-4">
              <h3 className="text-xl font-extrabold text-slate-800 mb-0">Marcos no perfil</h3>
              <Link to="/marcos" className="text-sm font-bold text-emerald-500 hover:text-emerald-600">
                Gerenciar marcos →
              </Link>
            </div>

            {loadingMarcos && <StatusMensagem status="carregando" mensagem="Carregando marcos..." />}
            {!loadingMarcos && erroMarcos && <StatusMensagem status="erro" mensagem={erroMarcos} />}
            {!loadingMarcos && !erroMarcos && marcosPerfil.length === 0 && (
              <StatusMensagem status="vazio" mensagem="Você ainda não escolheu marcos para exibir no perfil." />
            )}
            {!loadingMarcos && !erroMarcos && marcosPerfil.length > 0 && (
              <div className="flex flex-wrap gap-3">
                {marcosPerfil.map((marco) => (
                  <Link
                    key={marco.idBadge}
                    to={`/marcos/${marco.idBadge}`}
                    className="flex items-center gap-2 bg-white border border-slate-200 hover:border-emerald-500 rounded-full px-4 py-2 transition-colors"
                  >
                    <span className="text-xl">{iconeDoMarco(marco.tipo)}</span>
                    <span className="text-sm font-bold text-slate-800">{marco.nome}</span>
                  </Link>
                ))}
              </div>
            )}
          </div>

          {/* Technical Info */}
          <div className="w-full max-w-[950px] mb-8 mt-4">
            <h3 className="text-xl font-extrabold text-slate-800 text-center">Sobre o Dashboard</h3>
          </div>
          <div className="w-full max-w-[950px] grid md:grid-cols-2 gap-8">
            <Card className="bg-slate-50">
              <h4 className="text-lg font-bold text-slate-800 mb-3">O Problema</h4>
              <p className="text-slate-500 text-sm leading-relaxed">
                Sem o EcoGuia, o único jeito de mostrar suas ações sustentáveis é postar no feed. Isso cansa, soa como autopromoção e não deixa claro o impacto real, como o CO2 evitado e os resíduos desviados.
              </p>
            </Card>
            <Card className="bg-slate-50">
              <h4 className="text-lg font-bold text-slate-800 mb-3">A Solução</h4>
              <p className="text-slate-500 text-sm leading-relaxed">
                O painel reúne tudo o que o motor já validou: o nível da Alma Digital, o XP, o Eco-Ciclo e os marcos que você escolheu exibir. Cada ação registrada aqui atualiza o seu perfil na hora, sem precisar postar.
              </p>
            </Card>
          </div>

        </section>
      </main>

      <Footer texto="© 2026 SoulUp - Dashboard de Impacto Verificado" />
    </div>
  );
};

export default Dashboard;