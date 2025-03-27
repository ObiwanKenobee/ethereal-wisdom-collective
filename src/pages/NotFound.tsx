
import { Link } from "react-router-dom";

const NotFound = () => {
  return (
    <div className="min-h-screen flex items-center justify-center bg-cosmic-dark px-6">
      <div className="cosmic-card max-w-md w-full text-center">
        <div className="mb-6">
          <div className="inline-block h-24 w-24 rounded-full bg-cosmic-medium/40 flex items-center justify-center mb-4">
            <div className="text-6xl font-bold text-celestial-purple">404</div>
          </div>
        </div>
        <h1 className="text-2xl font-bold mb-4 text-white">Consciousness Not Found</h1>
        <p className="text-white/70 mb-6">
          The path you seek has either dissolved into the cosmos or has yet to materialize into this reality.
        </p>
        <Link to="/" className="cosmic-button inline-flex">
          Return to Awareness
        </Link>
      </div>
    </div>
  );
};

export default NotFound;
