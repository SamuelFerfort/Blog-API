import PropTypes from "prop-types";
import { UserCircle, Calendar } from "lucide-react";
import dateFormatter from "../utils/dateFormatter";
export default function PostPreview({ post }) {
  return (
    <article className="flex flex-col  max-w-sm rounded-lg overflow-hidden shadow-lg m-4 bg-gray-800 text-gray-200 hover:scale-105  transition-all ease-in-out">
      <img
        className="w-full h-48 object-cover"
        src={post.mainImage}
        alt={post.title}
      />
      <div className="px-6 py-4 flex-grow flex flex-col">
        <h2 className="font-bold text-xl mb-3 text-gray-100 line-clamp-2">
          {post.title}
        </h2>
        <div className="flex flex-col  sm:flex-row text-sm text-gray-400 mb-3 gap-2 sm:justify-between sm:items-center">
          <div className="flex items-center ">
            <UserCircle size={16} className="mr-1" />
            <span>{post.author.name}</span>
          </div>
          <div className="flex items-center">
            <Calendar size={16} className="mr-1" />
            <span>{dateFormatter(post.createdAt)}</span>
          </div>
        </div>
        <p className="text-gray-400 text-base flex-grow line-clamp-3">
          {post.summary}
        </p>
      </div>
      <div className="px-6 pt-4 pb-2">
        {post.tags.map((tag, index) => (
          <span
            key={index}
            className="inline-block bg-gray-700 rounded-full px-3 py-1 text-sm font-semibold text-gray-300 mr-2 mb-2"
          >
            #{tag.name}
          </span>
        ))}
      </div>
    </article>
  );
}

PostPreview.propTypes = {
  post: PropTypes.shape({
    mainImage: PropTypes.string.isRequired,
    title: PropTypes.string.isRequired,
    summary: PropTypes.string.isRequired,
    author: PropTypes.shape({
      name: PropTypes.string.isRequired,
    }).isRequired,
    createdAt: PropTypes.string.isRequired,
    tags: PropTypes.arrayOf(PropTypes.object),
  }).isRequired,
};
