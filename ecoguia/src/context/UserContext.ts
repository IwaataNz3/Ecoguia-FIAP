import { createContext, useContext } from 'react';
import type { Avatar, Usuario } from '../types';

// Tipagem do contexto do usuário
export interface UserContextType {
  usuario: Usuario | null;
  avatar: Avatar | null;
  loading: boolean;
  erro: string;
  setUsuario: (usuario: Usuario) => void;
  setAvatar: (avatar: Avatar) => void;
  recarregar: () => void;
}

// Criação do contexto
export const UserContext = createContext<UserContextType | undefined>(undefined);

// Hook personalizado para usar o contexto
export function useUser(): UserContextType {
  const context = useContext(UserContext);
  if (!context) {
    throw new Error('useUser deve ser usado dentro de um UserProvider');
  }
  return context;
}
