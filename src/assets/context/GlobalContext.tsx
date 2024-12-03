import React, { createContext, useContext, useState, useEffect, ReactNode } from "react";

// Felhasználói típus
interface User {
  userId: string;
  email: string;
  password: string;
  firstName: string;
  lastName: string;
  shippingAddress: {
    name: string;
    country: string;
    city: string;
    street: string;
    zip: string;
    phoneNumber: string;
  };
  billingAddress: {
    name: string;
    country: string;
    city: string;
    street: string;
    zip: string;
    taxNumber?: string;
  };
}

// Kosár elem típus
interface CartItem {
  productId: string;
  quantity: number;
}

// Globális kontextus tulajdonságai
interface GlobalContextProps {
  users: User[];
  setUsers: React.Dispatch<React.SetStateAction<User[]>>;
  addUser: (user: User) => void;
  currentUser: User | null;
  setCurrentUser: React.Dispatch<React.SetStateAction<User | null>>;
  cart: CartItem[];
  addToCart: (productId: string, quantity: number, maxStock: number) => void; // Frissített típus
  getCartItemQuantity: (productId: string) => number;
  getCartTotal: () => number;
  clearCart: () => void;
  login: (email: string, password: string) => boolean;
  logout: () => void;
}

// Kontextus inicializálása
const GlobalContext = createContext<GlobalContextProps | undefined>(undefined);

export const GlobalProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
  const [users, setUsers] = useState<User[]>([]);
  const [currentUser, setCurrentUser] = useState<User | null>(null);
  const [cart, setCart] = useState<CartItem[]>(() => {
    const savedCart = localStorage.getItem("cart");
    return savedCart ? JSON.parse(savedCart) : [];
  });

  // Kosár állapot mentése
  useEffect(() => {
    localStorage.setItem("cart", JSON.stringify(cart));
  }, [cart]);

  const addUser = (user: User) => {
    setUsers((prev) => [...prev, user]);
  };

  const login = (email: string, password: string): boolean => {
    const user = users.find((user) => user.email === email && user.password === password);
    if (user) {
      setCurrentUser(user);
      return true;
    }
    return false;
  };

  const logout = () => {
    setCurrentUser(null);
    clearCart();
  };

  const addToCart = (productId: string, quantity: number, maxStock: number) => {
    setCart((prevCart) => {
      const existingItem = prevCart.find((item) => item.productId === productId);
      if (existingItem) {
        // Frissítsük az elemet a maximális készlet figyelembevételével
        const updatedCart = prevCart.map((item) =>
          item.productId === productId
            ? { ...item, quantity: Math.min(item.quantity + quantity, maxStock) }
            : item
        );
        return updatedCart;
      }
      // Új elem hozzáadása
      return [...prevCart, { productId, quantity: Math.min(quantity, maxStock) }];
    });
  };

  const getCartItemQuantity = (productId: string): number => {
    const item = cart.find((item) => item.productId === productId);
    return item ? item.quantity : 0;
  };

  const getCartTotal = (): number => {
    return cart.reduce((total, item) => total + item.quantity, 0);
  };

  const clearCart = () => {
    setCart([]);
  };

  return (
    <GlobalContext.Provider
      value={{
        users,
        setUsers,
        addUser,
        currentUser,
        setCurrentUser,
        cart,
        addToCart,
        getCartItemQuantity,
        getCartTotal,
        clearCart,
        login,
        logout,
      }}
    >
      {children}
    </GlobalContext.Provider>
  );
};

export const useGlobalContext = (): GlobalContextProps => {
  const context = useContext(GlobalContext);
  if (!context) {
    throw new Error("useGlobalContext must be used within a GlobalProvider");
  }
  return context;
};
