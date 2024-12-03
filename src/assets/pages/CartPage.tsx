import React from "react";
import { useGlobalContext } from "../context/GlobalContext";

const CartPage: React.FC = () => {
  const { cart, getCartItemQuantity, getCartTotal } = useGlobalContext();

  return (
    <div>
      <h1>Kosár</h1>
      {cart.map((item) => (
        <div key={item.productId}>
          <p>Termék ID: {item.productId}</p>
          <p>Mennyiség: {item.quantity}</p>
        </div>
      ))}
      <p>Összes darabszám: {getCartTotal()}</p>
    </div>
  );
};

export default CartPage;
