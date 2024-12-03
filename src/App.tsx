import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import HomePage from "./assets/pages/HomePage";
import LoginPage from "./assets/pages/LoginPage";
import RegisterPage from "./assets/pages/RegisterPage";
import CategoryList from "./assets/pages/CategoryList";
import ProductList from "./assets/pages/ProductList";
import SearchResultsPage from "./assets/pages/SearchResultsPage";
import CartPage from "./assets/pages/CartPage";
import OrderListPage from "./assets/pages/OrderListPage";
import ProductDetailsPage from "./assets/pages/ProductDetailsPage";
import OrderConfirmationPage from "./assets/pages/OrderConfirmationPage";

const App: React.FC = () => {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<HomePage />} />
        <Route path="/login" element={<LoginPage />} />
        <Route path="/register" element={<RegisterPage />} />
        <Route path="/categories" element={<CategoryList />} />
        <Route path="/products" element={<ProductList />} />
        <Route path="/search" element={<SearchResultsPage />} />
        <Route path="/cart" element={<CartPage />} />
        <Route path="/orders" element={<OrderListPage />} />
        <Route path="/products/:id" element={<ProductDetailsPage />} />
        <Route path="/order-confirmation" element={<OrderConfirmationPage />} />
      </Routes>
    </Router>
  );
};

export default App;
