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

  if (!currentUser) return null;

  return (
    <div style={{ textAlign: "center", marginTop: "50px" }}>
      <h1>Profil</h1>
      <p><strong>Név:</strong> {currentUser.firstName} {currentUser.lastName}</p>
      <p><strong>E-mail:</strong> {currentUser.email}</p>
      <button onClick={logout}>Kijelentkezés</button>
    </div>
  );
};

export default ProfilePage;
