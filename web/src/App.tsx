import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import { ThemeProvider, createTheme, CssBaseline } from "@mui/material";
import { useStore } from "./store/useStore";
import Layout from "./components/Layout";

// Páginas
import Home from "./pages/Home";
import Goals from "./pages/Goals";
import Questions from "./pages/Questions";
import Analytics from "./pages/Analytics";
import WeeklyPlanPage from "./pages/WeeklyPlan";
import Reports from "./pages/Reports";
import Settings from "./pages/Settings";
import Login from "./pages/Login";

const darkTheme = createTheme({
  palette: {
    mode: "dark",
    primary: {
      main: "#90caf9",
    },
    secondary: {
      main: "#f48fb1",
    },
    background: {
      default: "#0a1929",
      paper: "#132f4c",
    },
  },
});

function App() {
  const isAuthenticated = useStore((state) => state.isAuthenticated);

  return (
    <ThemeProvider theme={darkTheme}>
      <CssBaseline />
      <BrowserRouter>
        <Routes>
          {/* Rota pública */}
          <Route path="/login" element={<Login />} />

          {/* Rotas protegidas com Layout */}
          {isAuthenticated ? (
            <Route element={<Layout />}>
              <Route path="/" element={<Home />} />
              <Route path="/goals" element={<Goals />} />
              <Route path="/questions" element={<Questions />} />
              <Route path="/analytics" element={<Analytics />} />
              <Route path="/weekly-plan" element={<WeeklyPlanPage />} />
              <Route path="/reports" element={<Reports />} />
              <Route path="/settings" element={<Settings />} />
            </Route>
          ) : (
            <Route path="*" element={<Navigate to="/login" replace />} />
          )}
        </Routes>
      </BrowserRouter>
    </ThemeProvider>
  );
}

export default App;
