import express from "express";
import cors from "cors";
import dotenv from "dotenv";
import helmet from "helmet";
import rateLimit from "express-rate-limit";

// Load environment variables
dotenv.config();

// Inisialisasi Express
const app = express();

// Port (Railway akan otomatis menyediakan process.env.PORT)
const PORT = process.env.PORT || 8080;

// Middleware keamanan
app.use(helmet());

// Middleware CORS (ubah FRONTEND_URL sesuai domain frontend kamu)
app.use(
  cors({
    origin: process.env.FRONTEND_URL || "*", // sementara izinkan semua origin
    credentials: true,
  })
);

// Rate Limiting (membatasi request berlebihan)
const limiter = rateLimit({
  windowMs: 15 * 60 * 1000, // 15 menit
  max: 100, // maksimal 100 request per IP
  standardHeaders: true,
  legacyHeaders: false,
});
app.use(limiter);

// Middleware parsing JSON
app.use(express.json());

// ===== ROUTE UTAMA (untuk tes Railway) =====
app.get("/", (req, res) => {
  res.send("✅ Backend undangan-digital berj

    