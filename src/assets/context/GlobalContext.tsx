import React, { createContext, useContext, useState, useEffect, ReactNode } from "react";

// Import JSON files
import usersData from "../data/users.json";
import productsData from "../data/products.json"; // Ensure this matches the actual file structure

// Define the User interface
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

// Define the CartItem interface
interface CartItem {
  productId: string;
  quantity: number;
}

// Define the Product interface
interface Product {
  productId: string; // Ensure this matches the key in productsData
  name: string;
  price: number;
  stock: number;
}

// Update GlobalContextProps
interface GlobalContextProps {
  users: User[];
  setUsers: React.Dispatch<React.SetStateAction<User[]>>;
  addUser: (user: User) => void;
  currentUser: User | null;
  setCurrentUser: React.Dispatch<React.SetStateAction<User | null>>;
  cart: CartItem[];
  addToCart: (productId: string, quantity: number, maxStock: number) => void;
  getCartItemQuantity: (productId: string) => number;
  getCartTotal: () => number;
  clearCart: () => void;
  login: (email: string, password: string) => boolean;
  logout: () => void;
  products: Product[]; // Add products to the context
}

const GlobalContext = createContext<GlobalContextProps | undefined>(undefined);

export const GlobalProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
  const [users, setUsers] = useState<User[]>(usersData); // Load users from JSON
  const [currentUser, setCurrentUser] = useState<User | null>(null);
  const [cart, setCart] = useState<CartItem[]>(() => {
    const savedCart = localStorage.getItem("cart");
    return savedCart ? JSON.parse(savedCart) : [];
  });
  const [products, setProducts] = useState<Product[]>(
    productsData.map((product) => ({
      productId: product.id, // Map 'id' to 'productId'
      name: product.name,
      price: product.price,
      stock: product.stock,
    }))
  );

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
        const updatedCart = prevCart.map((item) =>
          item.productId === productId
            ? { ...item, quantity: Math.min(item.quantity + quantity, maxStock) }
            : item
        );
        return updatedCart;
      }
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
        products, // Provide products to the context
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
