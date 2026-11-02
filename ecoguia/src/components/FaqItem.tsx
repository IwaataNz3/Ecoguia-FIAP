import { useState } from 'react';
import type { FaqItemData } from '../types';

// Componente de sanfona (accordion) para o FAQ
export default function FaqItem({ pergunta, resposta }: FaqItemData) {
  // Controle de estado aberto/fechado
  const [isAberto, setIsAberto] = useState(false);

  return (
    <div className={`border rounded-lg mb-4 overflow-hidden transition-all duration-300 ${isAberto ? 'border-emerald-500 shadow-md' : 'border-slate-200'}`}>
      <button
        className="w-full px-6 py-4 text-left flex justify-between items-center bg-white hover:bg-slate-50 transition-colors focus:outline-none"
        onClick={() => setIsAberto(!isAberto)}
      >
        <span className="font-bold text-slate-800">{pergunta}</span>
        <span className={`text-xl font-bold text-emerald-500 transition-transform duration-300 ${isAberto ? 'rotate-45' : ''}`}>
          {isAberto ? '-' : '+'}
        </span>
      </button>
      <div
        className={`px-6 bg-white overflow-hidden transition-all duration-300 ${
          isAberto ? 'max-h-[500px] py-4' : 'max-h-0 py-0'
        }`}
      >
        <p className="text-slate-500 text-sm leading-relaxed">{resposta}</p>
      </div>
    </div>
  );
}
