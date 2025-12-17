import { Box } from "@mui/material";

export default () => (
  <Box display="flex" height="100vh">
    <Box width={250} borderRight="1px solid #ddd">Contacts</Box>
    <Box flex={1}>Messages</Box>
  </Box>
);
