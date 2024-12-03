import React, { useState } from "react";

const RegisterPage: React.FC = () => {
  const [formData, setFormData] = useState({
    email: "",
    password: "",
    firstname: "",
    lastname: "",
  });
  const [success, setSuccess] = useState(false);

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleRegister = async (e: React.FormEvent) => {
    e.preventDefault();
    // Felhasználót csak kliensoldalon tároljuk
    setSuccess(true);
  };

  return (
    <form onSubmit={handleRegister}>
      <h1>Regisztráció</h1>
      {success && <p style={{ color: "green" }}>Sikeres regisztráció!</p>}
      <input
        type="email"
        name="email"
        placeholder="E-mail"
        value={formData.email}
        onChange={handleInputChange}
      />
      <input
        type="password"
        name="password"
        placeholder="Jelszó"
        value={formData.password}
        onChange={handleInputChange}
      />
      <input
        type="text"
        name="firstname"
        placeholder="Keresztnév"
        value={formData.firstname}
        onChange={handleInputChange}
      />
      <input
        type="text"
        name="lastname"
        placeholder="Vezetéknév"
        value={formData.lastname}
        onChange={handleInputChange}
      />
      <button type="submit">Regisztráció</button>
    </form>
  );
};

export default RegisterPage;
