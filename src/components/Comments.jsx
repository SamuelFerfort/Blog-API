import useFetch from "../hooks/useFetch";
import { useAuth } from "../contexts/AuthContext";
import { useParams } from "react-router-dom";
import { format, parseISO } from 'date-fns';
import { useState, useMemo } from "react";

export default function Comments() {
  const { postId } = useParams();

  const { user } = useAuth();
  const {
    data: fetchedComments,
    isLoading,
    error,
    setData: setComments,
  } = useFetch(`http://localhost:3000/api/comments/post/${postId}`);
  const [newComment, setNewComment] = useState("");


  
  const sortedComments = useMemo(() => {
    return [...(fetchedComments || [])].sort((a, b) => 
      new Date(b.createdAt) - new Date(a.createdAt)
    );
  }, [fetchedComments]);


  const handleChange = (e) => {
    if (!user) return;
    setNewComment(() => e.target.value);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!newComment || !user) return;


    const token = localStorage.getItem('token');
    if (!token) {
      console.error('No token found');
      return;
    }
    try {
      const response = await fetch("http://localhost:3000/api/comments", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          'Authorization': `Bearer ${token}`
        },
        body: JSON.stringify({
          postId,
          content: newComment,
        }),
      });

      const data = await response.json();

      if (data.success) {
       
        setComments((prevComments) => [...prevComments, data.comment]);
        setNewComment("");
      } else {
        console.error("Failed to post comment:", data.message);
      }
    } catch (err) {
      console.error("Error posting comment:", err);
    }
  };

  const formatDate = (dateString) => {
    return format(parseISO(dateString), 'MMM d, yyyy h:mm a');
  };

  if (isLoading) {
    return <p>Loading comments...</p>;
  }
  if (error) {
    return <p>Error fetching the comments </p>;
  }

  return (
    <section className="border-t pt-4">
      <h1 className="text-2xl font-semibold mb-4">Comments</h1>

      <div className="flex flex-col space-y-4">
        {sortedComments.map((comment) => {
          return (
            <article key={comment._id} className="p-4 bg-gray-100 rounded-lg flex flex-col gap-3">
              <h1 className="text-xl font-medium">{comment.author.name}</h1>
              <p className="text-gray-700">{comment.content}</p>
              <p className="text-gray-500 text-sm">{formatDate(comment.createdAt)}</p>
            </article>
          );
        })}
      </div>

      <form
        method="post"
        onSubmit={handleSubmit}
        className="flex flex-col mt-4 space-y-2"
      >
        <input
          type="text"
          name="content"
          className="h-10 p-2 border rounded-md"
          id="content"
          value={newComment}
          onChange={handleChange}
          placeholder={user ? "Great article..." : "Log in to comment"}
        />
        <button
          type="submit"
          className="self-start px-4 py-2 bg-blue-500 text-white rounded-md hover:bg-blue-600"
        >
          Add Comment
        </button>
      </form>
    </section>
  );
}
