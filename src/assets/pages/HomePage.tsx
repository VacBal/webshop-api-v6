import React from "react";
import { Link } from "react-router-dom";

const HomePage: React.FC = () => {
  return (
    <div>
      <header style={headerStyle}>
        <nav style={navStyle}>
          <ul style={menuStyle}>
            <li style={menuItemStyle}>
              <Link to="/" style={linkStyle}>Főoldal</Link>
            </li>
            <li style={menuItemStyle}>
              <Link to="/categories" style={linkStyle}>Kategóriák</Link>
            </li>
            <li style={menuItemStyle}>
              <Link to="/products" style={linkStyle}>Termékek</Link>
            </li>
            <li style={menuItemStyle}>
              <Link to="/cart" style={linkStyle}>Kosár</Link>
            </li>
            <li style={menuItemStyle}>
              <Link to="/login" style={linkStyle}>Bejelentkezés</Link>
            </li>
            <li style={menuItemStyle}>
              <Link to="/register" style={linkStyle}>Regisztráció</Link>
            </li>
          </ul>
        </nav>
      </header>
      <main style={mainStyle}>
        <h1>Üdvözöljük a Webshopban!</h1>
        <p>Válasszon a fenti menüpontok közül, hogy elkezdje a vásárlást.</p>
      </main>
    </div>
  );
};

const headerStyle = {
  backgroundColor: "#007bff",
  padding: "10px 0",
};

const navStyle = {
  textAlign: "center" as "center",
};

const menuStyle = {
  listStyle: "none",
  margin: 0,
  padding: 0,
  display: "flex",
  justifyContent: "center",
  gap: "20px",
};

const menuItemStyle = {
  display: "inline",
};

const linkStyle = {
  color: "#fff",
  textDecoration: "none",
  fontWeight: "bold",
  padding: "10px 20px",
  borderRadius: "5px",
  transition: "background-color 0.3s",
};

const mainStyle = {
  textAlign: "center" as "center",
  marginTop: "20px",
};

export default HomePage;
