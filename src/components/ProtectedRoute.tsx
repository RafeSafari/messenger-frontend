import { Navigate } from "react-router-dom";
import { useAuthStore } from "../store/authStore";

export default ({ children }: any) =>
  useAuthStore.getState().user ? children : <Navigate to="/login" />;
