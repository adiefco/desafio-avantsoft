import React, { useEffect, useState } from 'react';
import { normalizeClientes, type NormalizedClient } from '../utils/normalize';
import { vendasPorDia, calcularDestaques } from '../utils/helpers';
import SalesChart from '../components/SalesChart/SalesChart';
import AddClientForm from '../components/AddClientForm/AddClientForm';
import ClientList from '../components/ClientList/ClientList';
import HighlightsPanel from '../components/HighlightsPanel/HighlightsPanel';
import { useAuth } from '../context/AuthContext';
import './Dashboard.scss';
import Footer from '../components/Footer/Footer';

export default function Dashboard() {
  const [raw, setRaw] = useState<any>(null);
  const [clientes, setClientes] = useState<NormalizedClient[]>([]);
  const [loading, setLoading] = useState(false);
  const { logout } = useAuth();

  const API_URL = 'http://localhost:3000';

  async function load() {
    setLoading(true);
    try {
      const res = await fetch(`${API_URL}/data`);
      const data = await res.json();
      if (!res.ok) throw new Error(data.message || 'Erro ao carregar dados');
      setRaw(data);

      const norm = normalizeClientes({ data: { clientes: data.clientes || [] } });
      setClientes(norm);
    } catch (err) {
      console.error('Erro ao carregar clientes:', err);
    } finally {
      setLoading(false);
    }
  }

  useEffect(() => {
    load();
  }, []);

  async function handleAddCliente(novo: { nomeCompleto: string; email: string; nascimento: string }): Promise<void> {
    const novoCliente: NormalizedClient = {
      id: novo.email || novo.nomeCompleto,
      nome: novo.nomeCompleto,
      email: novo.email,
      nascimento: novo.nascimento,
      vendas: []
    };

    setClientes((clientesAtuais) => [...clientesAtuais, novoCliente]);
  }

  const vendasDia = vendasPorDia(clientes);
  const destaques = calcularDestaques(clientes);

  return (
    <div className='dashboard'>
      <header>
        <h1>Dashboard de Clientes</h1>
        <button onClick={logout}>Sair</button>
      </header>

      <section className='top-section'>
        <div>
          <h2>Vendas por dia</h2>
          <SalesChart series={vendasDia} />
        </div>
        <div>
          <HighlightsPanel destaques={destaques} />
        </div>
      </section>

      <section>
        <h2>Adicionar cliente</h2>
        <AddClientForm onAdd={handleAddCliente} />
      </section>

      <section>
        <h2>Clientes ({clientes.length})</h2>
        {loading ? <div className='loading'>Carregando...</div> : <ClientList clientes={clientes} />}
      </section>

      <section style={{ marginTop: 30 }}>
        <h3>Raw response (API) — mostrado só pra debug</h3>
        <pre style={{ maxHeight: 200, overflow: 'auto', background: '#f5f5f5', padding: 10 }}>
          {JSON.stringify(raw, null, 2)}
        </pre>
      </section>
      <Footer />
    </div>
  );
}
