import { Link, useNavigate } from "react-router-dom";
import { useState } from "react";
import { useAuth } from "../contexts/AuthContext";

export default function Login() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState({
    email: false,
    password: false,
    general: false,
  });
  const { login, loading } = useAuth();
  const navigate = useNavigate();

  async function handleSubmit(e) {
    e.preventDefault();
    setError({ email: false, password: false, general: "" });

    if (!email.includes("@")) {
      return setError((prev) => ({ ...prev, email: true }));
    }

    if (password.length < 6) {
      return setError((prev) => ({ ...prev, password: true }));
    }

    try {
      await login({ email, password });
      navigate("/");
    } catch (error) {
      setError((prev) => ({
        ...prev,
        general: error.message || "Failed to log in. Please try again.",
      }));
    }
  }

  return (
    <main className="flex justify-center mt-36 bg-gray-900 ">
      <form
        className="w-full max-w-md bg-gray-800 p-8 rounded-lg shadow-md"
        method="post"
        onSubmit={handleSubmit}
      >
        <h1 className="text-2xl font-bold mb-6 text-gray-100">Log In</h1>

        <div className="mb-4">
          <label htmlFor="email" className="block text-gray-300">
            Email
          </label>
          <input
            type="text"
            name="email"
            id="email"
            onChange={(e) => setEmail(e.target.value)}
            value={email}
            required
            className="w-full p-2 mt-2 border border-gray-700 rounded bg-gray-700 text-gray-100"
          />
          {error.email && (
            <span className="text-red-400 text-sm">Invalid Email</span>
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
            onChange={(e) => setPassword(e.target.value)}
            required
            value={password}
            className="w-full p-2 mt-2 border border-gray-700 rounded bg-gray-700 text-gray-100"
          />
          {error.password && (
            <span className="text-red-400 text-sm">
              Password must be at least 6 characters
            </span>
          )}
        </div>

        {error.general && (
          <div className="text-red-400 text-sm mb-4">{error.general}</div>
        )}
        {loading && <div className="text-gray-400 mb-4">Loading...</div>}

        <div>
          <button
            type="submit"
            className="w-full bg-purple-600 text-white p-2 rounded hover:bg-purple-700 transition duration-300"
          >
            Log In
          </button>
        </div>

        <p className="mt-4 text-gray-400">
          No account?{" "}
          <Link to="/sign-up" className="text-purple-400 hover:underline">
            Sign Up
          </Link>
        </p>
      </form>
    </main>
  );
}
