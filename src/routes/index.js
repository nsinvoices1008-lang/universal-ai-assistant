export function setupRoutes(app, orchestrator) {
  
  // Main command endpoint
  app.post('/api/command', async (req, res) => {
    try {
      const { command, context } = req.body;
      
      if (!command) {
        return res.status(400).json({ error: 'Command is required' });
      }

      const result = await orchestrator.processCommand(command, context);
      res.json(result);
    } catch (error) {
      res.status(500).json({ error: error.message });
    }
  });

  // Get available models
  app.get('/api/models', async (req, res) => {
    try {
      const models = await orchestrator.aiRouter.listAvailableModels();
      res.json({ models });
    } catch (error) {
      res.status(500).json({ error: error.message });
    }
  });

  // Get memory stats
  app.get('/api/memory', async (req, res) => {
    try {
      const stats = orchestrator.memory.getStats();
      res.json(stats);
    } catch (error) {
      res.status(500).json({ error: error.message });
    }
  });

  // Get recent context
  app.get('/api/context', async (req, res) => {
    try {
      const limit = parseInt(req.query.limit) || 10;
      const context = await orchestrator.memory.getRecentContext(limit);
      res.json({ context });
    } catch (error) {
      res.status(500).json({ error: error.message });
    }
  });

  // List available agents
  app.get('/api/agents', (req, res) => {
    try {
      const agents = orchestrator.agentManager.listAgents();
      res.json({ agents });
    } catch (error) {
      res.status(500).json({ error: error.message });
    }
  });

  // Generate specific output format
  app.post('/api/generate/:format', async (req, res) => {
    try {
      const { format } = req.params;
      const { data } = req.body;

      const output = await orchestrator.outputGenerator.generate(format, data);
      res.json(output);
    } catch (error) {
      res.status(500).json({ error: error.message });
    }
  });
}
