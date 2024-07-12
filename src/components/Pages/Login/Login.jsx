import styles from "./Login.module.css";
import { Link, useNavigate } from "react-router-dom";
import { useState } from "react";
import { useAuth } from "../../../contexts/AuthContext";

export default function Login() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState({ email: false, password: false });
  const { login, loading,} = useAuth();
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
    <main>
      <form method="post" onSubmit={handleSubmit}>
        <h1>Log In</h1>
        <div className={styles.input}>
          <label htmlFor="email">Email</label>
          <input
            type="text"
            name="email"
            id="email"
            onChange={(e) => setEmail(e.target.value)}
            required
          />
          {error.email && <span className={styles.error}>Invalid Email</span>}
        </div>
        <div className={styles.input}>
          <label htmlFor="password">Password</label>
          <input
            type="password"
            name="password"
            id="password"
            onChange={(e) => setPassword(e.target.value)}
            required
            min="6"
          />
          {error.password && (
            <span className={styles.error}>
              Password must be at least 6 characters
            </span>
          )}
        </div>
        {error.general && <div className={styles.error}>{error.general}</div>}
        {loading && <div>Loading...</div>}
        <div>
          <button type="submit">Log In</button>
        </div>
        <p>
          No account? <Link to="/sign-up">Sign Up</Link>{" "}
        </p>
      </form>
    </main>
  );
}
