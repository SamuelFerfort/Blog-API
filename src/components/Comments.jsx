import useFetch from "../hooks/useFetch";
import { useAuth } from "../contexts/AuthContext";
import { useParams } from "react-router-dom";

export default function Comments() {
  const { user } = useAuth();

  const { postId } = useParams();

  const {
    data: comments,
    isLoading,
    error,
  } = useFetch(`http://localhost:3000/api/comments/post/${postId}`);

  if (isLoading) {
    return <p>Loading comments...</p>;
  }
  if (error) {
    return;
  }

  return (
    <>
      <h1>Comments</h1>

      <div>
        {comments.map((comment) => {
          return (
            <article key={comment._id}>
              <h1>{comment.author.name}</h1>
              <p>{comment.content}</p>
              <p>{comment.createdAt}</p>
            </article>
          );
        })}
      </div>
    </>
  );
}
