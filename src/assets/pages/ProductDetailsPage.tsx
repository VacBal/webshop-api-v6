import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";

interface Product {
  id: string;
  name: string;
  price: number;
  image: string;
  description: string;
  rating: number;
  stock: number;
}

const ProductDetailsPage: React.FC = () => {
  const { id } = useParams<{ id: string }>();
  const [product, setProduct] = useState<Product | null>(null);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchProduct = async () => {
      try {
        const response = await fetch(`http://localhost:5000/products/${id}`);
        if (response.ok) {
          const data = await response.json();
          setProduct(data);
        } else {
          setError("Hiba történt a termék betöltése során.");
        }
      } catch (err) {
        setError("Hálózati hiba történt.");
      }
    };

    fetchProduct();
  }, [id]);

  if (error) return <p style={{ color: "red" }}>{error}</p>;

  if (!product) return <p>Betöltés...</p>;

  return (
    <div>
      <h1>{product.name}</h1>
      <img src={product.image} alt={product.name} />
      <p>Ár: {product.price} Ft</p>
      <p>Leírás: {product.description}</p>
      <p>Értékelés: {"★".repeat(product.rating)}</p>
      <p>Raktáron: {product.stock > 0 ? "Igen" : "Nem"}</p>
    </div>
  );
};

export default ProductDetailsPage;
