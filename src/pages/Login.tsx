import { Button, TextField, Stack, Alert, Typography } from "@mui/material";
import AuthLayout from "../layouts/AuthLayout";
import { useAuthStore } from "../store/authStore";
import { Link, useNavigate } from "react-router-dom";
import { useState } from "react";
import axios from "axios";
import { login as loginApi } from "../library/chatApi";

export default function Login() {
  const login = useAuthStore((s) => s.login);
  const navigate = useNavigate();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);

  const handleLogin = async () => {
    if (!email || !password) {
      setError("Email and password are required.");
      return;
    }

    setLoading(true);
    setError(null);

    try {
      const loginRes = await loginApi({ email, password });
      if (loginRes.status !== 200) {
        setError("Unable to login.");
        return;
      }
      login(loginRes.data?.user?.email ?? email);
      navigate("/chat");
    } catch (err) {
      let message = "Unable to login.";
      if (axios.isAxiosError(err)) {
        const data = err.response?.data as { message?: string } | undefined;
        message = data?.message ?? err.message ?? message;
      } else if (err instanceof Error) {
        message = err.message;
      }
      setError(message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <AuthLayout title="Login">
      <Stack spacing={2}>
        <TextField
          label="Email"
          value={email}
          onChange={(event) => setEmail(event.target.value)}
          autoComplete="email"
        />
        <TextField
          label="Password"
          type="password"
          value={password}
          onChange={(event) => setPassword(event.target.value)}
          autoComplete="current-password"
        />
        {error && <Alert severity="error">{error}</Alert>}
        <Button variant="contained" disabled={loading} onClick={handleLogin}>
          {loading ? "Logging in..." : "Login"}
        </Button>
        <Stack direction={"row"} justifyContent="center" alignItems="center" gap={1}>
          <Typography variant="caption">Don't have an account?</Typography>
          <Typography variant="caption" component={Link} to="/register">Register here</Typography>
        </Stack>
      </Stack>
    </AuthLayout>
  );
}
