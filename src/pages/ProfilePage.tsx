import React from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';

const ProfilePage = () => {
  const { user, logout } = useAuth();
  const navigate = useNavigate();

  const handleLogout = () => {
    logout(); // Felhasználó kijelentkezése a kontextusból
    localStorage.removeItem('authUser'); // Helyi adat törlése
    navigate('/login'); // Átirányítás a bejelentkezési oldalra
  };

  if (!user) {
    navigate('/login'); // Ha nincs bejelentkezve a felhasználó, irányítsuk a bejelentkezési oldalra
    return null;
  }

  return (
    <div style={{ padding: '20px', maxWidth: '600px', margin: 'auto' }}>
      <h1>Felhasználói profil</h1>
      <div>
        <p>
          <strong>Email:</strong> {user.email}
        </p>
        <p>
          <strong>Vezetéknév:</strong> {user.lastName}
        </p>
        <p>
          <strong>Keresztnév:</strong> {user.firstName}
        </p>
      </div>
      <button
        onClick={() => navigate('/edit-profile')}
        style={{
          padding: '10px 20px',
          backgroundColor: 'blue',
          color: 'white',
          border: 'none',
          borderRadius: '5px',
          cursor: 'pointer',
          marginRight: '10px',
        }}
      >
        Profil szerkesztése
      </button>
      <button
        onClick={handleLogout}
        style={{
          padding: '10px 20px',
          backgroundColor: 'red',
          color: 'white',
          border: 'none',
          borderRadius: '5px',
          cursor: 'pointer',
        }}
      >
        Kilépés
      </button>
    </div>
  );
};

export default ProfilePage;
