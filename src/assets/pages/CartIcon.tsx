import React from "react";
import { useNavigate } from "react-router-dom";
import { useGlobalContext } from "../context/GlobalContext";

const CartIcon: React.FC = () => {
  const { getCartTotal } = useGlobalContext();
  const navigate = useNavigate();

  return (
    <div onClick={() => navigate("/cart")}>
      <span>🛒</span>
      <span>{getCartTotal()}</span>
    </div>
  );
};

export default CartIcon;
