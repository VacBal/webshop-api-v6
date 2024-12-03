import React, { useState } from "react";
import { useGlobalContext } from "../context/GlobalContext";

interface ProductCardProps {
  productId: string;
  name: string;
  maxStock: number;
}

const ProductCard: React.FC<ProductCardProps> = ({ productId, name, maxStock }) => {
  const { addToCart, getCartItemQuantity } = useGlobalContext();
  const [quantity, setQuantity] = useState(1);
  const currentQuantity = getCartItemQuantity(productId);

  const handleAddToCart = () => {
    addToCart(productId, quantity, maxStock);
  };

  return (
    <div>
      <h2>{name}</h2>
      <p>Raktáron: {maxStock}</p>
      <p>Már {currentQuantity} darab a kosaradban</p>
      <input
        type="number"
        min="1"
        max={maxStock - currentQuantity}
        value={quantity}
        onChange={(e) => setQuantity(Math.min(parseInt(e.target.value, 10), maxStock - currentQuantity))}
      />
      <button onClick={handleAddToCart} disabled={currentQuantity >= maxStock}>
        Kosárba
      </button>
    </div>
  );
};

export default ProductCard;
