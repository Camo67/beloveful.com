import { Hono } from 'hono';
import { cors } from 'hono/cors';

// Types for DashScope API
interface QwenMessage {
  role: 'system' | 'user' | 'assistant';
  content: string;
}

interface QwenRequest {
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

interface QwenResponse {
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

interface Env {
  DASHSCOPE_API_KEY: string;
  ALIBABA_CLOUD_ACCESS_KEY_ID: string;
  ALIBABA_CLOUD_ACCESS_KEY_SECRET: string;
  ALIBABA_CLOUD_REGION: string;
}

const app = new Hono<{ Bindings: Env }>();

app.use('*', cors({
  origin: ['http://localhost:8080', 'https://beloveful.com', 'https://www.beloveful.com'],
  allowMethods: ['GET', 'POST'],
  allowHeaders: ['Content-Type', 'Authorization'],
}));

// Health check endpoint
app.get('/health', async (c) => {
  return c.json({ status: 'OK', service: 'Alibaba Cloud AI API' });
});

// Chat with Qwen models
app.post('/chat', async (c) => {
  try {
    const body = await c.req.json();
    const { messages, model = 'qwen-turbo', options = {} } = body;

    if (!messages || !Array.isArray(messages)) {
      return c.json({ error: 'Messages array is required' }, 400);
    }

    const apiKey = c.env.DASHSCOPE_API_KEY;
    if (!apiKey) {
      return c.json({ error: 'DashScope API key not configured' }, 500);
    }

    const request: QwenRequest = {
      model,
      input: {
        messages,
        temperature: options.temperature || 0.7,
        max_tokens: options.maxTokens || 2000,
        top_p: options.topP || 1.0,
      },
    };

    const response = await fetch('https://dashscope.aliyuncs.com/api/v1/services/aigc/text-generation/generation', {
      method: 'POST',
      headers: {
        'Authorization': `Bearer ${apiKey}`,
        'Content-Type': 'application/json',
        'X-DashScope-SSE': 'disable',
      },
      body: JSON.stringify(request),
    });

    if (!response.ok) {
      const errorData = await response.text();
      return c.json({ 
        error: 'DashScope API error', 
        details: errorData,
        status: response.status 
      }, response.status);
    }

    const data: QwenResponse = await response.json();
    return c.json(data);

  } catch (error) {
    console.error('AI chat error:', error);
    return c.json({ 
      error: 'Internal server error', 
      message: error instanceof Error ? error.message : 'Unknown error' 
    }, 500);
  }
});

// Generate text (simplified chat interface)
app.post('/generate', async (c) => {
  try {
    const body = await c.req.json();
    const { prompt, model = 'qwen-turbo', options = {} } = body;

    if (!prompt) {
      return c.json({ error: 'Prompt is required' }, 400);
    }

    const messages: QwenMessage[] = [
      { role: 'user', content: prompt }
    ];

    const apiKey = c.env.DASHSCOPE_API_KEY;
    if (!apiKey) {
      return c.json({ error: 'DashScope API key not configured' }, 500);
    }

    const request: QwenRequest = {
      model,
      input: {
        messages,
        temperature: options.temperature || 0.7,
        max_tokens: options.maxTokens || 2000,
        top_p: options.topP || 1.0,
      },
    };

    const response = await fetch('https://dashscope.aliyuncs.com/api/v1/services/aigc/text-generation/generation', {
      method: 'POST',
      headers: {
        'Authorization': `Bearer ${apiKey}`,
        'Content-Type': 'application/json',
        'X-DashScope-SSE': 'disable',
      },
      body: JSON.stringify(request),
    });

    if (!response.ok) {
      const errorData = await response.text();
      return c.json({ 
        error: 'DashScope API error', 
        details: errorData,
        status: response.status 
      }, response.status);
    }

    const data: QwenResponse = await response.json();
    
    // Extract the generated text
    let generatedText = '';
    if (data.output.choices && data.output.choices.length > 0) {
      generatedText = data.output.choices[0].message.content;
    } else if (data.output.text) {
      generatedText = data.output.text;
    }

    return c.json({ 
      text: generatedText,
      usage: data.usage,
      request_id: data.request_id
    });

  } catch (error) {
    console.error('AI generate error:', error);
    return c.json({ 
      error: 'Internal server error', 
      message: error instanceof Error ? error.message : 'Unknown error' 
    }, 500);
  }
});

// Photography-specific endpoints
app.post('/photo-caption', async (c) => {
  try {
    const body = await c.req.json();
    const { photoDescription } = body;

    if (!photoDescription) {
      return c.json({ error: 'Photo description is required' }, 400);
    }

    const prompt = `Create a compelling, artistic caption for a photography portfolio. The photo shows: ${photoDescription}. Make it engaging and professional, suitable for a travel photography website. Keep it concise and inspiring.`;

    const messages: QwenMessage[] = [
      { role: 'user', content: prompt }
    ];

    const apiKey = c.env.DASHSCOPE_API_KEY;
    if (!apiKey) {
      return c.json({ error: 'DashScope API key not configured' }, 500);
    }

    const request: QwenRequest = {
      model: 'qwen-plus',
      input: {
        messages,
        temperature: 0.8,
        max_tokens: 200,
      },
    };

    const response = await fetch('https://dashscope.aliyuncs.com/api/v1/services/aigc/text-generation/generation', {
      method: 'POST',
      headers: {
        'Authorization': `Bearer ${apiKey}`,
        'Content-Type': 'application/json',
        'X-DashScope-SSE': 'disable',
      },
      body: JSON.stringify(request),
    });

    if (!response.ok) {
      const errorData = await response.text();
      return c.json({ 
        error: 'DashScope API error', 
        details: errorData,
        status: response.status 
      }, response.status);
    }

    const data: QwenResponse = await response.json();
    
    let caption = '';
    if (data.output.choices && data.output.choices.length > 0) {
      caption = data.output.choices[0].message.content;
    } else if (data.output.text) {
      caption = data.output.text;
    }

    return c.json({ 
      caption,
      usage: data.usage,
      request_id: data.request_id
    });

  } catch (error) {
    console.error('Photo caption error:', error);
    return c.json({ 
      error: 'Internal server error', 
      message: error instanceof Error ? error.message : 'Unknown error' 
    }, 500);
  }
});

// Travel description generator
app.post('/travel-description', async (c) => {
  try {
    const body = await c.req.json();
    const { location } = body;

    if (!location) {
      return c.json({ error: 'Location is required' }, 400);
    }

    const prompt = `Write a beautiful, engaging description for a travel photography section about ${location}. Focus on the visual appeal, cultural significance, and what makes this location special for photography. Keep it concise but inspiring (2-3 sentences).`;

    const messages: QwenMessage[] = [
      { role: 'user', content: prompt }
    ];

    const apiKey = c.env.DASHSCOPE_API_KEY;
    if (!apiKey) {
      return c.json({ error: 'DashScope API key not configured' }, 500);
    }

    const request: QwenRequest = {
      model: 'qwen-plus',
      input: {
        messages,
        temperature: 0.8,
        max_tokens: 300,
      },
    };

    const response = await fetch('https://dashscope.aliyuncs.com/api/v1/services/aigc/text-generation/generation', {
      method: 'POST',
      headers: {
        'Authorization': `Bearer ${apiKey}`,
        'Content-Type': 'application/json',
        'X-DashScope-SSE': 'disable',
      },
      body: JSON.stringify(request),
    });

    if (!response.ok) {
      const errorData = await response.text();
      return c.json({ 
        error: 'DashScope API error', 
        details: errorData,
        status: response.status 
      }, response.status);
    }

    const data: QwenResponse = await response.json();
    
    let description = '';
    if (data.output.choices && data.output.choices.length > 0) {
      description = data.output.choices[0].message.content;
    } else if (data.output.text) {
      description = data.output.text;
    }

    return c.json({ 
      description,
      usage: data.usage,
      request_id: data.request_id
    });

  } catch (error) {
    console.error('Travel description error:', error);
    return c.json({ 
      error: 'Internal server error', 
      message: error instanceof Error ? error.message : 'Unknown error' 
    }, 500);
  }
});

// Get available models
app.get('/models', async (c) => {
  const models = [
    {
      name: 'qwen-turbo',
      description: 'Fast and efficient model for general tasks',
      pricing: 'Free tier: 1M tokens/month',
      recommended_for: ['General chat', 'Quick responses', 'Development testing']
    },
    {
      name: 'qwen-plus',
      description: 'More powerful model with better performance',
      pricing: 'Pay-per-use after free tier',
      recommended_for: ['Content generation', 'Creative writing', 'Complex tasks']
    },
    {
      name: 'qwen-max',
      description: 'Most advanced model with highest accuracy',
      pricing: 'Premium pricing',
      recommended_for: ['Professional content', 'Complex reasoning', 'High-quality outputs']
    },
    {
      name: 'qwen-max-longcontext',
      description: 'Supports very long context windows',
      pricing: 'Premium pricing with context-based billing',
      recommended_for: ['Long document processing', 'Extended conversations', 'Large context tasks']
    },
    {
      name: 'qwen-vl-plus',
      description: 'Vision-language model for image understanding',
      pricing: 'Image + text token based pricing',
      recommended_for: ['Image analysis', 'Photo descriptions', 'Visual content generation']
    },
    {
      name: 'qwen-vl-max',
      description: 'Advanced vision-language model',
      pricing: 'Premium vision model pricing',
      recommended_for: ['Professional image analysis', 'Detailed visual descriptions', 'Complex visual tasks']
    }
  ];

  return c.json({ models });
});

// Test API connectivity
app.get('/test', async (c) => {
  try {
    const apiKey = c.env.DASHSCOPE_API_KEY;
    if (!apiKey) {
      return c.json({ 
        status: 'error', 
        message: 'DashScope API key not configured' 
      }, 500);
    }

    const messages: QwenMessage[] = [
      { role: 'user', content: 'Hello, please respond with "API test successful"' }
    ];

    const request: QwenRequest = {
      model: 'qwen-turbo',
      input: {
        messages,
        temperature: 0.1,
        max_tokens: 50,
      },
    };

    const response = await fetch('https://dashscope.aliyuncs.com/api/v1/services/aigc/text-generation/generation', {
      method: 'POST',
      headers: {
        'Authorization': `Bearer ${apiKey}`,
        'Content-Type': 'application/json',
        'X-DashScope-SSE': 'disable',
      },
      body: JSON.stringify(request),
    });

    if (!response.ok) {
      const errorData = await response.text();
      return c.json({ 
        status: 'error', 
        message: 'DashScope API error',
        details: errorData,
        http_status: response.status 
      }, 200); // Return 200 so we can see the error details
    }

    const data: QwenResponse = await response.json();
    
    return c.json({ 
      status: 'success',
      message: 'API is working correctly',
      request_id: data.request_id,
      usage: data.usage
    });

  } catch (error) {
    console.error('API test error:', error);
    return c.json({ 
      status: 'error', 
      message: 'Internal server error',
      details: error instanceof Error ? error.message : 'Unknown error'
    }, 200);
  }
});

export default app;