import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';

interface User {
  userId: string;
  email: string;
  password: string; // Hashed jelszóval kellene dolgozni, itt egyszerűsítésként pl. sima string
}

const LoginPage: React.FC = () => {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState<string | null>(null);
  const navigate = useNavigate();

  const validateEmail = (email: string): boolean => {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return emailRegex.test(email);
  };

  const validatePassword = (password: string): boolean => {
    const passwordRegex = /^(?=.*[a-z])(?=.*\d)[a-zA-Z\d]{8,}$/;
    return passwordRegex.test(password);
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError(null);

    if (!validateEmail(username)) {
      setError('Érvénytelen email formátum.');
      return;
    }

    if (!validatePassword(password)) {
      setError('A jelszónak legalább 8 karakter hosszúnak kell lennie, tartalmaznia kell legalább 1 kisbetűt és 1 számot.');
      return;
    }

    try {
      // Simulált fetch a users.json fájlból
      const response = await fetch('/data/users.json');
      if (!response.ok) {
        throw new Error('Hiba történt a felhasználói adatok betöltésekor.');
      }
      const users: User[] = await response.json();

      // Felhasználó keresése
      const user = users.find(
        (user) => user.email === username && user.password === password
      );

      if (user) {
        // Token mentése és átirányítás
        localStorage.setItem('accessToken', `${user.userId}-${Date.now()}`);
        navigate('/profile');
      } else {
        setError('Hibás felhasználónév vagy jelszó.');
      }
    } catch (err) {
      setError('Nem sikerült kapcsolódni a felhasználói adatokhoz.');
    }
  };

  // Ellenőrizzük, hogy a felhasználó már be van-e jelentkezve
  const accessToken = localStorage.getItem('accessToken');
  if (accessToken) {
    navigate('/profile');
    return null;
  }

  return (
    <div>
      <h1>Bejelentkezés</h1>
      <form onSubmit={handleSubmit}>
        <div>
          <label htmlFor="username">Email:</label>
          <input
            type="email"
            id="username"
            value={username}
            onChange={(e) => setUsername(e.target.value)}
            required
          />
        </div>
        <div>
          <label htmlFor="password">Jelszó:</label>
          <input
            type="password"
            id="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
          />
        </div>
        {error && <p style={{ color: 'red' }}>{error}</p>}
        <button type="submit">Belépés</button>
      </form>
    </div>
  );
};

export default LoginPage;
