import { useParams } from "react-router-dom";
import useFetch from "../hooks/useFetch";
import Comments from "../components/Comments";
import Loading from "../components/Loading";
import useTitle from "../hooks/useTitle";
import Article from "../components/Article";
const API_URL = import.meta.env.VITE_API_URL;

export default function Post() {
  const { postId } = useParams();

  const {
    data: post,
    isLoading,
    error,
  } = useFetch(`${API_URL}/api/posts/${postId}`);

  useTitle(post ? post.title : "Loading...");

  if (isLoading) return <Loading />;

  if (error) {
    return (
      <main className="flex justify-center">
        <p className="text-lg text-red-400">{error}</p>
      </main>
    );
  }

  return (
    <main className="max-w-4xl mx-auto rounded-lg bg-gray-900 text-gray-200 p-6">
      <Article post={post} />

      <section className="mt-8">
        <Comments />
      </section>
    </main>
  );
}
