import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useGlobalContext } from "../context/GlobalContext";

const RegisterPage: React.FC = () => {
  const { addUser } = useGlobalContext();
  const [formData, setFormData] = useState({
    email: "",
    password: "",
    confirmPassword: "",
    firstName: "",
    lastName: "",
  });
  const [message, setMessage] = useState<string | null>(null);
  const navigate = useNavigate();

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleRegister = (e: React.FormEvent) => {
    e.preventDefault();

    if (formData.password !== formData.confirmPassword) {
      setMessage("A jelszavak nem egyeznek.");
      return;
    }

    const newUser = {
      userId: Math.random().toString(36).substr(2, 9),
      email: formData.email,
      password: formData.password,
      firstName: formData.firstName,
      lastName: formData.lastName,
      shippingAddress: {
        name: `${formData.firstName} ${formData.lastName}`,
        country: "",
        city: "",
        street: "",
        zip: "",
        phoneNumber: "",
      },
      billingAddress: {
        name: `${formData.firstName} ${formData.lastName}`,
        country: "",
        city: "",
        street: "",
        zip: "",
        taxNumber: "",
      },
    };

    addUser(newUser);
    setMessage("Sikeres regisztráció!");
    setFormData({
      email: "",
      password: "",
      confirmPassword: "",
      firstName: "",
      lastName: "",
    });

    setTimeout(() => navigate("/login"), 2000);
  };

  return (
    <form onSubmit={handleRegister}>
      <h1>Regisztráció</h1>
      {message && <p>{message}</p>}
      <input type="email" name="email" onChange={handleInputChange} required />
      <input type="password" name="password" onChange={handleInputChange} required />
      <input type="password" name="confirmPassword" onChange={handleInputChange} required />
      <input type="text" name="firstName" onChange={handleInputChange} required />
      <input type="text" name="lastName" onChange={handleInputChange} required />
      <button type="submit">Regisztráció</button>
    </form>
  );
};

export default RegisterPage;
