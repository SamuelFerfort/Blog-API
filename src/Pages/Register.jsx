import { useState } from "react";
import { useAuth } from "../contexts/AuthContext";
import { Link, useNavigate } from "react-router-dom";
import useTitle from "../hooks/useTitle";


export default function Register() {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    password: "",
  });
  const [errors, setErrors] = useState({});
  const { register, loading, user } = useAuth();
  useTitle("Register")

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prevData) => ({
      ...prevData,
      [name]: value,
    }));

    if (errors[name]) {
      setErrors((prevErrors) => ({
        ...prevErrors,
        [name]: "",
      }));
    }
  };

  const navigate = useNavigate();

  if(user) navigate("/")

  const validateForm = () => {
    const newErrors = {};
    if (!formData.name.trim()) newErrors.name = "Name is required";
    if (!formData.email.includes("@"))
      newErrors.email = "Invalid email address";
    if (formData.password.length < 6)
      newErrors.password = "Password must be at least 6 characters";

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!validateForm()) return;

    try {
      await register(formData);
      navigate("/login");
    } catch (err) {
      setErrors((prev) => ({
        ...prev,
        general: err.message || "Failed to register. Please try again.",
      }));
    }
  };

  return (
    <main className="flex  justify-center mt-36 bg-gray-900 ">
      <form
        className="w-full max-w-md bg-gray-800 p-8 rounded-lg shadow-md"
        method="post"
        onSubmit={handleSubmit}
      >
        <h1 className="text-2xl font-bold mb-6 text-gray-100">Sign Up</h1>

        <div className="mb-4">
          <label htmlFor="name" className="block text-gray-300">
            Name
          </label>
          <input
            type="text"
            name="name"
            id="name"
            onChange={handleChange}
            value={formData.name}
            className="w-full p-2 mt-2 border border-gray-700 rounded bg-gray-700 text-gray-100"
          />
          {errors.name && (
            <span className="text-red-400 text-sm">{errors.name}</span>
          )}
        </div>

        <div className="mb-4">
          <label htmlFor="email" className="block text-gray-300">
            Email
          </label>
          <input
            type="email"
            name="email"
            id="email"
            onChange={handleChange}
            value={formData.email}
            className="w-full p-2 mt-2 border border-gray-700 rounded bg-gray-700 text-gray-100"
          />
          {errors.email && (
            <span className="text-red-400 text-sm">{errors.email}</span>
          )}
        </div>

        <div className="mb-4">
          <label htmlFor="password" className="block text-gray-300">
            Password
          </label>
          <input
            type="password"
            name="password"
            id="password"
            onChange={handleChange}
            value={formData.password}
            className="w-full p-2 mt-2 border border-gray-700 rounded bg-gray-700  text-gray-100"
          />
          {errors.password && (
            <span className="text-red-400 text-sm">{errors.password}</span>
          )}
        </div>

        {errors.general && (
          <div className="text-red-400 text-sm mb-4">{errors.general}</div>
        )}
        {loading && <div className="text-gray-400 mb-4">Loading...</div>}

        <div>
          <button
            type="submit"
            className="w-full bg-purple-600 text-white p-2 rounded hover:bg-purple-700 transition duration-300"
          >
            Sign Up
          </button>
        </div>

        <p className="mt-4 text-gray-400">
          Already have an account?{" "}
          <Link to="/login" className="text-purple-400 hover:underline">
            Log In
          </Link>
        </p>
      </form>
    </main>
  );
}
