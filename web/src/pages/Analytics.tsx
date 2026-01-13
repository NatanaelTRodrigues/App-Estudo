import { useEffect, useState } from "react";
import {
  Container,
  Grid,
  Paper,
  Typography,
  Box,
  CircularProgress,
  FormControl,
  InputLabel,
  Select,
  MenuItem,
} from "@mui/material";
import {
  LineChart,
  Line,
  BarChart,
  Bar,
  PieChart,
  Pie,
  Cell,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
  ResponsiveContainer,
} from "recharts";
import api from "../services/api";

interface SubjectStats {
  [key: string]: {
    total: number;
    correct: number;
    wrong: number;
    accuracy: number;
  };
}

export default function Analytics() {
  const [loading, setLoading] = useState(true);
  const [stats, setStats] = useState<any>(null);
  const [period, setPeriod] = useState<"week" | "month">("week");
  const [subjectData, setSubjectData] = useState<any[]>([]);

  useEffect(() => {
    fetchAnalytics();
  }, [period]);

  const fetchAnalytics = async () => {
    try {
      setLoading(true);
      const { data } = await api.get("/questions/stats");
      
      setStats(data.stats);

      // Transformar dados de matérias para o gráfico
      const subjects = Object.entries(data.stats.bySubject || {}).map(
        ([name, stats]: [string, any], index) => ({
          name,
          accuracy: stats.accuracy.toFixed(1),
          total: stats.total,
          color: COLORS[index % COLORS.length],
        })
      );

      setSubjectData(subjects);
    } catch (error) {
      console.error("Erro ao carregar analytics:", error);
    } finally {
      setLoading(false);
    }
  };

  const COLORS = ["#90caf9", "#4caf50", "#ff9800", "#9c27b0", "#f44336", "#00bcd4"];

  const getClassification = (accuracy: number) => {
    if (accuracy >= 90) return { label: "Ótimo", emoji: "🌟", color: "#4caf50" };
    if (accuracy >= 75) return { label: "Bom", emoji: "👍", color: "#2196f3" };
    if (accuracy >= 60) return { label: "Regular", emoji: "😐", color: "#ff9800" };
    return { label: "Ruim", emoji: "😔", color: "#f44336" };
  };

  if (loading) {
    return (
      <Container maxWidth="lg" sx={{ mt: 4, mb: 4, textAlign: "center" }}>
        <CircularProgress />
      </Container>
    );
  }

  const classification = stats
    ? getClassification(stats.averageAccuracy)
    : getClassification(0);

  return (
    <Container maxWidth="lg" sx={{ mt: 4, mb: 4 }}>
      <Box sx={{ display: "flex", justifyContent: "space-between", alignItems: "center", mb: 3 }}>
        <Typography variant="h4">📊 Analytics</Typography>
        
        <FormControl size="small" sx={{ minWidth: 120 }}>
          <InputLabel>Período</InputLabel>
          <Select
            value={period}
            label="Período"
            onChange={(e) => setPeriod(e.target.value as any)}
          >
            <MenuItem value="week">Esta Semana</MenuItem>
            <MenuItem value="month">Este Mês</MenuItem>
          </Select>
        </FormControl>
      </Box>

      <Grid container spacing={3}>
        {/* Classificação */}
        <Grid item xs={12} md={4}>
          <Paper sx={{ p: 3, textAlign: "center", height: "100%" }}>
            <Typography variant="h6" gutterBottom>
              🎯 Classificação Atual
            </Typography>
            <Box sx={{ my: 3 }}>
              <Typography variant="h1" sx={{ fontSize: "4rem" }}>
                {classification.emoji}
              </Typography>
              <Typography
                variant="h4"
                sx={{ mt: 1, color: classification.color }}
              >
                {classification.label}
              </Typography>
              <Typography variant="body2" color="text.secondary" sx={{ mt: 1 }}>
                Taxa de acerto: {stats?.averageAccuracy.toFixed(1)}%
              </Typography>
            </Box>
          </Paper>
        </Grid>

        {/* Estatísticas Gerais */}
        <Grid item xs={12} md={8}>
          <Paper sx={{ p: 3 }}>
            <Typography variant="h6" gutterBottom>
              📈 Estatísticas Gerais
            </Typography>
            <Grid container spacing={2} sx={{ mt: 1 }}>
              <Grid item xs={6} md={3}>
                <Box sx={{ textAlign: "center" }}>
                  <Typography variant="h3" color="primary">
                    {stats?.totalQuestions || 0}
                  </Typography>
                  <Typography variant="body2" color="text.secondary">
                    Total de Questões
                  </Typography>
                </Box>
              </Grid>
              
              <Grid item xs={6} md={3}>
                <Box sx={{ textAlign: "center" }}>
                  <Typography variant="h3" color="success.main">
                    {stats?.correctAnswers || 0}
                  </Typography>
                  <Typography variant="body2" color="text.secondary">
                    Acertos
                  </Typography>
                </Box>
              </Grid>

              <Grid item xs={6} md={3}>
                <Box sx={{ textAlign: "center" }}>
                  <Typography variant="h3" color="error.main">
                    {stats?.wrongAnswers || 0}
                  </Typography>
                  <Typography variant="body2" color="text.secondary">
                    Erros
                  </Typography>
                </Box>
              </Grid>

              <Grid item xs={6} md={3}>
                <Box sx={{ textAlign: "center" }}>
                  <Typography variant="h3" color="secondary.main">
                    {subjectData.length}
                  </Typography>
                  <Typography variant="body2" color="text.secondary">
                    Matérias
                  </Typography>
                </Box>
              </Grid>
            </Grid>
          </Paper>
        </Grid>

        {/* Desempenho por Matéria */}
        <Grid item xs={12} md={6}>
          <Paper sx={{ p: 3 }}>
            <Typography variant="h6" gutterBottom>
              📚 Desempenho por Matéria
            </Typography>
            {subjectData.length > 0 ? (
              <ResponsiveContainer width="100%" height={300}>
                <BarChart data={subjectData}>
                  <CartesianGrid strokeDasharray="3 3" stroke="#444" />
                  <XAxis dataKey="name" stroke="#999" />
                  <YAxis stroke="#999" />
                  <Tooltip
                    contentStyle={{
                      backgroundColor: "#1e1e1e",
                      border: "1px solid #444",
                    }}
                  />
                  <Legend />
                  <Bar dataKey="accuracy" fill="#90caf9" name="Acurácia (%)" />
                </BarChart>
              </ResponsiveContainer>
            ) : (
              <Box sx={{ textAlign: "center", py: 5 }}>
                <Typography color="text.secondary">
                  Nenhum dado disponível ainda
                </Typography>
              </Box>
            )}
          </Paper>
        </Grid>

        {/* Distribuição de Questões */}
        <Grid item xs={12} md={6}>
          <Paper sx={{ p: 3 }}>
            <Typography variant="h6" gutterBottom>
              📊 Distribuição de Questões
            </Typography>
            {subjectData.length > 0 ? (
              <ResponsiveContainer width="100%" height={300}>
                <PieChart>
                  <Pie
                    data={subjectData}
                    cx="50%"
                    cy="50%"
                    labelLine={false}
                    label={({ name, total }) => `${name}: ${total}`}
                    outerRadius={100}
                    fill="#8884d8"
                    dataKey="total"
                  >
                    {subjectData.map((entry, index) => (
                      <Cell key={`cell-${index}`} fill={entry.color} />
                    ))}
                  </Pie>
                  <Tooltip
                    contentStyle={{
                      backgroundColor: "#1e1e1e",
                      border: "1px solid #444",
                    }}
                  />
                </PieChart>
              </ResponsiveContainer>
            ) : (
              <Box sx={{ textAlign: "center", py: 5 }}>
                <Typography color="text.secondary">
                  Nenhum dado disponível ainda
                </Typography>
              </Box>
            )}
          </Paper>
        </Grid>

        {/* Detalhes por Matéria */}
        <Grid item xs={12}>
          <Paper sx={{ p: 3 }}>
            <Typography variant="h6" gutterBottom>
              📋 Detalhes por Matéria
            </Typography>
            <Grid container spacing={2} sx={{ mt: 1 }}>
              {subjectData.map((subject, index) => (
                <Grid item xs={12} sm={6} md={4} key={index}>
                  <Box
                    sx={{
                      p: 2,
                      border: "1px solid",
                      borderColor: "divider",
                      borderRadius: 2,
                      bgcolor: "background.default",
                    }}
                  >
                    <Typography variant="subtitle1" gutterBottom>
                      {subject.name}
                    </Typography>
                    <Typography variant="body2" color="text.secondary">
                      Total: {subject.total} questões
                    </Typography>
                    <Typography
                      variant="h5"
                      sx={{ mt: 1, color: subject.color }}
                    >
                      {subject.accuracy}% de acerto
                    </Typography>
                  </Box>
                </Grid>
              ))}
            </Grid>
          </Paper>
        </Grid>
      </Grid>
    </Container>
  );
}
