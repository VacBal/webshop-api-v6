import React, { createContext, useState, useEffect, ReactNode, Dispatch, SetStateAction } from "react";

// Interfészek
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
    taxNumber: string;
  };
}

interface CartItem {
  productId: string;
  quantity: number;
}

interface GlobalContextProps {
  currentUser: User | null;
  users: User[];
  cart: CartItem[];
  setCurrentUser: Dispatch<SetStateAction<User | null>>;
  addUser: (user: User) => void;
  login: (email: string, password: string) => Promise<boolean>;
  logout: () => void;
  addToCart: (productId: string, quantity: number) => void;
  removeFromCart: (productId: string) => void;
}

// Kontextus létrehozása
const GlobalContext = createContext<GlobalContextProps | undefined>(undefined);

export const GlobalProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
  const [users, setUsers] = useState<User[]>([]);
  const [currentUser, setCurrentUser] = useState<User | null>(null);
  const [cart, setCart] = useState<CartItem[]>([]);

  // Felhasználók betöltése a JSON fájlból
  useEffect(() => {
    const fetchUsers = async () => {
      try {
        const response = await fetch("/users.json");
        const data = await response.json();
        setUsers(data);
      } catch (error) {
        console.error("Hiba a felhasználók betöltésekor:", error);
      }
    };
    fetchUsers();
  }, []);

  const addUser = (user: User) => {
    setUsers((prev) => [...prev, user]);
  };

  const login = async (email: string, password: string) => {
    const user = users.find((user) => user.email === email && user.password === password);
    if (user) {
      setCurrentUser(user);
      localStorage.setItem("authToken", "fake-jwt-token");
      return true;
    }
    return false;
  };

  const logout = () => {
    setCurrentUser(null);
    localStorage.removeItem("authToken");
  };

  const addToCart = (productId: string, quantity: number) => {
    setCart((prevCart) => {
      const existingItem = prevCart.find((item) => item.productId === productId);
      if (existingItem) {
        return prevCart.map((item) =>
          item.productId === productId ? { ...item, quantity: item.quantity + quantity } : item
        );
      }
      return [...prevCart, { productId, quantity }];
    });
  };

  const removeFromCart = (productId: string) => {
    setCart((prevCart) => prevCart.filter((item) => item.productId !== productId));
  };

  return (
    <GlobalContext.Provider
      value={{
        currentUser,
        users,
        cart,
        setCurrentUser,
        addUser,
        login,
        logout,
        addToCart,
        removeFromCart,
      }}
    >
      {children}
    </GlobalContext.Provider>
  );
};

export const useGlobalContext = () => {
  const context = React.useContext(GlobalContext);
  if (!context) {
    throw new Error("useGlobalContext must be used within a GlobalProvider");
  }
  return context;
};
