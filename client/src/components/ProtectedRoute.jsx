import { jwtDecode } from "jwt-decode";
import { Navigate } from "react-router-dom";

const ProtectedRoute = ({ children, requiredRole }) => {
  const token = localStorage.getItem('user');

  if (!token) {
    return <Navigate to="/login" replace />;
  }

  try {
    const decodedToken = jwtDecode(token);
    const role = decodedToken.role;

    if (role !== requiredRole) {
      return <Navigate to="/dashboard" replace />;
    }

    return children;
  } catch (error) {
    return <Navigate to="/login" replace />;
  }
}

export default ProtectedRoute;
