import PropTypes from "prop-types";

export default function PostPreview({ post }) {
  return (
    <div className="flex flex-col h-full max-w-sm rounded overflow-hidden shadow-lg m-4 bg-gray-800 text-gray-200">
      <img
        className="w-full h-48 object-cover"
        src={post.mainImage}
        alt={post.title}
      />
      <div className="px-6 py-4 flex-grow flex flex-col">
        <h2 className="font-bold text-xl mb-2 text-gray-100 line-clamp-2">
          {post.title}
        </h2>
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
            #{tag}
          </span>
        ))}
      </div>
    </div>
  );
}

PostPreview.propTypes = {
  post: PropTypes.shape({
    mainImage: PropTypes.string.isRequired,
    title: PropTypes.string.isRequired,
    summary: PropTypes.string.isRequired,
    tags: PropTypes.arrayOf(PropTypes.string).isRequired,
  }).isRequired,
};
