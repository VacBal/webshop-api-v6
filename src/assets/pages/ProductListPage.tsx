import React, { useEffect, useState } from "react";
import { useSearchParams } from "react-router-dom";

interface Product {
  id: string;
  name: string;
  image: string;
  price: number;
  rating: number;
  categories: string[];
  stock: number;
}

const ProductListPage: React.FC = () => {
  const [products, setProducts] = useState<Product[]>([]);
  const [filteredProducts, setFilteredProducts] = useState<Product[]>([]);
  const [searchParams] = useSearchParams();
  const category = searchParams.get("category");

  useEffect(() => {
    const fetchProducts = async () => {
      try {
        const response = await fetch("/products.json");
        const data = await response.json();
        setProducts(data);

        // Szűrés a kategória alapján
        if (category) {
          setFilteredProducts(data.filter((product: Product) => product.categories.includes(category)));
        } else {
          setFilteredProducts(data); // Ha nincs megadva kategória, minden termék megjelenik
        }
      } catch (error) {
        console.error("Hiba a termékek betöltésekor:", error);
      }
    };

    fetchProducts();
  }, [category]);

  return (
    <div style={{ padding: "20px" }}>
      <h1>Termékek {category ? `(${category})` : ""}</h1>
      <div style={gridStyle}>
        {filteredProducts.map((product) => (
          <div key={product.id} style={cardStyle}>
            <img src={product.image} alt={product.name} style={imageStyle} />
            <h3>{product.name}</h3>
            <p>Ár: ${product.price}</p>
            <p>Értékelés: {product.rating} ⭐</p>
            <p>{product.stock > 0 ? "Raktáron" : "Nincs raktáron"}</p>
          </div>
        ))}
      </div>
    </div>
  );
};

const gridStyle: React.CSSProperties = {
  display: "grid",
  gridTemplateColumns: "repeat(auto-fill, minmax(200px, 1fr))",
  gap: "20px",
};

const cardStyle: React.CSSProperties = {
  border: "1px solid #ddd",
  borderRadius: "10px",
  padding: "10px",
  textAlign: "center" as "center",
  boxShadow: "0px 4px 6px rgba(0, 0, 0, 0.1)",
  transition: "transform 0.2s",
};

const imageStyle: React.CSSProperties = {
  width: "100%",
  height: "auto",
  borderRadius: "10px",
};

export default ProductListPage;
