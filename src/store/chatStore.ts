import { create } from "zustand";
import { persist } from "zustand/middleware";

const parseServerMessage = (message: ServerMessage): Message => ({ ...message, text: message.data?.text || '' });

type ChatState = {
  contact: Contact | null;
  setContact: (contact: Contact) => void;
  closeChat: () => void;
  messages: Message[];
  setMessages: (messages: ServerMessage[]) => void;
  addMessage: (message: ServerMessage) => void;
};

export const useChatStore = create<ChatState>()(
  persist(
    (set) => ({
      contact: null,
      setContact: (contact: Contact) => set({ contact, messages: [] }),
      closeChat: () => set({ contact: null }),
      messages: [],
      setMessages: (messages: ServerMessage[]) => set({ messages: messages.map(parseServerMessage) }),
      addMessage: (message: ServerMessage) => set((state) => ({ messages: [...state.messages, parseServerMessage(message)] })),
    }),
    // TODO: remove localstorage later
    {
      name: "chat-storage", // localStorage key
    }
  )
);
