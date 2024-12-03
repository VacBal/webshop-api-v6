import React from "react";
import AddToCart from "./AddToCart";

const ProductList: React.FC = () => {
  const products = [
    { id: "1", name: "Termék 1", stock: 5 },
    { id: "2", name: "Termék 2", stock: 10 },
    // További termékek
  ];

  return (
    <div>
      {products.map((product) => (
        <div key={product.id}>
          <h3>{product.name}</h3>
          {/* stock helyett maxStock legyen */}
          <AddToCart productId={product.id} maxStock={product.stock} />
        </div>
      ))}
    </div>
  );
};

export default ProductList;
