import type { Usuario } from '../types';
import { API_URL } from './api';

// Busca um usuário pelo id
export async function buscarUsuario(id: number) {
  try {
    const request = await fetch(`${API_URL}/usuarios/${id}`);
    const response: Usuario = await request.json();
    // A API pode devolver os campos vazios quando a conexão com o banco falha
    if (response.idUsuario == null) throw new Error('Resposta incompleta da API');
    return response;
  } catch (error) {
    throw new Error('Não foi possível carregar o usuário', { cause: error });
  }
}

// Atualiza os dados de um usuário
export async function atualizarUsuario(usuario: Usuario) {
  try {
    const request = await fetch(`${API_URL}/usuarios/${usuario.idUsuario}`, {
      method: 'PUT',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(usuario),
    });
    const response: Usuario = await request.json();
    if (response.idUsuario == null) throw new Error('Resposta incompleta da API');
    return response;
  } catch (error) {
    // Sem resposta da API, ou dados recusados (a API devolve texto em vez de JSON)
    throw new Error('Não foi possível salvar o perfil. Confira os dados.', { cause: error });
  }
}
