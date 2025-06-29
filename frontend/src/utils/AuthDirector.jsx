import { useEffect } from "react";
import { useNavigate, useLocation } from "react-router-dom";

const AuthRedirector = () => {
  const navigate = useNavigate();
  const location = useLocation();

  useEffect(() => {
    const token = localStorage.getItem("token");
    const onLoginOrSignup = location.pathname === "/login" || location.pathname === "/signup";

    if (token && onLoginOrSignup) {
      navigate("/"); // Only redirect to dashboard if on login/signup
    }
  }, [location]);

  return null;
};

export default AuthRedirector;
