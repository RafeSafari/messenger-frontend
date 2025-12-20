// src/pages/Logout.tsx
import { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { useAuthStore } from "../store/authStore";
import { getLogout } from "../library/chatApi";
import { toast } from "react-toastify";
import { useContactsStore } from "../store/contactsStore";
import { useChatStore } from "../store/chatStore";

export default function Logout() {
  const { logout } = useAuthStore();
  const navigate = useNavigate();

  const contactStore = useContactsStore();
  const chatStore = useChatStore();

  useEffect(() => {
    getLogout()
      .then(() => {
        logout();
        contactStore.clearContacts();
        chatStore.closeChat();
        navigate("/login", { replace: true });
      })
      .catch((err) => {
        console.error(err);
        toast.error("Unable to logout!");
      });
  }, []);

  return null;
}
