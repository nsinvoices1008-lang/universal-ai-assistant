export class DataAgent {
  constructor() {
    this.name = 'DataAgent';
    this.capabilities = ['analyze', 'process', 'transform', 'aggregate'];
  }

  async execute(command, context) {
    console.log(`📊 ${this.name} executing: ${command}`);

    const operation = this.detectOperation(command);

    switch (operation) {
      case 'analyze':
        return await this.analyzeData(context.data);
      case 'transform':
        return await this.transformData(context.data);
      case 'aggregate':
        return await this.aggregateData(context.data);
      default:
        return await this.processData(context.data);
    }
  }

  detectOperation(command) {
    const lower = command.toLowerCase();
    if (lower.includes('analyze')) return 'analyze';
    if (lower.includes('transform')) return 'transform';
    if (lower.includes('aggregate') || lower.includes('sum')) return 'aggregate';
    return 'process';
  }

  async analyzeData(data) {
    if (!data) {
      return {
        success: false,
        message: 'No data provided for analysis'
      };
    }

    const analysis = {
      type: typeof data,
      length: Array.isArray(data) ? data.length : null,
      keys: typeof data === 'object' ? Object.keys(data) : null,
      summary: this.generateDataSummary(data)
    };

    return {
      success: true,
      type: 'data-analysis',
      analysis
    };
  }

  async transformData(data) {
    // Data transformation logic
    return {
      success: true,
      type: 'data-transform',
      transformed: data
    };
  }

  async aggregateData(data) {
    if (!Array.isArray(data)) {
      return {
        success: false,
        message: 'Data must be an array for aggregation'
      };
    }

    const aggregation = {
      count: data.length,
      sum: data.reduce((a, b) => a + (typeof b === 'number' ? b : 0), 0),
      average: 0
    };

    aggregation.average = aggregation.sum / aggregation.count;

    return {
      success: true,
      type: 'data-aggregation',
      aggregation
    };
  }

  async processData(data) {
    return {
      success: true,
      type: 'data-processing',
      processed: data
    };
  }

  generateDataSummary(data) {
    if (Array.isArray(data)) {
      return `Array with ${data.length} items`;
    } else if (typeof data === 'object') {
      return `Object with ${Object.keys(data).length} properties`;
    } else {
      return `${typeof data} value`;
    }
  }
}
