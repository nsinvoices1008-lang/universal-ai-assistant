import { CodeAgent } from './code-agent.js';
import { DataAgent } from './data-agent.js';
import { DocumentAgent } from './document-agent.js';
import { FinanceAgent } from './finance-agent.js';

export class AgentManager {
  constructor() {
    this.agents = {
      code: new CodeAgent(),
      data: new DataAgent(),
      document: new DocumentAgent(),
      finance: new FinanceAgent()
    };
  }

  selectAgents(intent) {
    const selectedAgents = [];

    // Select based on intent
    if (intent.action.includes('code') || intent.action.includes('app')) {
      selectedAgents.push(this.agents.code);
    }

    if (intent.action.includes('stock') || intent.action.includes('finance')) {
      selectedAgents.push(this.agents.finance);
    }

    if (intent.action.includes('pdf') || intent.action.includes('document')) {
      selectedAgents.push(this.agents.document);
    }

    if (intent.action.includes('data') || intent.action.includes('analyze')) {
      selectedAgents.push(this.agents.data);
    }

    // Default to all agents if unclear
    if (selectedAgents.length === 0) {
      return Object.values(this.agents);
    }

    return selectedAgents;
  }

  getAgent(name) {
    return this.agents[name];
  }

  listAgents() {
    return Object.keys(this.agents);
  }
}
