import styles from "./Header.module.css";
import { Link } from "react-router-dom";
export default function Header() {
  return (
    <header>
      <Link to="/">My Blog</Link>
      <Link to="login">Log In</Link>
    </header>
  );
}
