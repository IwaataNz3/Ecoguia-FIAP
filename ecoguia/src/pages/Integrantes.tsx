import React from 'react';
import Header from '../components/Header';
import Footer from '../components/Footer';
import fotoAna from '../assets/img/foto-ana.jpeg';
import fotoGabriella from '../assets/img/foto-gabriella.jpg';
import fotoJulio from '../assets/img/foto-julio.jpg';
import fotoRafael from '../assets/img/foto-rafael.jpg';
import fotoVictor from '../assets/img/foto-victor.jpg';
import type { Membro } from '../types';

interface MembroCardProps {
  membro: Membro;
}

// Componente visual do card de cada membro
const MembroCard: React.FC<MembroCardProps> = ({ membro }) => (
  <div className="bg-white p-8 rounded-2xl shadow-sm border-2 border-slate-100 flex flex-col items-center text-center hover:border-emerald-500 transition-colors">
    <div className="w-24 h-24 rounded-full overflow-hidden border-2 border-emerald-500 mb-6">
      <img src={membro.foto} alt={membro.nome} className="w-full h-full object-cover hover:scale-110 transition-transform duration-300" />
    </div>
    <h3 className="text-lg font-bold text-slate-800 mb-4">{membro.nome}</h3>
    
    <div className="flex flex-col gap-2 mb-6 items-center">
      <span className="bg-green-100 text-emerald-600 px-4 py-1 rounded-full text-xs font-bold tracking-wide">RM {membro.rm}</span>
      <span className="bg-green-100 text-emerald-600 px-4 py-1 rounded-full text-xs font-bold tracking-wide">{membro.turma}</span>
    </div>
    
    <div className="flex gap-3 mt-auto w-full justify-center">
      <a href={membro.linkedin} target="_blank" rel="noopener noreferrer" className="bg-slate-100 text-slate-500 hover:bg-slate-200 px-4 py-2 rounded-md text-sm font-medium transition-colors">LinkedIn</a>
      <a href={`https://github.com/${membro.github}`} target="_blank" rel="noopener noreferrer" className="bg-slate-100 text-slate-500 hover:bg-slate-200 px-4 py-2 rounded-md text-sm font-medium transition-colors">GitHub</a>
    </div>
  </div>
);

// Página com a lista de desenvolvedores
const Integrantes: React.FC = () => {
  // Lista de membros do projeto
  const membros: Membro[] = [
    { nome: "Ana Paula Cunha Brum", rm: "571359", turma: "1º TDSR", linkedin: "https://www.linkedin.com/in/ana-paula-brum/", github: "abbrum", foto: fotoAna },
    { nome: "Gabriella Serni Ponzetta", rm: "566296", turma: "1º TDSR", linkedin: "https://www.linkedin.com/in/gabriellaserni/", github: "gabriellaserni", foto: fotoGabriella },
    { nome: "Julio Cesar Iwata de Oliveira Barros", rm: "573723", turma: "1º TDSR", linkedin: "https://www.linkedin.com/in/julioiwata/", github: "IwaataNz3", foto: fotoJulio },
    { nome: "Rafael Santos Dias", rm: "574105", turma: "1º TDSR", linkedin: "https://www.linkedin.com/in/rafaelsd/", github: "realrafaelsd", foto: fotoRafael },
    { nome: "Victor Felipe Silva Alencar", rm: "574057", turma: "1º TDSR", linkedin: "https://www.linkedin.com/in/victor-alencar-58623a3ba/", github: "alencarVictor", foto: fotoVictor }
  ];

  return (
    <div className="min-h-screen bg-slate-50 flex flex-col font-sans">
      <Header />
      
      <main className="flex-1 pt-24 pb-20">
        <section className="container mx-auto px-6">
          <div className="text-center mb-16">
            <h2 className="text-4xl font-bold text-slate-800 mb-4">
              Desenvolvedores do <span className="text-emerald-500">Projeto</span>
            </h2>
            <p className="text-slate-500 text-lg">
              Conheça o time responsável pela engenharia e design do SoulUp EcoGuia.
            </p>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8 justify-center mx-auto auto-rows-fr grid-flow-row-dense">
            {membros.map((membro, idx) => (
              <MembroCard key={idx} membro={membro} />
            ))}
          </div>
        </section>
      </main>

      <Footer texto="© 2026 SoulUp - FIAP" />
    </div>
  );
};

export default Integrantes;
