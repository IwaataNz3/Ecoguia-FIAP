import type { Avatar } from '../types';
import { API_URL } from './api';

// Busca um avatar pelo id
export async function buscarAvatar(id: number) {
  try {
    const request = await fetch(`${API_URL}/avatares/${id}`);
    const response: Avatar = await request.json();
    // A API pode devolver os campos vazios quando a conexão com o banco falha
    if (response.idAvatar == null) throw new Error('Resposta incompleta da API');
    return response;
  } catch (error) {
    throw new Error('Não foi possível carregar o avatar', { cause: error });
  }
}

// Atualiza o avatar. A API recalcula o nível a partir do XP enviado
export async function atualizarAvatar(avatar: Avatar) {
  try {
    const request = await fetch(`${API_URL}/avatares/${avatar.idAvatar}`, {
      method: 'PUT',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(avatar),
    });
    const response: Avatar = await request.json();
    if (response.idAvatar == null) throw new Error('Resposta incompleta da API');
    return response;
  } catch (error) {
    throw new Error('Não foi possível registrar a ação', { cause: error });
  }
}
