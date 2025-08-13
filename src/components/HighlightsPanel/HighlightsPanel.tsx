import './HighlightsPanel.scss';

type Destaques = {
  maiorVolume: { nome: string; total: number } | null;
  maiorMedia: { nome: string; media: number } | null;
  maiorFrequencia: { nome: string; freq: number } | null;
};

export default function HighlightsPanel({ destaques }: { destaques: Destaques }) {
  return (
    <div className='highlights-panel'>
      <h3>Destaques</h3>
      <div>
        <strong>Maior volume total:</strong>
        <div>{destaques.maiorVolume ? `${destaques.maiorVolume.nome} — R$ ${destaques.maiorVolume.total}` : '-'}</div>
      </div>
      <div style={{marginTop:8}}>
        <strong>Maior média por venda:</strong>
        <div>{destaques.maiorMedia ? `${destaques.maiorMedia.nome} — R$ ${Number(destaques.maiorMedia.media).toFixed(2)}` : '-'}</div>
      </div>
      <div style={{marginTop:8}}>
        <strong>Maior frequência (nº vendas):</strong>
        <div>{destaques.maiorFrequencia ? `${destaques.maiorFrequencia.nome} — ${destaques.maiorFrequencia.freq} compras` : '-'}</div>
      </div>
    </div>
  );
}
