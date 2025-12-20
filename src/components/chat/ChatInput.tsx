import React, { useState } from "react";
import { Stack, IconButton, TextField, SxProps } from "@mui/material";
import SendIcon from "@mui/icons-material/Send";

const ChatInput = ({ onSend, sx }: {
  onSend: (message: string) => void;
  sx?: SxProps;
}) => {
  const [message, setMessage] = useState("");

  const handleSend = () => {
    if (!message.trim()) return;
    onSend(message.trim());
    setMessage("");
  };

  const handleKeyPress = (e: React.KeyboardEvent<HTMLDivElement>) => {
    if (e.key === "Enter" && !e.shiftKey) {
      e.preventDefault();
      handleSend();
    }
  };

  return (
    <Stack
      direction="row"
      alignItems="center"
      padding={1}
      gap={1}
      sx={sx}
    >
      <TextField
        placeholder="Type a message..."
        multiline
        maxRows={4}
        fullWidth
        value={message}
        onChange={(e) => setMessage(e.target.value)}
        onKeyDown={handleKeyPress}
        variant="outlined"
        size="small"
      />
      <IconButton
        color="primary"
        onClick={handleSend}
        disabled={!message.trim()}
      >
        <SendIcon />
      </IconButton>
    </Stack>
  );
};

export default ChatInput;