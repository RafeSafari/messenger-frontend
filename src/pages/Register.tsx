import { Button, TextField, Stack, Alert, Typography } from "@mui/material";
import AuthLayout from "../layouts/AuthLayout";
import { Link, Navigate, useNavigate } from "react-router-dom";
import { useState } from "react";
import axios from "axios";
import { postRegister } from "../library/chatApi";
import { toast } from "react-toastify";
import { useAuthStore } from "../store/authStore";

export default function Register() {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [passwordConfirm, setPasswordConfirm] = useState("");
  const [error, setError] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);

  const { login, user } = useAuthStore();
  const navigate = useNavigate();
  if (user) return <Navigate to="/chat" />;

  const handleRegister = async () => {
    if (!name) return setError("Name is required.");
    if (!email) return setError("Email is required.");
    if (!password) return setError("Password is required.");
    if (passwordConfirm !== password) return setError("Passwords does not match");

    setLoading(true);
    setError(null);

    try {
      const registerRes = await postRegister({ name, email, password });
      if (!registerRes.data?.user?.uid) {
        setError("Unable to register.");
        return;
      }
      login(registerRes.data?.user);
      toast.success("Successfully registered. Welcome to Chat App!");
      navigate("/chat");
    } catch (err) {
      let message = "Unable to register.";
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
    <AuthLayout title="Register">
      <Stack spacing={2}
        component="form"
        autoComplete="off">
        <TextField
          label="Your name"
          value={name}
          onChange={(event) => setName(event.target.value)}
          autoComplete="name"
          required
          onKeyDown={(event) => event.key === "Enter" && handleRegister()}
        />
        <TextField
          label="Your email"
          value={email}
          onChange={(event) => setEmail(event.target.value)}
          autoComplete="email"
          required
          onKeyDown={(event) => event.key === "Enter" && handleRegister()}
        />
        <TextField
          label="Password"
          type="password"
          value={password}
          onChange={(event) => setPassword(event.target.value)}
          autoComplete="new-password"
          required
          onKeyDown={(event) => event.key === "Enter" && handleRegister()}
        />
        <TextField
          label="Confirm Password"
          type="password"
          value={passwordConfirm}
          onChange={(event) => setPasswordConfirm(event.target.value)}
          autoComplete="new-password"
          required
          onKeyDown={(event) => event.key === "Enter" && handleRegister()}
        />
        {error && <Alert severity="error">{error}</Alert>}
        <Button
          variant="contained"
          disabled={loading}
          onClick={handleRegister}
        >
          {loading ? "Registering..." : "Register"}
        </Button>
        <Stack direction={"row"} justifyContent="center" alignItems="center" gap={1}>
          <Typography variant="caption">Already registered?</Typography>
          <Typography variant="caption" component={Link} to="/login">Login here</Typography>
        </Stack>
      </Stack>
    </AuthLayout>
  );
}
