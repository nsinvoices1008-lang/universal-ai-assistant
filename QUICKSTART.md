# 🚀 Quick Start Guide - Universal AI Assistant

Get your AI Assistant running in 5 minutes!

## Step 1: Clone Repository

```bash
git clone https://github.com/nsinvoices1008-lang/universal-ai-assistant.git
cd universal-ai-assistant
```

## Step 2: Install Dependencies

```bash
npm install
```

This installs all required packages including Express, AI libraries, and PDF generation tools.

## Step 3: Configure API Keys

```bash
# Copy example environment file
cp .env.example .env

# Edit .env file
nano .env  # or use your favorite editor
```

Add your API keys:
```env
OPENROUTER_API_KEY=sk-or-v1-xxxxx
OPENAI_API_KEY=sk-xxxxx (optional)
ALPHA_VANTAGE_KEY=xxxxx (for stock data)
PORT=3000
```

### Getting API Keys

**OpenRouter** (Required):
1. Visit https://openrouter.ai
2. Sign up for free account
3. Go to Keys section
4. Create new API key
5. Copy and paste into .env

**Alpha Vantage** (For stock features):
1. Visit https://www.alphavantage.co/support/#api-key
2. Get free API key
3. Copy and paste into .env

**OpenAI** (Optional fallback):
1. Visit https://platform.openai.com
2. Create API key
3. Copy and paste into .env

## Step 4: Start the Server

```bash
npm run dev
```

You should see:
```
🤖 Universal AI Assistant running on port 3000
📡 API: http://localhost:3000/api
🌐 Website: http://localhost:3000
🔥 Ready to process commands!
```

## Step 5: Open the Website

Open your browser and visit:
```
http://localhost:3000
```

You'll see the beautiful purple gradient interface!

## Step 6: Test It Out

### Option A: Use Quick Actions
Click any of the 4 quick action buttons:
- 📈 Stock Analysis
- 📱 Create APK
- 📄 Generate PDF
- 💻 Create EXE

### Option B: Enter Custom Command
Type in the command box:
```
Analyze AAPL stock and create a summary
```

Press **Ctrl+Enter** or click **Execute Command**

### Option C: Use the API
```bash
curl -X POST http://localhost:3000/api/command \
  -H "Content-Type: application/json" \
  -d '{"command": "Analyze TSLA stock"}'
```

## 🎯 Example Commands to Try

### Stock Analysis
```
Analyze AAPL stock
Get TSLA stock price
Compare AAPL and MSFT stocks
```

### App Generation
```
Generate an Android app for tracking expenses
Create a desktop calculator app
Build a todo list application
```

### Document Creation
```
Create a PDF report about AI trends
Generate a summary document
Make a business report
```

### Data Processing
```
Analyze this data: [10, 20, 30, 40, 50]
Calculate statistics for sales data
Process and summarize information
```

## 📊 Verify Everything Works

Check the System Dashboard on the website:
- ✅ Available Models: Should show "200+"
- ✅ Active Agents: Should show "4"
- ✅ Memory Usage: Should show numbers like "0/0"
- ✅ API Status: Should show "✓ Ready" in green

Check the Status Indicator:
- 🟢 Green dot = Everything working!
- 🟡 Yellow dot = Some issues
- 🔴 Red dot = Server offline

## 🐛 Troubleshooting

### Server won't start
```bash
# Check if port 3000 is in use
lsof -i :3000

# Kill process if needed
kill -9 <PID>

# Try different port
PORT=3001 npm run dev
```

### Website shows "Offline"
1. Make sure server is running
2. Check console for errors
3. Verify API keys in .env
4. Try refreshing the page

### Commands fail
1. Check API keys are valid
2. Verify internet connection
3. Look at browser console (F12)
4. Check server logs

### "Module not found" errors
```bash
# Reinstall dependencies
rm -rf node_modules package-lock.json
npm install
```

## 🎨 Customize Your Assistant

### Change Website Colors
Edit `public/styles.css`:
```css
:root {
  --primary: #667eea;  /* Change this */
  --secondary: #764ba2; /* And this */
}
```

### Add Custom Quick Actions
Edit `public/index.html`, find the Quick Actions section:
```html
<button class="action-card" onclick="quickCommand('Your command')">
  <span class="action-icon">🎯</span>
  <span class="action-title">Your Action</span>
</button>
```

### Modify API Endpoints
Edit `src/routes/index.js` to add new endpoints.

## 📚 Next Steps

1. **Read Documentation**
   - [WEBSITE.md](WEBSITE.md) - Website features
   - [SCREENSHOTS.md](SCREENSHOTS.md) - Visual guide
   - [Technical Docs](https://docs.google.com/document/d/1_mDNqAlQgUYGDTf_amWwIooFdhYQjMnIHZFL6kzcvWI/edit) - Full documentation

2. **Explore Agents**
   - Check `src/agents/` folder
   - Customize agent behavior
   - Add new agents

3. **Deploy to Production**
   - Use Railway for easy deployment
   - Or use Docker: `docker build -t ai-assistant .`
   - Configure environment variables

4. **Extend Functionality**
   - Add more AI models
   - Create custom agents
   - Build new output formats

## 🎉 You're Ready!

Your Universal AI Assistant is now running and ready to:
- ✅ Access 200+ AI models
- ✅ Generate Android APKs
- ✅ Create desktop applications
- ✅ Produce PDF documents
- ✅ Analyze stock market data
- ✅ Process and transform data
- ✅ Remember context and preferences

## 💡 Pro Tips

1. **Use Ctrl+Enter** for quick command execution
2. **Monitor the dashboard** to track system health
3. **Check results panel** for detailed output
4. **Save common commands** as Quick Actions
5. **Review logs** in terminal for debugging

## 🆘 Need Help?

- **GitHub Issues**: https://github.com/nsinvoices1008-lang/universal-ai-assistant/issues
- **Documentation**: See WEBSITE.md and SCREENSHOTS.md
- **API Reference**: Check README.md

---

**Happy Building! 🚀**

Built with ❤️ by NILESH SEEDS
