import { Avatar, Button, Skeleton, Stack, Typography } from "@mui/material";
import { useChatStore } from "../store/chatStore";
import stringToSoftColor from "../utils/stringToSoftColor";

export default ({ contact }: { contact: Contact }) => {
  const chatStore = useChatStore();

  return (
    <Stack
      direction="row"
      gap={1}
      alignItems="center"
      px={1}
      onClick={() => chatStore.setContact(contact)}
      key={contact.uid}
      component={Button}
      variant="text"
      color="inherit"
      sx={{
        width: "100%",
        justifyContent: "start",
        textAlign: "start",
      }}
    >
      <Avatar src={contact.avatar} sx={{ bgcolor: stringToSoftColor(contact.uid) }}>{contact.name?.[0]?.toUpperCase()}</Avatar>
      <Stack direction="column" gap={0}>
        <Typography variant="body2" fontWeight={500}>{contact.name}</Typography>
        <Typography variant="caption" color="text.secondary">{contact.email}</Typography>
      </Stack>
    </Stack>
  );
};

export const ContactItemSkeleton = () => (
  <Stack direction="row" gap={1} alignItems="center" px={1}>
    <Skeleton variant="circular" width={40} height={40} />
    <Stack direction="column" gap={.25}>
      <Skeleton variant="text" width={100} />
      <Skeleton variant="text" width={100} />
    </Stack>
  </Stack>
);