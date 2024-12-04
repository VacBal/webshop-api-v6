import React, { useState } from 'react';
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
  password: string;
  firstName: string;
  lastName: string;
  shippingAddress: Address;
  billingAddress: Address;
}

const RegisterPage = () => {
  const navigate = useNavigate(); // A hook, amely lehetővé teszi a navigációt
  const [formData, setFormData] = useState<UserProfile>({
    userId: '',
    email: '',
    password: '',
    firstName: '',
    lastName: '',
    shippingAddress: {
      name: '',
      country: '',
      city: '',
      street: '',
      zip: '',
      phoneNumber: '',
    },
    billingAddress: {
      name: '',
      country: '',
      city: '',
      street: '',
      zip: '',
      taxNumber: '',
    },
  });

  const [confirmPassword, setConfirmPassword] = useState('');
  const [errors, setErrors] = useState<{ [key: string]: string }>({});
  const [successMessage, setSuccessMessage] = useState('');

  const validateForm = () => {
    const newErrors: { [key: string]: string } = {};

    if (!formData.email.match(/^[^\s@]+@[^\s@]+\.[^\s@]+$/)) {
      newErrors.email = 'Érvényes email címet kell megadni.';
    }
    if (formData.password.length < 8 || !/\d/.test(formData.password) || !/[a-z]/.test(formData.password)) {
      newErrors.password = 'A jelszónak legalább 8 karakter hosszúnak kell lennie, tartalmaznia kell számot és kisbetűt.';
    }
    if (formData.password !== confirmPassword) {
      newErrors.confirmPassword = 'A jelszavak nem egyeznek meg.';
    }
    if (!formData.firstName.trim()) {
      newErrors.firstName = 'A keresztnév megadása kötelező.';
    }
    if (!formData.lastName.trim()) {
      newErrors.lastName = 'A vezetéknév megadása kötelező.';
    }
    if (!formData.shippingAddress.name.trim()) {
      newErrors.shippingAddressName = 'A szállítási cím neve kötelező.';
    }
    if (!formData.shippingAddress.phoneNumber?.match(/^\+\d{1,}$/)) {
      newErrors.phoneNumber = 'A telefonszám nemzetközi formátumban legyen megadva.';
    }

    setErrors(newErrors);

    return Object.keys(newErrors).length === 0;
  };

  const handleInputChange = (field: keyof UserProfile, value: string) => {
    setFormData((prev) => ({ ...prev, [field]: value }));
  };

  const handleAddressChange = (
    type: 'shippingAddress' | 'billingAddress',
    field: keyof Address,
    value: string
  ) => {
    setFormData((prev) => ({
      ...prev,
      [type]: { ...prev[type], [field]: value },
    }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!validateForm()) return;

    try {
      const usersResponse = await fetch('/data/users.json');
      if (!usersResponse.ok) throw new Error('Hiba történt a felhasználók betöltésekor.');
      const users: UserProfile[] = await usersResponse.json();

      if (users.some((user) => user.email === formData.email)) {
        setErrors({ email: 'Ez az email cím már regisztrálva van.' });
        return;
      }

      const newUser = { ...formData, userId: Date.now().toString() };
      users.push(newUser);

      // Új adatok mentése helyi fájlba
      const blob = new Blob([JSON.stringify(users, null, 2)], { type: 'application/json' });
      const link = document.createElement('a');
      link.href = URL.createObjectURL(blob);
      link.download = 'users.json';
      link.click();

      setSuccessMessage('Regisztráció sikeres! Most már bejelentkezhet.');
      setFormData({
        userId: '',
        email: '',
        password: '',
        firstName: '',
        lastName: '',
        shippingAddress: { name: '', country: '', city: '', street: '', zip: '', phoneNumber: '' },
        billingAddress: { name: '', country: '', city: '', street: '', zip: '', taxNumber: '' },
      });
      setConfirmPassword('');
    } catch (err) {
      console.error(err);
      setErrors({ global: 'Hiba történt a regisztráció során.' });
    }
  };

  const handleReset = () => {
    navigate('/'); // Navigáció a főoldalra
  };

  return (
    <div>
      <h1>Regisztráció</h1>
      <form onSubmit={handleSubmit}>
        <div>
          <label>Email:</label>
          <input
            type="email"
            value={formData.email}
            onChange={(e) => handleInputChange('email', e.target.value)}
          />
          {errors.email && <p style={{ color: 'red' }}>{errors.email}</p>}
        </div>
        <div>
          <label>Jelszó:</label>
          <input
            type="password"
            value={formData.password}
            onChange={(e) => handleInputChange('password', e.target.value)}
          />
          {errors.password && <p style={{ color: 'red' }}>{errors.password}</p>}
        </div>
        <div>
          <label>Jelszó megerősítése:</label>
          <input
            type="password"
            value={confirmPassword}
            onChange={(e) => setConfirmPassword(e.target.value)}
          />
          {errors.confirmPassword && <p style={{ color: 'red' }}>{errors.confirmPassword}</p>}
        </div>
        <button type="button" onClick={handleReset}>
          Mégsem
        </button>
        <button type="submit" disabled={Object.keys(errors).length > 0}>
          Regisztráció
        </button>
        {successMessage && <p style={{ color: 'green' }}>{successMessage}</p>}
      </form>
    </div>
  );
};

export default RegisterPage;
