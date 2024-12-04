import React, { useState, useEffect } from 'react';

interface Order {
  orderId: string;
  status: string;
  comment: string;
  billingAddress: Address;
  shippingAddress: Address;
  items: { product: Product; quantity: number }[];
  total: number;
}

interface Address {
  name: string;
  country: string;
  city: string;
  street: string;
  zip: string;
  phoneNumber?: string;
}

interface Product {
  id: string;
  name: string;
  image: string;
  price: number;
  rating: number;
  categories: string[];
  stock: number;
}

const OrdersPage = () => {
  const [orders, setOrders] = useState<Order[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [reason, setReason] = useState('');
  const [selectedOrderId, setSelectedOrderId] = useState<string | null>(null);

  useEffect(() => {
    const fetchOrders = async () => {
      try {
        const response = await fetch('/data/orders.json');
        if (!response.ok) throw new Error('Hiba történt a rendelések betöltésekor.');
        const data = await response.json();
        setOrders(data);
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

  const handleCancelOrder = async (orderId: string) => {
    if (!reason) {
      alert('Az indoklás megadása kötelező!');
      return;
    }

    try {
      const response = await fetch(`/data/orders/${orderId}`, {
        method: 'DELETE',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ reason }),
      });

      if (!response.ok) {
        throw new Error('Hiba történt a megrendelés visszamondása során.');
      }

      const updatedOrder = await response.json();
      setOrders((prevOrders) =>
        prevOrders.map((order) =>
          order.orderId === updatedOrder.orderId ? updatedOrder : order
        )
      );
      setReason('');
      setSelectedOrderId(null);
      alert('A megrendelés sikeresen visszamondva.');
    } catch (err) {
      if (err instanceof Error) {
        setError(err.message);
      } else {
        setError('Ismeretlen hiba történt.');
      }
    }
  };

  if (loading) return <p>Betöltés...</p>;
  if (error) return <p>{error}</p>;

  return (
    <div>
      <h1>Rendeléseim</h1>
      <ul>
        {orders.map((order) => (
          <li key={order.orderId}>
            <h3>Rendelés ID: {order.orderId}</h3>
            <p>Státusz: {order.status}</p>
            <p>Összesen: {order.total} Ft</p>
            {order.status === 'new' && (
              <button onClick={() => setSelectedOrderId(order.orderId)}>Visszamondás</button>
            )}
          </li>
        ))}
      </ul>
      {selectedOrderId && (
        <div>
          <h2>Megrendelés visszamondása</h2>
          <p>Rendelés ID: {selectedOrderId}</p>
          <textarea
            placeholder="Adja meg az indoklást"
            value={reason}
            onChange={(e) => setReason(e.target.value)}
          />
          <button onClick={() => handleCancelOrder(selectedOrderId)}>Megerősítés</button>
          <button onClick={() => setSelectedOrderId(null)}>Mégsem</button>
        </div>
      )}
    </div>
  );
};

export default OrdersPage;
