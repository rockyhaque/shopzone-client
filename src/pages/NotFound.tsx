import { Link } from "react-router-dom";

const NotFound = () => {
  return (
    <div className="h-screen flex flex-col items-center justify-center text-center">
      <h1 className="text-4xl font-bold text-rose-600 mb-4">404 - Page Not Found</h1>
      <p className="text-lg mb-6 text-gray-700">The page you are looking for doesn't exist.</p>
      <Link to="/dashboard" className="bg-sky-600 text-white px-4 py-2 rounded hover:bg-sky-700">
        Go to Dashboard
      </Link>
    </div>
  );
};

export default NotFound;
