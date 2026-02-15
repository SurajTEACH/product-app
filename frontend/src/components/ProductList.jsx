import { useState } from "react";
import { FaTrash, FaEdit, FaSave, FaTimes } from "react-icons/fa";
import API from "../api/axios";
import toast from "react-hot-toast";

const ProductList = ({ products, fetchProducts }) => {
  const [editId, setEditId] = useState(null);
  const [editName, setEditName] = useState("");
  const [editPrice, setEditPrice] = useState("");

  const handleDelete = async (id) => {
    try {
      await API.delete(`/products/${id}`);
      toast.success("Product deleted");
      fetchProducts();
    } catch (error) {
      toast.error("Delete failed");
      console.error("Delete error:", error);
    }
  };

  const handleEditClick = (product) => {
    setEditId(product._id);
    setEditName(product.name);
    setEditPrice(product.price);
  };

  const handleUpdate = async (id) => {
    try {
      await API.put(`/products/${id}`, {
        name: editName,
        price: Number(editPrice),
      });

      toast.success("Product updated");
      setEditId(null);
      fetchProducts();
    } catch (error) {
      toast.error("Update failed");
      console.error("Update error:", error);
    }
  };

  return (
    <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
      {products.map((product) => (
        <div
          key={product._id}
          className="bg-white shadow-lg p-4 rounded-lg"
        >
          {editId === product._id ? (
            <>
              <input
                className="border p-1 rounded w-full mb-2"
                value={editName}
                onChange={(e) => setEditName(e.target.value)}
              />

              <input
                type="number"
                className="border p-1 rounded w-full mb-2"
                value={editPrice}
                onChange={(e) => setEditPrice(e.target.value)}
              />

              <div className="flex gap-3 mt-2">
                <button
                  onClick={() => handleUpdate(product._id)}
                  className="text-green-600 hover:text-green-800"
                >
                  <FaSave />
                </button>

                <button
                  onClick={() => setEditId(null)}
                  className="text-gray-500 hover:text-gray-700"
                >
                  <FaTimes />
                </button>
              </div>
            </>
          ) : (
            <>
              <h3 className="text-lg font-semibold">
                {product.name}
              </h3>
              <p className="text-gray-600">
                ₹ {product.price}
              </p>

              <div className="flex gap-4 mt-3">
                <button
                  onClick={() => handleEditClick(product)}
                  className="text-blue-500 hover:text-blue-700"
                >
                  <FaEdit />
                </button>

                <button
                  onClick={() => handleDelete(product._id)}
                  className="text-red-500 hover:text-red-700"
                >
                  <FaTrash />
                </button>
              </div>
            </>
          )}
        </div>
      ))}
    </div>
  );
};

export default ProductList;
