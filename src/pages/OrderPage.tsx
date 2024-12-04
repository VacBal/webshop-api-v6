import React, { useState, useEffect } from 'react';
import { useCart } from '../context/CartContext';

interface Address {
  name: string;
  country: string;
  city: string;
  street: string;
  zip: string;
  phoneNumber?: string;
  taxNumber?: string;
}

interface Order {
  id: string;
  comment: string;
  billingAddress: Address;
  shippingAddress: Address;
  items: {
    productId: string;
    name: string;
    quantity: number;
    price: number;
  }[];
  total: number;
  createdAt: string;
}

const OrderPage = () => {
  const { cart, clearCart } = useCart();
  const [billingAddress, setBillingAddress] = useState<Address>({
    name: '',
    country: '',
    city: '',
    street: '',
    zip: '',
    taxNumber: '',
  });

  const [shippingAddress, setShippingAddress] = useState<Address>({
    name: '',
    country: '',
    city: '',
    street: '',
    zip: '',
    phoneNumber: '',
  });

  const [comment, setComment] = useState('');
  const [termsAccepted, setTermsAccepted] = useState(false);
  const [total, setTotal] = useState(0);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const totalAmount = cart.reduce(
      (acc, item) => acc + item.price * item.quantity,
      0
    );
    setTotal(totalAmount);

    setBillingAddress({
      name: 'John Doe',
      country: 'USA',
      city: 'New York',
      street: '5th Avenue 123',
      zip: '10001',
      taxNumber: '12345678911',
    });

    setShippingAddress({
      name: 'John Doe',
      country: 'USA',
      city: 'New York',
      street: '5th Avenue 123',
      zip: '10001',
      phoneNumber: '+1234567890',
    });
  }, [cart]);

  const handleSubmit = () => {
    if (!termsAccepted) {
      setError('El kell fogadnod a felhasználási feltételeket!');
      return;
    }

    if (cart.length === 0) {
      setError('A kosarad üres!');
      return;
    }

    const newOrder: Order = {
      id: Date.now().toString(),
      comment,
      billingAddress,
      shippingAddress,
      items: cart.map((item) => ({
        productId: item.productId,
        name: item.name,
        quantity: item.quantity,
        price: item.price,
      })),
      total,
      createdAt: new Date().toISOString(),
    };

    try {
      const orders = JSON.parse(localStorage.getItem('orders') || '[]');
      orders.push(newOrder);
      localStorage.setItem('orders', JSON.stringify(orders));

      alert('Megrendelés sikeresen leadva!');
      clearCart();
      setComment('');
      window.location.href = '/thank-you';
    } catch (err) {
      console.error('Hiba a megrendelés mentésekor:', err);
      setError('Nem sikerült menteni a megrendelést.');
    }
  };

  const handleAddressChange = (
    type: 'billingAddress' | 'shippingAddress',
    field: keyof Address,
    value: string
  ) => {
    const updateAddress = type === 'billingAddress' ? setBillingAddress : setShippingAddress;
    updateAddress((prev) => ({ ...prev, [field]: value }));
  };

  return (
    <div>
      <h1>Megrendelés</h1>

      {error && <p style={{ color: 'red' }}>{error}</p>}

      <h2>Kosár tartalma</h2>
      <ul>
        {cart.map((item) => (
          <li key={item.productId}>
            {item.name} - {item.quantity} db - {item.price * item.quantity} Ft
          </li>
        ))}
      </ul>
      <h3>Összesen: {total} Ft</h3>

      <h2>Számlázási cím</h2>
      <form>
        {Object.keys(billingAddress).map((key) => (
          <div key={key}>
            <label>{key}:</label>
            <input
              type="text"
              value={billingAddress[key as keyof Address] || ''}
              onChange={(e) =>
                handleAddressChange('billingAddress', key as keyof Address, e.target.value)
              }
            />
          </div>
        ))}
      </form>

      <h2>Szállítási cím</h2>
      <form>
        {Object.keys(shippingAddress).map((key) => (
          <div key={key}>
            <label>{key}:</label>
            <input
              type="text"
              value={shippingAddress[key as keyof Address] || ''}
              onChange={(e) =>
                handleAddressChange('shippingAddress', key as keyof Address, e.target.value)
              }
            />
          </div>
        ))}
      </form>

      <textarea
        placeholder="Megjegyzés"
        value={comment}
        onChange={(e) => setComment(e.target.value)}
      />

      <div>
        <label>
          <input
            type="checkbox"
            checked={termsAccepted}
            onChange={(e) => setTermsAccepted(e.target.checked)}
          />
          Elfogadom a felhasználási feltételeket
        </label>
      </div>

      <button onClick={handleSubmit}>Megrendelés leadása</button>
    </div>
  );
};

export default OrderPage;
