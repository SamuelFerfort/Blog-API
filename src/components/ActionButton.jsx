import { Loader2 } from "lucide-react";
import PropTypes from "prop-types";

ActionButton.propTypes = {
  loading: PropTypes.bool,
  idleText: PropTypes.string,
  loadingText: PropTypes.string,
};

const ActionButton = ({ loading, idleText, loadingText }) => (
  <button
    type="submit"
    className={`w-full bg-purple-600 text-white p-2 rounded hover:bg-purple-700 transition duration-300 flex items-center justify-center disabled:opacity-50 disabled:cursor-not-allowed `}
    disabled={loading}
  >
    {loading ? (
      <>
        <Loader2 className="mr-2 h-4 w-4 animate-spin" />
        {loadingText || "Loading..."}
      </>
    ) : (
      idleText
    )}
  </button>
);

export default ActionButton;
