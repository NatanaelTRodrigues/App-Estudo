import {
  Container,
  Grid,
  Paper,
  Typography,
  Box,
  Chip,
  Checkbox,
} from "@mui/material";
import { AccessTime, CheckCircle } from "@mui/icons-material";

const weekPlan = {
  "Segunda-feira": [
    { name: "Português", duration: "1h30", completed: true },
    { name: "Banco de Dados", duration: "1h30", completed: true },
  ],
  "Terça-feira": [
    { name: "Dir. Constitucional", duration: "1h30", completed: true },
    { name: "Desenvolvimento/Python", duration: "1h30", completed: false },
  ],
  "Quarta-feira": [
    { name: "Raciocínio Lógico", duration: "1h30", completed: false },
    { name: "Seg. da Informação", duration: "1h30", completed: false },
  ],
  "Quinta-feira": [
    { name: "Dir. Administrativo", duration: "1h30", completed: false },
    { name: "Eng. de Software / Scrum", duration: "1h30", completed: false },
  ],
  "Sexta-feira": [
    { name: "Revisão Geral (erros)", duration: "2h", completed: false },
    { name: "Redação", duration: "1h", completed: false },
  ],
  Sábado: [
    { name: "Simulado (Manhã)", duration: "4h", completed: false },
    { name: "Correção (Tarde)", duration: "3h", completed: false },
  ],
  Domingo: [
    { name: "Descanso", duration: "-", completed: false },
    { name: "Igreja", duration: "-", completed: false },
  ],
};

export default function WeeklyPlan() {
  return (
    <Container maxWidth="lg" sx={{ mt: 4, mb: 4 }}>
      <Typography variant="h4" gutterBottom>
        📅 Plano Semanal de Estudos
      </Typography>

      <Grid container spacing={2}>
        {Object.entries(weekPlan).map(([day, subjects]) => (
          <Grid item xs={12} md={6} lg={4} key={day}>
            <Paper
              sx={{
                p: 2,
                height: "100%",
                background:
                  day === "Domingo"
                    ? "linear-gradient(135deg, #667eea 0%, #764ba2 100%)"
                    : "white",
                color: day === "Domingo" ? "white" : "inherit",
              }}
            >
              <Typography variant="h6" gutterBottom>
                {day}
              </Typography>

              {subjects.map((subject, index) => (
                <Box
                  key={index}
                  sx={{
                    display: "flex",
                    alignItems: "center",
                    mb: 1.5,
                    p: 1,
                    borderRadius: 1,
                    backgroundColor:
                      day === "Domingo"
                        ? "rgba(255,255,255,0.1)"
                        : "rgba(0,0,0,0.02)",
                  }}
                >
                  <Checkbox
                    checked={subject.completed}
                    size="small"
                    sx={{
                      mr: 1,
                      color: day === "Domingo" ? "white" : undefined,
                    }}
                  />
                  <Box sx={{ flex: 1 }}>
                    <Typography
                      variant="body2"
                      sx={{
                        textDecoration: subject.completed
                          ? "line-through"
                          : "none",
                        fontWeight: 500,
                      }}
                    >
                      {subject.name}
                    </Typography>
                    <Box
                      sx={{ display: "flex", alignItems: "center", mt: 0.5 }}
                    >
                      <AccessTime sx={{ fontSize: 14, mr: 0.5 }} />
                      <Typography variant="caption">
                        {subject.duration}
                      </Typography>
                    </Box>
                  </Box>
                  {subject.completed && (
                    <CheckCircle color="success" fontSize="small" />
                  )}
                </Box>
              ))}
            </Paper>
          </Grid>
        ))}
      </Grid>

      {/* Resumo da Semana */}
      <Paper sx={{ p: 3, mt: 3 }}>
        <Typography variant="h6" gutterBottom>
          📊 Resumo Semanal
        </Typography>
        <Grid container spacing={2}>
          <Grid item xs={6} md={3}>
            <Box sx={{ textAlign: "center" }}>
              <Typography variant="h4" color="primary">
                21h
              </Typography>
              <Typography variant="body2" color="text.secondary">
                Horas Planejadas
              </Typography>
            </Box>
          </Grid>
          <Grid item xs={6} md={3}>
            <Box sx={{ textAlign: "center" }}>
              <Typography variant="h4" color="success.main">
                3/14
              </Typography>
              <Typography variant="body2" color="text.secondary">
                Atividades Concluídas
              </Typography>
            </Box>
          </Grid>
          <Grid item xs={6} md={3}>
            <Box sx={{ textAlign: "center" }}>
              <Typography variant="h4" color="secondary">
                12
              </Typography>
              <Typography variant="body2" color="text.secondary">
                Matérias Diferentes
              </Typography>
            </Box>
          </Grid>
          <Grid item xs={6} md={3}>
            <Box sx={{ textAlign: "center" }}>
              <Typography variant="h4" color="warning.main">
                21%
              </Typography>
              <Typography variant="body2" color="text.secondary">
                Progresso Semanal
              </Typography>
            </Box>
          </Grid>
        </Grid>
      </Paper>
    </Container>
  );
}
