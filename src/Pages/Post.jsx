import { useParams } from "react-router-dom";
import useFetch from "../hooks/useFetch";
import Comments from "../components/Comments";
import dateFormatter from "../utils/dateFormatter";
import Loading from "../components/Loading";
import useTitle from "../hooks/useTitle";


export default function Post() {
  const { postId } = useParams();

  const {
    data: post,
    isLoading,
    error,
  } = useFetch(`http://localhost:3000/api/posts/${postId}`);
  
  useTitle(post ? post.title : "Loading...");


  if (isLoading) return <Loading />;

  if (error) {
    return (
      <main className="flex justify-center items-center h-screen bg-gray-900">
        <p className="text-lg text-red-400">{error}</p>
      </main>
    );
  } 

 

  return (
    <main className="max-w-4xl mx-auto rounded-lg bg-gray-900 text-gray-200 p-6">
      <article className="space-y-4">
        <header className="space-y-2">
          <h1 className="text-3xl font-bold text-gray-100">{post.title}</h1>
          <div className="flex justify-between text-sm text-gray-400">
            <span>By {post.author.name}</span>
            <span>{dateFormatter(post.createdAt)}</span>
          </div>
        </header>

        <img
          src={post.mainImage}
          alt={post.title}
          className="w-full h-64 object-cover rounded-lg shadow-lg"
        />

        <div
          className="prose max-w-none text-gray-300 prose-h2:text-gray-100"
          dangerouslySetInnerHTML={{ __html: post.content }}
        />

        <footer className="pt-4">
          <div className="flex flex-wrap gap-2">
            {post.tags.map((tag, index) => (
              <span
                key={index}
                className="inline-block bg-gray-700 rounded-full px-3 py-1 text-sm font-semibold text-gray-300"
              >
                #{tag}
              </span>
            ))}
          </div>
        </footer>
      </article>

      <section className="mt-8">
        <Comments />
      </section>
    </main>
  );
}