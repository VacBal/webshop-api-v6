import React, { useEffect, useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import NavBar from '../components/NavBar';

interface Category {
  id: string;
  name: string;
  image: string;
  productCount: number;
}

const HomePage = () => {
  const [categories, setCategories] = useState<Category[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchCategories = async () => {
      try {
        const response = await fetch('/data/category.json'); // Kategóriák betöltése
        if (!response.ok) throw new Error('Hiba történt a kategóriák betöltésekor.');
        const data: Category[] = await response.json();
        setCategories(data);
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

    fetchCategories();
  }, []);

  if (loading) return <p>Betöltés...</p>;
  if (error) return <p>{error}</p>;

  return (
    <div>
      <h1>Kategóriák</h1>
      <div>
        {categories.map((category) => (
          <Link key={category.id} to={`/products/${category.id}`}>
            <div>
              <img src={category.image} alt={category.name} style={{ width: '100px' }} />
              <h3>{category.name}</h3>
              <p>{category.productCount} termék</p>
            </div>
          </Link>
        ))}
      </div>
    </div>
  );
};

export default HomePage;
