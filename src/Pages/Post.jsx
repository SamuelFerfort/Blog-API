import { useParams } from "react-router-dom";
import useFetch from "../hooks/useFetch";
import Comments from "../components/Comments";
import dateFormatter from "../utils/dateFormatter";
import Loading from "../components/Loading";
export default function Post() {
  const { postId } = useParams();

  const {
    data: post,
    isLoading,
    error,
  } = useFetch(`http://localhost:3000/api/posts/${postId}`);

  if (isLoading) return <Loading />;

  if (error) {
    return (
      <main className="flex justify-center items-center h-screen bg-gray-900">
        <p className="text-lg text-red-400">{error}</p>
      </main>
    );
  }


  return (
    <main className="max-w-4xl mx-auto rounded-lg bg-gray-900 text-gray-200 p-8">
      <article className="pt-8">
        <div className="flex flex-col gap-3 mb-8">
          <div className="flex justify-between">
            <span>Written By:</span>
            <span>{post.author.name}</span>
          </div>
          <div className="flex flex-col gap-3">
            <div className="flex justify-between">
              <span>Posted on:</span>
              <span>{dateFormatter(post.createdAt)}</span>
            </div>
          </div>
        </div>
        <h1 className="text-3xl font-bold mb-6 text-gray-100">{post.title}</h1>
        <img
          src={post.mainImage}
          alt={post.title}
          className="w-full h-64 object-cover mb-6 rounded-lg shadow-lg"
        />
        <div
          className="prose max-w-none text-gray-300"
          dangerouslySetInnerHTML={{ __html: post.content }}
        />
        <div className="mt-6">
          {post.tags.map((tag, index) => (
            <span
              key={index}
              className="inline-block bg-gray-700 rounded-full px-3 py-1 text-sm font-semibold text-gray-300 mr-2 mb-2"
            >
              #{tag}
            </span>
          ))}
        </div>
      </article>
      <Comments />
    </main>
  );
}
