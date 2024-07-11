import styles from "./Login.module.css";
import { Link } from "react-router-dom";
import useFetch from "../../hooks/useFetch";

export default function Login() {

    

  return (
    <main>
      <form method="post">
        <h1>Log In</h1>
        <div className={styles.input}>
          <label htmlFor="email">email</label>
          <input type="text" name="email" id="email" />
        </div>
        <div className={styles.input}>
          <label htmlFor="password">Password</label>
          <input type="password" name="password" id="password" />
        </div>
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
