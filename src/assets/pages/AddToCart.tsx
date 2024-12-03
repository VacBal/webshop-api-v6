import React, { useState } from "react"; // React import a modulhoz
import { useGlobalContext } from "../context/GlobalContext";

interface AddToCartProps {
  productId: string;
  maxStock: number; // Ez a helyes propnév
}

const AddToCart: React.FC<AddToCartProps> = ({ productId, maxStock }) => {
  const [quantity, setQuantity] = useState<number>(1);
  const { addToCart } = useGlobalContext();

  const handleAddToCart = () => {
    addToCart(productId, quantity, maxStock); // Helyesen használjuk a maxStock-ot
  };

  return (
    <div>
      <input
        type="number"
        value={quantity}
        onChange={(e) => setQuantity(Math.min(Math.max(1, Number(e.target.value)), maxStock))}
        min="1"
        max={maxStock}
      />
      <button onClick={handleAddToCart} disabled={quantity > maxStock}>
        Kosárba
      </button>
    </div>
  );
};

export default AddToCart;
