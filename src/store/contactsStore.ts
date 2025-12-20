import { create } from "zustand";
import { persist } from "zustand/middleware";

type ContactsState = {
  contacts: Contact[];
  setContacts: (contacts: Contact[]) => void;
  addSingleContact: (contact: Contact) => void;
  clearContacts: () => void;
};

export const useContactsStore = create<ContactsState>()(
  persist(
    (set) => ({
      contacts: [],
      setContacts: (contacts) => set({ contacts }),
      addSingleContact: (contact) =>
        set((state) => ({ contacts: [...state.contacts, contact] })),
      clearContacts: () => set({ contacts: [] }),
    }),
    // TODO: remove localstorage later
    {
      name: "contacts-storage", // localStorage key
    }
  )
);
