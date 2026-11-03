import type { StatusTela } from '../types';
import Button from './Button';

interface StatusMensagemProps {
  status: StatusTela;
  mensagem?: string;
  onTentarNovamente?: () => void;
}

// Mensagem padrão para carregamento, erro e lista vazia
const StatusMensagem: React.FC<StatusMensagemProps> = ({ status, mensagem, onTentarNovamente }) => {
  if (status === 'carregando') {
    return (
      <div className="flex flex-col items-center justify-center py-16 text-center">
        <div className="animate-spin text-4xl mb-4">♻️</div>
        <p className="text-slate-500 font-medium">{mensagem || 'Carregando...'}</p>
        <p className="text-slate-400 text-sm mt-1">A primeira conexão com o servidor pode levar alguns segundos.</p>
      </div>
    );
  }

  if (status === 'erro') {
    return (
      <div className="flex flex-col items-center justify-center py-12 px-6 text-center bg-red-50 border border-red-200 border-l-4 border-l-red-500 rounded-2xl">
        <span className="text-4xl mb-3">⚠️</span>
        <p className="font-bold text-slate-800 mb-1">{mensagem || 'Algo deu errado.'}</p>
        <p className="text-slate-500 text-sm mb-5">Verifique sua conexão e tente de novo.</p>
        {onTentarNovamente && (
          <Button onClick={onTentarNovamente}>Tentar novamente</Button>
        )}
      </div>
    );
  }

  return (
    <div className="flex flex-col items-center justify-center py-12 px-6 text-center bg-white border border-dashed border-slate-300 rounded-2xl">
      <span className="text-4xl mb-3">🌱</span>
      <p className="text-slate-500 font-medium">{mensagem || 'Nada por aqui ainda.'}</p>
    </div>
  );
};

export default StatusMensagem;
