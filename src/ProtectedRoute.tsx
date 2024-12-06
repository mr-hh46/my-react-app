import { Outlet, Navigate } from "react-router-dom";
import { useAuth } from "./AuthProvider";
// import { ReactNode } from "react";

// interface ProtectedRouteProps {
//   element: ReactNode;
// }

const ProtectedRoute = () => {
  const { isAuthenticated } = useAuth();
  return isAuthenticated ? <Outlet /> : <Navigate to="/" replace />;
};

export default ProtectedRoute;
