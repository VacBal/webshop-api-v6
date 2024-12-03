import React, { useState, useEffect } from "react";
import { useSearchParams } from "react-router-dom";

interface Product {
  id: string;
  name: string;
  price: number;
  image: string;
  rating: number;
  stock: number;
}

const SearchResultsPage: React.FC = () => {
  const [searchParams] = useSearchParams();
  const [products, setProducts] = useState<Product[]>([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const query = searchParams.get("query") || "";

  useEffect(() => {
    const fetchProducts = async () => {
      setLoading(true);
      setError(null);

      try {
        const response = await fetch(`http://localhost:5000/products?query=${query}`);
        if (response.ok) {
          const data = await response.json();
          setProducts(data.data);
        } else {
          setError("Hiba történt a termékek betöltése során.");
        }
      } catch (err) {
        setError("Hálózati hiba történt.");
      } finally {
        setLoading(false);
      }
    };

    if (query) {
      fetchProducts();
    }
  }, [query]);

  if (loading) return <p>Betöltés...</p>;
  if (error) return <p style={{ color: "red" }}>{error}</p>;

  return (
    <div>
      <h1>Keresési eredmények: {query}</h1>
      <div style={{ display: "grid", gridTemplateColumns: "repeat(3, 1fr)", gap: "20px" }}>
        {products.map((product) => (
          <div key={product.id}>
            <img src={product.image} alt={product.name} style={{ width: "100%" }} />
            <h3>{product.name}</h3>
            <p>Ár: {product.price} Ft</p>
            <p>Értékelés: {"★".repeat(product.rating)}</p>
            <p>{product.stock > 0 ? "Raktáron" : "Elfogyott"}</p>
          </div>
        ))}
      </div>
    </div>
  );
};

export default SearchResultsPage;
