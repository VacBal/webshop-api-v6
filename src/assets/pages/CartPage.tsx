import React, { useEffect, useState } from "react";

interface CartItem {
  id: string;
  quantity: number;
}

const CartPage: React.FC = () => {
  const [cart, setCart] = useState<CartItem[]>([]);

  useEffect(() => {
    const savedCart = localStorage.getItem("cart");
    if (savedCart) {
      setCart(JSON.parse(savedCart));
    }
  }, []);

  const addToCart = (id: string) => {
    const updatedCart = [...cart];
    const itemIndex = updatedCart.findIndex((item) => item.id === id);

    if (itemIndex > -1) {
      updatedCart[itemIndex].quantity += 1;
    } else {
      updatedCart.push({ id, quantity: 1 });
    }

    setCart(updatedCart);
    localStorage.setItem("cart", JSON.stringify(updatedCart));
  };

  return (
    <div>
      <h1>Kosár</h1>
      <ul>
        {cart.map((item) => (
          <li key={item.id}>
            Termék ID: {item.id}, Mennyiség: {item.quantity}
          </li>
        ))}
      </ul>
      <button onClick={() => addToCart("product1")}>Termék 1 hozzáadása</button>
    </div>
  );
};

export default CartPage;
