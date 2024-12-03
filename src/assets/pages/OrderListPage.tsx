import React, { useEffect, useState } from "react";

interface Order {
  orderId: string;
  status: string;
  createdAt: string;
  total: number;
  billingAddress: Address;
  shippingAddress: Address;
}

interface Address {
  name: string;
  country: string;
  city: string;
  street: string;
  zip: string;
}

const OrderListPage: React.FC = () => {
  const [orders, setOrders] = useState<Order[]>([]);

  useEffect(() => {
    const fetchOrders = async () => {
      const response = await fetch("/orders.json");
      const data = await response.json();
      setOrders(data);
    };

    fetchOrders();
  }, []);

  return (
    <div>
      <h1>Megrendelések</h1>
      {orders.map((order) => (
        <div key={order.orderId}>
          <h2>Megrendelés ID: {order.orderId}</h2>
          <p>Státusz: {order.status}</p>
          <p>Dátum: {new Date(order.createdAt).toLocaleDateString()}</p>
          <p>Összesen: {order.total} Ft</p>
        </div>
      ))}
    </div>
  );
};

export default OrderListPage;
