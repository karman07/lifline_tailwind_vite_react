import { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import toast from "react-hot-toast";
const Home = () => {
  const navigate = useNavigate();

  useEffect(() => {
    const role = localStorage.getItem("role");
    if (role !== "admin") {
      toast.error("Access denied");
      navigate("/");
    }
  }, []);

  const handleLogout = () => {
    localStorage.clear();
    toast.success("Logged out");
    navigate("/");
  };

  return (
    <div
      className="min-h-screen flex flex-col items-center justify-center"
    >
      <h1 className="text-4xl font-bold mb-4">Welcome Admin 👋</h1>
      <p className="text-lg mb-8">You're logged in as an Admin</p>
      <button
        onClick={handleLogout}
        className="bg-white text-indigo-600 font-semibold px-6 py-2 rounded-lg hover:bg-gray-100 transition"
      >
        Logout
      </button>
    </div>
  );
};

export default Home;
