import { useCallback, useEffect, useMemo, useState, type ReactNode } from 'react';
import type { Avatar, Usuario } from '../types';
import { UserContext } from './UserContext';
import { USUARIO_ID } from '../services/api';
import { buscarUsuario } from '../services/usuarioService';
import { buscarAvatar } from '../services/avatarService';

// Busca o usuário fixo e, com o id do avatar dele, o avatar
const buscarUsuarioEAvatar = async () => {
  const usuario = await buscarUsuario(USUARIO_ID);
  const avatar = await buscarAvatar(usuario.idAvatar);
  return { usuario, avatar };
};

// Se a primeira tentativa falhar (API acordando ou instável), tenta de novo uma vez
const buscarDadosDoUsuario = async () => {
  try {
    return await buscarUsuarioEAvatar();
  } catch {
    await new Promise((resolve) => setTimeout(resolve, 1500));
    return buscarUsuarioEAvatar();
  }
};

// Componente Provider: busca na API o usuário fixo e o avatar dele
export function UserProvider({ children }: { children: ReactNode }) {
  const [usuario, setUsuario] = useState<Usuario | null>(null);
  const [avatar, setAvatar] = useState<Avatar | null>(null);
  const [loading, setLoading] = useState(true);
  const [erro, setErro] = useState('');

  // Muda de valor quando a tela pede para buscar de novo
  const [tentativa, setTentativa] = useState(0);

  // Busca os dados quando o site abre e sempre que "recarregar" for chamado
  useEffect(() => {
    buscarDadosDoUsuario()
      .then((dados) => {
        setUsuario(dados.usuario);
        setAvatar(dados.avatar);
        setErro('');
      })
      .catch((error) => {
        console.error(error);
        setErro(error.message);
      })
      .finally(() => setLoading(false));
  }, [tentativa]);

  const recarregar = useCallback(() => {
    setLoading(true);
    setTentativa((valor) => valor + 1);
  }, []);

  const value = useMemo(
    () => ({ usuario, avatar, loading, erro, setUsuario, setAvatar, recarregar }),
    [usuario, avatar, loading, erro, recarregar]
  );

  return <UserContext.Provider value={value}>{children}</UserContext.Provider>;
}
