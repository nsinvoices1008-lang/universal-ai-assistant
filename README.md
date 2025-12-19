# Universal AI Assistant

A powerful AI orchestration system that integrates 200+ AI models and can generate any output format (APK, EXE, PDF, stock reports, etc.)

## 🌐 Live Website

Access the beautiful web interface at `http://localhost:3000` after starting the server!

## Features

- 🤖 Multi-AI Integration (OpenRouter, OpenAI, Anthropic, Google, etc.)
- 🎯 Intelligent Agent Orchestration
- 📱 APK Generation for Android Apps
- 💻 EXE Compilation for Desktop Apps
- 📄 PDF/Document Generation
- 📊 Stock Market & Financial Data Analysis
- 🧠 Memory & Context Management
- 🔄 Real-time Data Integration
- 🎨 Media Generation (Images, Audio, Video)
- 🌐 Beautiful Web Interface

## Quick Start

```bash
# Clone repository
git clone https://github.com/nsinvoices1008-lang/universal-ai-assistant.git
cd universal-ai-assistant

# Install dependencies
npm install

# Configure environment
cp .env.example .env
# Edit .env with your API keys

# Start server
npm run dev

# Open browser
# Visit http://localhost:3000
```

## 🎨 Web Interface

The website includes:
- **Command Center**: Execute any command with visual feedback
- **Quick Actions**: Pre-configured commands for common tasks
- **Real-time Results**: Beautiful display of execution results
- **System Dashboard**: Live monitoring of agents, models, and memory
- **Status Indicator**: Real-time system health monitoring

See [WEBSITE.md](WEBSITE.md) for detailed website documentation.

## Architecture

- **Orchestrator**: Main AI brain routing requests
- **Agent Network**: Specialized agents for different tasks
  - CodeAgent: APK/EXE/web app generation
  - FinanceAgent: Stock market and crypto data
  - DocumentAgent: PDF and report generation
  - DataAgent: Data analysis and transformation
- **Output Generators**: APK, EXE, PDF builders
- **Data Integrators**: Stock, crypto, weather APIs
- **Memory System**: Context and preference storage

## API Endpoints

### POST /api/command
Execute any command through the orchestrator.

### GET /api/models
List all available AI models.

### GET /api/agents
List all available agents.

### GET /api/memory
Get memory system statistics.

### GET /api/context
Retrieve recent context entries.

### POST /api/generate/:format
Generate specific output format (pdf, apk, exe, json, zip).

## API Keys Required

```env
OPENROUTER_API_KEY=your_key_here
OPENAI_API_KEY=your_key_here (optional)
ALPHA_VANTAGE_KEY=your_key_here (for stocks)
PORT=3000
NODE_ENV=development
```

## Usage Examples

### Via Web Interface
1. Open http://localhost:3000
2. Enter command in text area
3. Click "Execute Command"
4. View results in real-time

### Via API
```bash
curl -X POST http://localhost:3000/api/command \
  -H "Content-Type: application/json" \
  -d '{"command": "Analyze AAPL stock and create PDF report"}'
```

### Via Code
```javascript
const response = await fetch('http://localhost:3000/api/command', {
  method: 'POST',
  headers: { 'Content-Type': 'application/json' },
  body: JSON.stringify({ 
    command: 'Generate an Android app for expense tracking' 
  })
});
const result = await response.json();
```

## Deployment

### Docker
```bash
docker build -t universal-ai-assistant .
docker run -p 3000:3000 --env-file .env universal-ai-assistant
```

### Railway
1. Connect GitHub repository
2. Add environment variables
3. Deploy automatically
4. Access via Railway URL

## Documentation

- [Website Guide](WEBSITE.md) - Complete website documentation
- [Technical Docs](https://docs.google.com/document/d/1_mDNqAlQgUYGDTf_amWwIooFdhYQjMnIHZFL6kzcvWI/edit) - Full technical documentation

## Project Structure

```
universal-ai-assistant/
├── public/              # Website files
│   ├── index.html      # Main HTML
│   ├── styles.css      # Styling
│   └── app.js          # Frontend logic
├── src/
│   ├── index.js        # Server entry point
│   ├── orchestrator/   # Command orchestration
│   ├── ai/             # AI router
│   ├── agents/         # Specialized agents
│   ├── generators/     # Output generators
│   ├── memory/         # Memory system
│   └── routes/         # API routes
├── package.json
├── Dockerfile
└── README.md
```

## Contributing

Contributions welcome! Please feel free to submit a Pull Request.

## License

MIT License - See LICENSE file for details

---

**Built with ❤️ by NILESH SEEDS**

**Powered by OpenRouter, OpenAI, and open-source technologies**
