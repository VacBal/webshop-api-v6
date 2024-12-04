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
  
    const newUser = {
      email,
      password,
      firstName,
      lastName,
      shippingAddress,
      billingAddress: billingAddress || shippingAddress,
    };
  
    // Letöltésre kínáljuk a JSON fájlt
    const data = new Blob([JSON.stringify(newUser, null, 2)], { type: 'application/json' });
    const url = window.URL.createObjectURL(data);
    const link = document.createElement('a');
    link.href = url;
    link.download = '../data/registered_user.json';
    link.click();
    window.URL.revokeObjectURL(url);
  
    alert('Sikeres regisztráció! A regisztrációs adatokat JSON fájlba mentettük.');
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
