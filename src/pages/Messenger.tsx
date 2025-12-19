import { Box } from "@mui/material";
import Contacts from "../components/ContactsPane";
import ChatBox from "../components/ChatBox";

export default () => (
  <Box display="flex" height="100vh">
    <Box width={250} borderRight="1px solid #ddd">
      <Contacts />
    </Box>
    <Box flex={1}>
      <ChatBox />
    </Box>
  </Box>
);
