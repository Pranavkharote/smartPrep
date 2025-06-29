// components/PublicRoute.jsx
import { Navigate, Outlet, useLocation } from "react-router-dom";

const PublicRoute = () => {
  const token = localStorage.getItem("token");
  const location = useLocation();
  const isLoginOrSignup = location.pathname === "/login" || location.pathname === "/signup";

  return token && isLoginOrSignup ? <Navigate to="/" /> : <Outlet />;
};

export default PublicRoute;
