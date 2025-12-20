import { Stack, Typography } from "@mui/material";
import { useChatStore } from "../../store/chatStore";
import ConversationBox from "./ChatBox";
import ChatHeader from "./ChatHeader";
import ChatInput from "./ChatInput";
import { postMessage } from "../../library/chatApi";

const ChatBoxWrapper = () => {
  const { contact, addMessage } = useChatStore();

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

  const sendMessage = (message: string) => {
    if (!contact.uid || !message) return;
    console.log('send', message, 'to', contact.uid);
    postMessage(contact.uid, message)
      .then((res) => addMessage(res.data.res))
      .catch((err) => console.error(err));
  };

  return (
    <Stack height={1} direction="column">
      <Stack
        flex={0}
        borderBottom="1px solid"
        borderColor="primary.lighter"
        bgcolor="primary.lightest"
        minHeight={58}
        justifyContent="center"
      >
        <ChatHeader />
      </Stack>

      {/* Chat */}
      <Stack flex={1}>
        <ConversationBox />
      </Stack>

      {/* Footer input */}
      {contact.conversationId && (
        <Stack
          flex={0}
          borderTop="1px solid"
          borderColor="primary.lighter"
          bgcolor="primary.lightest"
          justifyContent="center"
        >
          <ChatInput onSend={sendMessage} />
        </Stack>
      )}
    </Stack>
  );
};

export default ChatBoxWrapper;