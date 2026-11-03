import type { Conquista, NovaConquista } from '../types';
import { API_URL } from './api';

// Lista as conquistas de um usuário
export async function listarConquistas(idUsuario: number) {
  try {
    const request = await fetch(`${API_URL}/conquistas`);
    const response: Conquista[] = await request.json();
    // A API devolve as conquistas de todos os usuários, então filtramos aqui
    return response.filter((conquista) => conquista.idUsuario === idUsuario);
  } catch (error) {
    throw new Error('Não foi possível carregar os marcos do perfil', { cause: error });
  }
}

// Exibe um marco no perfil (cria a conquista)
export async function criarConquista(dados: NovaConquista) {
  try {
    const request = await fetch(`${API_URL}/conquistas`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(dados),
    });
    const response: Conquista = await request.json();
    return response;
  } catch (error) {
    throw new Error('Não foi possível exibir o marco no perfil', { cause: error });
  }
}

// Tira um marco do perfil (exclui a conquista)
export async function excluirConquista(idConquista: number) {
  try {
    // A API responde sem corpo quando exclui, então não lemos o JSON
    await fetch(`${API_URL}/conquistas/${idConquista}`, {
      method: 'DELETE',
    });
  } catch (error) {
    throw new Error('Não foi possível tirar o marco do perfil', { cause: error });
  }
}
