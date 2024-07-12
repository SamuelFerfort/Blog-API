import styles from "./Header.module.css";
import { Link } from "react-router-dom";
import { useAuth } from "../../contexts/AuthContext";


export default function Header() {
  const { user, logout } = useAuth();

  return (
    <header>
      <Link to="/">My Blog</Link>

      {user ? (
        <>
          <span>Welcome {user.name}</span> <button onClick={logout}>Log Out</button>
        </>
      ) : (
        <Link to="login">Log In</Link>
      )}
    </header>
  );
}
