
import { useState } from "react";

const useLogin = (loginURL) => {
  const [user, setUser] = useState(null);
  const [isLoading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  const login = async (credentials) => {
    setLoading(true);
    setError(null);

    try {
      const response = await fetch(loginURL, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(credentials),
      });

      if (!response.ok) {
        const errorMessage = await response.text();
        throw new Error(errorMessage || `HTTP error! status: ${response.status}`);
      }

      const token = await response.text();
      // Store the token
      localStorage.setItem('token', token);
      
      // Decode the JWT to get user info
      const payload = JSON.parse(atob(token.split('.')[1]));
      setUser({ id: payload.id, name: payload.name });
    } catch (err) {
      console.error(`Login error:`, err);
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  const logout = () => {
    setUser(null);
    localStorage.removeItem('token');
    // You might want to call your backend logout endpoint here
  };

  return { user, login, logout, isLoading, error };
};

export default useLogin;