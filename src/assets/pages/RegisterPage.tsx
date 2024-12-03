import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useGlobalContext } from "../context/GlobalContext";

const RegisterPage: React.FC = () => {
  const { users, setUsers } = useGlobalContext();
  const [formData, setFormData] = useState({
    email: "",
    password: "",
    firstName: "", // Helyes tulajdonságnevek
    lastName: "",  // Helyes tulajdonságnevek
  });
  const [message, setMessage] = useState<string | null>(null);
  const navigate = useNavigate();

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleRegister = (e: React.FormEvent) => {
    e.preventDefault();

    // Ellenőrizd, hogy az email már létezik-e
    if (users.some((user) => user.email === formData.email)) {
      setMessage("Ez az e-mail cím már regisztrálva van.");
      return;
    }

    // Új felhasználó létrehozása
    const newUser = {
      ...formData,
      userId: Math.random().toString(36).substr(2, 9),
      shippingAddress: {
        name: `${formData.firstName} ${formData.lastName}`,
        country: "",
        city: "",
        street: "",
        zip: "",
        phoneNumber: "",
      },
      billingAddress: {
        name: `${formData.firstName} ${formData.lastName}`,
        country: "",
        city: "",
        street: "",
        zip: "",
        taxNumber: "",
      },
    };

    setUsers([...users, newUser]); // Új felhasználó hozzáadása
    setMessage("Sikeres regisztráció!");
    setFormData({ email: "", password: "", firstName: "", lastName: "" }); // Állapot visszaállítása
    setTimeout(() => navigate("/login"), 2000); // Navigáció a belépési oldalra
  };

  return (
    <form onSubmit={handleRegister} style={{ textAlign: "center", marginTop: "50px" }}>
      <h1>Regisztráció</h1>
      {message && <p style={{ color: message.includes("Sikeres") ? "green" : "red" }}>{message}</p>}
      <div>
        <input
          type="email"
          name="email"
          placeholder="E-mail"
          value={formData.email}
          onChange={handleInputChange}
          required
        />
      </div>
      <div>
        <input
          type="password"
          name="password"
          placeholder="Jelszó"
          value={formData.password}
          onChange={handleInputChange}
          required
        />
      </div>
      <div>
        <input
          type="text"
          name="firstName"
          placeholder="Keresztnév"
          value={formData.firstName}
          onChange={handleInputChange}
          required
        />
      </div>
      <div>
        <input
          type="text"
          name="lastName"
          placeholder="Vezetéknév"
          value={formData.lastName}
          onChange={handleInputChange}
          required
        />
      </div>
      <button type="submit">Regisztráció</button>
    </form>
  );
};

export default RegisterPage;
