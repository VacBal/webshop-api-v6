import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
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
      <div>
        <Routes>
          <Route path="/" element={<CategoryList />} />
          <Route path="/login" element={<LoginPage />} />
          <Route path="/register" element={<RegisterPage />} />
          <Route path="/products" element={<ProductList />} />
          <Route path="/search" element={<SearchResultsPage />} />
          <Route path="/cart" element={<CartPage />} />
          <Route path="/orders" element={<OrderListPage />} />
          <Route path="/products/:id" element={<ProductDetailsPage />} />
          <Route path="/order-confirmation" element={<OrderConfirmationPage />} />
        </Routes>
      </div>
    </Router>
  );
};

export default App;
