import React, { useState } from "react";

const LoginPage: React.FC = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState<string | null>(null);

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      const response = await fetch("/users.json");
      const users = await response.json();
      const user = users.find(
        (u: any) => u.email === email && u.password === password
      );

      if (user) {
        alert(`Üdvözlünk, ${user.firstname}!`);
      } else {
        setError("Hibás e-mail vagy jelszó.");
      }
    } catch (err) {
      setError("Hálózati hiba történt.");
    }
  };

  return (
    <form onSubmit={handleLogin}>
      <h1>Belépés</h1>
      {error && <p style={{ color: "red" }}>{error}</p>}
      <input
        type="email"
        placeholder="E-mail"
        value={email}
        onChange={(e) => setEmail(e.target.value)}
      />
      <input
        type="password"
        placeholder="Jelszó"
        value={password}
        onChange={(e) => setPassword(e.target.value)}
      />
      <button type="submit">Belépés</button>
    </form>
  );
};

export default LoginPage;
