import React, { useState } from 'react';
import ProfilePage from './ProfilePage';

const LoginPage = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const handleLogin = () => {
    console.log("sikerült a belépés");
    // Bejelentkezési logika
  };

  return (
    <div>
      <h1>Bejelentkezés</h1>
      <input
        type="email"
        placeholder="Email"
        value={email}
        onChange={(e) => setEmail(e.target.value)}
      />
      <input
        type="password"
        placeholder="Jelszó"
        value={password}
        onChange={(e) => setPassword(e.target.value)}
      />
      <button onClick={handleLogin}>Bejelentkezés</button>
    </div>
  );
};

export default LoginPage;
