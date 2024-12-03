import React from "react";
import { useGlobalContext } from "../context/GlobalContext";
import AddToCart from "./AddToCart";

const ProductListPage: React.FC = () => {
  const { products } = useGlobalContext();

  return (
    <div>
      <h1>Products</h1>
      <ul>
        {products.map((product) => (
          <li key={product.productId}>
            <h2>{product.name}</h2>
            <p>Price: ${product.price}</p>
            <AddToCart productId={product.productId} maxStock={product.stock} />
          </li>
        ))}
      </ul>
    </div>
  );
};

export default ProductListPage;
