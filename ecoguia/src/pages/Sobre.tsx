import Header from '../components/Header';
import Footer from '../components/Footer';
import Card from '../components/Card';
import almaImg from '../assets/img/alma.png';

// Camadas de validação das ações
const camadasValidacao = [
  { icone: '📸', titulo: 'Foto na hora', texto: 'O comprovante só sai pela câmera do app. Foto antiga ou da internet não vale.' },
  { icone: '🔁', titulo: 'Imagem repetida', texto: 'O sistema recusa fotos iguais ou muito parecidas com as que já foram enviadas.' },
  { icone: '👥', titulo: 'Comunidade', texto: 'Três usuários com Aura alta, sorteados e anônimos, conferem a ação. Vale a maioria.' },
  { icone: '🔍', titulo: 'Auditoria', texto: 'A LuminaTech revisa uma parte das validações. Fraude suspende a conta por 30 dias.' },
  { icone: '⚖️', titulo: 'Conforme o valor', texto: 'Ações comuns passam pelas checagens automáticas. As de mais pontos vão para a comunidade.' },
];

// Quem participa do modelo de negócio
const participantes = [
  { icone: '🌐', nome: 'SoulUp', tipo: 'Cliente', texto: 'Integra o motor à rede social e paga a implantação e a mensalidade, com suporte dedicado.' },
  { icone: '🏷️', nome: 'Marcas', tipo: 'Patrocínio', texto: 'Patrocinam trilhas com badge exclusiva e cupom, e recebem só dados anonimizados.' },
  { icone: '🌳', nome: 'ONGs parceiras', tipo: 'Parceria', texto: 'Criam os desafios das suas causas e definem quantos pontos cada ação vale. Não pagam.' },
  { icone: '🙋', nome: 'Usuário', tipo: 'Gratuito', texto: 'Usa de graça, ganha reputação no perfil e pode assinar o plano premium.' },
];

const Sobre: React.FC = () => {
  return (
    <div className="min-h-screen bg-slate-50 flex flex-col">
      <Header />
      
      <main className="flex-1">
        {/* Hero */}
        <section
          className="py-24 text-center px-6 bg-linear-to-b from-[#e6f4ea] to-[#f8fafc]"
        >
          <span className="text-emerald-500 font-bold uppercase tracking-wider text-sm block mb-4">
            A Tecnologia por trás
          </span>
          <h2 className="text-4xl md:text-5xl text-slate-800 font-extrabold mb-4">
            O Motor de Reputação <span className="text-emerald-500">SoulUp</span>
          </h2>
          <p className="text-xl text-slate-500 max-w-3xl mx-auto">
            Transformando ações sustentáveis do dia a dia em reputação no seu perfil, sem precisar postar no feed.
          </p>
        </section>

        {/* Anatomia do Motor */}
        <section className="py-12">
          <div className="w-11/12 max-w-6xl mx-auto flex flex-col md:flex-row gap-16 items-start">
            <div className="flex-[1.2]">
              <h3 className="text-3xl mb-6 text-slate-800 font-extrabold">O que é o Motor?</h3>
              <div className="flex flex-col gap-6 mt-8">
                <p className="text-lg leading-relaxed text-slate-500 text-justify">
                  O <strong>Motor de Reputação Social</strong> é o núcleo do EcoGuia, integrado à SoulUp. Ele contabiliza nos bastidores as ações sustentáveis validadas do usuário e as converte em pontos, que atualizam o perfil automaticamente. Assim, ninguém precisa postar no feed o tempo todo para ser reconhecido.
                </p>
                <p className="text-lg leading-relaxed text-slate-500 text-justify">
                  A lógica se baseia na <strong>consistência</strong>, pelos <strong>Eco-Ciclos</strong>. Cada dia com ação registrada aumenta a sua ofensiva. Se você para de registrar, a pontuação sofre um leve decaimento, o que incentiva a voltar todos os dias para não perder o progresso.
                </p>
                <p className="text-lg leading-relaxed text-slate-500 text-justify">
                  A reputação aparece de duas formas. A <strong>Aura de Perfil</strong> é uma borda colorida ao redor da foto, que mostra o quanto você foi ativo nos últimos sete dias. A <strong>Alma Digital</strong> é o avatar de longo prazo: ela evolui quando você fecha ciclos e atinge marcos, que ficam salvos na aba Marcos como uma estante de troféus.
                </p>
              </div>
            </div>

            <div className="flex-[0.8] flex justify-center w-full">
              <img
                src={almaImg}
                alt="SoulUp Tech Avatar"
                className="w-full max-w-md animate-flutuar-lento drop-shadow-[0_20px_40px_rgba(16,185,129,0.15)]"
              />
            </div>
          </div>
        </section>

        {/* Benefícios */}
        <section className="py-20 bg-slate-50 flex justify-center">
          <div className="max-w-3xl text-center mx-auto px-6">
            <h3 className="text-3xl text-slate-800 mb-6 font-extrabold">Valor e Utilidade da Reputação</h3>
            <p className="text-lg leading-relaxed text-slate-500 mb-6">
              A reputação acumulada vira um histórico verificado da sua contribuição ambiental. Ela funciona como um currículo de sustentabilidade, que a sua rede de contatos enxerga no seu perfil sem que você precise se autopromover.
            </p>
            <p className="text-lg leading-relaxed text-slate-500 mb-6">
              A evolução da Alma Digital também libera benefícios, e as trilhas patrocinadas por marcas sustentáveis dão badges exclusivas e cupons de desconto. O uso básico é gratuito, e quem quiser pode assinar o plano premium, com níveis superiores do avatar e relatórios detalhados de impacto.
            </p>
          </div>
        </section>

        {/* Como a ação é comprovada */}
        <section className="py-20 bg-white">
          <div className="w-11/12 max-w-6xl mx-auto">
            <div className="text-center mb-12">
              <h3 className="text-3xl text-slate-800 font-extrabold mb-4">Como sua ação é comprovada</h3>
              <p className="text-lg text-slate-500 max-w-2xl mx-auto">
                Para a reputação ter valor, cada ação precisa ser comprovada. A validação funciona em cinco camadas.
              </p>
            </div>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-5 gap-6">
              {camadasValidacao.map((camada) => (
                <Card key={camada.titulo} hoverable className="bg-slate-50 border-transparent">
                  <span className="text-4xl mb-4 block">{camada.icone}</span>
                  <h4 className="text-slate-800 text-lg font-bold mb-2">{camada.titulo}</h4>
                  <p className="text-slate-500 leading-relaxed text-sm m-0">{camada.texto}</p>
                </Card>
              ))}
            </div>
          </div>
        </section>

        {/* Quem participa */}
        <section className="py-20">
          <div className="w-11/12 max-w-6xl mx-auto">
            <div className="text-center mb-12">
              <h3 className="text-3xl text-slate-800 font-extrabold mb-4">Quem participa</h3>
              <p className="text-lg text-slate-500 max-w-2xl mx-auto">
                O EcoGuia segue o modelo B2B2C: a LuminaTech entrega o motor para a SoulUp, que leva até o usuário.
              </p>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-4 gap-6">
              {participantes.map((participante) => (
                <Card key={participante.nome}>
                  <div className="flex items-center justify-between mb-4">
                    <span className="text-4xl">{participante.icone}</span>
                    <span className="bg-emerald-50 text-emerald-600 text-xs font-bold uppercase tracking-wider px-3 py-1 rounded-full">
                      {participante.tipo}
                    </span>
                  </div>
                  <h4 className="text-slate-800 text-xl font-bold mb-2">{participante.nome}</h4>
                  <p className="text-slate-500 leading-relaxed text-sm m-0">{participante.texto}</p>
                </Card>
              ))}
            </div>
          </div>
        </section>

        {/* Explicação Técnica */}
        <section className="mb-16">
          <div className="w-11/12 max-w-6xl mx-auto">
            <div className="text-center mb-8">
              <h3 className="text-3xl text-slate-800 font-bold">Contexto e Resolução do Problema</h3>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
              <Card>
                <h4 className="text-emerald-500 mb-4 text-xl font-bold">O Problema Estrutural</h4>
                <p className="text-slate-500 leading-relaxed text-base">
                  Nas redes sociais de impacto, quem separa o lixo ou escolhe um transporte limpo só é reconhecido se postar no feed. Isso cansa, polui a rede e soa como autopromoção. Sem um jeito de contar o impacto de forma passiva, a intenção de ser sustentável não vira hábito, e a plataforma perde engajamento.
                </p>
              </Card>
              <Card>
                <h4 className="text-emerald-500 mb-4 text-xl font-bold">A Solução Proposta</h4>
                <p className="text-slate-500 leading-relaxed text-base">
                  O EcoGuia é uma gamificação invisível dentro da SoulUp. O usuário registra a ação com uma foto, o motor confere e transforma a ação em pontos, nível e marcos. O reconhecimento aparece no perfil, sem depender de postagens.
                </p>
              </Card>
              <Card>
                <h4 className="text-emerald-500 mb-4 text-xl font-bold">A Mecânica do Motor</h4>
                <p className="text-slate-500 leading-relaxed text-base">
                  A pontuação não é um acúmulo infinito. Ela sofre decaimento se o usuário para de registrar ações, e por isso a Aura de Perfil mostra sempre o comportamento atual da pessoa. A constância vale mais do que um pico de atividade isolado.
                </p>
              </Card>
            </div>
          </div>
        </section>
      </main>

      <Footer texto="© 2026 SoulUp - Todos os direitos reservados." />
    </div>
  );
};

export default Sobre;
