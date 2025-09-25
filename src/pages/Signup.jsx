import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import AxiosService from "../utils/AxiosService";
import ApiRoutes from "../utils/ApiRoutes";
import CurrencyExchangeIcon from "@mui/icons-material/CurrencyExchange";

function Signup() {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    password: ""
  });

  const navigate = useNavigate();

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      let res = await AxiosService.post(ApiRoutes.SIGNUP.Path, formData);
      if (res.token) {
        sessionStorage.setItem("token", res.token);
        sessionStorage.setItem("role", res.role);
      }
      alert(res.message);
      navigate("/home");
    } catch (error) {
      console.error("Error:", error);
      alert(error.message || "Internal Server Error");
    }
  };

  return (
    <div className="flex justify-center items-center min-h-screen bg-gray-200">
      <div className="w-full max-w-md bg-white shadow-lg rounded-xl p-6 m-5">
        <div className="flex justify-center mb-2">
          <CurrencyExchangeIcon sx={{ fontSize: 40 }} className="text-gray-700" />
        </div>
        <h4 className=" font-bold mb-4 text-center text-gray-700">
          Expense Tracker
        </h4>
        <h2 className="text-2xl font-bold text-center mb-6 text-gray-700">
          Signup
        </h2>
        <form className="space-y-4" onSubmit={handleSubmit}>
          <div>
            <label className="block text-gray-600 font-medium">Name</label>
            <input
              type="text"
              name="name"
              placeholder="Enter your name"
              value={formData.name}
              onChange={handleChange}
              className="w-full px-3 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-green-400"
            />
          </div>
          <div>
            <label className="block text-gray-600 font-medium">Email</label>
            <input
              type="email"
              name="email"
              placeholder="Enter your email"
              value={formData.email}
              onChange={handleChange}
              className="w-full px-3 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-green-400"
            />
          </div>
          <div>
            <label className="block text-gray-600 font-medium">Password</label>
            <input
              type="password"
              name="password"
              placeholder="Enter your password"
              value={formData.password}
              onChange={handleChange}
              className="w-full px-3 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-green-400"
            />
          </div>
          <button
            type="submit"
            className="w-full bg-green-500 text-white py-2 rounded-lg hover:bg-green-600 transition duration-200"
          >
            Signup
          </button>
        </form>
        <p className="text-center text-gray-600 mt-4">
          Already have an account?{" "}
          <Link to="/" className="text-blue-500 hover:underline">
            Login
          </Link>
        </p>
      </div>
    </div>
  );
}

export default Signup;
