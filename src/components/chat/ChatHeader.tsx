import { Avatar, Stack, Typography, Box } from "@mui/material";
import { useChatStore } from "../../store/chatStore";
import stringToSoftColor from "../../utils/stringToSoftColor";

const STATUS_COLORS: Record<string, string> = {
  online: '#4caf50',
  offline: '#9e9e9e',
  idle: '#ff9800'
};

export default () => {
  const { contact } = useChatStore();
  if (!contact) return null;

  const color = STATUS_COLORS[contact.status || ''] ?? STATUS_COLORS.offline;

  return (
    <Stack direction="row" gap={1} alignItems="center" p={1}>
      <Avatar src={contact.avatar} sx={{ bgcolor: stringToSoftColor(contact.uid) }}>
        {contact.name?.[0]?.toUpperCase()}
      </Avatar>
      <Stack direction="column" gap={0.25}>
        <Typography variant="body2">{contact.name}</Typography>
        <Stack direction="row" gap={0.5} alignItems="center">
          <Box sx={{ width: 8, height: 8, borderRadius: '50%', bgcolor: color }} />
          <Typography variant="caption" color="text.disabled">
            {contact.status}
          </Typography>
        </Stack>
      </Stack>
    </Stack>
  );
};
