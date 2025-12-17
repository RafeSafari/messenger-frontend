import { Button, TextField, Stack } from "@mui/material";
import AuthLayout from "../layouts/AuthLayout";

export default () => (
  <AuthLayout title="Register">
    <Stack spacing={2}>
      <TextField label="Email" />
      <TextField label="Password" type="password" />
      <TextField label="Confirm Password" type="password" />
      <Button variant="contained">Register</Button>
    </Stack>
  </AuthLayout>
);
