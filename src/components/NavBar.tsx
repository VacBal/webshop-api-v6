import React from 'react';

import { Link } from 'react-router-dom';
import "../assets/styles/NavBar.css";


const NavBar = () => (
  <nav className="navbar">
    <Link to="/products/*">Termékek</Link>
    <Link to="/orders">Rendelések</Link>
    <Link to="/order">Megrendelés</Link>
    <Link to="/register">Regisztráció</Link>
    <Link to="/login" >Bejelentkezés</Link>
    <Link to="/profile">Profil</Link>
  </nav>
);

export default NavBar;
