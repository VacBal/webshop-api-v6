import React, { useEffect, useState } from "react";

const CategoryList: React.FC = () => {
  const [categories, setCategories] = useState([]);

  useEffect(() => {
    const fetchCategories = async () => {
      const response = await fetch("/categories.json");
      const data = await response.json();
      setCategories(data);
    };

    fetchCategories();
  }, []);

  return (
    <div>
      <h1>Kategóriák</h1>
      <ul>
        {categories.map((category: any) => (
          <li key={category.id}>
            <img src={category.image} alt={category.name} />
            <p>{category.name}</p>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default CategoryList;
