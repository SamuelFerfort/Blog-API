import styles from "./Register.module.css";
import { Link } from "react-router-dom";

export default function Register() {
  return (
    <main>
      <form method="post">
        <h1>Sign Up</h1>
        <div className={styles.input}>
          <label htmlFor="name">Name</label>
          <input type="text" name="name" id="name" />
        </div>
        <div className={styles.input}>
          <label htmlFor="username">Email</label>
          <input type="email" name="email" id="email" />
        </div>
        <div className={styles.input}>
          <label htmlFor="password">Password</label>
          <input type="password" name="password" id="password" />
        </div>
        <div>
          <button type="submit">Sign Up</button>
        </div>
        <p>
          Already have an account? <Link to="/login">Log In</Link>{" "}
        </p>
      </form>
    </main>
  );
}
