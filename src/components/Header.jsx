import { Link } from "react-router-dom";
import { useAuth } from "../contexts/AuthContext";

export default function Header() {
  const { user, logout } = useAuth();

  return (
    <header className="bg-blue-500 text-white p-4 shadow-md flex justify-between items-center">
      <Link to="/" className="text-2xl font-bold">
        My Blog
      </Link>
      <div>
        {user ? (
          <>
            <span className="mr-4">Welcome {user.name}</span>
            <button
              onClick={logout}
              className="bg-white text-blue-500 px-4 py-2 rounded hover:bg-gray-200 transition duration-300"
            >
              Log Out
            </button>
          </>
        ) : (
          <Link
            to="login"
            className="bg-white text-blue-500 px-4 py-2 rounded hover:bg-gray-200 transition duration-300"
          >
            Log In
          </Link>
        )}
      </div>
    </header>
  );
}
