import { Container, Typography, Paper } from "@mui/material";

export default function Settings() {
  return (
    <Container maxWidth="lg" sx={{ mt: 4, mb: 4 }}>
      <Typography variant="h4" gutterBottom>
        ⚙️ Configurações
      </Typography>
      <Paper sx={{ p: 3 }}>
        <Typography>Página de configurações em desenvolvimento...</Typography>
      </Paper>
    </Container>
  );
}
