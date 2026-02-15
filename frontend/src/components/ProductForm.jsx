import { useState } from "react";
import API from "../api/axios";

const ProductForm = ({ fetchProducts }) => {
  const [name, setName] = useState("");
  const [price, setPrice] = useState("");

  const handleSubmit = async (e) => {
    e.preventDefault();
    await API.post("/products", { name, price });
    setName("");
    setPrice("");
    fetchProducts();
  };

  return (
    <form onSubmit={handleSubmit} className="flex gap-4 mb-6">
      <input
        placeholder="Product name"
        className="border p-2 rounded w-full"
        value={name}
        onChange={(e)=>setName(e.target.value)}
      />
      <input
        placeholder="Price"
        className="border p-2 rounded w-full"
        value={price}
        onChange={(e)=>setPrice(e.target.value)}
      />
      <button className="bg-indigo-600 text-white px-4 rounded">
        Add
      </button>
    </form>
  );
};

export default ProductForm;
