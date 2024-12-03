import React, { useState } from "react";
import { useNavigate } from "react-router-dom";

const LoginPage: React.FC = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState<string | null>(null);
  const navigate = useNavigate(); // React Router navigate hook

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();

    try {
      // Példa: JSON-ból történő validáció
      const response = await fetch("/users.json");
      const users = await response.json();

      // Ellenőrzés: felhasználó email és jelszó
      const user = users.find(
        (u: any) => u.email === email && u.password === password
      );

      if (user) {
        // Sikeres bejelentkezés
        alert(`Üdvözlünk, ${user.firstname}!`);
        navigate("/"); // Navigáció a főoldalra
      } else {
        setError("Hibás e-mail vagy jelszó.");
      }
    } catch (err) {
      setError("Hálózati hiba történt.");
    }
  };

  return (
    <div style={{ textAlign: "center", marginTop: "50px" }}>
      <h1>Belépés</h1>
      {error && <p style={{ color: "red" }}>{error}</p>}
      <form onSubmit={handleLogin} style={{ display: "inline-block" }}>
        <div style={{ marginBottom: "10px" }}>
          <input
            type="email"
            placeholder="E-mail"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
            style={inputStyle}
          />
        </div>
        <div style={{ marginBottom: "10px" }}>
          <input
            type="password"
            placeholder="Jelszó"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
            style={inputStyle}
          />
        </div>
        <button type="submit" style={buttonStyle}>
          Belépés
        </button>
      </form>
    </div>
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

export default LoginPage;
