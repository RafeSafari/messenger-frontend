import { create } from "zustand";


type ContactsState = {
  contacts: Contact[];
  setContacts: (contacts: Contact[]) => void;
  addSingleContact: (contact: Contact) => void;
  clearContacts: () => void;
};

export const useContactsStore = create<ContactsState>((set) => ({
  contacts: [],
  setContacts: (contacts) => set({ contacts }),
  addSingleContact: (contact) => set((state) => ({ contacts: [...state.contacts, contact] })),
  clearContacts: () => set({ contacts: [] }),
}));
