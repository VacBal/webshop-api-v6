import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { CartProvider } from './context/CartContext';
import { AuthProvider } from './context/AuthContext';
import NavBar from './components/NavBar';
import ProductListPage from './pages/ProductListPage';
import CartPage from './pages/CartPage';
import OrderPage from './pages/OrderPage';
import LoginPage from './pages/LoginPage';
import ProfilePage from './pages/ProfilePage';
import RegisterPage from './pages/RegisterPage';
import EditProfilePage from "./pages/EditProfilePage";

const App: React.FC = () => {
  return (
    <Router>
      <AuthProvider>
        <CartProvider>
          <NavBar />
          <Routes>
            <Route path="/" element={<ProductListPage />} />
            <Route path="/cart" element={<CartPage />} />
            <Route path="/order" element={<OrderPage />} />
            <Route path="/login" element={<LoginPage />} />
            <Route path="/profile" element={<ProfilePage />} />
            <Route path="/registracion" element={<RegisterPage />} />
            <Route path="/edit-profile" element={<EditProfilePage />} />
          </Routes>
        </CartProvider>
      </AuthProvider>
    </Router>
  );
};

export default App;
