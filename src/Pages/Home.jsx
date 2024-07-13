import useFetch from "../hooks/useFetch";
import { Link } from "react-router-dom";
import PostPreview from "../components/PostPreview";
import Loading from "../components/Loading";
export default function Home() {
  const {
    data: posts,
    isLoading,
    error,
  } = useFetch("http://localhost:3000/api/posts");

  if (isLoading) return <Loading />

  if (error || !posts) {
    return (
      <main className="flex justify-center items-center h-screen bg-gray-900">
        <p className="text-lg text-red-400">Error Fetching posts</p>
      </main>
    );
  }

  return (
    <main className="p-4 flex justify-center bg-gray-900 min-h-screen">
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
        {posts.map((post) => (
          <Link
            key={post._id}
            to={`/post/${post._id}`}
            className="hover:opacity-80 transition-opacity"
          >
            <PostPreview post={post} />
          </Link>
        ))}
      </div>
    </main>
  );
}
