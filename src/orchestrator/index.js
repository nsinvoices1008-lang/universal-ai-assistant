import { AIRouter } from '../ai/router.js';
import { AgentManager } from '../agents/manager.js';
import { OutputGenerator } from '../generators/index.js';
import { MemorySystem } from '../memory/index.js';

export class Orchestrator {
  constructor() {
    this.aiRouter = new AIRouter();
    this.agentManager = new AgentManager();
    this.outputGenerator = new OutputGenerator();
    this.memory = new MemorySystem();
  }

  async processCommand(command, context = {}) {
    try {
      console.log(`📥 Processing: ${command}`);

      // Store in memory
      await this.memory.addToContext(command, context);

      // Analyze intent
      const intent = await this.analyzeIntent(command);
      
      // Route to appropriate agents
      const agents = this.agentManager.selectAgents(intent);
      
      // Execute with agents
      const results = await this.executeWithAgents(command, agents, context);
      
      // Generate output if needed
      const output = await this.generateOutput(results, intent);
      
      // Summarize and return
      const summary = await this.summarize(output);
      
      return {
        success: true,
        intent,
        results: output,
        summary,
        timestamp: new Date().toISOString()
      };
    } catch (error) {
      console.error('❌ Orchestrator error:', error);
      return {
        success: false,
        error: error.message,
        timestamp: new Date().toISOString()
      };
    }
  }

  async analyzeIntent(command) {
    const response = await this.aiRouter.route({
      model: 'openai/gpt-4-turbo',
      messages: [{
        role: 'system',
        content: 'Analyze the user command and extract intent, required agents, and output format.'
      }, {
        role: 'user',
        content: command
      }]
    });

    return this.parseIntent(response);
  }

  parseIntent(response) {
    // Parse AI response to extract structured intent
    return {
      action: 'general',
      outputFormat: 'text',
      requiredAgents: [],
      parameters: {}
    };
  }

  async executeWithAgents(command, agents, context) {
    const results = [];
    
    for (const agent of agents) {
      const result = await agent.execute(command, context);
      results.push(result);
    }
    
    return results;
  }

  async generateOutput(results, intent) {
    if (intent.outputFormat === 'pdf') {
      return await this.outputGenerator.generatePDF(results);
    } else if (intent.outputFormat === 'apk') {
      return await this.outputGenerator.generateAPK(results);
    } else if (intent.outputFormat === 'exe') {
      return await this.outputGenerator.generateEXE(results);
    }
    
    return results;
  }

  async summarize(output) {
    const response = await this.aiRouter.route({
      model: 'openai/gpt-4-turbo',
      messages: [{
        role: 'system',
        content: 'Summarize the results concisely and clearly.'
      }, {
        role: 'user',
        content: JSON.stringify(output)
      }]
    });

    return response;
  }
}
