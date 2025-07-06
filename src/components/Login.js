import React, { useState } from 'react';
import './Login.css';

const Login = ({ onLogin }) => {
  const [isRegister, setIsRegister] = useState(false);
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [name, setName] = useState('');
  const [error, setError] = useState('');
  const [success, setSuccess] = useState('');

  const handleSubmit = (e) => {
    e.preventDefault();
    setError('');
    setSuccess('');
    if (isRegister) {
      if (!name || !email || !password || !confirmPassword) {
        setError('Preencha todos os campos.');
        return;
      }
      if (password !== confirmPassword) {
        setError('As senhas não coincidem.');
        return;
      }
      const users = JSON.parse(localStorage.getItem('users') || '[]');
      if (users.find(u => u.email === email)) {
        setError('E-mail já cadastrado.');
        return;
      }
      users.push({ name, email, password });
      localStorage.setItem('users', JSON.stringify(users));
      setSuccess('Cadastro realizado com sucesso! Faça login para continuar.');
      setIsRegister(false);
      setName('');
      setEmail('');
      setPassword('');
      setConfirmPassword('');
    } else {
      const users = JSON.parse(localStorage.getItem('users') || '[]');
      const user = users.find(u => u.email === email && u.password === password);
      if (!user) {
        setError('E-mail ou senha inválidos.');
        return;
      }
      setSuccess('Bem-vindo(a) de volta, ' + user.name + '!');
      setTimeout(() => onLogin({ name: user.name, email: user.email }), 800);
    }
  };

  return (
    <div className="login-container aviation-theme">
      <form className="login-form aviation-form" onSubmit={handleSubmit}>
        <div className="login-logo">
          <span className="login-emoji">✈️</span>
          <h1>AeroCourse</h1>
        </div>
        <h2>{isRegister ? 'Cadastro' : 'Login'}</h2>
        {isRegister && (
          <input
            type="text"
            placeholder="Nome completo"
            value={name}
            onChange={e => setName(e.target.value)}
          />
        )}
        <input
          type="email"
          placeholder="E-mail"
          value={email}
          onChange={e => setEmail(e.target.value)}
        />
        <input
          type="password"
          placeholder="Senha"
          value={password}
          onChange={e => setPassword(e.target.value)}
        />
        {isRegister && (
          <input
            type="password"
            placeholder="Confirme a senha"
            value={confirmPassword}
            onChange={e => setConfirmPassword(e.target.value)}
          />
        )}
        {error && <div className="login-error">{error}</div>}
        {success && <div className="login-success">{success}</div>}
        <button type="submit">{isRegister ? 'Cadastrar' : 'Entrar'}</button>
        <div className="login-toggle">
          {isRegister ? (
            <span>Já tem conta? <button type="button" onClick={() => { setIsRegister(false); setError(''); setSuccess(''); }}>Entrar</button></span>
          ) : (
            <span>Não tem conta? <button type="button" onClick={() => { setIsRegister(true); setError(''); setSuccess(''); }}>Cadastre-se</button></span>
          )}
        </div>
      </form>
      <div className="login-bg-clouds">
        <div className="cloud cloud1">☁️</div>
        <div className="cloud cloud2">☁️</div>
        <div className="cloud cloud3">☁️</div>
      </div>
    </div>
  );
};

export default Login; 