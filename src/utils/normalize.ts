export type RawApiResponse = any;

export type NormalizedClient = {
  id: string;
  nome: string;
  email: string;
  nascimento: string | null;
  vendas: Array<{ data: string; valor: number }>;
};

function dedupeVendas(vendas: Array<{data:string, valor:number}>) {
  const seen = new Set<string>();
  const out: Array<{data:string, valor:number}> = [];
  for (const v of vendas) {
    const key = `${v.data}::${v.valor}`;
    if (!seen.has(key)) {
      seen.add(key);
      out.push({ data: v.data, valor: Number(v.valor) });
    }
  }
  
  out.sort((a,b) => a.data.localeCompare(b.data));
  return out;
}

export function normalizeClientes(raw: RawApiResponse): NormalizedClient[] {
  const itens = raw?.data?.clientes ?? [];
  const map = new Map<string, NormalizedClient>();

  for (const c of itens) {
    const nome =
      c?.info?.nomeCompleto ??
      c?.duplicado?.nomeCompleto ??
      c?.nomeCompleto ??
      '';

    const email = c?.info?.detalhes?.email ?? c?.detalhes?.email ?? '';
    const nascimento = c?.info?.detalhes?.nascimento ?? c?.detalhes?.nascimento ?? null;
    const vendas = Array.isArray(c?.estatisticas?.vendas) ? c.estatisticas.vendas.map((v:any) => ({ data: String(v.data), valor: Number(v.valor) })) : [];

    const key = email || nome;
    if (map.has(key)) {
      const existing = map.get(key)!;
      existing.vendas = dedupeVendas(existing.vendas.concat(vendas));
      if (!existing.email && email) existing.email = email;
      if (!existing.nascimento && nascimento) existing.nascimento = nascimento;
    } else {
      map.set(key, {
        id: key,
        nome: String(nome),
        email: String(email),
        nascimento: nascimento,
        vendas: dedupeVendas(vendas)
      });
    }
  }

  return Array.from(map.values());
}
