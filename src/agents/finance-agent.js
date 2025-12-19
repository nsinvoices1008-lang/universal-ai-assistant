import axios from 'axios';

export class FinanceAgent {
  constructor() {
    this.name = 'FinanceAgent';
    this.capabilities = ['stocks', 'crypto', 'market-data', 'analysis'];
    this.alphaVantageKey = process.env.ALPHA_VANTAGE_KEY || 'demo';
  }

  async execute(command, context) {
    console.log(`💰 ${this.name} executing: ${command}`);

    const symbols = this.extractSymbols(command);
    const results = [];

    for (const symbol of symbols) {
      const data = await this.getStockData(symbol);
      results.push(data);
    }

    return {
      success: true,
      type: 'financial-data',
      data: results,
      summary: this.generateSummary(results)
    };
  }

  extractSymbols(command) {
    // Extract stock symbols from command
    const matches = command.match(/\b[A-Z]{1,5}\b/g) || [];
    return matches.length > 0 ? matches : ['AAPL']; // Default to AAPL
  }

  async getStockData(symbol) {
    try {
      const url = `https://www.alphavantage.co/query?function=GLOBAL_QUOTE&symbol=${symbol}&apikey=${this.alphaVantageKey}`;
      const response = await axios.get(url);
      
      const quote = response.data['Global Quote'];
      
      return {
        symbol,
        price: quote['05. price'],
        change: quote['09. change'],
        changePercent: quote['10. change percent'],
        volume: quote['06. volume'],
        timestamp: quote['07. latest trading day']
      };
    } catch (error) {
      console.error(`Error fetching ${symbol}:`, error.message);
      return {
        symbol,
        error: 'Failed to fetch data',
        message: error.message
      };
    }
  }

  generateSummary(results) {
    const summaries = results.map(r => {
      if (r.error) return `${r.symbol}: Error - ${r.error}`;
      return `${r.symbol}: $${r.price} (${r.changePercent})`;
    });

    return summaries.join(' | ');
  }

  async getCryptoData(symbol) {
    // Crypto data integration
    try {
      const url = `https://api.coingecko.com/api/v3/simple/price?ids=${symbol}&vs_currencies=usd&include_24hr_change=true`;
      const response = await axios.get(url);
      return response.data;
    } catch (error) {
      return { error: error.message };
    }
  }
}
