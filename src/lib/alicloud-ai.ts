import axios, { AxiosResponse } from 'axios';

// Types for DashScope API
export interface QwenMessage {
  role: 'system' | 'user' | 'assistant';
  content: string;
}

export interface QwenRequest {
  model: string;
  input: {
    messages: QwenMessage[];
    temperature?: number;
    max_tokens?: number;
    top_p?: number;
  };
  parameters?: {
    temperature?: number;
    max_tokens?: number;
    top_p?: number;
    seed?: number;
    repetition_penalty?: number;
  };
}

export interface QwenResponse {
  output: {
    text?: string;
    choices?: Array<{
      message: {
        role: string;
        content: string;
      };
    }>;
    finish_reason?: string;
  };
  usage: {
    prompt_tokens: number;
    completion_tokens: number;
    total_tokens: number;
  };
  request_id: string;
}

export interface AliCloudConfig {
  accessKeyId: string;
  accessKeySecret: string;
  region: string;
  dashscopeApiKey?: string;
}

export class AliCloudAI {
  private config: AliCloudConfig;
  private dashscopeEndpoint = 'https://dashscope.aliyuncs.com/api/v1/services/aigc/text-generation/generation';

  constructor(config: AliCloudConfig) {
    this.config = config;
  }

  /**
   * Chat with Qwen models using DashScope
   */
  async chat(
    messages: QwenMessage[],
    model: string = 'qwen-turbo',
    options?: {
      temperature?: number;
      maxTokens?: number;
      topP?: number;
    }
  ): Promise<QwenResponse> {
    if (!this.config.dashscopeApiKey) {
      throw new Error('DashScope API key is required for chat functionality');
    }

    const request: QwenRequest = {
      model,
      input: {
        messages,
        temperature: options?.temperature || 0.7,
        max_tokens: options?.maxTokens || 2000,
        top_p: options?.topP || 1.0,
      },
    };

    try {
      const response: AxiosResponse<QwenResponse> = await axios.post(
        this.dashscopeEndpoint,
        request,
        {
          headers: {
            'Authorization': `Bearer ${this.config.dashscopeApiKey}`,
            'Content-Type': 'application/json',
            'X-DashScope-SSE': 'disable',
          },
        }
      );

      return response.data;
    } catch (error) {
      if (axios.isAxiosError(error)) {
        throw new Error(
          `DashScope API error: ${error.response?.status} - ${error.response?.data?.message || error.message}`
        );
      }
      throw error;
    }
  }

  /**
   * Generate text completion using Qwen
   */
  async generateText(
    prompt: string,
    model: string = 'qwen-turbo',
    options?: {
      temperature?: number;
      maxTokens?: number;
    }
  ): Promise<string> {
    const messages: QwenMessage[] = [
      { role: 'user', content: prompt }
    ];

    const response = await this.chat(messages, model, options);
    
    if (response.output.choices && response.output.choices.length > 0) {
      return response.output.choices[0].message.content;
    }
    
    return response.output.text || '';
  }

  /**
   * Get available models information
   */
  getAvailableModels(): Array<{ name: string; description: string; pricing: string }> {
    return [
      {
        name: 'qwen-turbo',
        description: 'Fast and efficient model for general tasks',
        pricing: 'Free tier: 1M tokens/month'
      },
      {
        name: 'qwen-plus',
        description: 'More powerful model with better performance',
        pricing: 'Pay-per-use after free tier'
      },
      {
        name: 'qwen-max',
        description: 'Most advanced model with highest accuracy',
        pricing: 'Premium pricing'
      },
      {
        name: 'qwen-max-longcontext',
        description: 'Supports very long context windows',
        pricing: 'Premium pricing with context-based billing'
      },
      {
        name: 'qwen-vl-plus',
        description: 'Vision-language model for image understanding',
        pricing: 'Image + text token based pricing'
      },
      {
        name: 'qwen-vl-max',
        description: 'Advanced vision-language model',
        pricing: 'Premium vision model pricing'
      }
    ];
  }

  /**
   * Check API key validity and get account usage info
   */
  async checkStatus(): Promise<{ valid: boolean; message: string }> {
    try {
      const testResponse = await this.chat([
        { role: 'user', content: 'Hello' }
      ], 'qwen-turbo');

      return {
        valid: true,
        message: `API is working. Request ID: ${testResponse.request_id}`
      };
    } catch (error) {
      return {
        valid: false,
        message: error instanceof Error ? error.message : 'Unknown error'
      };
    }
  }
}

// Utility function to create AliCloudAI instance from environment
export function createAliCloudAI(): AliCloudAI {
  // In a Cloudflare Worker environment, these would be accessed differently
  const config: AliCloudConfig = {
    accessKeyId: process.env.ALIBABA_CLOUD_ACCESS_KEY_ID || '',
    accessKeySecret: process.env.ALIBABA_CLOUD_ACCESS_KEY_SECRET || '',
    region: process.env.ALIBABA_CLOUD_REGION || 'cn-hangzhou',
    dashscopeApiKey: process.env.DASHSCOPE_API_KEY || '',
  };

  if (!config.dashscopeApiKey) {
    throw new Error('DASHSCOPE_API_KEY environment variable is required');
  }

  return new AliCloudAI(config);
}

// Example usage functions
export const aliCloudExamples = {
  /**
   * Simple chat example
   */
  async simpleChat() {
    const ai = createAliCloudAI();
    
    const response = await ai.chat([
      { role: 'user', content: 'What are the benefits of using Alibaba Cloud?' }
    ]);

    return response.output.choices?.[0]?.message.content || response.output.text;
  },

  /**
   * Generate photography captions
   */
  async generatePhotoCaption(photoDescription: string) {
    const ai = createAliCloudAI();
    
    const prompt = `Create a compelling, artistic caption for a photography portfolio. The photo shows: ${photoDescription}. Make it engaging and professional, suitable for a travel photography website.`;
    
    return await ai.generateText(prompt, 'qwen-plus');
  },

  /**
   * Content generation for the photography website
   */
  async generateTravelDescription(location: string) {
    const ai = createAliCloudAI();
    
    const prompt = `Write a beautiful, engaging description for a travel photography section about ${location}. Focus on the visual appeal, cultural significance, and what makes this location special for photography. Keep it concise but inspiring.`;
    
    return await ai.generateText(prompt, 'qwen-plus');
  }
};