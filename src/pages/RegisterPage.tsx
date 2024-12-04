import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';

const RegisterPage = () => {
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    email: '',
    password: '',
    confirmPassword: '',
    firstName: '',
    lastName: '',
    shippingAddress: '',
    billingAddress: '',
  });
  const [error, setError] = useState<string | null>(null);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData((prevData) => ({ ...prevData, [name]: value }));
  };

  const handleSubmit = () => {
    const {
      email,
      password,
      confirmPassword,
      firstName,
      lastName,
      shippingAddress,
      billingAddress,
    } = formData;
  
    // Kliens oldali validáció
    if (!email || !password || !confirmPassword || !firstName || !lastName || !shippingAddress) {
      setError('Minden mezőt ki kell tölteni!');
      return;
    }
  
    if (password !== confirmPassword) {
      setError('A jelszavak nem egyeznek!');
      return;
    }
  
    // Adatok mentése
    const newUser = {
      email,
      password,
      firstName,
      lastName,
      shippingAddress,
      billingAddress: billingAddress || shippingAddress, // Ha nincs számlázási cím, legyen azonos a szállítási címmel
    };
  
    // Ellenőrizzük, hogy vannak-e már mentett felhasználók, ha nem, akkor inicializáljuk egy üres tömbbel
    const existingUsers = JSON.parse(localStorage.getItem('users') || '[]');
    if (!Array.isArray(existingUsers)) {
      console.error("Hibás 'users' adat a localStorage-ban, alaphelyzetbe állítás...");
      localStorage.setItem('users', JSON.stringify([]));
    }
  
    // Frissítsük a felhasználók listáját
    const updatedUsers = [...(existingUsers || []), newUser];
    localStorage.setItem('users', JSON.stringify(updatedUsers));
  
    alert('Sikeres regisztráció!');
    navigate('/login'); // Átirányítás a bejelentkezési oldalra
  };

  return (
    <div style={{ padding: '20px', maxWidth: '600px', margin: 'auto' }}>
      <h1>Regisztráció</h1>
      {error && <p style={{ color: 'red' }}>{error}</p>}
      <form>
        <div style={{ marginBottom: '15px' }}>
          <label>Email:</label>
          <input
            type="email"
            name="email"
            value={formData.email}
            onChange={handleChange}
            style={{ display: 'block', width: '100%', padding: '8px' }}
          />
        </div>
        <div style={{ marginBottom: '15px' }}>
          <label>Jelszó:</label>
          <input
            type="password"
            name="password"
            value={formData.password}
            onChange={handleChange}
            style={{ display: 'block', width: '100%', padding: '8px' }}
          />
        </div>
        <div style={{ marginBottom: '15px' }}>
          <label>Jelszó megerősítése:</label>
          <input
            type="password"
            name="confirmPassword"
            value={formData.confirmPassword}
            onChange={handleChange}
            style={{ display: 'block', width: '100%', padding: '8px' }}
          />
        </div>
        <div style={{ marginBottom: '15px' }}>
          <label>Vezetéknév:</label>
          <input
            type="text"
            name="lastName"
            value={formData.lastName}
            onChange={handleChange}
            style={{ display: 'block', width: '100%', padding: '8px' }}
          />
        </div>
        <div style={{ marginBottom: '15px' }}>
          <label>Keresztnév:</label>
          <input
            type="text"
            name="firstName"
            value={formData.firstName}
            onChange={handleChange}
            style={{ display: 'block', width: '100%', padding: '8px' }}
          />
        </div>
        <div style={{ marginBottom: '15px' }}>
          <label>Szállítási cím:</label>
          <input
            type="text"
            name="shippingAddress"
            value={formData.shippingAddress}
            onChange={handleChange}
            style={{ display: 'block', width: '100%', padding: '8px' }}
          />
        </div>
        <div style={{ marginBottom: '15px' }}>
          <label>Számlázási cím (opcionális):</label>
          <input
            type="text"
            name="billingAddress"
            value={formData.billingAddress}
            onChange={handleChange}
            style={{ display: 'block', width: '100%', padding: '8px' }}
          />
        </div>
        <button
          type="button"
          onClick={handleSubmit}
          style={{
            padding: '10px 20px',
            backgroundColor: 'green',
            color: 'white',
            border: 'none',
            borderRadius: '5px',
            cursor: 'pointer',
          }}
        >
          Regisztráció
        </button>
      </form>
    </div>
  );
};

export default RegisterPage;
