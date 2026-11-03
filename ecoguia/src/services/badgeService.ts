import type { Badge } from '../types';
import { API_URL } from './api';

// Lista todos os marcos cadastrados no banco
export async function listarBadges() {
  try {
    const request = await fetch(`${API_URL}/badges`);
    const response: Badge[] = await request.json();
    return response;
  } catch (error) {
    throw new Error('Não foi possível carregar os marcos', { cause: error });
  }
}

// Busca um marco pelo id. Retorna null quando o marco não existe
export async function buscarBadge(id: number) {
  let request;
  try {
    request = await fetch(`${API_URL}/badges/${id}`);
  } catch (error) {
    throw new Error('Não foi possível carregar o marco', { cause: error });
  }

  let response: Badge;
  try {
    response = await request.json();
  } catch {
    // Quando o id não existe, a API responde sem corpo
    return null;
  }

  // A API pode devolver os campos vazios quando a conexão com o banco falha
  if (response.idBadge == null) {
    throw new Error('Não foi possível carregar o marco');
  }
  return response;
}
