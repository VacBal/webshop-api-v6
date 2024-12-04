import React, { useEffect, useState } from 'react';
import { useCart } from '../context/CartContext';
import '../assets/styles/ProductListPage.css';

interface Product {
  id: string;
  name: string;
  price: number;
  description: string;
  stock: number;
  image: string;
}

const ProductListPage = () => {
  const [products, setProducts] = useState<Product[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const { addToCart } = useCart();

  useEffect(() => {
    const fetchProducts = async () => {
      try {
        const response = await fetch('/data/products.json');
        if (!response.ok) throw new Error('Hiba történt a termékek betöltésekor.');
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

  const handleAddToCart = (product: Product) => {
    addToCart({ productId: product.id, name: product.name, price: product.price, quantity: 1 });
  };

  if (loading) return <p>Betöltés...</p>;
  if (error) return <p>{error}</p>;

  return (
    <div className="product-list-container">
      <h1>Terméklista</h1>
      <div className="product-grid">
        {products.map((product) => (
          <div key={product.id} className="product-card">
            <h3>{product.name}</h3>
            <img src={product.image} alt={product.name} />
            <p>{product.description}</p>
            <p>Ár: {product.price} Ft</p>
            <button onClick={() => handleAddToCart(product)}>Kosárba</button>
          </div>
        ))}
      </div>
    </div>
  );
};

export default ProductListPage;
