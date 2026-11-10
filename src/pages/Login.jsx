import { useState } from 'react';
import { useApp } from '../context/AppContext';
import { useNavigate } from 'react-router-dom';

export default function Login() {
  const [email,setEmail] = useState('');
  const [password,setPassword] = useState('');
  const [error,setError] = useState('');
  const [enviando,setEnviando] = useState(false);
  const { login } = useApp();
  const navigate = useNavigate();
  async function handleSubmit(e) {
    e.preventDefault(); setError(''); setEnviando(true);
    try { await login(email,password); navigate('/admin'); }
    catch { setError('No se pudo iniciar sesión. Verifica el correo, la contraseña y que la cuenta esté habilitada en Firebase Authentication.'); }
    finally { setEnviando(false); }
  }
  return <main className="login-page"><p className="eyebrow">ACCESO RESTRINGIDO</p><h1>Administración MUSA</h1>
    <p>Inicia sesión con la cuenta autorizada para gestionar la colección.</p>
    <form className="login-form" onSubmit={handleSubmit}>
      <label>Correo electrónico<input type="email" autoComplete="username" value={email} onChange={e=>setEmail(e.target.value)} required/></label>
      <label>Contraseña<input type="password" autoComplete="current-password" value={password} onChange={e=>setPassword(e.target.value)} required/></label>
      {error && <p role="alert" className="error-text">{error}</p>}
      <button className="btn-detalle" disabled={enviando}>{enviando?'Verificando…':'Ingresar al panel'}</button>
    </form>
  </main>;
}
