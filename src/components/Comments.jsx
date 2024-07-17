import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import { useAuth } from "../contexts/AuthContext";
import { useParams } from "react-router-dom";
import { useState, useMemo } from "react";
import dateFormatter from "../utils/dateFormatter";
import { postComment, fetchComments } from "../utils/fetchComments";

export default function Comments() {
  const { postId } = useParams();
  const { user } = useAuth();
  const [newComment, setNewComment] = useState("");
  const queryClient = useQueryClient();

  const {
    data: comments,
    isLoading,
    error,
  } = useQuery({
    queryKey: ["comments", postId],
    queryFn: () => fetchComments(postId),
  });

  const mutation = useMutation({
    mutationFn: postComment,
    onSuccess: (data) => {
      queryClient.setQueryData(["comments", postId], (old) => [
        ...old,
        data.comment,
      ]);
      setNewComment("");
    },
  });

  const sortedComments = useMemo(() => {
    return [...(comments || [])].sort(
      (a, b) => new Date(b.createdAt) - new Date(a.createdAt)
    );
  }, [comments]);

  const handleChange = (e) => {
    if (!user) return;
    setNewComment(e.target.value);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!newComment || !user) return;

    const token = localStorage.getItem("token");
    if (!token) {
      console.error("No token found");
      return;
    }

    mutation.mutate({ postId, content: newComment, token });
  };

  if (isLoading) {
    return <p>Loading comments...</p>;
  }
  if (error) {
    return <p>Error fetching the comments: {error.message}</p>;
  }

  return (
    <section className="border-t border-gray-700 pt-4">
      <h1 className="text-2xl font-semibold mb-4 text-gray-100">Comments</h1>

      <div className="flex flex-col space-y-4">
        {sortedComments.map((comment) => (
          <article
            key={comment._id}
            className="p-4 bg-gray-800 rounded-lg flex flex-col gap-3 shadow-lg"
          >
            <h1 className="text-xl font-medium text-gray-200">
              {comment.author.name}
            </h1>
            <p className="text-gray-300">{comment.content}</p>
            <p className="text-gray-500 text-sm">
              {dateFormatter(comment.createdAt)}
            </p>
          </article>
        ))}
      </div>

      <form onSubmit={handleSubmit} className="flex flex-col mt-4 space-y-2">
        <input
          type="text"
          name="content"
          className="h-10 p-2 border border-gray-600 rounded-md bg-gray-700 text-gray-200"
          id="content"
          value={user ? newComment : ""}
          onChange={handleChange}
          placeholder={user ? "Great article..." : "Log in to comment"}
        />
        <button
          type="submit"
          className="self-start px-4 py-2 bg-purple-600 text-white rounded-md hover:bg-purple-700"
          disabled={mutation.isPending}
        >
          {mutation.isPending ? "Posting..." : "Add Comment"}
        </button>
      </form>
    </section>
  );
}
