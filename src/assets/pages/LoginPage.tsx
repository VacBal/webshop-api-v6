import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useGlobalContext } from "../context/GlobalContext";

const LoginPage: React.FC = () => {
  const { setCurrentUser } = useGlobalContext();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState<string | null>(null);
  const navigate = useNavigate();

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    setError(null);

    try {
      const response = await fetch("/user.json"); // Felhasználói adatok betöltése
      const userData = await response.json();

      if (userData.email === email && userData.password === password) {
        setCurrentUser(userData); // Beállítjuk a bejelentkezett felhasználót
        navigate("/profile"); // Navigáció a profil oldalra
      } else {
        setError("Hibás e-mail vagy jelszó.");
      }
    } catch (err) {
      setError("Hálózati hiba történt.");
    }
  };

  return (
    <form onSubmit={handleLogin} style={{ textAlign: "center", marginTop: "50px" }}>
      <h1>Belépés</h1>
      {error && <p style={{ color: "red" }}>{error}</p>}
      <input
        type="email"
        placeholder="E-mail"
        value={email}
        onChange={(e) => setEmail(e.target.value)}
        required
      />
      <input
        type="password"
        placeholder="Jelszó"
        value={password}
        onChange={(e) => setPassword(e.target.value)}
        required
      />
      <button type="submit">Belépés</button>
    </form>
  );
};

export default LoginPage;
