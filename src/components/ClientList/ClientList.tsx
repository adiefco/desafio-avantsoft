import type { NormalizedClient } from '../../utils/normalize';
import { primeiraLetraFaltante } from '../../utils/helpers';
import Card from '../Card/Card';
import './ClientList.scss';

export default function ClientList({ clientes }: { clientes: NormalizedClient[] }) {
  if (!clientes.length) return <div>Nenhum cliente</div>;

  return (
    <div className="client-list">
      {clientes.map(c => (
        <Card key={c.id} className="client-card">
          <div className="client-card-content">
            <div className="client-info">
              <div className="client-name">{c.nome}</div>
              <div className="client-contact">
                {c.email || '-'} • {c.nascimento || '-'}
              </div>
              <div className="client-sales">
                Vendas: {c.vendas.length} • Total: R$ {c.vendas.reduce((s, v) => s + v.valor, 0)}
              </div>
            </div>

            <div className="client-letter">
              <div>{primeiraLetraFaltante(c.nome)}</div>
            </div>
          </div>
        </Card>
      ))}
    </div>
  );
}
