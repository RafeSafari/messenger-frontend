// src/pages/Logout.tsx
import { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { useAuthStore } from "../store/authStore";
import { getLogout } from "../library/chatApi";
import { toast } from "react-toastify";

export default function Logout() {
  const { logout } = useAuthStore();
  const navigate = useNavigate();

  useEffect(() => {
    getLogout()
      .then(() => {
        logout();
        navigate("/login", { replace: true });
      })
      .catch((err) => {
        console.error(err);
        toast.error("Unable to logout!");
      });
  }, []);

  return null;
}
