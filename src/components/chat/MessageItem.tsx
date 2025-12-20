import { Stack, Typography } from "@mui/material";
import { useAuthStore } from "../../store/authStore";
import formatTime from "../../utils/formatTime";

const MessageItem = ({ message }: { message: Message }) => {
  const { user } = useAuthStore();
  return (
    <Stack
      sx={{
        bgcolor:
          user?.uid === message.sender
            ? "primary.lighter"
            : "secondary.lighter",
        py: 1,
        px: 1.5,
        borderRadius: 2,
        minWidth: 80,
        alignSelf: user?.uid === message.sender ? "flex-end" : "flex-start",
      }}
    >
      <Typography>{message.text}</Typography>
      <Typography variant="caption" color="text.secondary" sx={{ opacity: .5, textAlign: user?.uid === message.sender ? "end" : "start" }}>
        {formatTime(message.sentAt * 1000)}
      </Typography>
    </Stack>
  );
};

export default MessageItem;