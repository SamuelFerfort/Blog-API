import { Link } from "react-router-dom";
import PostPreview from "../components/PostPreview";
import Loading from "../components/Loading";
import useTitle from "../hooks/useTitle";
import { useQuery } from "@tanstack/react-query";
const API_URL = import.meta.env.VITE_API_URL;
import Error from "../components/Error";

export default function Home() {
  // const { data: posts, isLoading, error } = useFetch(`${API_URL}/api/posts`);

  const {
    isPending,
    error,
    data: posts,
  } = useQuery({
    queryKey: ["posts"],
    queryFn: () => fetch(`${API_URL}/api/posts`).then((res) => res.json()),
  });

  useTitle("New Path");
  if (isPending) return <Loading />;

  if (error) return <Error error={error} />;

  return (
    <main className="p-7 flex justify-center bg-gray-900 min-h-screen">
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-7 ">
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
