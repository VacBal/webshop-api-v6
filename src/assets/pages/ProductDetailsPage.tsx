import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";

interface Product {
  id: string;
  name: string;
  price: number;
  description: string;
  image: string;
  stock: number;
}

const ProductDetailsPage: React.FC = () => {
  const { id } = useParams<{ id: string }>();
  const [product, setProduct] = useState<Product | null>(null);

  useEffect(() => {
    const fetchProduct = async () => {
      const response = await fetch("/products.json");
      const products = await response.json();
      const foundProduct = products.find((p: Product) => p.id === id);
      setProduct(foundProduct);
    };

    fetchProduct();
  }, [id]);

  if (!product) {
    return <p>Termék nem található.</p>;
  }

  return (
    <div>
      <h1>{product.name}</h1>
      <img src={product.image} alt={product.name} style={{ width: "300px" }} />
      <p>Ár: {product.price} Ft</p>
      <p>Készlet: {product.stock > 0 ? "Raktáron" : "Elfogyott"}</p>
      <p>{product.description}</p>
    </div>
  );
};

export default ProductDetailsPage;
