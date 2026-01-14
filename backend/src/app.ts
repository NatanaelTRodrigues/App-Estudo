import express, { Application } from "express";
import cors from "cors";
import helmet from "helmet";
import morgan from "morgan";
import dotenv from "dotenv";
import rateLimit from "express-rate-limit";
import { errorMiddleware } from "./middlewares/error.middleware";
import routes from "./routes";

dotenv.config();

const app: Application = express();
const PORT = process.env.PORT || 3000;

// Middlewares de segurança
app.use(helmet());
app.use(
  cors({
    origin: [
      "http://localhost:5173",
      "http://localhost:5174",
      "http://localhost:5175",
      "http://10.10.16.19:5173",
      /\.vercel\.app$/,  // Qualquer domínio Vercel
      /\.onrender\.com$/,  // Qualquer domínio Render
      "exp://localhost:8081",  // Expo local
    ],
    credentials: true,
  })
);

// Rate limiting
const limiter = rateLimit({
  windowMs: 15 * 60 * 1000, // 15 minutos
  max: 100, // limite de 100 requisições por IP
});
app.use(limiter);

// Middlewares gerais
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(morgan("dev"));

// Rotas
app.use("/api", routes);

// Health check endpoints (para Render e monitoramento)
app.get("/", (_req, res) => {
  res.status(200).json({ 
    status: "OK", 
    message: "App Estudos API", 
    version: "1.0.0",
    timestamp: new Date().toISOString() 
  });
});

app.get("/health", (_req, res) => {
  res.status(200).json({ status: "OK", timestamp: new Date().toISOString() });
});

app.get("/api/health", (_req, res) => {
  res.status(200).json({ status: "OK", timestamp: new Date().toISOString() });
});

// Middleware de erro (deve ser o último)
app.use(errorMiddleware);

// Iniciar servidor
app.listen(PORT, () => {
  console.log(`🚀 Servidor rodando na porta ${PORT}`);
  console.log(`📊 Ambiente: ${process.env.NODE_ENV}`);
});

export default app;
