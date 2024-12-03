import React, { useState } from "react";
import { useGlobalContext } from "../context/GlobalContext";
import { useNavigate } from "react-router-dom";

const EditProfilePage: React.FC = () => {
  const { currentUser, setUsers, users } = useGlobalContext();
  const navigate = useNavigate();

  const [formData, setFormData] = useState<{
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
      taxNumber: string;
    };
  }>({
    firstName: currentUser?.firstName || "",
    lastName: currentUser?.lastName || "",
    shippingAddress: {
      name: currentUser?.shippingAddress.name || "",
      country: currentUser?.shippingAddress.country || "",
      city: currentUser?.shippingAddress.city || "",
      street: currentUser?.shippingAddress.street || "",
      zip: currentUser?.shippingAddress.zip || "",
      phoneNumber: currentUser?.shippingAddress.phoneNumber || "",
    },
    billingAddress: {
      name: currentUser?.billingAddress.name || "",
      country: currentUser?.billingAddress.country || "",
      city: currentUser?.billingAddress.city || "",
      street: currentUser?.billingAddress.street || "",
      zip: currentUser?.billingAddress.zip || "",
      taxNumber: currentUser?.billingAddress.taxNumber || "",
    },
  });

  const handleInputChange = (
    e: React.ChangeEvent<HTMLInputElement>,
    field: string,
    isNested = false,
    section = ""
  ) => {
    if (isNested) {
      setFormData((prev) => ({
        ...prev,
        [section]: {
          ...prev[section as keyof typeof formData],
          [field]: e.target.value,
        },
      }));
    } else {
      setFormData({ ...formData, [field]: e.target.value });
    }
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    if (!currentUser) {
      navigate("/login");
      return;
    }

    // Felhasználói adatok frissítése
    const updatedUsers = users.map((user) =>
      user.userId === currentUser.userId
        ? {
            ...user,
            firstName: formData.firstName,
            lastName: formData.lastName,
            shippingAddress: formData.shippingAddress,
            billingAddress: formData.billingAddress,
          }
        : user
    );

    setUsers(updatedUsers); // Frissített felhasználók mentése
    alert("Adatok sikeresen módosítva!");
    navigate("/profile");
  };

  return (
    <div style={{ maxWidth: "600px", margin: "0 auto", padding: "20px" }}>
      <h1>Profil módosítása</h1>
      <form onSubmit={handleSubmit}>
        <h2>Személyes adatok</h2>
        <input
          type="text"
          value={formData.firstName}
          onChange={(e) => handleInputChange(e, "firstName")}
          placeholder="Keresztnév"
          required
        />
        <input
          type="text"
          value={formData.lastName}
          onChange={(e) => handleInputChange(e, "lastName")}
          placeholder="Vezetéknév"
          required
        />

        <h2>Szállítási cím</h2>
        <input
          type="text"
          value={formData.shippingAddress.name}
          onChange={(e) =>
            handleInputChange(e, "name", true, "shippingAddress")
          }
          placeholder="Név"
          required
        />
        <input
          type="text"
          value={formData.shippingAddress.country}
          onChange={(e) =>
            handleInputChange(e, "country", true, "shippingAddress")
          }
          placeholder="Ország"
          required
        />
        <input
          type="text"
          value={formData.shippingAddress.city}
          onChange={(e) =>
            handleInputChange(e, "city", true, "shippingAddress")
          }
          placeholder="Város"
          required
        />
        <input
          type="text"
          value={formData.shippingAddress.street}
          onChange={(e) =>
            handleInputChange(e, "street", true, "shippingAddress")
          }
          placeholder="Utca, házszám"
          required
        />
        <input
          type="text"
          value={formData.shippingAddress.zip}
          onChange={(e) =>
            handleInputChange(e, "zip", true, "shippingAddress")
          }
          placeholder="Irányítószám"
          required
        />
        <input
          type="text"
          value={formData.shippingAddress.phoneNumber}
          onChange={(e) =>
            handleInputChange(e, "phoneNumber", true, "shippingAddress")
          }
          placeholder="Telefonszám"
          required
        />

        <h2>Számlázási cím</h2>
        <input
          type="text"
          value={formData.billingAddress.name}
          onChange={(e) =>
            handleInputChange(e, "name", true, "billingAddress")
          }
          placeholder="Név"
          required
        />
        <input
          type="text"
          value={formData.billingAddress.country}
          onChange={(e) =>
            handleInputChange(e, "country", true, "billingAddress")
          }
          placeholder="Ország"
          required
        />
        <input
          type="text"
          value={formData.billingAddress.city}
          onChange={(e) =>
            handleInputChange(e, "city", true, "billingAddress")
          }
          placeholder="Város"
          required
        />
        <input
          type="text"
          value={formData.billingAddress.street}
          onChange={(e) =>
            handleInputChange(e, "street", true, "billingAddress")
          }
          placeholder="Utca, házszám"
          required
        />
        <input
          type="text"
          value={formData.billingAddress.zip}
          onChange={(e) =>
            handleInputChange(e, "zip", true, "billingAddress")
          }
          placeholder="Irányítószám"
          required
        />
        <input
          type="text"
          value={formData.billingAddress.taxNumber}
          onChange={(e) =>
            handleInputChange(e, "taxNumber", true, "billingAddress")
          }
          placeholder="Adószám"
        />

        <button type="submit">Mentés</button>
      </form>
    </div>
  );
};

export default EditProfilePage;
