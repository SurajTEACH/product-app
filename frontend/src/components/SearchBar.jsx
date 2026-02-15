import { useState } from "react";
import API from "../api/axios";

export default function SearchBar({ setProducts }) {
  const [query, setQuery] = useState("");

  const handleSearch = async (value) => {
    setQuery(value);
    const { data } = await API.get(`/products/search?name=${value}`);
    setProducts(data);
  };

  return (
    <input
      type="text"
      placeholder="Search product..."
      className="border p-3 rounded-lg w-full mb-4"
      value={query}
      onChange={(e) => handleSearch(e.target.value)}
    />
  );
}
