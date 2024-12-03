import React, { createContext, useContext, useState, useEffect, ReactNode, Dispatch, SetStateAction } from "react";

// Felhasználó típus
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

// Kosár elem típus
interface CartItem {
  productId: string;
  quantity: number;
}

// Globális kontextus típus
interface GlobalContextProps {
  currentUser: User | null;
  setCurrentUser: Dispatch<SetStateAction<User | null>>;
  users: User[];
  setUsers: Dispatch<SetStateAction<User[]>>;
  cart: CartItem[];
  addToCart: (productId: string, quantity: number) => void;
  removeFromCart: (productId: string) => void;
  login: (email: string, password: string) => boolean;
  logout: () => void;
}

// Globális kontextus inicializálása
const GlobalContext = createContext<GlobalContextProps | undefined>(undefined);

// Globális provider komponens
export const GlobalProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
  const [users, setUsers] = useState<User[]>([]);
  const [currentUser, setCurrentUser] = useState<User | null>(null);
  const [cart, setCart] = useState<CartItem[]>([]);

  // Alapértelmezett felhasználók betöltése JSON fájlból
  useEffect(() => {
    const loadUsers = async () => {
      try {
        const response = await fetch("/path/to/users.json");
        const data: User[] = await response.json();
        setUsers(data);
      } catch (error) {
        console.error("Hiba a felhasználók betöltésekor:", error);
      }
    };

    loadUsers();
  }, []);

  // Felhasználó beléptetése
  const login = (email: string, password: string): boolean => {
    const user = users.find((u) => u.email === email && u.password === password);
    if (user) {
      setCurrentUser(user);
      return true;
    }
    return false;
  };

  // Felhasználó kijelentkeztetése
  const logout = () => {
    setCurrentUser(null);
  };

  // Kosárhoz hozzáadás
  const addToCart = (productId: string, quantity: number) => {
    setCart((prev) => {
      const existingItem = prev.find((item) => item.productId === productId);
      if (existingItem) {
        return prev.map((item) =>
          item.productId === productId
            ? { ...item, quantity: item.quantity + quantity }
            : item
        );
      }
      return [...prev, { productId, quantity }];
    });
  };

  // Kosárból eltávolítás
  const removeFromCart = (productId: string) => {
    setCart((prev) => prev.filter((item) => item.productId !== productId));
  };

  return (
    <GlobalContext.Provider
      value={{
        currentUser,
        setCurrentUser,
        users,
        setUsers,
        cart,
        addToCart,
        removeFromCart,
        login,
        logout,
      }}
    >
      {children}
    </GlobalContext.Provider>
  );
};

// Kontextus használata
export const useGlobalContext = () => {
  const context = useContext(GlobalContext);
  if (!context) {
    throw new Error("useGlobalContext must be used within a GlobalProvider");
  }
  return context;
};
