import { useState } from "react";
import {
  Container,
  Card,
  CardContent,
  Typography,
  TextField,
  Button,
  Grid,
  Alert,
  Box,
  MenuItem,
} from "@mui/material";
import { api } from "../services/api";

export default function Questions() {
  const [formData, setFormData] = useState({
    subject: "",
    totalQuestions: "",
    correctAnswers: "",
    wrongAnswers: "",
  });
  const [success, setSuccess] = useState("");
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError("");
    setSuccess("");
    setLoading(true);

    try {
      const total = parseInt(formData.totalQuestions);
      const correct = parseInt(formData.correctAnswers);
      const wrong = parseInt(formData.wrongAnswers);

      if (correct + wrong !== total) {
        setError(
          "A soma de acertos e erros deve ser igual ao total de questões"
        );
        return;
      }

      await api.post("/questions", {
        subject: formData.subject,
        totalQuestions: total,
        correctAnswers: correct,
        wrongAnswers: wrong,
      });

      setSuccess("Questões adicionadas com sucesso! ✅");
      setFormData({
        subject: "",
        totalQuestions: "",
        correctAnswers: "",
        wrongAnswers: "",
      });
    } catch (err: any) {
      setError(err.response?.data?.message || "Erro ao adicionar questões");
    } finally {
      setLoading(false);
    }
  };

  const subjects = [
    "Matemática",
    "Português",
    "Física",
    "Química",
    "Biologia",
    "História",
    "Geografia",
    "Inglês",
    "Filosofia",
    "Sociologia",
    "Outro",
  ];

  return (
    <Container maxWidth="md" sx={{ mt: 4, mb: 4 }}>
      <Typography variant="h4" gutterBottom>
        📝 Adicionar Questões Diárias
      </Typography>

      <Card sx={{ mt: 3 }}>
        <CardContent>
          <Box component="form" onSubmit={handleSubmit}>
            <Grid container spacing={3}>
              <Grid item xs={12}>
                <TextField
                  select
                  fullWidth
                  label="Matéria"
                  value={formData.subject}
                  onChange={(e) =>
                    setFormData({ ...formData, subject: e.target.value })
                  }
                  required
                >
                  {subjects.map((subject) => (
                    <MenuItem key={subject} value={subject}>
                      {subject}
                    </MenuItem>
                  ))}
                </TextField>
              </Grid>

              <Grid item xs={12} sm={4}>
                <TextField
                  fullWidth
                  type="number"
                  label="Total de Questões"
                  value={formData.totalQuestions}
                  onChange={(e) =>
                    setFormData({ ...formData, totalQuestions: e.target.value })
                  }
                  required
                  inputProps={{ min: 1 }}
                />
              </Grid>

              <Grid item xs={12} sm={4}>
                <TextField
                  fullWidth
                  type="number"
                  label="Acertos"
                  value={formData.correctAnswers}
                  onChange={(e) =>
                    setFormData({ ...formData, correctAnswers: e.target.value })
                  }
                  required
                  inputProps={{ min: 0 }}
                />
              </Grid>

              <Grid item xs={12} sm={4}>
                <TextField
                  fullWidth
                  type="number"
                  label="Erros"
                  value={formData.wrongAnswers}
                  onChange={(e) =>
                    setFormData({ ...formData, wrongAnswers: e.target.value })
                  }
                  required
                  inputProps={{ min: 0 }}
                />
              </Grid>

              {formData.totalQuestions && formData.correctAnswers && (
                <Grid item xs={12}>
                  <Alert severity="info">
                    Precisão:{" "}
                    {(
                      (parseInt(formData.correctAnswers) /
                        parseInt(formData.totalQuestions)) *
                      100
                    ).toFixed(1)}
                    %
                  </Alert>
                </Grid>
              )}

              {success && (
                <Grid item xs={12}>
                  <Alert severity="success">{success}</Alert>
                </Grid>
              )}

              {error && (
                <Grid item xs={12}>
                  <Alert severity="error">{error}</Alert>
                </Grid>
              )}

              <Grid item xs={12}>
                <Button
                  type="submit"
                  variant="contained"
                  fullWidth
                  size="large"
                  disabled={loading}
                >
                  {loading ? "Salvando..." : "Adicionar Questões"}
                </Button>
              </Grid>
            </Grid>
          </Box>
        </CardContent>
      </Card>
    </Container>
  );
}
