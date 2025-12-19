import express from 'express';
import cors from 'cors';
import dotenv from 'dotenv';
import { Orchestrator } from './orchestrator/index.js';
import { setupRoutes } from './routes/index.js';

dotenv.config();

const app = express();
const PORT = process.env.PORT || 3000;

// Middleware
app.use(cors());
app.use(express.json());

// Initialize Orchestrator
const orchestrator = new Orchestrator();

// Setup routes
setupRoutes(app, orchestrator);

// Health check
app.get('/health', (req, res) => {
  res.json({ status: 'healthy', timestamp: new Date().toISOString() });
});

// Start server
app.listen(PORT, () => {
  console.log(`🤖 Universal AI Assistant running on port ${PORT}`);
  console.log(`📡 API: http://localhost:${PORT}`);
  console.log(`🔥 Ready to process commands!`);
});

export default app;
