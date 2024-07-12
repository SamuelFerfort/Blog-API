import { useParams } from "react-router-dom";
import useFetch from "../../hooks/useFetch";

export default function Post() {
  const { id } = useParams();

  const {
    data: post,
    isLoading,
    error,
  } = useFetch(`http://localhost:3000/api/posts/${id}`);

  if (isLoading) {
    return (
      <main>
        <p>Loading...</p>
      </main>
    );
  }
  if (error) {
    return (
      <main>
        <p>{error}</p>
      </main>
    );
  }
  return (
    <article>
      <h1>{post.title}</h1>
      <p>{post.content}</p>
    </article>
  );
}
