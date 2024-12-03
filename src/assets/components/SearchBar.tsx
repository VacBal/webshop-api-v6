import React, { useState } from "react";
import { useNavigate } from "react-router-dom";

const SearchBar: React.FC = () => {
  const [query, setQuery] = useState("");
  const navigate = useNavigate();

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault();
    if (query.trim()) {
      navigate(`/search?query=${encodeURIComponent(query)}`);
    }
  };

  return (
    <form onSubmit={handleSearch}>
      <input
        type="text"
        placeholder="Keresés..."
        value={query}
        onChange={(e) => setQuery(e.target.value)}
      />
      <button type="submit">Keresés</button>
    </form>
  );
};

export default SearchBar;
