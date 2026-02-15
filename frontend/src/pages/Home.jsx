import { useEffect, useState } from "react";
import { motion as Motion, AnimatePresence } from "framer-motion";
import { FaPlus } from "react-icons/fa";
import toast from "react-hot-toast";
import API from "../api/axios";

import Navbar from "../components/Navbar";
import ProductList from "../components/ProductList";
import SearchBar from "../components/SearchBar";

const Home = () => {
  const [products, setProducts] = useState([]);
  const [showModal, setShowModal] = useState(false);
  const [name, setName] = useState("");
  const [price, setPrice] = useState("");

  // ✅ StrictMode-safe fetch
  useEffect(() => {
    let isMounted = true; // prevent double state update in StrictMode

    const loadProducts = async () => {
      try {
        const { data } = await API.get("/products");
        if (isMounted) {
          setProducts(data);
        }
      } catch (error) {
        toast.error("Failed to fetch products");
        console.error("Fetch error:", error);
      }
    };

    loadProducts();

    return () => {
      isMounted = false;
    };
  }, []);

  // ✅ Add Product
  const handleAddProduct = async (e) => {
    e.preventDefault();

    if (!name || !price) {
      return toast.error("All fields required");
    }

    try {
      const { data } = await API.post("/products", {
        name,
        price: Number(price),
      });

      // instantly update UI (better UX than refetch)
      setProducts((prev) => [data, ...prev]);

      toast.success("Product added... ");

      setName("");
      setPrice("");
      setShowModal(false);
    } catch (error) {
      toast.error("Failed to add product");
      console.error("Add product error:", error);
    }
  };

  return (
    <>
      <Navbar />

      <div className="p-6 bg-gray-100 min-h-screen relative">

        {/* 🔍 Search */}
        <SearchBar setProducts={setProducts} />

        {/* 📦 Product List */}
        <ProductList products={products} />

        {/* ➕ Floating Button */}
        <Motion.button
          whileHover={{ scale: 1.1 }}
          whileTap={{ scale: 0.9 }}
          onClick={() => setShowModal(true)}
          className="fixed bottom-8 right-8 bg-indigo-600 text-white p-4 rounded-full shadow-lg"
        >
          <FaPlus />
        </Motion.button>

        {/* 🪟 Animated Modal */}
        <AnimatePresence>
          {showModal && (
            <Motion.div
              className="fixed inset-0 bg-black bg-opacity-40 flex items-center justify-center"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
            >
              <Motion.div
                initial={{ scale: 0.7, y: -40 }}
                animate={{ scale: 1, y: 0 }}
                exit={{ scale: 0.7, y: -40 }}
                transition={{ duration: 0.3 }}
                className="bg-white p-6 rounded-xl shadow-xl w-96"
              >
                <h2 className="text-xl font-bold mb-4">
                  Add Product
                </h2>

                <form
                  onSubmit={handleAddProduct}
                  className="space-y-4"
                >
                  <input
                    type="text"
                    placeholder="Product Name"
                    className="border p-2 rounded w-full"
                    value={name}
                    onChange={(e) =>
                      setName(e.target.value)
                    }
                  />

                  <input
                    type="number"
                    placeholder="Price"
                    className="border p-2 rounded w-full"
                    value={price}
                    onChange={(e) =>
                      setPrice(e.target.value)
                    }
                  />

                  <div className="flex justify-end gap-3">
                    <button
                      type="button"
                      onClick={() => setShowModal(false)}
                      className="px-4 py-2 bg-gray-300 rounded"
                    >
                      Cancel
                    </button>

                    <Motion.button
                      whileHover={{ scale: 1.05 }}
                      whileTap={{ scale: 0.95 }}
                      className="px-4 py-2 bg-indigo-600 text-white rounded"
                    >
                      Add
                    </Motion.button>
                  </div>
                </form>
              </Motion.div>
            </Motion.div>
          )}
        </AnimatePresence>
      </div>
    </>
  );
};

export default Home;
