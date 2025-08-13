import React, { useState } from 'react';
import './AddClientForm.scss';

type FormData = {
  nomeCompleto: string;
  email: string;
  nascimento: string;
};

type Props = {
  onAdd: (c: FormData) => Promise<void>;
};

export default function AddClientForm({ onAdd }: Props) {
  const [nome, setNome] = useState('');
  const [email, setEmail] = useState('');
  const [nasc, setNasc] = useState('');

  const [errors, setErrors] = useState<Partial<Record<keyof FormData, string>>>({});
  const [submitting, setSubmitting] = useState(false);

  function validate() {
    const newErrors: Partial<Record<keyof FormData, string>> = {};

    if (!nome.trim()) {
      newErrors.nomeCompleto = 'Nome completo é obrigatório';
    }

    if (!email.trim()) {
      newErrors.email = 'Email é obrigatório';
    } else if (!/^\S+@\S+\.\S+$/.test(email)) {
      newErrors.email = 'Email inválido';
    }

    if (!nasc) {
      newErrors.nascimento = 'Data de nascimento é obrigatória';
    } else {
      const nascimentoDate = new Date(nasc);
      const hoje = new Date();
      if (nascimentoDate > hoje) {
        newErrors.nascimento = 'Data de nascimento não pode ser futura';
      }
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  }

  async function submit(e: React.FormEvent) {
    e.preventDefault();
    if (!validate()) return;
    setSubmitting(true);
    try {
      await onAdd({ nomeCompleto: nome, email, nascimento: nasc });
      setNome('');
      setEmail('');
      setNasc('');
      setErrors({});
    } catch (err) {
      console.error('Erro ao adicionar cliente:', err);
    } finally {
      setSubmitting(false);
    }
  }

  return (
    <form onSubmit={submit} className="form-container" noValidate>
      <div className="input-group">
        <input
          placeholder="Nome completo"
          value={nome}
          onChange={e => setNome(e.target.value)}
          className={errors.nomeCompleto ? 'error' : ''}
        />
        <p className="error-text">{errors.nomeCompleto || '\u00A0'}</p>
      </div>

      <div className="input-group">
        <input
          placeholder="Email"
          value={email}
          onChange={e => setEmail(e.target.value)}
          className={errors.email ? 'error' : ''}
        />
        <p className="error-text">{errors.email || '\u00A0'}</p>
      </div>

      <div className="input-group">
        <input
          type="date"
          value={nasc}
          onChange={e => setNasc(e.target.value)}
          className={errors.nascimento ? 'error' : ''}
        />
        <p className="error-text">{errors.nascimento || '\u00A0'}</p>
      </div>

      <button type="submit" disabled={submitting}>
        {submitting ? 'Adicionando...' : 'Adicionar'}
      </button>
    </form>
  );
}
