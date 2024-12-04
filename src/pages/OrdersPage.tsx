
import React, { useEffect, useState } from 'react';

interface CartItem {
  productId: string;
  quantity: number;
}

interface Order {
  orderId: string;
  userId: string;
  items: { productId: string; quantity: number }[];
  status: string;
}

const OrdersPage = () => {
  const [orders, setOrders] = useState<Order[]>([]);
  const [cart, setCart] = useState<CartItem[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  // Betöltjük az előző rendelések és a kosár tartalmát
  useEffect(() => {
    const fetchOrders = async () => {
      try {
        const response = await fetch('/data/orders.json');
        if (!response.ok) throw new Error('Hiba történt a rendelések betöltésekor.');
        const data = await response.json();
        setOrders(data);

        // Kosár betöltése a localStorage-ból
        const savedCart = localStorage.getItem('cart');
        if (savedCart) {
          setCart(JSON.parse(savedCart));
        }
      } catch (err) {
        if (err instanceof Error) {
          setError(err.message);
        } else {
          setError('Ismeretlen hiba történt.');
        }
      } finally {
        setLoading(false);
      }
    };

    fetchOrders();
  }, []);

  const handlePlaceOrder = () => {
    if (cart.length === 0) {
      alert('A kosár üres. Kérlek, adj hozzá termékeket a rendeléshez!');
      return;
    }

    const newOrder: Order = {
      orderId: `${Date.now()}`, // Egyedi rendelés ID generálása
      userId: '12345', // Példa felhasználó azonosító
      items: cart,
      status: 'new',
    };

    // Új rendelés hozzáadása a meglévő rendeléseinkhez
    setOrders((prevOrders) => [...prevOrders, newOrder]);

    // Kosár kiürítése
    setCart([]);
    localStorage.removeItem('cart');

    alert('A rendelés sikeresen leadva!');
  };

  if (loading) return <p>Betöltés...</p>;
  if (error) return <p>{error}</p>;

  return (
    <div>
      <h1>Rendelések</h1>
      <ul>
        {orders.map((order) => (
          <li key={order.orderId}>
            Rendelés ID: {order.orderId} - Státusz: {order.status}
          </li>
        ))}
      </ul>
      <h2>Kosár tartalma</h2>
      {cart.length === 0 ? (
        <p>A kosár üres.</p>
      ) : (
        <ul>
          {cart.map((item) => (
            <li key={item.productId}>
              Termék ID: {item.productId} - Mennyiség: {item.quantity}
            </li>
          ))}
        </ul>
      )}
      <button
        onClick={handlePlaceOrder}
        style={{
          padding: '10px 20px',
          backgroundColor: '#007bff',
          color: '#fff',
          border: 'none',
          borderRadius: '5px',
          cursor: 'pointer',
          marginTop: '20px',
        }}
      >
        Rendelés leadása
      </button>
    </div>
  );
};

export default OrdersPage;
