import { Navigate, Outlet } from "react-router-dom";
import { useSelector } from "react-redux";
import { getToken } from "../utils/tokenService";

const ProtectedRoute = () => {
  const { user } = useSelector((state) => state.auth);
  const token = getToken();

  return user && token ? <Outlet /> : <Navigate to="/login" replace />;
};

export default ProtectedRoute;
