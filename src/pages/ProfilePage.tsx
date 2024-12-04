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
        // Ellenőrizzük, hogy van-e tárolt token
        const token = localStorage.getItem('authToken');
        if (!token) {
          throw new Error('Nincs érvényes token.');
        }

        // Helyi `users.json` betöltése és szűrése
        const response = await fetch('/data/users.json');
        if (!response.ok) throw new Error('Hiba történt a felhasználói adatok lekérésekor.');
        const users: UserProfile[] = await response.json();
        
        // Példa: Az aktuális felhasználót a token alapján szűrjük
        const user = users.find((user) => user.userId === token);
        if (!user) {
          throw new Error('Felhasználói profil nem található.');
        }

        setProfile(user);
      } catch (err) {
        console.error(err);
        localStorage.removeItem('authToken'); // Token törlése, ha hiba történik
        navigate('/login'); // Átirányítás a bejelentkezési oldalra
      } finally {
        setLoading(false);
      }
    };

    fetchProfile();
  }, [navigate]);

  const handleLogout = () => {
    localStorage.removeItem('authToken'); // Token törlése
    navigate('/login'); // Átirányítás a bejelentkezési oldalra
  };

  if (loading) return <p>Betöltés...</p>;
  if (error) return <p>{error}</p>;

  return (
    <div>
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
          <p>
            <strong>Név:</strong> {profile.shippingAddress.name}
          </p>
          <p>
            <strong>Ország:</strong> {profile.shippingAddress.country}
          </p>
          <p>
            <strong>Város:</strong> {profile.shippingAddress.city}
          </p>
          <p>
            <strong>Utca:</strong> {profile.shippingAddress.street}
          </p>
          <p>
            <strong>Irányítószám:</strong> {profile.shippingAddress.zip}
          </p>
          <p>
            <strong>Telefonszám:</strong> {profile.shippingAddress.phoneNumber}
          </p>

          <h3>Számlázási cím</h3>
          <p>
            <strong>Név:</strong> {profile.billingAddress.name}
          </p>
          <p>
            <strong>Ország:</strong> {profile.billingAddress.country}
          </p>
          <p>
            <strong>Város:</strong> {profile.billingAddress.city}
          </p>
          <p>
            <strong>Utca:</strong> {profile.billingAddress.street}
          </p>
          <p>
            <strong>Irányítószám:</strong> {profile.billingAddress.zip}
          </p>
          {profile.billingAddress.taxNumber && (
            <p>
              <strong>Adószám:</strong> {profile.billingAddress.taxNumber}
            </p>
          )}
          <button onClick={handleLogout}>Kilépés</button>
        </div>
      )}
    </div>
  );
};

export default ProfilePage;
