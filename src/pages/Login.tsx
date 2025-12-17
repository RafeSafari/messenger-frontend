import { Button, TextField, Stack } from "@mui/material";
import AuthLayout from "../layouts/AuthLayout";
import { useAuthStore } from "../store/authStore";
import { useNavigate } from "react-router-dom";

export default function Login() {
  const login = useAuthStore((s) => s.login);
  const navigate = useNavigate();

  return (
    <AuthLayout title="Login">
      <Stack spacing={2}>
        <TextField label="Email" />
        <TextField label="Password" type="password" />
        <Button
          variant="contained"
          onClick={() => {
            login("test@mail.com");
            navigate("/chat");
          }}
        >
          Login
        </Button>
      </Stack>
    </AuthLayout>
  );
}
