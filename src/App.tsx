import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import { GlobalProvider } from "./assets/context/GlobalContext";
import HomePage from "./assets/pages/HomePage";
import LoginPage from "./assets/pages/LoginPage";
import RegisterPage from "./assets/pages/RegisterPage";
import ProfilePage from "./assets/pages/ProfilePage";
import ProductListPage from "./assets/pages/ProductListPage";

const App: React.FC = () => {
  return (
    <GlobalProvider>
      <Router>
        <Routes>
          <Route path="/" element={<HomePage />} />
          <Route path="/login" element={<LoginPage />} />
          <Route path="/register" element={<RegisterPage />} />
          <Route path="/profile" element={<ProfilePage />} />
          <Route path="/products" element={<ProductListPage />} />
        </Routes>
      </Router>
    </GlobalProvider>
  );
};

export default App;
