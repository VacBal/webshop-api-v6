import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';

interface Address {
  name: string;
  country: string;
  city: string;
  street: string;
  zip: string;
  phoneNumber?: string;
  taxNumber?: string;
}

interface UserProfile {
  userId: string;
  email: string;
  firstName: string;
  lastName: string;
  shippingAddress: Address;
  billingAddress: Address;
}

const ProfilePage = () => {
  const [profile, setProfile] = useState<UserProfile | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchProfile = async () => {
      try {
        // Helyi `users.json` betöltése és szűrése
        const response = await fetch('/data/users.json');
        if (!response.ok) throw new Error('Hiba történt a felhasználói adatok lekérésekor.');
        const users: UserProfile[] = await response.json();

        // Példa: Az első felhasználó adatait jelenítjük meg
        const user = users[0];
        if (!user) throw new Error('Felhasználói profil nem található.');

        setProfile(user);
      } catch (err) {
        console.error(err);
        setError('Hiba történt a felhasználói adatok betöltésekor.');
      } finally {
        setLoading(false);
      }
    };

    fetchProfile();
  }, []);

  const handleLogout = () => {
    navigate('/login'); // Átirányítás a bejelentkezési oldalra
  };

  if (loading) return <div className="loading">Betöltés...</div>;
  if (error) return <div className="error">{error}</div>;

  return (
    <div style={{ padding: '20px', maxWidth: '600px', margin: 'auto' }}>
      <h1>Felhasználói profil</h1>
      {profile && (
        <div>
          <p>
            <strong>Email:</strong> {profile.email}
          </p>
          <p>
            <strong>Vezetéknév:</strong> {profile.lastName}
          </p>
          <p>
            <strong>Keresztnév:</strong> {profile.firstName}
          </p>
          <h3>Szállítási cím</h3>
          <ul>
            {Object.entries(profile.shippingAddress).map(([key, value]) => (
              <li key={key}>
                <strong>{key}:</strong> {value}
              </li>
            ))}
          </ul>
          <h3>Számlázási cím</h3>
          <ul>
            {Object.entries(profile.billingAddress).map(([key, value]) => (
              <li key={key}>
                <strong>{key}:</strong> {value}
              </li>
            ))}
          </ul>
          <button
            onClick={handleLogout}
            style={{
              marginTop: '20px',
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
      )}
    </div>
  );
};

export default ProfilePage;
