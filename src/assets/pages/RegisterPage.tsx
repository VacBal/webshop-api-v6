import React, { useState } from "react";

const RegisterPage: React.FC = () => {
  const [formData, setFormData] = useState({
    email: "",
    password: "",
    firstname: "",
    lastname: "",
  });
  const [message, setMessage] = useState<string | null>(null);

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleRegister = (e: React.FormEvent) => {
    e.preventDefault();

    // Ellenőrizd, hogy a localStorage-ban van-e már "users" kulcs
    const storedUsers = localStorage.getItem("users");
    const users = storedUsers ? JSON.parse(storedUsers) : [];

    // Ellenőrizzük, hogy az email már létezik-e
    const emailExists = users.some((user: any) => user.email === formData.email);
    if (emailExists) {
      setMessage("Ez az e-mail cím már regisztrálva van.");
      return;
    }

    // Új felhasználó hozzáadása
    users.push(formData);

    // Mentés a localStorage-ba
    localStorage.setItem("users", JSON.stringify(users));

    // Üzenet és űrlap alaphelyzetbe állítása
    setMessage("Sikeres regisztráció!");
    setFormData({ email: "", password: "", firstname: "", lastname: "" });
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
          style={inputStyle}
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
          style={inputStyle}
        />
      </div>
      <div>
        <input
          type="text"
          name="firstname"
          placeholder="Keresztnév"
          value={formData.firstname}
          onChange={handleInputChange}
          required
          style={inputStyle}
        />
      </div>
      <div>
        <input
          type="text"
          name="lastname"
          placeholder="Vezetéknév"
          value={formData.lastname}
          onChange={handleInputChange}
          required
          style={inputStyle}
        />
      </div>
      <button type="submit" style={buttonStyle}>
        Regisztráció
      </button>
    </form>
  );
};

// Stílusok
const inputStyle = {
  width: "250px",
  padding: "10px",
  margin: "5px",
  borderRadius: "5px",
  border: "1px solid #ccc",
};

const buttonStyle = {
  padding: "10px 20px",
  backgroundColor: "#007bff",
  color: "#fff",
  border: "none",
  borderRadius: "5px",
  cursor: "pointer",
};

export default RegisterPage;
