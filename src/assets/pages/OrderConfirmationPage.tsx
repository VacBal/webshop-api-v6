import React, { useEffect, useState } from "react";

interface Order {
  orderId: string;
  status: string;
  total: number;
}

const OrderConfirmationPage: React.FC = () => {
  const [latestOrder, setLatestOrder] = useState<Order | null>(null);

  useEffect(() => {
    const fetchLatestOrder = async () => {
      const response = await fetch("/orders.json");
      const orders = await response.json();
      setLatestOrder(orders[0]); // Az első megrendelést mutatjuk
    };

    fetchLatestOrder();
  }, []);

  if (!latestOrder) {
    return <p>Nincs visszaigazolt megrendelés.</p>;
  }

  return (
    <div>
      <h1>Köszönjük a rendelést!</h1>
      <p>Megrendelés azonosító: {latestOrder.orderId}</p>
      <p>Összesen: {latestOrder.total} Ft</p>
    </div>
  );
};

export default OrderConfirmationPage;
