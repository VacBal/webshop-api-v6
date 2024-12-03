import React from "react";
import { Link } from "react-router-dom";
import { useGlobalContext } from "../context/GlobalContext";

const NavBar: React.FC = () => {
  const { getCartTotal } = useGlobalContext();

  return (
    <nav>
      <Link to="/">Főoldal</Link>
      <Link to="/cart">
        Kosár ({getCartTotal()})
      </Link>
    </nav>
  );
};

export default NavBar;
