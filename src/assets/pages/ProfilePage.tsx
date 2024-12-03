import React, { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { useGlobalContext } from "../context/GlobalContext";

const ProfilePage: React.FC = () => {
  const { currentUser, setCurrentUser } = useGlobalContext();
  const navigate = useNavigate();

  useEffect(() => {
    // Ha nincs bejelentkezve, irányítsuk a bejelentkezési oldalra
    if (!currentUser) {
      navigate("/login");
    }
  }, [currentUser, navigate]);

  const handleLogout = () => {
    // Kilépés: töröljük az aktuális felhasználót
    setCurrentUser(null);
    navigate("/login");
  };

  if (!currentUser) {
    return null; // Ha nincs felhasználó, ne jelenítsünk meg semmit
  }

  return (
    <div style={{ padding: "20px" }}>
      <h1>Profil</h1>
      <p><strong>Név:</strong> {currentUser.firstName} {currentUser.lastName}</p>
      <p><strong>Email:</strong> {currentUser.email}</p>
      <h2>Szállítási cím</h2>
      <p>{currentUser.shippingAddress.name}</p>
      <p>{currentUser.shippingAddress.street}, {currentUser.shippingAddress.city}</p>
      <p>{currentUser.shippingAddress.country}, {currentUser.shippingAddress.zip}</p>
      <p><strong>Telefon:</strong> {currentUser.shippingAddress.phoneNumber}</p>
      <h2>Számlázási cím</h2>
      <p>{currentUser.billingAddress.name}</p>
      <p>{currentUser.billingAddress.street}, {currentUser.billingAddress.city}</p>
      <p>{currentUser.billingAddress.country}, {currentUser.billingAddress.zip}</p>
      <p><strong>Adószám:</strong> {currentUser.billingAddress.taxNumber}</p>
      <button onClick={handleLogout} style={buttonStyle}>Kilépés</button>
    </div>
  );
};

const buttonStyle = {
  padding: "10px 20px",
  backgroundColor: "#007bff",
  color: "#fff",
  border: "none",
  borderRadius: "5px",
  cursor: "pointer",
  marginTop: "20px",
};

export default ProfilePage;
