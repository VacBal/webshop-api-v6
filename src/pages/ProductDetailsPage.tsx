import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';

interface Product {
  id: string;
  name: string;
  description: string;
  price: number;
  stock: number;
  image: string;
}

const ProductDetailsPage = () => {
  const { id } = useParams<{ id: string }>();
  const [product, setProduct] = useState<Product | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchProduct = async () => {
      try {
        const response = await fetch('/data/products.json');
        if (!response.ok) throw new Error('Hiba történt a termék adatok betöltésekor.');
        const products = await response.json();
        const foundProduct = products.find((item: Product) => item.id === id);
        if (!foundProduct) throw new Error('A termék nem található.');
        setProduct(foundProduct);
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

    fetchProduct();
  }, [id]);

  if (loading) return <p>Betöltés...</p>;
  if (error) return <p>{error}</p>;

  return (
    <div>
      {product && (
        <div>
          <img src={product.image} alt={product.name} style={{ width: '300px' }} />
          <h1>{product.name}</h1>
          <p>{product.description}</p>
          <p>Ár: {product.price} Ft</p>
          <p>Készlet: {product.stock > 0 ? `${product.stock} db` : 'Nincs raktáron'}</p>
        </div>
      )}
    </div>
  );
};

export default ProductDetailsPage;
