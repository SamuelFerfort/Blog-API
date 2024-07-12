import useFetch from "../hooks/useFetch";
import { Link } from "react-router-dom";
import PostPreview from "../components/PostPreview";
export default function Home() {
  const {
    data: posts,
    isLoading,
    error,
  } = useFetch("http://localhost:3000/api/posts");

  if (isLoading) {
    return (
      <main className="flex justify-center mt-10">
        <p className="text-lg font-semibold">Loading...</p>
      </main>
    );
  }
  if (error || !posts) {
    return (
      <main className="flex justify-center items-center h-screen">
        <p className="text-lg text-red-600">Error Fetching posts</p>
      </main>
    );
  }

  return (
    <main className="p-4">
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
        {posts.map((post) => {
          return (
            <Link key={post._id} to={`/post/${post._id}`}>
              <PostPreview post={post} />
            </Link>
          );
        })}
      </div>
    </main>
  );
}
