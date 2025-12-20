import { Navigate } from "react-router-dom";
import { useAuthStore } from "../store/authStore";

const AuthRequiredRoute = ({ children }: any) =>
  useAuthStore.getState().user ? children : <Navigate to="/login" />;

export default AuthRequiredRoute;
