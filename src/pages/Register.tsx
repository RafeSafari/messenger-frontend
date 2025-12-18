import { Button, TextField, Stack, Alert } from "@mui/material";
import AuthLayout from "../layouts/AuthLayout";
import { useAuthStore } from "../store/authStore";
import { Link, useNavigate } from "react-router-dom";
import { useState } from "react";
import axios from "axios";
import { register } from "../library/chatApi";

export default function Register() {
  const navigate = useNavigate();
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [passwordConfirm, setPasswordConfirm] = useState("");
  const [error, setError] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);

  const handleRegister = async () => {
    if (!name) return setError("Name is required.");
    if (!email) return setError("Email is required.");
    if (!password) return setError("Password is required.");
    if (passwordConfirm !== password) return setError("Passwords does not match");

    setLoading(true);
    setError(null);

    try {
      const registerRes = await register({ name, email, password });
      console.log('registerRes', registerRes)
      if (!registerRes.data?.user?.uid) {
        setError("Unable to register.");
        return;
      }
      navigate("/login");
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
        />
        <TextField
          label="Your email"
          value={email}
          onChange={(event) => setEmail(event.target.value)}
          autoComplete="email"
          required
        />
        <TextField
          label="Password"
          type="password"
          value={password}
          onChange={(event) => setPassword(event.target.value)}
          autoComplete="new-password"
          required
        />
        <TextField
          label="Confirm Password"
          type="password"
          value={passwordConfirm}
          onChange={(event) => setPasswordConfirm(event.target.value)}
          autoComplete="new-password"
          required
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
          Already registered?
          <Link to="/login">Login here</Link>
        </Stack>
      </Stack>
    </AuthLayout>
  );
}
