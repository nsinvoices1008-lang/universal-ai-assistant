import axios from 'axios';

export class AIRouter {
  constructor() {
    this.openRouterKey = process.env.OPENROUTER_API_KEY;
    this.openAIKey = process.env.OPENAI_API_KEY;
    this.baseURL = 'https://openrouter.ai/api/v1';
  }

  async route(config) {
    const { model, messages, temperature = 0.7, maxTokens = 2000 } = config;

    try {
      // Route to OpenRouter for multi-model access
      const response = await axios.post(
        `${this.baseURL}/chat/completions`,
        {
          model: model || 'openai/gpt-4-turbo',
          messages,
          temperature,
          max_tokens: maxTokens
        },
        {
          headers: {
            'Authorization': `Bearer ${this.openRouterKey}`,
            'Content-Type': 'application/json',
            'HTTP-Referer': 'https://universal-ai-assistant.app',
            'X-Title': 'Universal AI Assistant'
          }
        }
      );

      return response.data.choices[0].message.content;
    } catch (error) {
      console.error('AI Router error:', error.message);
      
      // Fallback to direct OpenAI if OpenRouter fails
      if (this.openAIKey) {
        return await this.fallbackToOpenAI(messages);
      }
      
      throw error;
    }
  }

  async fallbackToOpenAI(messages) {
    const response = await axios.post(
      'https://api.openai.com/v1/chat/completions',
      {
        model: 'gpt-4-turbo-preview',
        messages
      },
      {
        headers: {
          'Authorization': `Bearer ${this.openAIKey}`,
          'Content-Type': 'application/json'
        }
      }
    );

    return response.data.choices[0].message.content;
  }

  async listAvailableModels() {
    try {
      const response = await axios.get(`${this.baseURL}/models`, {
        headers: {
          'Authorization': `Bearer ${this.openRouterKey}`
        }
      });

      return response.data.data;
    } catch (error) {
      console.error('Error fetching models:', error.message);
      return [];
    }
  }
}
