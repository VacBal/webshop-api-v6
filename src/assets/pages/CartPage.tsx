import React from "react";
import { useGlobalContext } from "../context/GlobalContext";

const CartPage: React.FC = () => {
  const { cart, removeFromCart } = useGlobalContext();

  return (
    <div style={{ textAlign: "center", marginTop: "50px" }}>
      <h1>Kosár</h1>
      {cart.length > 0 ? (
        cart.map((item) => (
          <div key={item.productId} style={{ marginBottom: "20px" }}>
            <p><strong>Termék ID:</strong> {item.productId}</p>
            <p><strong>Mennyiség:</strong> {item.quantity}</p>
            <button onClick={() => removeFromCart(item.productId)}>Eltávolítás</button>
          </div>
        ))
      ) : (
        <p>A kosár üres.</p>
      )}
    </div>
  );
};

export default CartPage;
