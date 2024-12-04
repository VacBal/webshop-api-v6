import React, { useEffect, useState } from 'react';

interface Address {
  name: string;
  country: string;
  city: string;
  street: string;
  zip: string;
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
  const [isEditing, setIsEditing] = useState(false);

  const userId = '1'; // Például: bejelentkezett felhasználó ID-ja

  useEffect(() => {
    const fetchProfile = async () => {
      try {
        const response = await fetch('/data/users.json');
        if (!response.ok) throw new Error('Hiba történt a felhasználói profil betöltésekor.');
        const users = await response.json();
        const userProfile = users.find((user: UserProfile) => user.userId === userId);
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
  }, [userId]);

  const handleSave = () => {
    setIsEditing(false);
    // A profil mentése történhet itt, pl. localStorage-be vagy JSON-fájl módosításával
    console.log('Mentett profil:', profile);
  };

  if (loading) return <p>Betöltés...</p>;
  if (error) return <p>{error}</p>;

  return (
    <div>
      <h1>Profilom</h1>
      {profile && (
        <div>
          <div>
            <label>Email:</label>
            <span>{profile.email}</span>
          </div>
          <div>
            <label>Vezetéknév:</label>
            {isEditing ? (
              <input
                type="text"
                value={profile.lastName}
                onChange={(e) => setProfile({ ...profile, lastName: e.target.value })}
              />
            ) : (
              <span>{profile.lastName}</span>
            )}
          </div>
          <div>
            <label>Keresztnév:</label>
            {isEditing ? (
              <input
                type="text"
                value={profile.firstName}
                onChange={(e) => setProfile({ ...profile, firstName: e.target.value })}
              />
            ) : (
              <span>{profile.firstName}</span>
            )}
          </div>
          <div>
            <h3>Szállítási cím</h3>
            {isEditing ? (
              <textarea
                value={JSON.stringify(profile.shippingAddress, null, 2)}
                onChange={(e) =>
                  setProfile({
                    ...profile,
                    shippingAddress: JSON.parse(e.target.value),
                  })
                }
              />
            ) : (
              <pre>{JSON.stringify(profile.shippingAddress, null, 2)}</pre>
            )}
          </div>
          <div>
            <h3>Számlázási cím</h3>
            {isEditing ? (
              <textarea
                value={JSON.stringify(profile.billingAddress, null, 2)}
                onChange={(e) =>
                  setProfile({
                    ...profile,
                    billingAddress: JSON.parse(e.target.value),
                  })
                }
              />
            ) : (
              <pre>{JSON.stringify(profile.billingAddress, null, 2)}</pre>
            )}
          </div>
          {isEditing ? (
            <button onClick={handleSave}>Mentés</button>
          ) : (
            <button onClick={() => setIsEditing(true)}>Szerkesztés</button>
          )}
        </div>
      )}
    </div>
  );
};

export default ProfilePage;
