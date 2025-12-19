import { Stack } from "@mui/material";
import ContactItem, { ContactItemSkeleton } from "./ContactItem";

export default ({ contacts }: { contacts?: Contact[] }) => {
  return (
    <Stack direction="column" gap={1} px={1}>
      {contacts ? (
        contacts.map((contact) => (
          <ContactItem key={contact.uid} contact={contact} />
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