import React, { useEffect, useState } from "react";

interface Order {
  orderId: string;
  status: string;
  createdAt: string;
  total: number;
}

const OrderListPage: React.FC = () => {
  const [orders, setOrders] = useState<Order[]>([]);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchOrders = async () => {
      try {
        const response = await fetch("http://localhost:5000/orders", {
          headers: { Authorization: `Bearer ${localStorage.getItem("token")}` },
        });
        if (response.ok) {
          const data = await response.json();
          setOrders(data);
        } else {
          setError("Hiba történt a megrendelések betöltése során.");
        }
      } catch (err) {
        setError("Hálózati hiba történt.");
      }
    };

    fetchOrders();
  }, []);

  if (error) return <p style={{ color: "red" }}>{error}</p>;

  return (
    <div>
      <h1>Megrendeléseim</h1>
      <ul>
        {orders.map((order) => (
          <li key={order.orderId}>
            <p>Megrendelés ID: {order.orderId}</p>
            <p>Állapot: {order.status}</p>
            <p>Összeg: {order.total} Ft</p>
            <p>Dátum: {new Date(order.createdAt).toLocaleDateString()}</p>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default OrderListPage;
