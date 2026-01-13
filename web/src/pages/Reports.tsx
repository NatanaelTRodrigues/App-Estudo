import { useState, useEffect } from "react";
import {
  Container,
  Grid,
  Paper,
  Typography,
  Box,
  Card,
  CardContent,
  LinearProgress,
  Chip,
  CircularProgress,
  FormControl,
  InputLabel,
  Select,
  MenuItem,
  Divider,
  Alert,
} from "@mui/material";
import { TrendingUp, TrendingDown, Assessment } from "@mui/icons-material";
import api from "../services/api";

interface MonthlyReport {
  month: number;
  year: number;
  totalHours: number;
  totalQuestions: number;
  totalSubjects: number;
  averageAccuracy: number;
  classification: string;
  goalsCompleted: number;
  goalsTotal: number;
}

export default function Reports() {
  const [loading, setLoading] = useState(true);
  const [selectedMonth, setSelectedMonth] = useState(new Date().getMonth() + 1);
  const [selectedYear, setSelectedYear] = useState(new Date().getFullYear());
  const [report, setReport] = useState<MonthlyReport | null>(null);
  const [goals, setGoals] = useState<any[]>([]);

  useEffect(() => {
    fetchReport();
  }, [selectedMonth, selectedYear]);

  const fetchReport = async () => {
    try {
      setLoading(true);
      
      // Buscar todas as metas do usuário
      const { data } = await api.get("/goals");
      const allGoals = data.goals || [];
      
      // Filtrar metas do mês selecionado
      const monthGoals = allGoals.filter((goal: any) => {
        const goalDate = new Date(goal.createdAt);
        return (
          goalDate.getMonth() + 1 === selectedMonth &&
          goalDate.getFullYear() === selectedYear
        );
      });

      setGoals(monthGoals);

      // Calcular estatísticas do mês
      const totalHours = monthGoals.reduce((sum: number, g: any) => sum + g.currentHours, 0);
      const totalQuestions = monthGoals.reduce((sum: number, g: any) => sum + g.currentQuestions, 0);
      const goalsCompleted = monthGoals.filter((g: any) => g.status === "COMPLETED").length;
      
      // Buscar estatísticas de questões
      const questionsResponse = await api.get("/questions/stats");
      const averageAccuracy = questionsResponse.data.stats.averageAccuracy || 0;
      
      const classification = getClassification(averageAccuracy);

      setReport({
        month: selectedMonth,
        year: selectedYear,
        totalHours,
        totalQuestions,
        totalSubjects: Object.keys(questionsResponse.data.stats.bySubject || {}).length,
        averageAccuracy,
        classification: classification.label,
        goalsCompleted,
        goalsTotal: monthGoals.length,
      });

    } catch (error) {
      console.error("Erro ao gerar relatório:", error);
    } finally {
      setLoading(false);
    }
  };

  const getClassification = (accuracy: number) => {
    if (accuracy >= 90) return { label: "Ótimo", color: "success", emoji: "🌟" };
    if (accuracy >= 75) return { label: "Bom", color: "info", emoji: "👍" };
    if (accuracy >= 60) return { label: "Regular", color: "warning", emoji: "😐" };
    return { label: "Ruim", color: "error", emoji: "😔" };
  };

  const months = [
    "Janeiro", "Fevereiro", "Março", "Abril", "Maio", "Junho",
    "Julho", "Agosto", "Setembro", "Outubro", "Novembro", "Dezembro"
  ];

  if (loading) {
    return (
      <Container maxWidth="lg" sx={{ mt: 4, mb: 4, textAlign: "center" }}>
        <CircularProgress />
      </Container>
    );
  }

  const classInfo = report ? getClassification(report.averageAccuracy) : getClassification(0);

  return (
    <Container maxWidth="lg" sx={{ mt: 4, mb: 4 }}>
      <Box sx={{ display: "flex", justifyContent: "space-between", alignItems: "center", mb: 3 }}>
        <Typography variant="h4">
          📑 Relatórios Mensais
        </Typography>

        <Box sx={{ display: "flex", gap: 2 }}>
          <FormControl size="small" sx={{ minWidth: 120 }}>
            <InputLabel>Mês</InputLabel>
            <Select
              value={selectedMonth}
              label="Mês"
              onChange={(e) => setSelectedMonth(Number(e.target.value))}
            >
              {months.map((month, index) => (
                <MenuItem key={index} value={index + 1}>
                  {month}
                </MenuItem>
              ))}
            </Select>
          </FormControl>

          <FormControl size="small" sx={{ minWidth: 100 }}>
            <InputLabel>Ano</InputLabel>
            <Select
              value={selectedYear}
              label="Ano"
              onChange={(e) => setSelectedYear(Number(e.target.value))}
            >
              {[2024, 2025, 2026].map((year) => (
                <MenuItem key={year} value={year}>
                  {year}
                </MenuItem>
              ))}
            </Select>
          </FormControl>
        </Box>
      </Box>

      {!report || report.totalQuestions === 0 ? (
        <Alert severity="info">
          Nenhum dado disponível para {months[selectedMonth - 1]} de {selectedYear}
        </Alert>
      ) : (
        <>
          {/* Cards de resumo */}
          <Grid container spacing={3} sx={{ mb: 3 }}>
            <Grid item xs={12} md={3}>
              <Card>
                <CardContent>
                  <Typography color="text.secondary" gutterBottom>
                    Total de Horas
                  </Typography>
                  <Typography variant="h3">{report.totalHours}h</Typography>
                </CardContent>
              </Card>
            </Grid>

            <Grid item xs={12} md={3}>
              <Card>
                <CardContent>
                  <Typography color="text.secondary" gutterBottom>
                    Questões Resolvidas
                  </Typography>
                  <Typography variant="h3">{report.totalQuestions}</Typography>
                </CardContent>
              </Card>
            </Grid>

            <Grid item xs={12} md={3}>
              <Card>
                <CardContent>
                  <Typography color="text.secondary" gutterBottom>
                    Taxa de Acerto
                  </Typography>
                  <Typography variant="h3" color={classInfo.color as any}>
                    {report.averageAccuracy.toFixed(1)}%
                  </Typography>
                </CardContent>
              </Card>
            </Grid>

            <Grid item xs={12} md={3}>
              <Card>
                <CardContent>
                  <Typography color="text.secondary" gutterBottom>
                    Matérias Estudadas
                  </Typography>
                  <Typography variant="h3">{report.totalSubjects}</Typography>
                </CardContent>
              </Card>
            </Grid>
          </Grid>

          {/* Classificação */}
          <Paper sx={{ p: 3, mb: 3, textAlign: "center" }}>
            <Typography variant="h6" gutterBottom>
              🏆 Classificação do Mês
            </Typography>
            <Box sx={{ my: 2 }}>
              <Typography variant="h1" sx={{ fontSize: "5rem" }}>
                {classInfo.emoji}
              </Typography>
              <Chip
                label={report.classification}
                color={classInfo.color as any}
                size="large"
                sx={{ mt: 2, fontSize: "1.2rem", py: 3, px: 2 }}
              />
            </Box>
            <Typography variant="body1" color="text.secondary">
              Com base na sua taxa de acerto de {report.averageAccuracy.toFixed(1)}%
            </Typography>
          </Paper>

          {/* Metas do mês */}
          <Paper sx={{ p: 3 }}>
            <Typography variant="h6" gutterBottom>
              🎯 Metas do Mês
            </Typography>
            <Divider sx={{ mb: 2 }} />

            <Box sx={{ mb: 3 }}>
              <Box sx={{ display: "flex", justifyContent: "space-between", mb: 1 }}>
                <Typography variant="body2">
                  Metas Concluídas: {report.goalsCompleted}/{report.goalsTotal}
                </Typography>
                <Typography variant="body2">
                  {((report.goalsCompleted / report.goalsTotal) * 100).toFixed(0)}%
                </Typography>
              </Box>
              <LinearProgress
                variant="determinate"
                value={(report.goalsCompleted / report.goalsTotal) * 100}
                sx={{ height: 10, borderRadius: 5 }}
                color={report.goalsCompleted === report.goalsTotal ? "success" : "primary"}
              />
            </Box>

            {goals.length > 0 && (
              <Grid container spacing={2}>
                {goals.map((goal, index) => (
                  <Grid item xs={12} sm={6} key={index}>
                    <Box
                      sx={{
                        p: 2,
                        border: "1px solid",
                        borderColor: "divider",
                        borderRadius: 2,
                        bgcolor: "background.default",
                      }}
                    >
                      <Box sx={{ display: "flex", justifyContent: "space-between", mb: 1 }}>
                        <Typography variant="subtitle2">
                          Semana {goal.weekNumber}
                        </Typography>
                        <Chip
                          label={
                            goal.status === "COMPLETED"
                              ? "Concluída"
                              : goal.status === "FAILED"
                              ? "Não atingida"
                              : "Em andamento"
                          }
                          size="small"
                          color={
                            goal.status === "COMPLETED"
                              ? "success"
                              : goal.status === "FAILED"
                              ? "error"
                              : "info"
                          }
                        />
                      </Box>
                      <Typography variant="body2" color="text.secondary">
                        Progresso: {goal.progress.toFixed(0)}%
                      </Typography>
                      <LinearProgress
                        variant="determinate"
                        value={goal.progress}
                        sx={{ mt: 1, height: 6, borderRadius: 3 }}
                      />
                    </Box>
                  </Grid>
                ))}
              </Grid>
            )}
          </Paper>
        </>
      )}
    </Container>
  );
}
