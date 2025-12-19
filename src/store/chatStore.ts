import { create } from "zustand";


type ChatState = {
  contact: Contact | null;
  setContact: (contact: Contact) => void;
  closeChat: () => void;
};

export const useChatStore = create<ChatState>((set) => ({
  contact: null,
  setContact: (contact: Contact) => set({ contact }),
  closeChat: () => set({ contact: null }),
}));
