import useFetch from "../../hooks/useFetch";
import styles from "./Home.module.css";
import { Link } from "react-router-dom";
export default function Home() {
  const {
    data: posts,
    isLoading,
    error,
  } = useFetch("http://localhost:3000/api/posts");

  if (isLoading) {
    return <span>Loading...</span>;
  }

  if (error) return <h1>Error fetching data {error}</h1>;

  return (
    <main>
      <div className={styles["posts-container"]}>
        {posts.map((post) => {
          return (
            <Link key={post._id} to={`/post/${post._id}`}>
            <article >
              <h1>{post.title}</h1>
              <p>{post.summary}</p>
            </article>
            </Link>
            
          );
        })}
      </div>
    </main>
  );
}
