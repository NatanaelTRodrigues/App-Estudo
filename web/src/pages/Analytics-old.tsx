import { Container, Grid, Paper, Typography, Box } from "@mui/material";
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

// Dados mockados
const weeklyData = [
  { week: "Sem 1", acertos: 45, erros: 15, horas: 18 },
  { week: "Sem 2", acertos: 52, erros: 13, horas: 20 },
  { week: "Sem 3", acertos: 58, erros: 12, horas: 22 },
  { week: "Sem 4", acertos: 65, erros: 10, horas: 19 },
];

const subjectData = [
  { name: "Português", value: 85, color: "#2196f3" },
  { name: "Matemática", value: 72, color: "#4caf50" },
  { name: "Dir. Const.", value: 68, color: "#ff9800" },
  { name: "Python", value: 90, color: "#9c27b0" },
];

export default function Analytics() {
  return (
    <Container maxWidth="lg" sx={{ mt: 4, mb: 4 }}>
      <Typography variant="h4" gutterBottom>
        📊 Análises e Gráficos
      </Typography>

      <Grid container spacing={3}>
        {/* Evolução Semanal */}
        <Grid item xs={12} md={8}>
          <Paper sx={{ p: 3 }}>
            <Typography variant="h6" gutterBottom>
              📈 Evolução de Acertos vs Erros
            </Typography>
            <ResponsiveContainer width="100%" height={300}>
              <LineChart data={weeklyData}>
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis dataKey="week" />
                <YAxis />
                <Tooltip />
                <Legend />
                <Line
                  type="monotone"
                  dataKey="acertos"
                  stroke="#4caf50"
                  strokeWidth={2}
                />
                <Line
                  type="monotone"
                  dataKey="erros"
                  stroke="#f44336"
                  strokeWidth={2}
                />
              </LineChart>
            </ResponsiveContainer>
          </Paper>
        </Grid>

        {/* Classificação */}
        <Grid item xs={12} md={4}>
          <Paper sx={{ p: 3, textAlign: "center" }}>
            <Typography variant="h6" gutterBottom>
              🎯 Classificação Atual
            </Typography>
            <Box sx={{ my: 3 }}>
              <Typography variant="h2">⭐</Typography>
              <Typography variant="h4" color="primary" sx={{ mt: 1 }}>
                Ótimo
              </Typography>
              <Typography variant="body2" color="text.secondary" sx={{ mt: 1 }}>
                Taxa de acerto: 86.7%
              </Typography>
            </Box>
          </Paper>
        </Grid>

        {/* Horas de Estudo */}
        <Grid item xs={12} md={6}>
          <Paper sx={{ p: 3 }}>
            <Typography variant="h6" gutterBottom>
              ⏰ Horas de Estudo por Semana
            </Typography>
            <ResponsiveContainer width="100%" height={300}>
              <BarChart data={weeklyData}>
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis dataKey="week" />
                <YAxis />
                <Tooltip />
                <Legend />
                <Bar dataKey="horas" fill="#1976d2" />
              </BarChart>
            </ResponsiveContainer>
          </Paper>
        </Grid>

        {/* Desempenho por Matéria */}
        <Grid item xs={12} md={6}>
          <Paper sx={{ p: 3 }}>
            <Typography variant="h6" gutterBottom>
              📚 Desempenho por Matéria
            </Typography>
            <ResponsiveContainer width="100%" height={300}>
              <PieChart>
                <Pie
                  data={subjectData}
                  cx="50%"
                  cy="50%"
                  labelLine={false}
                  label={({ name, value }) => `${name}: ${value}%`}
                  outerRadius={80}
                  fill="#8884d8"
                  dataKey="value"
                >
                  {subjectData.map((entry, index) => (
                    <Cell key={`cell-${index}`} fill={entry.color} />
                  ))}
                </Pie>
                <Tooltip />
              </PieChart>
            </ResponsiveContainer>
          </Paper>
        </Grid>

        {/* Estatísticas */}
        <Grid item xs={12}>
          <Paper sx={{ p: 3 }}>
            <Typography variant="h6" gutterBottom>
              📊 Estatísticas do Mês
            </Typography>
            <Grid container spacing={2}>
              <Grid item xs={6} md={3}>
                <Box sx={{ textAlign: "center", p: 2 }}>
                  <Typography variant="h4" color="primary">
                    79h
                  </Typography>
                  <Typography variant="body2" color="text.secondary">
                    Total de Horas
                  </Typography>
                </Box>
              </Grid>
              <Grid item xs={6} md={3}>
                <Box sx={{ textAlign: "center", p: 2 }}>
                  <Typography variant="h4" color="secondary">
                    220
                  </Typography>
                  <Typography variant="body2" color="text.secondary">
                    Questões Feitas
                  </Typography>
                </Box>
              </Grid>
              <Grid item xs={6} md={3}>
                <Box sx={{ textAlign: "center", p: 2 }}>
                  <Typography variant="h4" color="success.main">
                    86.7%
                  </Typography>
                  <Typography variant="body2" color="text.secondary">
                    Taxa de Acerto
                  </Typography>
                </Box>
              </Grid>
              <Grid item xs={6} md={3}>
                <Box sx={{ textAlign: "center", p: 2 }}>
                  <Typography variant="h4" color="warning.main">
                    12
                  </Typography>
                  <Typography variant="body2" color="text.secondary">
                    Matérias Estudadas
                  </Typography>
                </Box>
              </Grid>
            </Grid>
          </Paper>
        </Grid>
      </Grid>
    </Container>
  );
}
