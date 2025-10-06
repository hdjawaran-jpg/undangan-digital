import express from 'express';
import cors from 'cors';
import dotenv from 'dotenv';
import helmet from 'helmet';
import rateLimit from 'express-rate-limit';

dotenv.config();

const app = express();
const PORT = process.env.PORT || 3001;

// Security middleware
app.use(helmet());
app.use(cors({
  origin: process.env.FRONTEND_URL || "https://your-vercel-app.vercel.app",
  credentials: true
}));

// Rate limiting
const limiter = rateLimit({
  windowMs: 15 * 60 * 1000, // 15 minutes
  max: 100 // limit each IP to 100 requests per windowMs
});
app.use(limiter);

// Body parser middleware
app.use(express.json({ limit: '10mb' }));
app.use(express.urlencoded({ extended: true }));

// Health check route
app.get('/api/health', (req, res) => {
  res.json({ 
    status: 'OK', 
    message: 'Undangan Digital API is running',
    timestamp: new Date().toISOString()
  });
});

// Demo routes - nanti bisa diganti dengan database real
app.post('/api/auth/login', (req, res) => {
  const { email, password } = req.body;
  
  // Demo authentication - in production, use real database
  if (email && password) {
    res.json({
      token: 'demo-jwt-token-' + Date.now(),
      user: {
        id: 1,
        name: email.split('@')[0],
        email: email,
        plan: 'free'
      }
    });
  } else {
    res.status(400).json({ message: 'Email and password required' });
  }
});

app.post('/api/auth/register', (req, res) => {
  const { name, email, password, phone } = req.body;
  
  if (name && email && password && phone) {
    res.status(201).json({
      token: 'demo-jwt-token-' + Date.now(),
      user: {
        id: Date.now(),
        name: name,
        email: email,
        phone: phone,
        plan: 'free'
      }
    });
  } else {
    res.status(400).json({ message: 'All fields are required' });
  }
});

// Invitations API
app.get('/api/invitations', (req, res) => {
  // Demo data - in production, fetch from database
  res.json({
    invitations: [
      {
        id: 1,
        title: 'Pernikahan Sarah & Rizki',
        template: 'classic',
        createdAt: '2024-01-15',
        views: 124,
        rsvp: 45,
        status: 'published'
      },
      {
        id: 2,
        title: 'Ulang Tahun Ke-30 Andi',
        template: 'modern', 
        createdAt: '2024-01-10',
        views: 89,
        rsvp: 23,
        status: 'draft'
      }
    ]
  });
});

// 404 handler
app.use('*', (req, res) => {
  res.status(404).json({ message: 'API route not found' });
});

// Error handler
app.use((err, req, res, next) => {
  console.error('Error:', err);
  res.status(500).json({ message: 'Internal server error' });
});

app.listen(PORT, () => {
  console.log(`🚀 Server running on port ${PORT}`);
  console.log(`📡 Health check: http://localhost:${PORT}/api/health`);
});