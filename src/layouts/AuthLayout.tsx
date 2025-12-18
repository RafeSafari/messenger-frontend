import { Box, Paper, Typography } from "@mui/material";

export default function AuthLayout({ title, children }: any) {
  return (
    <Box display="flex" height="100vh" alignItems="center" justifyContent="center">
      <Paper sx={{ p: 4, width: 400 }}>
        <Typography variant="h6" mb={2}>{title}</Typography>
        {children}
      </Paper>
    </Box>
  );
}
