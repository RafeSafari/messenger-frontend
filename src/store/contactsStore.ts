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
        set((state) => {
          if (!state.contacts.find(c => c.uid === contact.uid)) {
            return state;
          } else {
            return { contacts: [...state.contacts, contact].filter(c => c) }
          }
        }),
      clearContacts: () => set({ contacts: [] }),
    }),
    // TODO: remove localstorage later
    {
      name: "contacts-storage", // localStorage key
    }
  )
);
