import { Stack } from "@mui/material";
import ContactItem, { ContactItemSkeleton } from "./ContactItem";
import { useChatStore } from "../store/chatStore";

export default ({ contacts }: { contacts?: Contact[] }) => {
  const { contact: selectedContact } = useChatStore();

  return (
    <Stack direction="column" gap={1} px={1}>
      {contacts ? (
        contacts.map((contact) => (
          <ContactItem key={contact.uid} contact={contact} active={selectedContact?.uid === contact.uid} />
        ))
      ) : (
        <>
          <ContactItemSkeleton />
          <ContactItemSkeleton />
          <ContactItemSkeleton />
          <ContactItemSkeleton />
        </>
      )}
    </Stack>
  );
};