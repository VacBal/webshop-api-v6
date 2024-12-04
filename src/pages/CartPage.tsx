import React from 'react';
import { useNavigate } from 'react-router-dom';
import { useCart } from '../context/CartContext';

const CartPage: React.FC = () => {
  const { cart, clearCart } = useCart();
  const navigate = useNavigate();

  const handleProceedToOrder = () => {
    if (cart.length === 0) {
      alert('A kosarad üres!');
      return;
    }

    navigate('/order'); // Átirányítás az OrderPage-re
  };

  return (
    <div>
      <h1>Kosár</h1>
      <ul>
        {cart.map((item) => (
          <li key={item.productId}>
            {item.name} - {item.quantity} db - {item.price * item.quantity} Ft
          </li>
        ))}
      </ul>
      <button onClick={handleProceedToOrder}>Tovább a rendeléshez</button>
      <button onClick={clearCart}>Törlés</button>
    </div>
  );
};

export default CartPage;
