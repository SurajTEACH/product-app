import { useNavigate } from "react-router-dom";
import API from "../api/axios";

const Navbar = () => {
  const navigate = useNavigate();

  const handleLogout = async () => {
    await API.post("/auth/logout");
    localStorage.removeItem("token");
    navigate("/login");
  };

  return (
    <div className="bg-indigo-600 text-white p-4 flex justify-between items-center">
      <h1 className="text-xl font-bold">Product-App</h1>
      <button
        onClick={handleLogout}
        className="bg-white text-indigo-600 px-4 py-1 rounded hover:bg-gray-200"
      >
        Logout
      </button>
    </div>
  );
};

export default Navbar;
