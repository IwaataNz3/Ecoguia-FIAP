import { Link } from 'react-router-dom';
import Header from '../components/Header';
import Footer from '../components/Footer';
import Card from '../components/Card';
import StatusMensagem from '../components/StatusMensagem';
import almaImg from '../assets/img/alma.png';
import { useUser } from '../context/UserContext';
import type { Beneficio } from '../types';

// XP necessário para subir um nível (mesma regra do Java)
const XP_POR_NIVEL = 1000;

// Privilégios do Eco-Ciclo, liberados conforme o nível do avatar
const beneficios: Beneficio[] = [
  { icone: '✅', titulo: 'Selo de Perfil Verificado', descricao: 'Seu perfil mostra que as ações foram validadas pelo Motor de Reputação.', nivelMinimo: 1 },
  { icone: '🌐', titulo: 'Aura visível no Feed', descricao: 'A borda da Aura aparece na sua foto em todo o Feed da SoulUp, sem precisar postar.', nivelMinimo: 2 },
  { icone: '🏆', titulo: 'Estante de Marcos em destaque', descricao: 'Seus marcos aparecem no topo do perfil para toda a sua rede de contatos.', nivelMinimo: 3 },
  { icone: '🌱', titulo: 'Acesso antecipado a trilhas', descricao: 'Participe de trilhas e eventos sazonais antes do restante da comunidade.', nivelMinimo: 4 },
  { icone: '💬', titulo: 'Suporte prioritário', descricao: 'Seus chamados no Contato entram na frente da fila de atendimento.', nivelMinimo: 5 },
  { icone: '👑', titulo: 'Elite Ecológica', descricao: 'Moldura exclusiva da Alma Digital, reservada para quem mantém o Eco-Ciclo por mais tempo.', nivelMinimo: 6 },
];

const Beneficios: React.FC = () => {
  const { avatar, loading, erro, recarregar } = useUser();

  const nivel = avatar?.nivelAtual ?? 0;
  const ativos = beneficios.filter((beneficio) => beneficio.nivelMinimo <= nivel).length;
  const proximo = beneficios.find((beneficio) => beneficio.nivelMinimo > nivel);
  const xpFaltando = avatar ? Math.round(XP_POR_NIVEL - (avatar.xpAtual % XP_POR_NIVEL)) : 0;

  return (
    <div className="min-h-screen bg-slate-50 flex flex-col font-sans">
      <Header />

      <main className="flex-1 pt-24 pb-20">
        <section className="max-w-[700px] xl:max-w-[1100px] mx-auto px-6">

          {/* Cabeçalho */}
          <div className="flex flex-col items-center text-center mb-8">
            <img src={almaImg} alt="Alma Digital" className="w-[140px] h-auto mb-4 animate-flutuar drop-shadow-lg" />
            <h2 className="text-3xl font-extrabold text-slate-800 mb-2">
              Benefícios do <span className="text-emerald-500">Eco-Ciclo</span>
            </h2>
            <p className="text-slate-500 text-base max-w-md">
              Quanto mais constante você é, mais privilégios a sua Aura libera na SoulUp.
            </p>
          </div>

          {loading && <StatusMensagem status="carregando" mensagem="Carregando seus benefícios..." />}

          {!loading && (erro || !avatar) && (
            <StatusMensagem status="erro" mensagem={erro || 'Avatar não encontrado'} onTentarNovamente={recarregar} />
          )}

          {!loading && !erro && avatar && (
            <>
              {/* Resumo do nível */}
              <div className="bg-green-50 border border-green-200 border-l-4 border-l-emerald-500 rounded-2xl p-5 mb-8 flex flex-col sm:flex-row sm:items-center gap-3">
                <span className="text-3xl">{proximo ? '✨' : '👑'}</span>
                <div className="flex-1">
                  <p className="font-bold text-slate-800">
                    {proximo ? `Nível ${nivel}: ${ativos} de ${beneficios.length} benefícios ativos` : 'Você faz parte da elite ecológica!'}
                  </p>
                  <p className="text-sm text-slate-500">
                    {proximo
                      ? `Faltam ${xpFaltando} XP para o nível ${nivel + 1}. O próximo benefício é "${proximo.titulo}" (nível ${proximo.nivelMinimo}).`
                      : 'Todos os benefícios do Eco-Ciclo estão liberados para você.'}
                  </p>
                </div>
                <Link to="/dashboard" className="text-sm font-bold text-emerald-500 hover:text-emerald-600 whitespace-nowrap">
                  Registrar ação →
                </Link>
              </div>

              {/* Lista de benefícios */}
              <div className="grid grid-cols-1 xl:grid-cols-2 gap-4 mb-16">
                {beneficios.map((beneficio) => {
                  const ativo = beneficio.nivelMinimo <= nivel;
                  return (
                    <Card
                      key={beneficio.titulo}
                      className={`p-6 ${ativo ? 'border-l-4 border-l-emerald-500 shadow-md' : 'opacity-70'}`}
                    >
                      <div className="flex gap-4">
                        <div className={`w-14 h-14 rounded-xl flex items-center justify-center text-2xl flex-shrink-0 border ${
                          ativo ? 'bg-green-50 border-green-100' : 'bg-slate-100 border-slate-200 grayscale'
                        }`}>
                          {beneficio.icone}
                        </div>
                        <div className="flex-1 min-w-0">
                          <h3 className="text-base font-bold text-slate-800 mb-1">{beneficio.titulo}</h3>
                          <p className="text-sm text-slate-500 mb-3 leading-snug">{beneficio.descricao}</p>
                          {ativo ? (
                            <span className="inline-block bg-green-100 text-emerald-600 text-xs font-bold px-3 py-1 rounded-full uppercase">
                              ✓ Ativo
                            </span>
                          ) : (
                            <span className="inline-block bg-slate-100 text-slate-500 text-xs font-bold px-3 py-1 rounded-full uppercase">
                              🔒 Libera no nível {beneficio.nivelMinimo}
                            </span>
                          )}
                        </div>
                      </div>
                    </Card>
                  );
                })}
              </div>
            </>
          )}

        </section>
      </main>

      <Footer texto="© 2026 SoulUp - Benefícios do Eco-Ciclo" />
    </div>
  );
};

export default Beneficios;
