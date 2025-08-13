import type { NormalizedClient } from './normalize';

export function primeiraLetraFaltante(nome: string): string {
  const alph = 'abcdefghijklmnopqrstuvwxyz';
  const presente = new Set<string>(nome.toLowerCase().replace(/[^a-z]/g, '').split(''));
  for (const ch of alph) if (!presente.has(ch)) return ch;
  return '-';
}

export function vendasPorDia(clientes: NormalizedClient[]) {
  const mapa = new Map<string, number>();
  for (const c of clientes) {
    for (const v of c.vendas) {
      mapa.set(v.data, (mapa.get(v.data) ?? 0) + Number(v.valor));
    }
  }
  const out = Array.from(mapa.entries()).map(([data, total]) => ({ data, total }));
  out.sort((a,b) => a.data.localeCompare(b.data));
  return out;
}

export function calcularDestaques(clientes: NormalizedClient[]) {
  let maiorVolume: { id: string; nome: string; total: number } | null = null;
  let maiorMedia: { id: string; nome: string; media: number } | null = null;
  let maiorFrequencia: { id: string; nome: string; freq: number } | null = null;

  for (const c of clientes) {
    const total = c.vendas.reduce((s, v) => s + v.valor, 0);
    const freq = c.vendas.length;
    const media = freq ? total / freq : 0;

    if (!maiorVolume || total > maiorVolume.total) maiorVolume = { id: c.id, nome: c.nome, total };
    if (!maiorMedia || media > maiorMedia.media) maiorMedia = { id: c.id, nome: c.nome, media };
    if (!maiorFrequencia || freq > maiorFrequencia.freq) maiorFrequencia = { id: c.id, nome: c.nome, freq };
  }

  return { maiorVolume, maiorMedia, maiorFrequencia };
}
