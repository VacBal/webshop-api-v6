import React, { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { useGlobalContext } from "../context/GlobalContext";

interface Category {
  id: string;
  name: string;
  image: string;
  productCount: number;
}

const HomePage: React.FC = () => {
  const { currentUser } = useGlobalContext();
  const [categories, setCategories] = useState<Category[]>([]);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchCategories = async () => {
      try {
        const response = await fetch("/categories.json");
        const data = await response.json();
        setCategories(data);
      } catch (error) {
        console.error("Hiba a kategóriák betöltésekor:", error);
      }
    };

    fetchCategories();
  }, []);

  return (
    <div style={{ padding: "20px" }}>
      <header style={headerStyle}>
        {!currentUser ? (
          <>
            <Link to="/login" style={linkStyle}>Belépés</Link>
            <Link to="/register" style={linkStyle}>Regisztráció</Link>
          </>
        ) : (
          <>
            <Link to="/profile" style={linkStyle}>Profil</Link>
            <Link to="/orders" style={linkStyle}>Megrendelések</Link>
          </>
        )}
      </header>
      <h1>Webshop kategóriák</h1>
      <div style={gridStyle}>
        {categories.map((category) => (
          <div key={category.id} style={cardStyle} onClick={() => navigate(`/products?category=${category.id}`)}>
            <img src={category.image} alt={category.name} style={imageStyle} />
            <h3>{category.name}</h3>
            <p>{category.productCount} termék</p>
          </div>
        ))}
      </div>
    </div>
  );
};

const headerStyle: React.CSSProperties = {
  display: "flex",
  justifyContent: "flex-end",
  gap: "10px",
  marginBottom: "20px",
};

const linkStyle: React.CSSProperties = {
  textDecoration: "none",
  color: "#007bff",
  fontWeight: "bold",
};

const gridStyle: React.CSSProperties = {
  display: "grid",
  gridTemplateColumns: "repeat(auto-fill, minmax(200px, 1fr))",
  gap: "20px",
};

const cardStyle: React.CSSProperties = {
  border: "1px solid #ddd",
  borderRadius: "10px",
  padding: "10px",
  textAlign: "center" as "center", // Típuskonfliktus megoldása explicit casttal
  cursor: "pointer",
  boxShadow: "0px 4px 6px rgba(0, 0, 0, 0.1)",
  transition: "transform 0.2s",
};

const imageStyle: React.CSSProperties = {
  width: "100%",
  height: "auto",
  borderRadius: "10px",
};

export default HomePage;
