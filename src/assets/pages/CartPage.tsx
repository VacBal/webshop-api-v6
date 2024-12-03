import React from "react";
import { useGlobalContext } from "../context/GlobalContext";

const CartPage: React.FC = () => {
  const { cart } = useGlobalContext();

  return (
    <div>
      <h1>Kosár</h1>
      {cart.length > 0 ? (
        cart.map((item) => (
          <div key={item.productId}>
            <p>Termék ID: {item.productId}</p>
            <p>Mennyiség: {item.quantity}</p>
          </div>
        ))
      ) : (
        <p>A kosár üres.</p>
      )}
    </div>
  );
};

export default CartPage;
