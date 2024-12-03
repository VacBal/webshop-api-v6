import React, { useState } from "react";
import { useGlobalContext } from "../context/GlobalContext";

interface AddToCartProps {
  productId: string;
  stock: number;
}

const AddToCart: React.FC<AddToCartProps> = ({ productId, stock }) => {
  const { addToCart, getCartItemQuantity } = useGlobalContext();
  const [quantity, setQuantity] = useState(1);

  const currentQuantity = getCartItemQuantity(productId);

  const handleAddToCart = () => {
    if (quantity > 0 && quantity <= stock - currentQuantity) {
      addToCart(productId, quantity);
      setQuantity(1); // Reset input field
    }
  };

  return (
    <div>
      <p>Már {currentQuantity} darab a kosaradban</p>
      <input
        type="number"
        min="1"
        max={stock - currentQuantity}
        value={quantity}
        onChange={(e) => setQuantity(Math.min(Number(e.target.value), stock - currentQuantity))}
      />
      <button onClick={handleAddToCart} disabled={currentQuantity >= stock}>
        Kosárba
      </button>
    </div>
  );
};

export default AddToCart;
