import { useParams } from "react-router-dom";
import useFetch from "../hooks/useFetch";

export default function Post() {
  const { postId } = useParams();

  const {
    data: post,
    isLoading,
    error,
  } = useFetch(`http://localhost:3000/api/posts/${postId}`);

  console.log(post);

  if (isLoading) {
    return (
      <main className="flex justify-center items-center h-screen">
        <p className="text-lg font-semibold">Loading...</p>
      </main>
    );
  }
  if (error) {
    return (
      <main className="flex justify-center items-center h-screen">
        <p className="text-lg text-red-600">{error}</p>
      </main>
    );
  }
  if (!post) {
    return (
      <main className="flex justify-center items-center h-screen">
        <p className="text-lg text-red-600">Post not found</p>
      </main>
    );
  }

  return (
    <main className="p-4 max-w-3xl mx-auto">
      <article>
        <h1 className="text-4xl font-bold mb-6">{post.title}</h1>
        <img
          src={post.mainImage}
          alt={post.title}
          className="w-full h-64 object-cover mb-6 rounded-lg shadow-lg"
        />
        <div
          className="prose prose-lg"
          dangerouslySetInnerHTML={{ __html: post.content }}
        />
        <div className="mt-6">
          {post.tags.map((tag, index) => (
            <span
              key={index}
              className="inline-block bg-gray-200 rounded-full px-3 py-1 text-sm font-semibold text-gray-700 mr-2 mb-2"
            >
              #{tag}
            </span>
          ))}
        </div>
      </article>
    </main>
  );
}
