import { Box, Stack } from "@mui/material";
import Contacts from "../components/ContactsPane";
import ChatBoxWrapper from "../components/chat/ChatBoxWrapper";

const Messenger = () => (
  <Stack display="flex" direction='row' height="100vh">
    <Box
      width={250}
      sx={{
        borderRight: "1px solid",
        borderColor: "primary.lighter",
      }}
    >
      <Contacts />
    </Box>
    <Box flex={1}>
      <ChatBoxWrapper />
    </Box>
  </Stack>
);

export default Messenger;
