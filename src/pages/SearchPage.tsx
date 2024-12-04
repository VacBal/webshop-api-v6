import React, { useState, useEffect } from 'react';

interface Product {
  id: string;
  name: string;
  image: string;
  price: number;
  rating: number;
  stock: number;
  categories: string[];
}

const SearchPage = () => {
  const [query, setQuery] = useState<string>('');
  const [minPrice, setMinPrice] = useState<number | undefined>();
  const [maxPrice, setMaxPrice] = useState<number | undefined>();
  const [inStock, setInStock] = useState<boolean | undefined>();
  const [minRate, setMinRate] = useState<number | undefined>();
  const [maxRate, setMaxRate] = useState<number | undefined>();
  const [products, setProducts] = useState<Product[]>([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [offset, setOffset] = useState(0);
  const limit = 6; // Maximum 6 elem egy oldalon

  const fetchProducts = async () => {
    setLoading(true);
    setError(null);

    try {
      const params = new URLSearchParams();

      if (query) params.append('query', query);
      if (minPrice !== undefined) params.append('minPrice', minPrice.toString());
      if (maxPrice !== undefined) params.append('maxPrice', maxPrice.toString());
      if (inStock !== undefined) params.append('inStock', inStock.toString());
      if (minRate !== undefined) params.append('minRate', minRate.toString());
      if (maxRate !== undefined) params.append('maxRate', maxRate.toString());
      params.append('offset', offset.toString());
      params.append('limit', limit.toString());

      const response = await fetch(`/data/products.json`);
      if (!response.ok) throw new Error('Hiba történt a termékek betöltésekor.');

      const allProducts: Product[] = await response.json();

      // Szűrés és rendezés
      let filteredProducts = allProducts.filter((product) => {
        const matchesQuery = query ? product.name.toLowerCase().includes(query.toLowerCase()) : true;
        const matchesMinPrice = minPrice !== undefined ? product.price >= minPrice : true;
        const matchesMaxPrice = maxPrice !== undefined ? product.price <= maxPrice : true;
        const matchesInStock = inStock !== undefined ? (inStock ? product.stock > 0 : product.stock === 0) : true;
        const matchesMinRate = minRate !== undefined ? product.rating >= minRate : true;
        const matchesMaxRate = maxRate !== undefined ? product.rating <= maxRate : true;

        return matchesQuery && matchesMinPrice && matchesMaxPrice && matchesInStock && matchesMinRate && matchesMaxRate;
      });

      // Rendezés (alapértelmezetten csökkenő sorrend értékelés szerint)
      filteredProducts.sort((a, b) => b.rating - a.rating);

      // Lapozás
      const paginatedProducts = filteredProducts.slice(offset, offset + limit);

      setProducts(paginatedProducts);
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

  useEffect(() => {
    fetchProducts();
  }, [query, minPrice, maxPrice, inStock, minRate, maxRate, offset]);

  const handleSearch = () => {
    setOffset(0);
    fetchProducts();
  };

  const handleNextPage = () => {
    setOffset((prevOffset) => prevOffset + limit);
  };

  const handlePreviousPage = () => {
    setOffset((prevOffset) => Math.max(prevOffset - limit, 0));
  };

  if (loading) return <p>Betöltés...</p>;
  if (error) return <p style={{ color: 'red' }}>{error}</p>;

  return (
    <div>
      <h1>Keresés</h1>
      <div>
        <input
          type="text"
          placeholder="Keresés..."
          value={query}
          onChange={(e) => setQuery(e.target.value)}
        />
        <input
          type="number"
          placeholder="Minimum ár"
          value={minPrice || ''}
          onChange={(e) => setMinPrice(e.target.value ? parseInt(e.target.value, 10) : undefined)}
        />
        <input
          type="number"
          placeholder="Maximum ár"
          value={maxPrice || ''}
          onChange={(e) => setMaxPrice(e.target.value ? parseInt(e.target.value, 10) : undefined)}
        />
        <label>
          <input
            type="checkbox"
            checked={inStock || false}
            onChange={(e) => setInStock(e.target.checked)}
          />
          Csak készleten lévők
        </label>
        <input
          type="number"
          placeholder="Minimum értékelés"
          value={minRate || ''}
          onChange={(e) => setMinRate(e.target.value ? parseInt(e.target.value, 10) : undefined)}
        />
        <input
          type="number"
          placeholder="Maximum értékelés"
          value={maxRate || ''}
          onChange={(e) => setMaxRate(e.target.value ? parseInt(e.target.value, 10) : undefined)}
        />
        <button onClick={handleSearch}>Keresés</button>
      </div>
      <div style={{ display: 'flex', flexWrap: 'wrap', gap: '20px' }}>
        {products.map((product) => (
          <div key={product.id} style={{ border: '1px solid #ddd', padding: '10px', borderRadius: '5px', width: 'calc(33.33% - 20px)' }}>
            <img src={product.image} alt={product.name} style={{ width: '100%', height: 'auto' }} />
            <h3>{product.name}</h3>
            <p>Ár: {product.price} Ft</p>
            <p>Értékelés: {product.rating} / 5</p>
            <p>{product.stock > 0 ? `Készleten: ${product.stock} db` : 'Nincs raktáron'}</p>
          </div>
        ))}
      </div>
      <div>
        <button onClick={handlePreviousPage} disabled={offset === 0}>
          Előző oldal
        </button>
        <button onClick={handleNextPage}>
          Következő oldal
        </button>
      </div>
    </div>
  );
};

export default SearchPage;
