import { Stack, Typography } from "@mui/material";
import { useChatStore } from "../../store/chatStore";
import ConversationBox from "./ConversationBox";
import ChatHeader from "./ChatHeader";

export default () => {
  const { contact } = useChatStore();

  if (!contact) {
    return (
      <Stack height={1} alignItems="center" justifyContent="center">
        <Stack
          gap={1}
          direction="column"
          bgcolor="primary.lighter"
          alignItems="center"
          borderRadius={2}
          p={2}
        >
          <Typography variant="body1" color="primary.dark">
            Select a contact to start messaging
          </Typography>
          <Typography variant="caption" color="primary.dark">
            or search for a friend
          </Typography>
        </Stack>
      </Stack>
    );
  }

  return (
    <Stack height={1} direction="column">
      <Stack flex={0} bgcolor="primary.lighter">
        <ChatHeader />
      </Stack>

      {/* Chat */}
      <Stack flex={1}>
        <ConversationBox />
      </Stack>

      {/* Footer input */}
      <Stack flex={0} bgcolor="primary.lighter">
        input
      </Stack>
    </Stack>
  );
};