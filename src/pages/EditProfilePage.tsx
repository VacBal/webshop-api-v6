import React, { useState, useEffect } from 'react';

interface Address {
  name: string;
  country: string;
  city: string;
  street: string;
  zip: string;
  phoneNumber?: string;
}

interface UserProfile {
  userId: string;
  email: string;
  firstName: string;
  lastName: string;
  shippingAddress: Address;
  billingAddress: Address;
}

const EditProfilePage = () => {
  const [profile, setProfile] = useState<UserProfile | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    // Betöltés a helyi JSON fájlból
    const fetchProfile = async () => {
      try {
        const response = await fetch('/data/users.json');
        if (!response.ok) throw new Error('Hiba történt a felhasználói adatok betöltésekor.');

        const users: UserProfile[] = await response.json();
        const userProfile = users[0]; // Példaként az első felhasználót töltjük be.
        if (!userProfile) throw new Error('Felhasználói profil nem található.');

        setProfile(userProfile);
      } catch (err) {
        if (err instanceof Error) {
          setError(err.message);
        } else {
          setError('Ismeretlen hiba történt.');
        }
      } finally {
        setLoading(false);
      }
    };

    fetchProfile();
  }, []);

  const handleInputChange = (field: keyof UserProfile, value: string) => {
    setProfile((prevProfile) => {
      if (!prevProfile) return null;
      return { ...prevProfile, [field]: value };
    });
  };

  const handleAddressChange = (
    type: 'shippingAddress' | 'billingAddress',
    field: keyof Address,
    value: string
  ) => {
    setProfile((prevProfile) => {
      if (!prevProfile) return null;
      return {
        ...prevProfile,
        [type]: { ...prevProfile[type], [field]: value },
      };
    });
  };

  const handleSave = () => {
    if (!profile) return;

    // Mentés a helyi JSON fájlba
    try {
      const dataStr = JSON.stringify([profile], null, 2);
      const blob = new Blob([dataStr], { type: 'application/json' });

      // Letöltésként mentjük a módosított adatokat
      const link = document.createElement('a');
      link.href = URL.createObjectURL(blob);
      link.download = 'users.json';
      link.click();

      alert('Adatok sikeresen módosítva!');
    } catch (err) {
      console.error('Hiba történt a mentés során:', err);
    }
  };

  if (loading) return <p>Betöltés...</p>;
  if (error) return <p>{error}</p>;

  return (
    <div>
      <h1>Profil módosítása</h1>
      {profile && (
        <div>
          <div>
            <label>Vezetéknév:</label>
            <input
              type="text"
              value={profile.lastName}
              onChange={(e) => handleInputChange('lastName', e.target.value)}
            />
          </div>
          <div>
            <label>Keresztnév:</label>
            <input
              type="text"
              value={profile.firstName}
              onChange={(e) => handleInputChange('firstName', e.target.value)}
            />
          </div>
          <div>
            <h3>Szállítási cím</h3>
            {Object.keys(profile.shippingAddress).map((key) => (
              <div key={key}>
                <label>{key}:</label>
                <input
                  type="text"
                  value={profile.shippingAddress[key as keyof Address]}
                  onChange={(e) =>
                    handleAddressChange('shippingAddress', key as keyof Address, e.target.value)
                  }
                />
              </div>
            ))}
          </div>
          <div>
            <h3>Számlázási cím</h3>
            {Object.keys(profile.billingAddress).map((key) => (
              <div key={key}>
                <label>{key}:</label>
                <input
                  type="text"
                  value={profile.billingAddress[key as keyof Address]}
                  onChange={(e) =>
                    handleAddressChange('billingAddress', key as keyof Address, e.target.value)
                  }
                />
              </div>
            ))}
          </div>
          <button onClick={handleSave}>Mentés</button>
        </div>
      )}
    </div>
  );
};

export default EditProfilePage;
