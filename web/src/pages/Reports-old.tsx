import { Container, Typography, Paper } from "@mui/material";

export default function Reports() {
  return (
    <Container maxWidth="lg" sx={{ mt: 4, mb: 4 }}>
      <Typography variant="h4" gutterBottom>
        📈 Relatórios Mensais
      </Typography>
      <Paper sx={{ p: 3 }}>
        <Typography>Página de relatórios em desenvolvimento...</Typography>
      </Paper>
    </Container>
  );
}
