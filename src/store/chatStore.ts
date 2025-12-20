import { create } from "zustand";
import { persist } from "zustand/middleware";

type ChatState = {
  contact: Contact | null;
  setContact: (contact: Contact) => void;
  closeChat: () => void;
};

export const useChatStore = create<ChatState>()(
  persist(
    (set) => ({
      contact: null,
      setContact: (contact: Contact) => set({ contact }),
      closeChat: () => set({ contact: null }),
    }),
    // TODO: remove localstorage later
    {
      name: "chat-storage", // localStorage key
    }
  )
);
