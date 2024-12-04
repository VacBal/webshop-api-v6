import React, { useState, useEffect } from 'react';

interface Address {
  name: string;
  country: string;
  city: string;
  street: string;
  zip: string;
  phoneNumber?: string;
  taxNumber?: string;
}

interface CartItem {
  productId: string;
  name: string;
  price: number;
  quantity: number;
}

const OrderPage = () => {
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

  const [cart, setCart] = useState<CartItem[]>([]);
  const [comment, setComment] = useState('');
  const [termsAccepted, setTermsAccepted] = useState(false);
  const [total, setTotal] = useState(0);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    // Fetch cart items from local storage or a JSON file
    const savedCart = JSON.parse(localStorage.getItem('cart') || '[]');
    setCart(savedCart);

    // Calculate total price
    const totalAmount = savedCart.reduce(
      (acc: number, item: CartItem) => acc + item.price * item.quantity,
      0
    );
    setTotal(totalAmount);

    // Set mock addresses (this could be fetched from a profile)
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
  }, []);

  const handleSubmit = async () => {
    if (!termsAccepted) {
      setError('El kell fogadnod a felhasználási feltételeket!');
      return;
    }

    if (cart.length === 0) {
      setError('A kosarad üres!');
      return;
    }

    try {
      const response = await fetch('/data/orders.json', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          comment,
          billingAddress,
          shippingAddress,
          items: cart.map(({ productId, quantity }) => ({ productId, quantity })),
        }),
      });

      if (!response.ok) throw new Error('Hiba történt a megrendelés leadása során.');

      // Clear cart and redirect to thank-you page
      localStorage.removeItem('cart');
      setCart([]);
      alert('Köszönjük a rendelésedet!');
      window.location.href = '/thank-you';
    } catch (err) {
      if (err instanceof Error) setError(err.message);
      else setError('Ismeretlen hiba történt.');
    }
  };

  const handleAddressChange = (type: 'billingAddress' | 'shippingAddress', field: keyof Address, value: string) => {
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
