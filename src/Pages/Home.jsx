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
      <main className="flex justify-center h-screen pt-11">
        <div className="p-5 rounded-lg shadow-lg bg-white">
          <svg
            className="animate-spin h-12 w-12 text-indigo-600 mx-auto mb-4"
            xmlns="http://www.w3.org/2000/svg"
            fill="none"
            viewBox="0 0 24 24"
          >
            <circle
              className="opacity-25"
              cx="12"
              cy="12"
              r="10"
              stroke="currentColor"
              strokeWidth="4"
            ></circle>
            <path
              className="opacity-75"
              fill="currentColor"
              d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A8.004 8.004 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647zm10-10.582A8.004 8.004 0 0120 12h4c0-6.627-5.373-12-12-12v4zm-3 8.291l-3 2.647A8.004 8.004 0 0116 12h4c0 2.972-1.309 5.638-3.386 7.453l-3-2.647zM5.386 4.547l3 2.647A8.004 8.004 0 014 12H0c0-2.972 1.309-5.638 3.386-7.453z"
            ></path>
          </svg>
          <p className="text-lg text-center text-gray-800 font-semibold">
            Loading...
          </p>
        </div>
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
    <main className="p-4 flex justify-center">
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
