import React, { useEffect, useState } from "react";

const ProductList: React.FC = () => {
  const [products, setProducts] = useState([]);

  useEffect(() => {
    const fetchProducts = async () => {
      const response = await fetch("/products.json");
      const data = await response.json();
      setProducts(data);
    };

    fetchProducts();
  }, []);

  return (
    <div>
      <h1>Termékek</h1>
      <ul>
        {products.map((product: any) => (
          <li key={product.id}>
            <img src={product.image} alt={product.name} />
            <p>{product.name}</p>
            <p>Ár: {product.price} Ft</p>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default ProductList;
