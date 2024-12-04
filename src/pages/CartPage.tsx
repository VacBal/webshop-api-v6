import React from 'react';
import { useCart } from '../context/CartContext';

interface CartItem {
  productId: string;
  name: string;
  price: number;
  quantity: number;
}

const CartPage = () => {
  const { cart, removeFromCart, updateQuantity, clearCart } = useCart();

  const calculateTotal = () => {
    return cart.reduce((total, item) => total + item.price * item.quantity, 0).toFixed(2);
  };

  if (cart.length === 0) {
    return (
      <div>
        <h1>Kosár</h1>
        <p>A kosár üres. <a href="/">Vásárlás folytatása</a></p>
      </div>
    );
  }

  return (
    <div>
      <h1>Kosár</h1>
      <ul>
        {cart.map((item) => (
          <li key={item.productId} style={{ marginBottom: '20px' }}>
            <h3>{item.name}</h3>
            <p>Ár: {item.price} Ft</p>
            <p>
              Mennyiség:
              <button onClick={() => updateQuantity(item.productId, item.quantity - 1)} disabled={item.quantity <= 1}>
                -
              </button>
              <span>{item.quantity}</span>
              <button onClick={() => updateQuantity(item.productId, item.quantity + 1)}>+</button>
            </p>
            <button onClick={() => removeFromCart(item.productId)}>Eltávolítás</button>
          </li>
        ))}
      </ul>
      <div>
        <h3>Összesen: {calculateTotal()} Ft</h3>
        <button onClick={clearCart}>Kosár ürítése</button>
        <a href="/order">
          <button>Megrendelés</button>
        </a>
      </div>
    </div>
  );
};

export default CartPage;
