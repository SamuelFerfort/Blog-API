import { createContext, useState, useEffect, useContext } from "react";
import { jwtDecode } from "jwt-decode";

const AuthContext = createContext(null);

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  useEffect(() => {
    const checkLoggedIn = () => {
      const token = localStorage.getItem("token");
      if (token) {
        try {
          const decoded = jwtDecode(token);
          setUser({ id: decoded.id, name: decoded.name });
        } catch (err) {
          console.error("Invalid token", err);
          localStorage.removeItem("token");
        }
      }
    };

    checkLoggedIn();
  }, []);

  const register = async (formData) => {
    setLoading(true);
    setError(null);

    try {
      const response = await fetch("http://localhost:3000/auth/register", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(formData),
      });

      const data = await response.json()

      if(!response.ok) throw new Error(data.message || "Unexpected error") 

      } catch (err) {
      setError(err.message);
      throw err;
    } finally {
      setLoading(false);
    }
  };
  const login = async (credentials) => {
    setLoading(true);
    setError(null);

    try {
      const response = await fetch("http://localhost:3000/auth/login", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(credentials),
      });
      const data = await response.json();

      if (!response.ok) {
        throw new Error(data.message || `An unexpected error ocurred`);
      }
      const { token } = data;
      if (!token) {
        throw new Error("No token received from server");
      }

      localStorage.setItem("token", token);

      const decoded = jwtDecode(token);
      setUser({ id: decoded.id, name: decoded.name });
    } catch (err) {
      console.error("Login error", err);
      setError(err.message);
      throw err;
    } finally {
      setLoading(false);
    }
  };
  const logout = () => {
    setUser(null);
    localStorage.removeItem("token");
  };

  return (
    <AuthContext.Provider value={{ user, login, logout, loading, error, register }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => useContext(AuthContext);
