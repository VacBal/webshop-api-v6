import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import { useCart } from '../context/CartContext';
import NavBar from '../components/NavBar';

interface Product {
  id: string;
  name: string;
  price: number;
  description: string;
  stock: number;
  image: string;
  categories: string[];
}

const ProductListPage = () => {
  const { categoryId } = useParams<{ categoryId: string }>(); // Kategória ID paraméter
  const [products, setProducts] = useState<Product[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const { addToCart } = useCart();

  useEffect(() => {
    const fetchProducts = async () => {
      try {
        const response = await fetch('/data/products.json'); // Termékek betöltése
        if (!response.ok) throw new Error('Hiba történt a termékek betöltésekor.');
        const data: Product[] = await response.json();
        const filteredProducts = data.filter((product) =>
          product.categories.includes(categoryId!)
        ); // Csak a kategóriához tartozó termékek
        setProducts(filteredProducts);
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
  }, [categoryId]);

  const handleAddToCart = (product: Product) => {
    addToCart({ productId: product.id, name: product.name, price: product.price, quantity: 1 });
  };

  if (loading) return <p>Betöltés...</p>;
  if (error) return <p>{error}</p>;

  return (
    <div>
      <h1>Terméklista</h1>
      <div>
        {products.map((product) => (
          <div key={product.id}>
            <h3>{product.name}</h3>
            <img src={product.image} alt={product.name} style={{ width: '200px' }} />
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
