import React, { useEffect, useState } from 'react';

interface Product {
  id: string;
  name: string;
  description: string;
  price: number;
  image: string;
  stock: number;
}

interface CartItem {
  productId: string;
  quantity: number;
}

const ProductListPage: React.FC = () => {
  const [products, setProducts] = useState<Product[]>([]);
  const [cart, setCart] = useState<CartItem[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    // Betöltéskor kosár inicializálása localStorage-ból
    const savedCart = localStorage.getItem('cart');
    if (savedCart) {
      setCart(JSON.parse(savedCart));
    }

    const fetchProducts = async () => {
      try {
        const response = await fetch('/data/products.json');
        if (!response.ok) {
          throw new Error('Hiba történt a termékek betöltésekor.');
        }
        const data = await response.json();
        setProducts(data);
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

    fetchProducts();
  }, []);

  const handleAddToCart = (productId: string) => {
    setCart((prevCart) => {
      const existingItem = prevCart.find((item) => item.productId === productId);
      let updatedCart;

      if (existingItem) {
        updatedCart = prevCart.map((item) =>
          item.productId === productId
            ? { ...item, quantity: item.quantity + 1 }
            : item
        );
      } else {
        updatedCart = [...prevCart, { productId, quantity: 1 }];
      }

      // Kosár frissítése localStorage-ban
      localStorage.setItem('cart', JSON.stringify(updatedCart));
      return updatedCart;
    });
  };

  if (loading) return <p>Betöltés...</p>;
  if (error) return <p>{error}</p>;

  return (
    <div>
      <h1>Terméklista</h1>
      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: '16px' }}>
        {products.map((product) => (
          <div
            key={product.id}
            style={{
              border: '1px solid #ddd',
              borderRadius: '8px',
              padding: '16px',
              textAlign: 'center',
            }}
          >
            <img
              src={product.image}
              alt={product.name}
              style={{ width: '100%', height: '150px', objectFit: 'cover', borderRadius: '8px' }}
            />
            <h2>{product.name}</h2>
            <p>{product.description}</p>
            <p><strong>Ár:</strong> {product.price} Ft</p>
            <p>
              <strong>Raktárkészlet:</strong>{' '}
              {product.stock > 0 ? `${product.stock} db` : 'Nincs raktáron'}
            </p>
            <button
              style={{
                padding: '8px 16px',
                backgroundColor: product.stock > 0 ? '#007bff' : '#ccc',
                color: '#fff',
                border: 'none',
                borderRadius: '4px',
                cursor: product.stock > 0 ? 'pointer' : 'not-allowed',
              }}
              disabled={product.stock === 0}
              onClick={() => handleAddToCart(product.id)}
            >
              Kosárba
            </button>
          </div>
        ))}
      </div>
    </div>
  );
};

export default ProductListPage;
