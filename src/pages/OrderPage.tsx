import React from 'react';

const OrderPage = () => {
  const handleOrder = () => {
    // Megrendelés logika
  };

  return (
    <div>
      <h1>Megrendelés</h1>
      <button onClick={handleOrder}>Megrendelés elküldése</button>
    </div>
  );
};

export default OrderPage;
