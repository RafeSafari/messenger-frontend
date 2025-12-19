import { Stack, Typography } from "@mui/material";
import ContactItem, { ContactItemSkeleton } from "./ContactItem";

export default ({
  users,
  isSearching = false,
  query = '',
}: {
  users?: Contact[];
  isSearching?: boolean;
  query?: string;
}) => {
  return (
    <Stack direction="column" gap={1} px={1}>
      {!query ? (
        <Stack direction="row" gap={1} alignItems="center" px={1}>
          <Typography variant="body2" color="text.secondary">Search for your friends</Typography>
        </Stack>
      ) : isSearching ? (
        <>
          <ContactItemSkeleton />
          <ContactItemSkeleton />
          <ContactItemSkeleton />
        </>
      ) : users?.length ? (
        users.map((user) => <ContactItem key={user.uid} contact={user} />)
      ) : (
        <Stack direction="row" gap={1} alignItems="center" px={1}>
          <Typography variant="body2" color="text.secondary">No users found!</Typography>
        </Stack>
      )}
    </Stack>
  );
};