import React from 'react';
import Header from '../components/Header';
import Footer from '../components/Footer';
import FaqItem from '../components/FaqItem';
import type { FaqItemData } from '../types';

// Perguntas e respostas da página
const perguntas: FaqItemData[] = [
  {
    pergunta: 'Como eu comprovo uma ação sustentável?',
    resposta: 'Você escolhe o desafio e tira a foto na hora, pela câmera do aplicativo. A galeria fica desativada, então fotos antigas ou tiradas da internet não são aceitas. A foto guarda o local e o horário em que foi tirada.',
  },
  {
    pergunta: 'Quem valida a minha ação?',
    resposta: 'As ações comuns passam por checagens automáticas. As que valem mais pontos, as de trilhas patrocinadas e as de contas novas vão para três usuários com Aura alta, sorteados de forma anônima. A ação só gera pontos se a maioria aprovar, e quem valida também ganha pontos.',
  },
  {
    pergunta: 'O que acontece se alguém tentar fraudar?',
    resposta: 'A LuminaTech audita parte das validações. Quem fraudar tem a conta suspensa por 30 dias e, se repetir, a conta é banida. O validador que aprovar uma fraude fica 30 dias sem poder validar.',
  },
  {
    pergunta: 'O que são os Eco-Ciclos?',
    resposta: 'É a sua ofensiva de dias seguidos com ação registrada. Se você mantém a constância, o ciclo aumenta. Se para de registrar, a pontuação sofre um leve decaimento, então vale voltar todos os dias.',
  },
  {
    pergunta: 'Qual a diferença entre Aura de Perfil e Alma Digital?',
    resposta: 'A Aura de Perfil é a borda colorida ao redor da sua foto e mostra o quanto você foi ativo nos últimos sete dias. A Alma Digital é o avatar de longo prazo, que evolui quando você fecha ciclos e conquista marcos.',
  },
  {
    pergunta: 'Os Marcos ficam salvos para sempre?',
    resposta: 'Sim. Os marcos conquistados ficam guardados na aba Marcos, como uma estante de troféus, e você escolhe quais aparecem no seu perfil.',
  },
  {
    pergunta: 'O que é uma trilha patrocinada?',
    resposta: 'É um desafio pago por uma marca sustentável. Quem cumpre a meta ganha uma badge exclusiva e um cupom de desconto da marca. Toda proposta passa pela triagem da LuminaTech antes de ser publicada.',
  },
  {
    pergunta: 'As marcas e ONGs veem os meus dados?',
    resposta: 'Não. Marcas e ONGs recebem só relatórios com dados anonimizados, conforme a LGPD. O contato direto com uma ONG só acontece se você autorizar.',
  },
  {
    pergunta: 'O EcoGuia é pago?',
    resposta: 'O uso básico é gratuito. Quem quiser pode assinar o plano premium, com níveis superiores da Alma Digital e relatórios detalhados de impacto.',
  },
];

// Página de dúvidas frequentes
const FAQ: React.FC = () => {
  return (
    <div className="min-h-screen bg-slate-50 flex flex-col font-sans">
      <Header />
      
      <main className="flex-1 pt-24 pb-20">
        <section className="container mx-auto px-6">
          <div className="text-center mb-16">
            <h2 className="text-4xl font-bold text-slate-800 mb-4">
              Dúvidas <span className="text-emerald-500">Frequentes</span>
            </h2>
            <p className="text-slate-500 text-lg max-w-2xl mx-auto">
              Esclareça os principais pontos sobre o Motor de Reputação. Não achou sua resposta? Fale com a gente na página de Contato.
            </p>
          </div>

          <div className="max-w-3xl mx-auto space-y-4">
            {perguntas.map((item) => (
              <FaqItem key={item.pergunta} pergunta={item.pergunta} resposta={item.resposta} />
            ))}
          </div>
        </section>
      </main>

      <Footer texto="© 2026 SoulUp - Projeto de Engenharia Front-End" />
    </div>
  );
};

export default FAQ;
