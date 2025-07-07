import React, { useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import toast from "react-hot-toast";
import { BASE_URL } from "../constants/config";
import { COLORS } from "../constants/colors";

const Login = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const navigate = useNavigate();
  const [loading, setLoading] = useState(false);

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!email || !password) return toast.error("All fields are required");

    setLoading(true);
    try {
      const res = await axios.post(`${BASE_URL}/auth/login`, {
        email,
        password,
      });

      const { role } = res.data.user;
      if (role !== "admin") {
        toast.error("Only admins are allowed");
        return;
      }

      console.log(res.data.accessToken)

      localStorage.setItem("token", res.data.accessToken);
      localStorage.setItem("role", role);
      localStorage.setItem("user", JSON.stringify(res.data.user))
      console.log(localStorage.getItem("user"))
      console.log(localStorage.getItem("token"))
      toast.success("Login successful");
      navigate("/users");
    } catch (err: any) {
      toast.error(err?.response?.data?.message || "Login failed");
      console.log(err)
    } finally {
      setLoading(false);
    }
  };

  return (
    <div
      className="min-h-screen flex items-center justify-center px-4"
      style={{ backgroundColor: COLORS.background }}
    >
      <div className="bg-white shadow-2xl rounded-2xl max-w-md w-full p-10 space-y-6">
        <h2
          className="text-4xl font-bold text-center"
          style={{ color: COLORS.primary }}
        >
          Admin Login
        </h2>
        <p className="text-sm text-center text-gray-500">Only admins are allowed</p>
        <form onSubmit={handleLogin} className="space-y-5">
          <div>
            <label className="block text-sm font-medium" style={{ color: COLORS.grayText }}>
              Email
            </label>
            <input
              type="email"
              className="mt-1 w-full border border-gray-300 rounded-lg px-4 py-2 focus:outline-none focus:ring-2"
              style={{ borderColor: "#E5E7EB" }}
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder="admin@example.com"
              required
            />
          </div>
          <div>
            <label className="block text-sm font-medium" style={{ color: COLORS.grayText }}>
              Password
            </label>
            <input
              type="password"
              className="mt-1 w-full border border-gray-300 rounded-lg px-4 py-2 focus:outline-none focus:ring-2"
              style={{ borderColor: "#E5E7EB" }}
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              placeholder="••••••••"
              required
            />
          </div>
          <button
            type="submit"
            disabled={loading}
            className="w-full text-white font-semibold py-2 px-4 rounded-lg transition"
            style={{
              backgroundColor: COLORS.primary,
              opacity: loading ? 0.6 : 1,
              cursor: loading ? "not-allowed" : "pointer",
            }}
          >
            {loading ? "Logging in..." : "Login"}
          </button>
        </form>
      </div>
    </div>
  );
};

export default Login;
