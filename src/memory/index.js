export class MemorySystem {
  constructor() {
    this.shortTermMemory = [];
    this.longTermMemory = new Map();
    this.maxShortTermSize = 100;
  }

  async addToContext(command, context) {
    const entry = {
      command,
      context,
      timestamp: new Date().toISOString()
    };

    this.shortTermMemory.push(entry);

    // Maintain size limit
    if (this.shortTermMemory.length > this.maxShortTermSize) {
      this.shortTermMemory.shift();
    }

    return entry;
  }

  async store(key, value) {
    this.longTermMemory.set(key, {
      value,
      timestamp: new Date().toISOString()
    });
  }

  async retrieve(key) {
    return this.longTermMemory.get(key);
  }

  async getRecentContext(limit = 10) {
    return this.shortTermMemory.slice(-limit);
  }

  async search(query) {
    const results = [];
    
    for (const entry of this.shortTermMemory) {
      if (entry.command.toLowerCase().includes(query.toLowerCase())) {
        results.push(entry);
      }
    }

    return results;
  }

  async clear() {
    this.shortTermMemory = [];
    this.longTermMemory.clear();
  }

  getStats() {
    return {
      shortTermSize: this.shortTermMemory.length,
      longTermSize: this.longTermMemory.size,
      oldestEntry: this.shortTermMemory[0]?.timestamp,
      newestEntry: this.shortTermMemory[this.shortTermMemory.length - 1]?.timestamp
    };
  }
}
