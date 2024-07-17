const API_URL = import.meta.env.VITE_API_URL

export const fetchComments = async (postId) => {
  const response = await fetch(`${API_URL}/api/comments/post/${postId}`);
  if (!response.ok) {
    throw new Error("Network response was not ok");
  }
  return response.json();
};

export const postComment = async ({ postId, content, token }) => {
  const response = await fetch(`${API_URL}/api/comments`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${token}`,
    },
    body: JSON.stringify({ postId, content }),
  });
  if (!response.ok) {
    throw new Error("Failed to post comment");
  }
  return response.json();
};
