// Interface para os integrantes do grupo
export interface Membro {
  nome: string;
  rm: string;
  turma: string;
  foto: string;
  linkedin: string;
  github: string;
}

// Interface para as dúvidas frequentes
export interface FaqItemData {
  pergunta: string;
  resposta: string;
}

// Interface para o formulário de contato
export interface ContatoFormData {
  nome: string;
  email: string;
  assunto: string;
  mensagem: string;
}

// ===== Respostas da API Java =====

// Usuário (GET /usuarios/{id})
export interface Usuario {
  idUsuario: number;
  nome: string;
  email: string;
  senha: string;
  cidade: string;
  idAvatar: number;
  ofensivaAtual: number;
}

// Avatar (GET /avatares/{id})
export interface Avatar {
  idAvatar: number;
  nome: string;
  nivelAtual: number;
  xpAtual: number;
}

// Tipo do badge aceito pela API
export type TipoBadge = 'normal' | 'lendario';

// Badge, que no site aparece como Marco (GET /badges)
export interface Badge {
  idBadge: number;
  nome: string;
  tipo: TipoBadge;
  descricao: string;
}

// Conquista: badge que o usuário escolheu exibir no perfil (GET /conquistas)
export interface Conquista {
  idConquista: number;
  idUsuario: number;
  idBadge: number;
  dataConquista: string;
}

// Dados enviados para criar uma conquista (POST /conquistas)
export interface NovaConquista {
  idUsuario: number;
  idBadge: number;
}

// Marco com a conquista do usuário, quando ele estiver no perfil
export type MarcoComConquista = Badge & {
  conquista?: Conquista;
};

// Campos do formulário de Editar perfil
export interface PerfilFormData {
  nome: string;
  email: string;
  cidade: string;
}

// Situação de uma tela que depende da API
export type StatusTela = 'carregando' | 'erro' | 'vazio';

// Benefício liberado pelo nível do avatar
export interface Beneficio {
  icone: string;
  titulo: string;
  descricao: string;
  nivelMinimo: number;
}
