import React from 'react';
import { Link } from 'react-router-dom';
import '../assets/styles/NavBar.css';

const NavBar = () => {
  return (
    <nav className="navbar">
      <div className="navbar-logo">
        <Link to="/">Webshop</Link>
      </div>
      <div className="navbar-menu">
        <Link to="/">Termékek</Link>
        <Link to="/cart">Kosár</Link>
        <Link to="/profile">Profil</Link>
        <Link to="/login">Bejelentkezés</Link>
      </div>
    </nav>
  );
};

export default NavBar;
