import { useState, useEffect } from "react";
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
  Divider,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Paper,
  IconButton,
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
} from "@mui/material";
import { Edit as EditIcon, Delete as DeleteIcon } from "@mui/icons-material";
import { api } from "../services/api";

interface Question {
  id: string;
  subject: string;
  totalQuestions: number;
  correctAnswers: number;
  wrongAnswers: number;
  hoursStudied: number;
  accuracy: number;
  date: string;
}

export default function Questions() {
  const [formData, setFormData] = useState({
    subject: "",
    customSubject: "",
    totalQuestions: "",
    correctAnswers: "",
    wrongAnswers: "",
    studyHours: "",
    studyMinutes: "",
  });
  const [questions, setQuestions] = useState<Question[]>([]);
  const [editingId, setEditingId] = useState<string | null>(null);
  const [deleteDialogOpen, setDeleteDialogOpen] = useState(false);
  const [questionToDelete, setQuestionToDelete] = useState<string | null>(null);
  const [success, setSuccess] = useState("");
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    fetchQuestions();
  }, []);

  const fetchQuestions = async () => {
    try {
      const { data } = await api.get("/questions");
      setQuestions(data.questions || []);
    } catch (err) {
      console.error("Erro ao buscar questões:", err);
    }
  };

  const formatHoursDisplay = (hours: number) => {
    const h = Math.floor(hours);
    const m = Math.round((hours - h) * 60);
    if (h === 0) return `${m}min`;
    if (m === 0) return `${h}h`;
    return `${h}h ${m}min`;
  };

  const handleEdit = (question: Question) => {
    const hours = Math.floor(question.hoursStudied);
    const minutes = Math.round((question.hoursStudied - hours) * 60);

    setFormData({
      subject: question.subject,
      customSubject: "",
      totalQuestions: question.totalQuestions.toString(),
      correctAnswers: question.correctAnswers.toString(),
      wrongAnswers: question.wrongAnswers.toString(),
      studyHours: hours.toString(),
      studyMinutes: minutes.toString(),
    });
    setEditingId(question.id);
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  const handleDeleteClick = (id: string) => {
    setQuestionToDelete(id);
    setDeleteDialogOpen(true);
  };

  const handleDeleteConfirm = async () => {
    if (!questionToDelete) return;

    try {
      await api.delete(`/questions/${questionToDelete}`);
      setSuccess("Questão deletada com sucesso! ✅");
      fetchQuestions();
      setDeleteDialogOpen(false);
      setQuestionToDelete(null);
    } catch (err: any) {
      setError(err.response?.data?.message || "Erro ao deletar questão");
    }
  };

  const handleCancelEdit = () => {
    setEditingId(null);
    setFormData({
      subject: "",
      customSubject: "",
      totalQuestions: "",
      correctAnswers: "",
      wrongAnswers: "",
      studyHours: "",
      studyMinutes: "",
    });
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError("");
    setSuccess("");
    setLoading(true);

    try {
      const total = parseInt(formData.totalQuestions);
      const correct = parseInt(formData.correctAnswers);
      const wrong = parseInt(formData.wrongAnswers);

      // Calcular total de horas em decimal (ex: 1h30min = 1.5)
      const studyHours = formData.studyHours
        ? parseInt(formData.studyHours)
        : 0;
      const studyMinutes = formData.studyMinutes
        ? parseInt(formData.studyMinutes)
        : 0;
      const hours = parseFloat((studyHours + studyMinutes / 60).toFixed(2));

      if (correct + wrong !== total) {
        setError(
          "A soma de acertos e erros deve ser igual ao total de questões"
        );
        return;
      }

      // Se selecionou "Outro", usar o nome customizado
      const subjectName =
        formData.subject === "Outro"
          ? formData.customSubject
          : formData.subject;

      if (!subjectName) {
        setError("Por favor, informe a matéria");
        return;
      }

      if (editingId) {
        // Atualizar questão existente
        await api.put(`/questions/${editingId}`, {
          subject: subjectName,
          totalQuestions: total,
          correctAnswers: correct,
          wrongAnswers: wrong,
          hoursStudied: hours,
        });
        setSuccess("Questão atualizada com sucesso! ✅");
        setEditingId(null);
      } else {
        // Criar nova questão
        await api.post("/questions", {
          subject: subjectName,
          totalQuestions: total,
          correctAnswers: correct,
          wrongAnswers: wrong,
          hoursStudied: hours,
        });
        setSuccess("Questões e horas adicionadas com sucesso! ✅");
      }

      fetchQuestions();
      setFormData({
        subject: "",
        customSubject: "",
        totalQuestions: "",
        correctAnswers: "",
        wrongAnswers: "",
        studyHours: "",
        studyMinutes: "",
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
    "Direito Constitucional",
    "Direito Administrativo",
    "Raciocínio Lógico",
    "Banco de Dados",
    "Desenvolvimento/Python",
    "Engenharia de Software",
    "Segurança da Informação",
    "Outro",
  ];

  return (
    <Container maxWidth="md" sx={{ mt: 4, mb: 4 }}>
      <Typography variant="h4" gutterBottom>
        📝 Adicionar Questões e Horas de Estudo
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
                    setFormData({
                      ...formData,
                      subject: e.target.value,
                      customSubject: "",
                    })
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

              {formData.subject === "Outro" && (
                <Grid item xs={12}>
                  <TextField
                    fullWidth
                    label="Nome da Matéria"
                    value={formData.customSubject}
                    onChange={(e) =>
                      setFormData({
                        ...formData,
                        customSubject: e.target.value,
                      })
                    }
                    required
                    placeholder="Ex: Redação, Literatura, etc."
                  />
                </Grid>
              )}

              <Grid item xs={12}>
                <Divider sx={{ my: 1 }}>
                  <Typography variant="body2" color="text.secondary">
                    Questões Resolvidas
                  </Typography>
                </Divider>
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

              <Grid item xs={12}>
                <Divider sx={{ my: 1 }}>
                  <Typography variant="body2" color="text.secondary">
                    Tempo de Estudo
                  </Typography>
                </Divider>
              </Grid>

              <Grid item xs={12} sm={6}>
                <TextField
                  fullWidth
                  type="number"
                  label="Horas"
                  value={formData.studyHours}
                  onChange={(e) =>
                    setFormData({ ...formData, studyHours: e.target.value })
                  }
                  inputProps={{ min: 0, max: 23 }}
                  helperText="Quantidade de horas (0-23)"
                />
              </Grid>

              <Grid item xs={12} sm={6}>
                <TextField
                  fullWidth
                  type="number"
                  label="Minutos"
                  value={formData.studyMinutes}
                  onChange={(e) =>
                    setFormData({ ...formData, studyMinutes: e.target.value })
                  }
                  inputProps={{ min: 0, max: 59, step: 1 }}
                  helperText="Quantidade de minutos (0-59)"
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
                  {loading
                    ? "Salvando..."
                    : editingId
                    ? "Atualizar Questões"
                    : "Adicionar Questões"}
                </Button>
              </Grid>

              {editingId && (
                <Grid item xs={12}>
                  <Button
                    variant="outlined"
                    fullWidth
                    onClick={handleCancelEdit}
                  >
                    Cancelar Edição
                  </Button>
                </Grid>
              )}
            </Grid>
          </Box>
        </CardContent>
      </Card>

      {/* Lista de Questões */}
      <Card sx={{ mt: 3 }}>
        <CardContent>
          <Typography variant="h5" gutterBottom>
            📝 Questões Registradas
          </Typography>

          {questions.length === 0 ? (
            <Alert severity="info" sx={{ mt: 2 }}>
              Nenhuma questão registrada ainda. Adicione uma acima!
            </Alert>
          ) : (
            <TableContainer component={Paper} sx={{ mt: 2 }}>
              <Table>
                <TableHead>
                  <TableRow>
                    <TableCell>
                      <strong>Matéria</strong>
                    </TableCell>
                    <TableCell align="center">
                      <strong>Total</strong>
                    </TableCell>
                    <TableCell align="center">
                      <strong>Acertos</strong>
                    </TableCell>
                    <TableCell align="center">
                      <strong>Erros</strong>
                    </TableCell>
                    <TableCell align="center">
                      <strong>Precisão</strong>
                    </TableCell>
                    <TableCell align="center">
                      <strong>Tempo</strong>
                    </TableCell>
                    <TableCell align="center">
                      <strong>Data</strong>
                    </TableCell>
                    <TableCell align="center">
                      <strong>Ações</strong>
                    </TableCell>
                  </TableRow>
                </TableHead>
                <TableBody>
                  {questions.map((question) => (
                    <TableRow key={question.id}>
                      <TableCell>{question.subject}</TableCell>
                      <TableCell align="center">
                        {question.totalQuestions}
                      </TableCell>
                      <TableCell align="center" sx={{ color: "success.main" }}>
                        {question.correctAnswers}
                      </TableCell>
                      <TableCell align="center" sx={{ color: "error.main" }}>
                        {question.wrongAnswers}
                      </TableCell>
                      <TableCell align="center">
                        {question.accuracy.toFixed(1)}%
                      </TableCell>
                      <TableCell align="center">
                        {formatHoursDisplay(question.hoursStudied)}
                      </TableCell>
                      <TableCell align="center">
                        {new Date(question.date).toLocaleDateString("pt-BR")}
                      </TableCell>
                      <TableCell align="center">
                        <IconButton
                          size="small"
                          color="primary"
                          onClick={() => handleEdit(question)}
                          title="Editar"
                        >
                          <EditIcon />
                        </IconButton>
                        <IconButton
                          size="small"
                          color="error"
                          onClick={() => handleDeleteClick(question.id)}
                          title="Deletar"
                        >
                          <DeleteIcon />
                        </IconButton>
                      </TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </TableContainer>
          )}
        </CardContent>
      </Card>

      {/* Dialog de confirmação de delete */}
      <Dialog
        open={deleteDialogOpen}
        onClose={() => setDeleteDialogOpen(false)}
      >
        <DialogTitle>Confirmar Exclusão</DialogTitle>
        <DialogContent>
          Tem certeza que deseja deletar esta questão? Esta ação não pode ser
          desfeita.
        </DialogContent>
        <DialogActions>
          <Button onClick={() => setDeleteDialogOpen(false)}>Cancelar</Button>
          <Button
            onClick={handleDeleteConfirm}
            color="error"
            variant="contained"
          >
            Deletar
          </Button>
        </DialogActions>
      </Dialog>
    </Container>
  );
}
