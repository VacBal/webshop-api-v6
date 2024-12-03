import React from "react";
import { Link } from "react-router-dom";

const HomePage: React.FC = () => {
  return (
    <div style={{ textAlign: "center", padding: "20px" }}>
      <h1>Üdvözöljük a Webshopban!</h1>
      <p>Fedezze fel a legjobb termékeket és ajánlatokat.</p>
      <div style={{ margin: "20px 0" }}>
        <Link to="/categories" style={linkStyle}>
          Kategóriák felfedezése
        </Link>
      </div>
      <div style={{ margin: "20px 0" }}>
        <Link to="/products" style={linkStyle}>
          Termékek böngészése
        </Link>
      </div>
      <div style={{ margin: "20px 0" }}>
        <Link to="/login" style={linkStyle}>
          Bejelentkezés
        </Link>
      </div>
      <div style={{ margin: "20px 0" }}>
        <Link to="/register" style={linkStyle}>
          Regisztráció
        </Link>
      </div>
    </div>
  );
};

const linkStyle = {
  display: "inline-block",
  padding: "10px 20px",
  backgroundColor: "#007bff",
  color: "#fff",
  textDecoration: "none",
  borderRadius: "5px",
  margin: "10px",
};

export default HomePage;
