import React, { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { useGlobalContext } from "../context/GlobalContext";

const ProfilePage: React.FC = () => {
  const { currentUser, logout } = useGlobalContext();
  const navigate = useNavigate();

  useEffect(() => {
    if (!currentUser) {
      navigate("/login");
    }
  }, [currentUser, navigate]);

  const handleLogout = () => {
    const confirmLogout = window.confirm("Are you sure you want to log out?");
    if (confirmLogout) {
      logout();
    }
  };

  if (!currentUser) return <p>Redirecting to login...</p>;

  return (
    <div role="main" style={{ textAlign: "center", marginTop: "50px" }}>
      <h1>Profil</h1>
      <p><strong>Név:</strong> {currentUser.firstName} {currentUser.lastName}</p>
      <p><strong>E-mail:</strong> {currentUser.email}</p>
      <button
        style={{
          padding: "10px 20px",
          backgroundColor: "#007BFF",
          color: "#FFF",
          border: "none",
          borderRadius: "5px",
          cursor: "pointer",
        }}
        onClick={handleLogout}
        aria-label="Log out"
      >
        Kijelentkezés
      </button>
    </div>
  );
};

export default ProfilePage;
