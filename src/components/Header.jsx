import { Link } from "react-router-dom";
import { useAuth } from "../contexts/AuthContext";

export default function Header() {
  const { user, logout } = useAuth();

  return (
    <header className="bg-gray-800 text-white p-3 shadow-md">
      <div className="max-w-7xl mx-auto flex justify-between items-center">
        <Link to="/" className="flex items-center space-x-2">
          <svg
            xmlns="http://www.w3.org/2000/svg"
            className="h-8 w-8 text-purple-500"
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              d="M15.232 5.232l3.536 3.536m-2.036-5.036a2.5 2.5 0 113.536 3.536L6.5 21.036H3v-3.572L16.732 3.732z"
            />
          </svg>
          <span className="text-2xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-purple-400 to-pink-600">
            New Path
          </span>
        </Link>
        <div className="flex items-center space-x-4">
          {user ? (
            <>
              <span className="text-gray-300">Welcome, {user.name}</span>
              <button
                onClick={logout}
                className="bg-purple-600 text-white px-4 py-2 rounded hover:bg-purple-700 transition duration-300"
              >
                Log Out
              </button>
            </>
          ) : (
            <>
              <Link
                to="login"
                className="bg-purple-600 text-white px-4 py-2 rounded hover:bg-purple-700 transition duration-300"
              >
                Log in
              </Link>
              <Link
                to="sign-up"
                className="bg-purple-600 text-white px-4 py-2 rounded hover:bg-purple-700 transition duration-300"
              >
                Sign up
              </Link>
            </>
          )}
        </div>
      </div>
    </header>
  );
}
