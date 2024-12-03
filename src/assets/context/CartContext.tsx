import React, { createContext, useState, useContext, ReactNode } from "react";

interface CartItem {
  id: string;
  quantity: number;
}

interface CartContextProps {
  cart: CartItem[];
  addToCart: (item: CartItem) => void;
}

interface CartProviderProps {
  children: ReactNode;
}

const CartContext = createContext<CartContextProps | undefined>(undefined);

export const CartProvider: React.FC<CartProviderProps> = ({ children }) => {
  const [cart, setCart] = useState<CartItem[]>([]);

  const addToCart = (item: CartItem) => setCart((prev) => [...prev, item]);

  return (
    <CartContext.Provider value={{ cart, addToCart }}>
      {children}
    </CartContext.Provider>
  );
};

export const useCart = () => {
  const context = useContext(CartContext);
  if (!context) throw new Error("useCart must be used within CartProvider");
  return context;
};
