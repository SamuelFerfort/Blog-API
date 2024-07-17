import { useParams } from "react-router-dom";
import Comments from "../components/Comments";
import Loading from "../components/Loading";
import useTitle from "../hooks/useTitle";
import Article from "../components/Article";
const API_URL = import.meta.env.VITE_API_URL;
import { useQuery } from "@tanstack/react-query";
import Error from "../components/Error";

export default function Post() {
  const { postId } = useParams();

  const {
    isPending,
    error,
    data: post,
  } = useQuery({
    queryKey: ["post", postId],
    queryFn: () =>
      fetch(`${API_URL}/api/posts/${postId}`).then((res) => res.json()),
    enabled: !!postId,
  });

  useTitle(post ? post.title : "Loading...");

  if (isPending) return <Loading />;

  if (error) return <Error error={error} />;

  return (
    <main className="max-w-4xl mx-auto rounded-lg bg-gray-900 text-gray-200 p-6">
      <Article post={post} />

      <section className="mt-8">
        <Comments />
      </section>
    </main>
  );
}
