import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import './Login.scss';

export default function Login() {
  const [user, setUser] = useState('admin');
  const [pass, setPass] = useState('admin');
  const [error, setError] = useState<string | null>(null);
  const { login } = useAuth();
  const nav = useNavigate();

  async function onSubmit(e: React.FormEvent) {
    e.preventDefault();
    setError(null);
    try {
      await login(user, pass);
      nav('/');
    } catch (err:any) {
      setError(err.message || 'Erro no login');
    }
  }

  return (
    <div className='login-page'>
      <h2>Login</h2>
      <form onSubmit={onSubmit}>
        <div>
          <label>Usuário</label>
          <input value={user} onChange={e=>setUser(e.target.value)} />
        </div>
        <div>
          <label>Senha</label>
          <input type="password" value={pass} onChange={e=>setPass(e.target.value)} />
        </div>
        <button type="submit">Entrar</button>
      </form>
      {error && <div className='error'>{error}</div>}
      <div className='help-text'>Use admin / admin (mock)</div>
    </div>
  );
}
