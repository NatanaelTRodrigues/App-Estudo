import { useState } from "react";
import { useNavigate } from "react-router-dom";
import {
  Container,
  Box,
  Paper,
  TextField,
  Button,
  Typography,
  Link,
  Alert,
} from "@mui/material";
import { useStore } from "../store/useStore";
import api from "../services/api";

export default function Login() {
  const navigate = useNavigate();
  const setUser = useStore((state) => state.setUser);
  const setToken = useStore((state) => state.setToken);

  const [isLogin, setIsLogin] = useState(true);
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [name, setName] = useState("");
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError("");
    setLoading(true);

    try {
      const endpoint = isLogin ? "/auth/login" : "/auth/register";
      const data = isLogin ? { email, password } : { email, password, name };

      const response = await api.post(endpoint, data);

      setUser(response.data.user);
      setToken(response.data.token);
      localStorage.setItem("token", response.data.token);

      navigate("/");
    } catch (err: any) {
      setError(err.response?.data?.message || "Erro ao fazer login");
    } finally {
      setLoading(false);
    }
  };

  return (
    <Container maxWidth="sm">
      <Box
        sx={{
          minHeight: "100vh",
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
        }}
      >
        <Paper elevation={3} sx={{ p: 4, width: "100%" }}>
          <Typography variant="h4" component="h1" gutterBottom align="center">
            📚 App de Estudos
          </Typography>

          <Typography
            variant="h6"
            gutterBottom
            align="center"
            color="text.secondary"
          >
            {isLogin ? "Entrar" : "Criar Conta"}
          </Typography>

          {error && (
            <Alert severity="error" sx={{ mb: 2 }}>
              {error}
            </Alert>
          )}

          <Box component="form" onSubmit={handleSubmit} sx={{ mt: 3 }}>
            {!isLogin && (
              <TextField
                fullWidth
                label="Nome"
                value={name}
                onChange={(e) => setName(e.target.value)}
                margin="normal"
                required
              />
            )}

            <TextField
              fullWidth
              label="Email"
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              margin="normal"
              required
            />

            <TextField
              fullWidth
              label="Senha"
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              margin="normal"
              required
            />

            <Button
              type="submit"
              fullWidth
              variant="contained"
              size="large"
              sx={{ mt: 3, mb: 2 }}
              disabled={loading}
            >
              {loading ? "Carregando..." : isLogin ? "Entrar" : "Cadastrar"}
            </Button>

            <Box sx={{ textAlign: "center" }}>
              <Link
                component="button"
                type="button"
                variant="body2"
                onClick={() => setIsLogin(!isLogin)}
              >
                {isLogin
                  ? "Não tem uma conta? Cadastre-se"
                  : "Já tem uma conta? Entre"}
              </Link>
            </Box>
          </Box>
        </Paper>
      </Box>
    </Container>
  );
}
