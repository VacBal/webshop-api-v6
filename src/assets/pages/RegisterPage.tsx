import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useGlobalContext } from "../context/GlobalContext";

const RegisterPage: React.FC = () => {
  const { users, setUsers } = useGlobalContext();
  const [formData, setFormData] = useState({
    email: "",
    password: "",
    confirmPassword: "",
    firstName: "",
    lastName: "",
  });
  const [message, setMessage] = useState<string | null>(null);
  const navigate = useNavigate();

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleRegister = (e: React.FormEvent) => {
    e.preventDefault();

    // Ellenőrizd, hogy a users tömb-e
    if (!Array.isArray(users)) {
      console.error("A users nem tömb.");
      setMessage("Rendszerhiba történt. Próbáld újra később.");
      return;
    }

    // Ellenőrizd, hogy az email már létezik-e
    if (users.some((user) => user.email === formData.email)) {
      setMessage("Ez az e-mail cím már regisztrálva van.");
      return;
    }

    // Ellenőrizd a jelszó és megerősítés egyezését
    if (formData.password !== formData.confirmPassword) {
      setMessage("A jelszavak nem egyeznek.");
      return;
    }

    // Ellenőrizd a jelszó erősségét
    if (formData.password.length < 8) {
      setMessage("A jelszónak legalább 8 karakter hosszúnak kell lennie.");
      return;
    }

    // Új felhasználó létrehozása
    const newUser = {
      userId: Math.random().toString(36).substr(2, 9),
      email: formData.email,
      password: formData.password,
      firstName: formData.firstName,
      lastName: formData.lastName,
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
    setFormData({ email: "", password: "", confirmPassword: "", firstName: "", lastName: "" });

    // Navigáció a belépési oldalra
    setTimeout(() => navigate("/login"), 2000);
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
          type="password"
          name="confirmPassword"
          placeholder="Jelszó megerősítése"
          value={formData.confirmPassword}
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
