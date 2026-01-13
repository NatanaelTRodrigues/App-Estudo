import { useState, useEffect } from "react";
import {
  Container,
  Grid,
  Paper,
  Typography,
  Box,
  Button,
  TextField,
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  Checkbox,
  IconButton,
  Chip,
  CircularProgress,
  Alert,
} from "@mui/material";
import { Add, Delete, Edit, CheckCircle } from "@mui/icons-material";
import api from "../services/api";

interface Task {
  id?: string;
  name: string;
  duration: string;
  completed: boolean;
}

interface WeekPlan {
  [key: string]: Task[];
}

const DAYS_OF_WEEK = [
  "Segunda-feira",
  "Terça-feira",
  "Quarta-feira",
  "Quinta-feira",
  "Sexta-feira",
  "Sábado",
  "Domingo",
];

const DEFAULT_PLAN: WeekPlan = {
  "Segunda-feira": [],
  "Terça-feira": [],
  "Quarta-feira": [],
  "Quinta-feira": [],
  "Sexta-feira": [],
  "Sábado": [],
  "Domingo": [],
};

export default function WeeklyPlan() {
  const [weekPlan, setWeekPlan] = useState<WeekPlan>(DEFAULT_PLAN);
  const [loading, setLoading] = useState(true);
  const [dialogOpen, setDialogOpen] = useState(false);
  const [selectedDay, setSelectedDay] = useState("");
  const [taskName, setTaskName] = useState("");
  const [taskDuration, setTaskDuration] = useState("");
  const [success, setSuccess] = useState("");

  useEffect(() => {
    fetchWeeklyPlan();
  }, []);

  const fetchWeeklyPlan = async () => {
    try {
      setLoading(true);
      // Como o backend ainda não tem endpoint de weekly plan, vamos usar localStorage
      const savedPlan = localStorage.getItem("weeklyPlan");
      if (savedPlan) {
        setWeekPlan(JSON.parse(savedPlan));
      }
    } catch (error) {
      console.error("Erro ao carregar plano:", error);
    } finally {
      setLoading(false);
    }
  };

  const savePlan = (newPlan: WeekPlan) => {
    localStorage.setItem("weeklyPlan", JSON.stringify(newPlan));
    setWeekPlan(newPlan);
  };

  const handleAddTask = () => {
    if (!taskName || !selectedDay) return;

    const newTask: Task = {
      id: Date.now().toString(),
      name: taskName,
      duration: taskDuration || "1h",
      completed: false,
    };

    const updatedPlan = {
      ...weekPlan,
      [selectedDay]: [...(weekPlan[selectedDay] || []), newTask],
    };

    savePlan(updatedPlan);
    setSuccess("Tarefa adicionada com sucesso!");
    handleCloseDialog();
  };

  const handleToggleTask = (day: string, taskIndex: number) => {
    const updatedPlan = { ...weekPlan };
    updatedPlan[day][taskIndex].completed = !updatedPlan[day][taskIndex].completed;
    savePlan(updatedPlan);
  };

  const handleDeleteTask = (day: string, taskIndex: number) => {
    const updatedPlan = { ...weekPlan };
    updatedPlan[day].splice(taskIndex, 1);
    savePlan(updatedPlan);
  };

  const handleOpenDialog = (day: string) => {
    setSelectedDay(day);
    setDialogOpen(true);
  };

  const handleCloseDialog = () => {
    setDialogOpen(false);
    setTaskName("");
    setTaskDuration("");
    setSelectedDay("");
  };

  const getCompletionPercentage = (tasks: Task[]) => {
    if (tasks.length === 0) return 0;
    const completed = tasks.filter((t) => t.completed).length;
    return (completed / tasks.length) * 100;
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
        📅 Plano Semanal de Estudos
      </Typography>

      {success && (
        <Alert severity="success" sx={{ mb: 2 }} onClose={() => setSuccess("")}>
          {success}
        </Alert>
      )}

      <Grid container spacing={2}>
        {DAYS_OF_WEEK.map((day) => {
          const tasks = weekPlan[day] || [];
          const completion = getCompletionPercentage(tasks);
          const isWeekend = day === "Sábado" || day === "Domingo";

          return (
            <Grid item xs={12} md={6} lg={4} key={day}>
              <Paper
                sx={{
                  p: 2,
                  height: "100%",
                  background: isWeekend
                    ? "linear-gradient(135deg, #667eea 0%, #764ba2 100%)"
                    : "inherit",
                  color: isWeekend ? "white" : "inherit",
                }}
              >
                {/* Header do dia */}
                <Box
                  sx={{
                    display: "flex",
                    justifyContent: "space-between",
                    alignItems: "center",
                    mb: 2,
                  }}
                >
                  <Typography variant="h6">{day}</Typography>
                  <IconButton
                    size="small"
                    onClick={() => handleOpenDialog(day)}
                    sx={{ color: isWeekend ? "white" : "primary.main" }}
                  >
                    <Add />
                  </IconButton>
                </Box>

                {/* Progresso do dia */}
                {tasks.length > 0 && (
                  <Box sx={{ mb: 2 }}>
                    <Box sx={{ display: "flex", justifyContent: "space-between", mb: 0.5 }}>
                      <Typography variant="caption">
                        {tasks.filter((t) => t.completed).length}/{tasks.length} completas
                      </Typography>
                      <Typography variant="caption">{completion.toFixed(0)}%</Typography>
                    </Box>
                    <Box
                      sx={{
                        width: "100%",
                        height: 4,
                        bgcolor: isWeekend ? "rgba(255,255,255,0.3)" : "rgba(0,0,0,0.1)",
                        borderRadius: 2,
                        overflow: "hidden",
                      }}
                    >
                      <Box
                        sx={{
                          width: `${completion}%`,
                          height: "100%",
                          bgcolor: isWeekend ? "white" : "primary.main",
                          transition: "width 0.3s",
                        }}
                      />
                    </Box>
                  </Box>
                )}

                {/* Lista de tarefas */}
                {tasks.length === 0 ? (
                  <Box
                    sx={{
                      textAlign: "center",
                      py: 4,
                      opacity: 0.6,
                    }}
                  >
                    <Typography variant="body2">
                      Nenhuma tarefa agendada
                    </Typography>
                  </Box>
                ) : (
                  tasks.map((task, index) => (
                    <Box
                      key={task.id || index}
                      sx={{
                        display: "flex",
                        alignItems: "center",
                        mb: 1.5,
                        p: 1,
                        borderRadius: 1,
                        backgroundColor: isWeekend
                          ? "rgba(255,255,255,0.1)"
                          : "rgba(0,0,0,0.02)",
                        "&:hover": {
                          backgroundColor: isWeekend
                            ? "rgba(255,255,255,0.15)"
                            : "rgba(0,0,0,0.05)",
                        },
                      }}
                    >
                      <Checkbox
                        checked={task.completed}
                        onChange={() => handleToggleTask(day, index)}
                        size="small"
                        sx={{
                          mr: 1,
                          color: isWeekend ? "white" : undefined,
                        }}
                      />
                      <Box sx={{ flex: 1 }}>
                        <Typography
                          variant="body2"
                          sx={{
                            textDecoration: task.completed
                              ? "line-through"
                              : "none",
                            fontWeight: 500,
                          }}
                        >
                          {task.name}
                        </Typography>
                        <Typography variant="caption" sx={{ opacity: 0.7 }}>
                          {task.duration}
                        </Typography>
                      </Box>
                      <IconButton
                        size="small"
                        onClick={() => handleDeleteTask(day, index)}
                        sx={{ color: isWeekend ? "white" : "error.main" }}
                      >
                        <Delete fontSize="small" />
                      </IconButton>
                    </Box>
                  ))
                )}
              </Paper>
            </Grid>
          );
        })}
      </Grid>

      {/* Dialog para adicionar tarefa */}
      <Dialog open={dialogOpen} onClose={handleCloseDialog} maxWidth="sm" fullWidth>
        <DialogTitle>Adicionar Tarefa - {selectedDay}</DialogTitle>
        <DialogContent>
          <TextField
            fullWidth
            label="Nome da Tarefa"
            value={taskName}
            onChange={(e) => setTaskName(e.target.value)}
            margin="normal"
            autoFocus
            placeholder="Ex: Estudar Português"
          />
          <TextField
            fullWidth
            label="Duração"
            value={taskDuration}
            onChange={(e) => setTaskDuration(e.target.value)}
            margin="normal"
            placeholder="Ex: 2h, 1h30"
          />
        </DialogContent>
        <DialogActions>
          <Button onClick={handleCloseDialog}>Cancelar</Button>
          <Button
            onClick={handleAddTask}
            variant="contained"
            disabled={!taskName}
          >
            Adicionar
          </Button>
        </DialogActions>
      </Dialog>
    </Container>
  );
}
