import { useEffect, useState } from "react";
import {
  Container,
  Grid,
  Card,
  CardContent,
  Typography,
  LinearProgress,
  Box,
  Alert,
  CircularProgress,
  Button,
} from "@mui/material";
import { Add as AddIcon } from "@mui/icons-material";
import { useNavigate } from "react-router-dom";
import { useStore } from "../store/useStore";
import { api } from "../services/api";

export default function Home() {
  const { dashboardData, setDashboardData } = useStore();
  const [loading, setLoading] = useState(true);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchDashboard = async () => {
      try {
        setLoading(true);
        const { data } = await api.get("/goals/current");

        // Verifica se goal existe
        if (data.goal) {
          const hours = data.goal.currentHours;
          const h = Math.floor(hours);
          const m = Math.round((hours - h) * 60);
          const formattedHours = m > 0 ? `${h}h ${m}min` : `${h}h`;

          setDashboardData({
            weekProgress: {
              hours: data.goal.currentHours,
              questions: data.goal.currentQuestions,
              subjects: [],
            },
            nextSubject: undefined,
            alerts: [
              {
                id: "1",
                type: data.goal.progress >= 70 ? "success" : "warning",
                message: `Você está em ${data.goal.progress.toFixed(
                  1
                )}% da meta semanal - ${formattedHours}/${
                  data.goal.targetHours
                }h, ${data.goal.currentQuestions}/${
                  data.goal.targetQuestions
                } questões, ${data.goal.currentSubjects}/${
                  data.goal.targetSubjects
                } matérias`,
              },
            ],
            recentPerformance: [],
          });
        } else {
          // Sem meta ativa
          setDashboardData({
            weekProgress: {
              hours: 0,
              questions: 0,
              subjects: [],
            },
            nextSubject: undefined,
            alerts: [
              {
                id: "2",
                type: "info",
                message:
                  "Você ainda não tem uma meta semanal. Crie uma na página de Metas!",
              },
            ],
            recentPerformance: [],
          });
        }
      } catch (error: any) {
        console.error("Erro ao buscar dashboard:", error);
        setDashboardData({
          weekProgress: {
            hours: 0,
            questions: 0,
            subjects: [],
          },
          nextSubject: undefined,
          alerts: [
            {
              id: "3",
              type: "error",
              message: "Erro ao carregar dados. Tente novamente.",
            },
          ],
          recentPerformance: [],
        });
      } finally {
        setLoading(false);
      }
    };

    fetchDashboard();
  }, [setDashboardData]);

  if (loading) {
    return (
      <Container
        maxWidth="lg"
        sx={{
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
          minHeight: "50vh",
        }}
      >
        <CircularProgress />
      </Container>
    );
  }

  return (
    <Container maxWidth="lg">
      <Box
        sx={{
          mb: 4,
          display: "flex",
          justifyContent: "space-between",
          alignItems: "center",
        }}
      >
        <Typography variant="h4">Dashboard</Typography>
        <Button
          variant="contained"
          startIcon={<AddIcon />}
          onClick={() => navigate("/questions")}
        >
          Adicionar Questões
        </Button>
      </Box>

      {dashboardData?.alerts.map((alert, index) => (
        <Alert key={index} severity={alert.type as any} sx={{ mb: 3 }}>
          {alert.message}
        </Alert>
      ))}

      <Grid container spacing={3}>
        <Grid item xs={12} md={4}>
          <Card>
            <CardContent>
              <Typography color="text.secondary" gutterBottom>
                Horas de Estudo
              </Typography>
              <Typography variant="h5" component="div">
                {(() => {
                  const hours = dashboardData?.weekProgress.hours || 0;
                  const h = Math.floor(hours);
                  const m = Math.round((hours - h) * 60);
                  return m > 0 ? `${h}h ${m}min` : `${h}h`;
                })()}
              </Typography>
              <LinearProgress
                variant="determinate"
                value={Math.min(
                  100,
                  (dashboardData?.weekProgress.hours || 0) * 4
                )}
                sx={{ mt: 2 }}
              />
            </CardContent>
          </Card>
        </Grid>

        <Grid item xs={12} md={4}>
          <Card>
            <CardContent>
              <Typography color="text.secondary" gutterBottom>
                Questões Resolvidas
              </Typography>
              <Typography variant="h5" component="div">
                {dashboardData?.weekProgress.questions || 0} questões
              </Typography>
              <LinearProgress
                variant="determinate"
                value={Math.min(
                  100,
                  (dashboardData?.weekProgress.questions || 0) / 2
                )}
                sx={{ mt: 2 }}
              />
            </CardContent>
          </Card>
        </Grid>

        <Grid item xs={12} md={4}>
          <Card>
            <CardContent>
              <Typography color="text.secondary" gutterBottom>
                Matérias Estudadas
              </Typography>
              <Typography variant="h5" component="div">
                {dashboardData?.weekProgress.subjects?.length || 0} matérias
              </Typography>
              <LinearProgress
                variant="determinate"
                value={Math.min(
                  100,
                  (dashboardData?.weekProgress.subjects?.length || 0) * 12.5
                )}
                sx={{ mt: 2 }}
              />
            </CardContent>
          </Card>
        </Grid>
      </Grid>
    </Container>
  );
}
