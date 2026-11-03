import type { TipoBadge } from '../types';

// Emoji de cada tipo de marco (a API não guarda ícone)
export const iconeDoMarco = (tipo: TipoBadge) => (tipo === 'lendario' ? '👑' : '🏅');

// Converte a data da API (2026-10-30) para o formato brasileiro (30/10/2026)
export const formatarData = (data: string) => data.split('-').reverse().join('/');
