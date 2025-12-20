import { Stack, Typography } from "@mui/material";
import { useChatStore } from "../../store/chatStore";
import ConversationBox from "./ChatBox";
import ChatHeader from "./ChatHeader";
import ChatInput from "./ChatInput";
import { postMessage } from "../../library/chatApi";
import { socket } from "../../socket";
import { useEffect, useRef } from "react";
import { useAuthStore } from "../../store/authStore";

const ChatBoxWrapper = () => {
  const { contact, addMessage } = useChatStore();
  const { user } = useAuthStore();

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
    postMessage(contact.uid, message)
      .then((res) => {
        addMessage(res.data.res);
        scrollBottom();
      })
      .catch((err) => console.error(err));
  };

  const conversationWrapperRef = useRef<HTMLDivElement>(null);
  useEffect(scrollBottom, []);

  function scrollBottom() {
    if (conversationWrapperRef.current) {
      conversationWrapperRef.current.scrollTop = conversationWrapperRef.current.scrollHeight;
    }
  }

  useEffect(() => {
    socket.emit("register", user?.uid);

    socket.on("text-message", (message: ServerMessage) => {
      if (message.sender === contact.uid) {
        addMessage(message);
        scrollBottom();
      }
    });

    return () => {
      socket.off("text-message");
    };
  }, [user?.uid]);

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
      <Stack flex={1} p={1} mb={1} sx={{ overflowY: "auto" }} ref={conversationWrapperRef}>
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