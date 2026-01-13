import { useState, useEffect } from "react";
import {
  Container,
  Typography,
  Paper,
  Grid,
  TextField,
  Button,
  Box,
  Card,
  CardContent,
  LinearProgress,
  Chip,
  Alert,
  CircularProgress,
} from "@mui/material";
import { Add, CheckCircle, Cancel, AccessTime } from "@mui/icons-material";
import api from "../services/api";

interface Goal {
  id: string;
  weekNumber: number;
  year: number;
  targetHours: number;
  targetSubjects: number;
  targetQuestions: number;
  currentHours: number;
  currentSubjects: number;
  currentQuestions: number;
  progress: number;
  status: string;
  createdAt: string;
}

export default function Goals() {
  const [goals, setGoals] = useState<Goal[]>([]);
  const [loading, setLoading] = useState(true);
  const [creating, setCreating] = useState(false);
  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");

  const [targetHours, setTargetHours] = useState(20);
  const [targetSubjects, setTargetSubjects] = useState(5);
  const [targetQuestions, setTargetQuestions] = useState(100);

  useEffect(() => {
    fetchGoals();
  }, []);

  const fetchGoals = async () => {
    try {
      setLoading(true);
      const { data } = await api.get("/goals");
      setGoals(data.goals || []);
    } catch (err: any) {
      setError("Erro ao carregar metas");
    } finally {
      setLoading(false);
    }
  };

  const handleCreateGoal = async () => {
    try {
      setCreating(true);
      setError("");
      setSuccess("");

      await api.post("/goals", {
        targetHours,
        targetSubjects,
        targetQuestions,
      });

      setSuccess("Meta criada com sucesso!");
      fetchGoals();

      // Reset form
      setTargetHours(20);
      setTargetSubjects(5);
      setTargetQuestions(100);
    } catch (err: any) {
      setError(err.response?.data?.message || "Erro ao criar meta");
    } finally {
      setCreating(false);
    }
  };

  const getStatusColor = (status: string) => {
    switch (status) {
      case "COMPLETED":
        return "success";
      case "FAILED":
        return "error";
      default:
        return "info";
    }
  };

  const getStatusLabel = (status: string) => {
    switch (status) {
      case "COMPLETED":
        return "Concluída";
      case "FAILED":
        return "Não atingida";
      default:
        return "Em andamento";
    }
  };

  if (loading) {
    return (
      <Container maxWidth="lg" sx={{ mt: 4, mb: 4, textAlign: "center" }}>
        <CircularProgress />
      </Container>
    );
  }

  return (
    <Container maxWidth="lg" sx={{ mt: 4, mb: 4 }}>
      <Typography variant="h4" gutterBottom>
        🎯 Metas Semanais
      </Typography>

      {error && (
        <Alert severity="error" sx={{ mb: 2 }} onClose={() => setError("")}>
          {error}
        </Alert>
      )}

      {success && (
        <Alert severity="success" sx={{ mb: 2 }} onClose={() => setSuccess("")}>
          {success}
        </Alert>
      )}

      {/* Formulário de nova meta */}
      <Paper sx={{ p: 3, mb: 3 }}>
        <Typography variant="h6" gutterBottom>
          <Add sx={{ verticalAlign: "middle", mr: 1 }} />
          Criar Nova Meta Semanal
        </Typography>

        <Grid container spacing={2} sx={{ mt: 1 }}>
          <Grid item xs={12} md={4}>
            <TextField
              fullWidth
              label="Horas de Estudo"
              type="number"
              value={targetHours}
              onChange={(e) => setTargetHours(Number(e.target.value))}
              InputProps={{ inputProps: { min: 1, max: 168 } }}
            />
          </Grid>

          <Grid item xs={12} md={4}>
            <TextField
              fullWidth
              label="Matérias Diferentes"
              type="number"
              value={targetSubjects}
              onChange={(e) => setTargetSubjects(Number(e.target.value))}
              InputProps={{ inputProps: { min: 1, max: 20 } }}
            />
          </Grid>

          <Grid item xs={12} md={4}>
            <TextField
              fullWidth
              label="Questões Resolvidas"
              type="number"
              value={targetQuestions}
              onChange={(e) => setTargetQuestions(Number(e.target.value))}
              InputProps={{ inputProps: { min: 1, max: 1000 } }}
            />
          </Grid>

          <Grid item xs={12}>
            <Button
              variant="contained"
              size="large"
              startIcon={creating ? <CircularProgress size={20} /> : <Add />}
              onClick={handleCreateGoal}
              disabled={creating}
              fullWidth
            >
              {creating ? "Criando..." : "Criar Meta"}
            </Button>
          </Grid>
        </Grid>
      </Paper>

      {/* Lista de metas */}
      <Typography variant="h6" gutterBottom sx={{ mt: 4 }}>
        📋 Histórico de Metas
      </Typography>

      {goals.length === 0 ? (
        <Paper sx={{ p: 3, textAlign: "center" }}>
          <Typography color="text.secondary">
            Nenhuma meta criada ainda. Crie sua primeira meta acima!
          </Typography>
        </Paper>
      ) : (
        <Grid container spacing={2}>
          {goals.map((goal) => (
            <Grid item xs={12} md={6} key={goal.id}>
              <Card>
                <CardContent>
                  <Box
                    sx={{
                      display: "flex",
                      justifyContent: "space-between",
                      mb: 2,
                    }}
                  >
                    <Typography variant="h6">
                      Semana {goal.weekNumber}/{goal.year}
                    </Typography>
                    <Chip
                      label={getStatusLabel(goal.status)}
                      color={getStatusColor(goal.status)}
                      size="small"
                      icon={
                        goal.status === "COMPLETED" ? (
                          <CheckCircle />
                        ) : goal.status === "FAILED" ? (
                          <Cancel />
                        ) : (
                          <AccessTime />
                        )
                      }
                    />
                  </Box>

                  {/* Progresso Horas */}
                  <Box sx={{ mb: 2 }}>
                    <Box
                      sx={{
                        display: "flex",
                        justifyContent: "space-between",
                        mb: 0.5,
                      }}
                    >
                      <Typography variant="body2" color="text.secondary">
                        ⏰ Horas de Estudo
                      </Typography>
                      <Typography variant="body2">
                        {goal.currentHours}h / {goal.targetHours}h
                      </Typography>
                    </Box>
                    <LinearProgress
                      variant="determinate"
                      value={(goal.currentHours / goal.targetHours) * 100}
                      sx={{ height: 8, borderRadius: 4 }}
                    />
                  </Box>

                  {/* Progresso Questões */}
                  <Box sx={{ mb: 2 }}>
                    <Box
                      sx={{
                        display: "flex",
                        justifyContent: "space-between",
                        mb: 0.5,
                      }}
                    >
                      <Typography variant="body2" color="text.secondary">
                        📝 Questões Resolvidas
                      </Typography>
                      <Typography variant="body2">
                        {goal.currentQuestions} / {goal.targetQuestions}
                      </Typography>
                    </Box>
                    <LinearProgress
                      variant="determinate"
                      value={
                        (goal.currentQuestions / goal.targetQuestions) * 100
                      }
                      sx={{ height: 8, borderRadius: 4 }}
                      color="secondary"
                    />
                  </Box>

                  {/* Progresso Matérias */}
                  <Box sx={{ mb: 2 }}>
                    <Box
                      sx={{
                        display: "flex",
                        justifyContent: "space-between",
                        mb: 0.5,
                      }}
                    >
                      <Typography variant="body2" color="text.secondary">
                        📚 Matérias Estudadas
                      </Typography>
                      <Typography variant="body2">
                        {goal.currentSubjects} / {goal.targetSubjects}
                      </Typography>
                    </Box>
                    <LinearProgress
                      variant="determinate"
                      value={(goal.currentSubjects / goal.targetSubjects) * 100}
                      sx={{ height: 8, borderRadius: 4 }}
                      color="warning"
                    />
                  </Box>

                  {/* Progresso Total */}
                  <Box
                    sx={{
                      mt: 2,
                      p: 2,
                      bgcolor: "rgba(144, 202, 249, 0.1)",
                      borderRadius: 2,
                      textAlign: "center",
                    }}
                  >
                    <Typography variant="h4" color="primary">
                      {goal.progress.toFixed(1)}%
                    </Typography>
                    <Typography variant="body2" color="text.secondary">
                      Progresso Total
                    </Typography>
                  </Box>
                </CardContent>
              </Card>
            </Grid>
          ))}
        </Grid>
      )}
    </Container>
  );
}
