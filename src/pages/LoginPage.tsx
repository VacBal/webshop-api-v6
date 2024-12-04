import React, { useState } from 'react';
import { useAuth } from '../context/AuthContext';
import { useNavigate } from 'react-router-dom';

const LoginPage = () => {
  const { login } = useAuth();
  const navigate = useNavigate();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const handleLogin = async () => {
    // Helyi JSON lekérdezés
    const response = await fetch('/data/users.json');
    const users = await response.json();
    const user = users.find((u: any) => u.email === email && u.password === password);

    if (user) {
      login(user);
      navigate('/profile');
    } else {
      alert('Hibás felhasználónév vagy jelszó');
    }
  };

  return (
    <div>
      <h1>Bejelentkezés</h1>
      <input
        type="email"
        value={email}
        onChange={(e) => setEmail(e.target.value)}
        placeholder="Email"
      />
      <input
        type="password"
        value={password}
        onChange={(e) => setPassword(e.target.value)}
        placeholder="Jelszó"
      />
      <button onClick={handleLogin}>Bejelentkezés</button>
    </div>
  );
};

export default LoginPage;
