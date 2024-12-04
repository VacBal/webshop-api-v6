import React, { useState } from 'react';
import { useAuth } from '../context/AuthContext';
import { useNavigate } from 'react-router-dom';

const EditProfilePage = () => {
  const { user, login } = useAuth();
  const navigate = useNavigate();
  const [email, setEmail] = useState(user?.email || '');
  const [firstName, setFirstName] = useState(user?.firstName || '');
  const [lastName, setLastName] = useState(user?.lastName || '');
  const [shippingAddress, setShippingAddress] = useState(user?.shippingAddress || '');
  const [billingAddress, setBillingAddress] = useState(user?.billingAddress || '');
  const [error, setError] = useState<string | null>(null);

  const handleSave = () => {
    if (!email || !firstName || !lastName || !shippingAddress || !billingAddress) {
      setError('Minden mezőt ki kell tölteni!');
      return;
    }

    const updatedUser = {
      ...user,
      email,
      firstName,
      lastName,
      shippingAddress,
      billingAddress,
    };

    login(updatedUser); // Frissítjük a kontextusban tárolt felhasználót
    localStorage.setItem('authUser', JSON.stringify(updatedUser)); // Frissítjük a tárolt adatokat
    alert('Profil sikeresen frissítve!');
    navigate('/profile'); // Átirányítás a profil oldalra
  };

  return (
    <div style={{ padding: '20px', maxWidth: '600px', margin: 'auto' }}>
      <h1>Profil módosítása</h1>
      {error && <p style={{ color: 'red' }}>{error}</p>}
      <div style={{ marginBottom: '15px' }}>
        <label>Email:</label>
        <input
          type="email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          style={{ display: 'block', width: '100%', padding: '8px' }}
        />
      </div>
      <div style={{ marginBottom: '15px' }}>
        <label>Vezetéknév:</label>
        <input
          type="text"
          value={lastName}
          onChange={(e) => setLastName(e.target.value)}
          style={{ display: 'block', width: '100%', padding: '8px' }}
        />
      </div>
      <div style={{ marginBottom: '15px' }}>
        <label>Keresztnév:</label>
        <input
          type="text"
          value={firstName}
          onChange={(e) => setFirstName(e.target.value)}
          style={{ display: 'block', width: '100%', padding: '8px' }}
        />
      </div>
      <div style={{ marginBottom: '15px' }}>
        <label>Szállítási cím:</label>
        <input
          type="text"
          value={shippingAddress}
          onChange={(e) => setShippingAddress(e.target.value)}
          style={{ display: 'block', width: '100%', padding: '8px' }}
        />
      </div>
      <div style={{ marginBottom: '15px' }}>
        <label>Számlázási cím:</label>
        <input
          type="text"
          value={billingAddress}
          onChange={(e) => setBillingAddress(e.target.value)}
          style={{ display: 'block', width: '100%', padding: '8px' }}
        />
      </div>
      <button
        onClick={handleSave}
        style={{
          padding: '10px 20px',
          backgroundColor: 'green',
          color: 'white',
          border: 'none',
          borderRadius: '5px',
          cursor: 'pointer',
        }}
      >
        Mentés
      </button>
      <button
        onClick={() => navigate('/profile')}
        style={{
          padding: '10px 20px',
          backgroundColor: 'gray',
          color: 'white',
          border: 'none',
          borderRadius: '5px',
          cursor: 'pointer',
          marginLeft: '10px',
        }}
      >
        Mégse
      </button>
    </div>
  );
};

export default EditProfilePage;
