import React from "react";
import { useGlobalContext } from "../context/GlobalContext";
import AddToCart from "../pages/AddToCart";

const ProductList: React.FC = () => {
  const products = [
    { id: "1", name: "Laptop", stock: 5 },
    { id: "2", name: "Telefon", stock: 3 },
  ];

  return (
    <div>
      {products.map((product) => (
        <div key={product.id}>
          <h3>{product.name}</h3>
          <AddToCart productId={product.id} stock={product.stock} />
        </div>
      ))}
    </div>
  );
};

export default ProductList;
