import { useLocation, Link } from "react-router-dom";
import { useEffect } from "react";

const NotFound = () => {
  const location = useLocation();

  useEffect(() => {
    console.error("404 Error: User attempted to access non-existent route:", location.pathname);
  }, [location.pathname]);

  return (
    <div className="flex min-h-screen items-center justify-center">
      <div className="text-center">
        <h1 className="mb-4 text-4xl font-bold text-black dark:text-white">404</h1>
        <p className="mb-4 text-xl text-gray-600 dark:text-gray-300">Oops! Page not found</p>
        <Link to="/" className="text-black dark:text-white underline hover:opacity-60 transition-opacity duration-300">
          Return to Home
        </Link>
      </div>
    </div>
  );
};

export default NotFound;
