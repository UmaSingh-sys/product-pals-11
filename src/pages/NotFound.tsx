
import { useEffect } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import Layout from "@/components/Layout";

const NotFound = () => {
  const location = useLocation();
  const navigate = useNavigate();

  useEffect(() => {
    console.error(
      "404 Error: User attempted to access non-existent route:",
      location.pathname
    );
  }, [location.pathname]);

  return (
    <Layout>
      <div className="container px-4 py-16 mx-auto max-w-2xl text-center">
        <h1 className="text-7xl font-bold text-primary mb-4">404</h1>
        <h2 className="text-2xl font-medium mb-6">Page not found</h2>
        <p className="text-muted-foreground mb-8">
          The page you are looking for doesn't exist or has been moved.
        </p>
        <button
          onClick={() => navigate("/")}
          className="bg-primary text-primary-foreground px-6 py-3 rounded-md inline-flex items-center justify-center"
        >
          Return to Home
        </button>
      </div>
    </Layout>
  );
};

export default NotFound;
