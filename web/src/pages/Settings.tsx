import { useState, useEffect } from "react";
import {
  Container,
  Paper,
  Typography,
  Box,
  TextField,
  Button,
  Divider,
  Avatar,
  Alert,
  Switch,
  FormControlLabel,
  Grid,
  Card,
  CardContent,
  CircularProgress,
} from "@mui/material";
import {
  Save,
  Person,
  Notifications,
  Palette,
  Delete,
} from "@mui/icons-material";
import { useStore } from "../store/useStore";
import { useNavigate } from "react-router-dom";
import api from "../services/api";

interface UserStats {
  memberSince: string;
  totalAccess: number;
  studyDays: number;
}

export default function Settings() {
  const { user, setUser, logout } = useStore();
  const navigate = useNavigate();

  const [name, setName] = useState(user?.name || "");
  const [email, setEmail] = useState(user?.email || "");
  const [currentPassword, setCurrentPassword] = useState("");
  const [newPassword, setNewPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");

  const [notifications, setNotifications] = useState(true);
  const [darkMode, setDarkMode] = useState(() => {
    const saved = localStorage.getItem("darkMode");
    return saved !== null ? saved === "true" : true;
  });
  const [emailNotifications, setEmailNotifications] = useState(false);

  const [stats, setStats] = useState<UserStats | null>(null);
  const [loadingStats, setLoadingStats] = useState(true);
  const [success, setSuccess] = useState("");
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    fetchUserStats();
    requestNotificationPermission();
  }, []);

  const fetchUserStats = async () => {
    try {
      setLoadingStats(true);
      const [questionsRes] = await Promise.all([api.get("/questions")]);

      // Calcular dias únicos de estudo
      const questions = questionsRes.data.questions || [];
      const uniqueDates = new Set(
        questions.map((q: any) => new Date(q.date).toDateString())
      );

      setStats({
        memberSince: user?.createdAt || new Date().toISOString(),
        totalAccess: parseInt(localStorage.getItem("totalAccess") || "0"),
        studyDays: uniqueDates.size,
      });
    } catch (err) {
      console.error("Erro ao buscar estatísticas:", err);
    } finally {
      setLoadingStats(false);
    }
  };

  const requestNotificationPermission = async () => {
    if ("Notification" in window && Notification.permission === "default") {
      const permission = await Notification.requestPermission();
      if (permission === "granted") {
        new Notification("👋 Notificações ativadas!", {
          body: "Você receberá lembretes sobre suas metas de estudo.",
          icon: "/favicon.ico",
        });
      }
    }
  };

  const handleDarkModeToggle = (checked: boolean) => {
    setDarkMode(checked);
    localStorage.setItem("darkMode", checked.toString());
    // Recarregar a página para aplicar o tema
    window.location.reload();
  };

  const handleNotificationsToggle = async (checked: boolean) => {
    setNotifications(checked);

    if (checked && "Notification" in window) {
      const permission = await Notification.requestPermission();
      if (permission === "granted") {
        setSuccess("Notificações ativadas com sucesso!");
        // Testar notificação
        new Notification("🎓 Sistema de Estudos", {
          body: "Notificações ativadas! Você receberá lembretes.",
          icon: "/favicon.ico",
        });
      } else {
        setError(
          "Permissão de notificação negada. Verifique as configurações do navegador."
        );
        setNotifications(false);
      }
    }

    localStorage.setItem("notificationsEnabled", checked.toString());
  };

  const handleUpdateProfile = async () => {
    try {
      setLoading(true);
      setError("");
      setSuccess("");

      // Aqui você pode adicionar chamada para API de atualização
      // Por enquanto vamos apenas atualizar o estado local
      if (user) {
        setUser({ ...user, name, email });
        localStorage.setItem("user", JSON.stringify({ ...user, name, email }));
        setSuccess("Perfil atualizado com sucesso!");
      }
    } catch (err: any) {
      setError(err.response?.data?.message || "Erro ao atualizar perfil");
    } finally {
      setLoading(false);
    }
  };

  const handleChangePassword = async () => {
    try {
      setLoading(true);
      setError("");
      setSuccess("");

      if (newPassword !== confirmPassword) {
        setError("As senhas não coincidem");
        return;
      }

      if (newPassword.length < 6) {
        setError("A senha deve ter pelo menos 6 caracteres");
        return;
      }

      // Aqui você pode adicionar chamada para API de alteração de senha
      setSuccess("Senha alterada com sucesso!");
      setCurrentPassword("");
      setNewPassword("");
      setConfirmPassword("");
    } catch (err: any) {
      setError(err.response?.data?.message || "Erro ao alterar senha");
    } finally {
      setLoading(false);
    }
  };

  const handleDeleteAccount = async () => {
    const confirm = window.confirm(
      "Tem certeza que deseja excluir sua conta? Esta ação não pode ser desfeita!"
    );

    if (confirm) {
      try {
        setLoading(true);
        // Aqui você pode adicionar chamada para API de exclusão
        alert("Conta excluída com sucesso");
        logout();
        navigate("/login");
      } catch (err: any) {
        setError(err.response?.data?.message || "Erro ao excluir conta");
      } finally {
        setLoading(false);
      }
    }
  };

  const handleLogout = () => {
    logout();
    navigate("/login");
  };

  return (
    <Container maxWidth="lg" sx={{ mt: 4, mb: 4 }}>
      <Typography variant="h4" gutterBottom>
        ⚙️ Configurações
      </Typography>

      {success && (
        <Alert severity="success" sx={{ mb: 2 }} onClose={() => setSuccess("")}>
          {success}
        </Alert>
      )}

      {error && (
        <Alert severity="error" sx={{ mb: 2 }} onClose={() => setError("")}>
          {error}
        </Alert>
      )}

      <Grid container spacing={3}>
        {/* Perfil do Usuário */}
        <Grid item xs={12} md={6}>
          <Paper sx={{ p: 3 }}>
            <Box sx={{ display: "flex", alignItems: "center", mb: 3 }}>
              <Person sx={{ mr: 1 }} />
              <Typography variant="h6">Perfil do Usuário</Typography>
            </Box>

            <Box sx={{ textAlign: "center", mb: 3 }}>
              <Avatar
                sx={{
                  width: 100,
                  height: 100,
                  bgcolor: "primary.main",
                  fontSize: "2.5rem",
                  mx: "auto",
                }}
              >
                {user?.name?.charAt(0).toUpperCase()}
              </Avatar>
            </Box>

            <TextField
              fullWidth
              label="Nome"
              value={name}
              onChange={(e) => setName(e.target.value)}
              margin="normal"
            />

            <TextField
              fullWidth
              label="Email"
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              margin="normal"
            />

            <Button
              fullWidth
              variant="contained"
              startIcon={<Save />}
              onClick={handleUpdateProfile}
              disabled={loading}
              sx={{ mt: 2 }}
            >
              Salvar Alterações
            </Button>
          </Paper>
        </Grid>

        {/* Alterar Senha */}
        <Grid item xs={12} md={6}>
          <Paper sx={{ p: 3 }}>
            <Typography variant="h6" gutterBottom>
              🔒 Alterar Senha
            </Typography>
            <Divider sx={{ mb: 2 }} />

            <TextField
              fullWidth
              label="Senha Atual"
              type="password"
              value={currentPassword}
              onChange={(e) => setCurrentPassword(e.target.value)}
              margin="normal"
            />

            <TextField
              fullWidth
              label="Nova Senha"
              type="password"
              value={newPassword}
              onChange={(e) => setNewPassword(e.target.value)}
              margin="normal"
            />

            <TextField
              fullWidth
              label="Confirmar Nova Senha"
              type="password"
              value={confirmPassword}
              onChange={(e) => setConfirmPassword(e.target.value)}
              margin="normal"
            />

            <Button
              fullWidth
              variant="contained"
              onClick={handleChangePassword}
              disabled={loading}
              sx={{ mt: 2 }}
            >
              Alterar Senha
            </Button>
          </Paper>
        </Grid>

        {/* Preferências */}
        <Grid item xs={12} md={6}>
          <Paper sx={{ p: 3 }}>
            <Box sx={{ display: "flex", alignItems: "center", mb: 3 }}>
              <Notifications sx={{ mr: 1 }} />
              <Typography variant="h6">Notificações</Typography>
            </Box>

            <FormControlLabel
              control={
                <Switch
                  checked={notifications}
                  onChange={(e) => handleNotificationsToggle(e.target.checked)}
                />
              }
              label="Notificações do Sistema"
            />

            <FormControlLabel
              control={
                <Switch
                  checked={emailNotifications}
                  onChange={(e) => setEmailNotifications(e.target.checked)}
                />
              }
              label="Notificações por Email"
            />

            <Box sx={{ mt: 3 }}>
              <Box sx={{ display: "flex", alignItems: "center", mb: 2 }}>
                <Palette sx={{ mr: 1 }} />
                <Typography variant="h6">Aparência</Typography>
              </Box>

              <FormControlLabel
                control={
                  <Switch
                    checked={darkMode}
                    onChange={(e) => handleDarkModeToggle(e.target.checked)}
                  />
                }
                label={darkMode ? "Modo Escuro (Ativo)" : "Modo Claro (Ativo)"}
              />
            </Box>
          </Paper>
        </Grid>

        {/* Estatísticas */}
        <Grid item xs={12} md={6}>
          <Card>
            <CardContent>
              <Typography variant="h6" gutterBottom>
                📊 Suas Estatísticas
              </Typography>
              <Divider sx={{ mb: 2 }} />

              {loadingStats ? (
                <Box sx={{ display: "flex", justifyContent: "center", p: 3 }}>
                  <CircularProgress size={30} />
                </Box>
              ) : (
                <>
                  <Box sx={{ mb: 2 }}>
                    <Typography variant="body2" color="text.secondary">
                      Membro desde
                    </Typography>
                    <Typography variant="h6">
                      {stats?.memberSince
                        ? new Date(stats.memberSince).toLocaleDateString(
                            "pt-BR",
                            {
                              day: "2-digit",
                              month: "long",
                              year: "numeric",
                            }
                          )
                        : "N/A"}
                    </Typography>
                  </Box>

                  <Box sx={{ mb: 2 }}>
                    <Typography variant="body2" color="text.secondary">
                      Total de acessos
                    </Typography>
                    <Typography variant="h6" color="primary.main">
                      {stats?.totalAccess || 0} acessos
                    </Typography>
                  </Box>

                  <Box>
                    <Typography variant="body2" color="text.secondary">
                      Dias de estudo
                    </Typography>
                    <Typography variant="h6" color="success.main">
                      {stats?.studyDays || 0} dias
                    </Typography>
                  </Box>
                </>
              )}
            </CardContent>
          </Card>
        </Grid>

        {/* Ações */}
        <Grid item xs={12}>
          <Paper sx={{ p: 3 }}>
            <Typography variant="h6" gutterBottom>
              🚨 Zona de Perigo
            </Typography>
            <Divider sx={{ mb: 2 }} />

            <Box sx={{ display: "flex", gap: 2 }}>
              <Button variant="outlined" color="warning" onClick={handleLogout}>
                Sair da Conta
              </Button>

              <Button
                variant="outlined"
                color="error"
                startIcon={<Delete />}
                onClick={handleDeleteAccount}
              >
                Excluir Conta
              </Button>
            </Box>
          </Paper>
        </Grid>
      </Grid>
    </Container>
  );
}
