import { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import toast from "react-hot-toast";

const Home = () => {
  const navigate = useNavigate();

  useEffect(() => {
    const token = localStorage.getItem("token");
    const role = localStorage.getItem("role");
    
    if (!token) {
      toast.error("No token found. Please login again.");
      navigate("/");
      return;
    }
    
    if (role !== "admin") {
      toast.error("Access denied");
      navigate("/");
    }
  }, [navigate]);

  return (
    <div className="min-h-screen flex flex-col items-center justify-center">
      <h1 className="text-4xl font-bold mb-4">Welcome Admin 👋</h1>
      <p className="text-lg mb-2">You're logged in as an Admin</p>
      <p className="text-sm text-gray-500">Token: {localStorage.getItem("token") ? "✓ Valid" : "✗ Missing"}</p>
    </div>
  );
};

export default Home;
