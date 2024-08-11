import dateFormatter from "../utils/dateFormatter";
import PropTypes from "prop-types";
import { UserCircle, Calendar } from "lucide-react";

export default function Article({ post }) {
  return (
    <article className="space-y-4">
      <header className="space-y-2">
        <h1 className="text-3xl font-bold text-gray-100">{post.title}</h1>
        <div className="flex justify-between text-sm text-gray-400">
          <span className="flex items-center">
            <UserCircle size={16} className="mr-1" /> {post.author.name}
          </span>

          <span className="flex items-center">
            <Calendar size={16} className="mr-1" />
            {dateFormatter(post.createdAt)}
          </span>
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
              #{tag.name}
            </span>
          ))}
        </div>
      </footer>
    </article>
  );
}

Article.propTypes = {
  post: PropTypes.shape({
    title: PropTypes.string.isRequired,
    author: PropTypes.shape({
      name: PropTypes.string.isRequired,
    }).isRequired,
    createdAt: PropTypes.string.isRequired,
    mainImage: PropTypes.string.isRequired,
    content: PropTypes.string.isRequired,
    tags: PropTypes.arrayOf(PropTypes.string).isRequired,
  }).isRequired,
};
