import useFetch from "../../hooks/useFetch";
import styles from "./Home.module.css";

export default function Home() {
  const {
    data: posts,
    isLoading,
    error,
  } = useFetch("http://localhost:3000/api/posts");

  if (isLoading) {
    return <span>Loading...</span>;
  }

  if (error) return <h1>Error fetching data {error.message}</h1>;

  return (
    <main>
      {posts.map((post) => {
        return (
          <article key={post._id}>
            <h1>{post.title}</h1>
            <p>{post.summary}</p>
          </article>
        );
      })}
    </main>
  );
}
