# Alibaba Cloud AI API Setup Guide

This guide will help you set up and use Alibaba Cloud's AI services (DashScope) to utilize your free AI credits with the Qwen language models.

## 🚀 Quick Start

### 1. Get Your API Key

1. **Sign up for Alibaba Cloud**: Visit [https://www.alibabacloud.com/](https://www.alibabacloud.com/)
2. **Access DashScope**: Go to [https://dashscope.console.aliyun.com/](https://dashscope.console.aliyun.com/)
3. **Generate API Key**: 
   - Navigate to API Keys section
   - Create a new API key
   - Copy the key securely

### 2. Configure Environment Variables

Add your API credentials to the `.dev.vars` file in your project root:

```bash
# Alibaba Cloud AI Configuration
ALIBABA_CLOUD_ACCESS_KEY_ID=your_access_key_id_here
ALIBABA_CLOUD_ACCESS_KEY_SECRET=your_access_key_secret_here
ALIBABA_CLOUD_REGION=cn-hangzhou
DASHSCOPE_API_KEY=your_dashscope_api_key_here
```

⚠️ **Security Note**: Never commit your actual API keys to version control. The above are placeholder values.

### 3. Deploy and Test

```bash
# Deploy your worker
npm run deploy

# Test the API
curl https://your-domain.com/api/ai/test
```

## 📋 Available Endpoints

### Health Check
```http
GET /api/ai/health
```

### Test API Connectivity
```http
GET /api/ai/test
```

### Chat with Qwen Models
```http
POST /api/ai/chat
Content-Type: application/json

{
  "messages": [
    {"role": "user", "content": "Hello, how are you?"}
  ],
  "model": "qwen-turbo",
  "options": {
    "temperature": 0.7,
    "maxTokens": 2000
  }
}
```

### Generate Text (Simplified)
```http
POST /api/ai/generate
Content-Type: application/json

{
  "prompt": "Write a haiku about photography",
  "model": "qwen-turbo",
  "options": {
    "temperature": 0.8,
    "maxTokens": 100
  }
}
```

### Photography-Specific Endpoints

#### Generate Photo Caption
```http
POST /api/ai/photo-caption
Content-Type: application/json

{
  "photoDescription": "A sunset over the Sahara Desert with golden dunes stretching to the horizon"
}
```

#### Generate Travel Description
```http
POST /api/ai/travel-description
Content-Type: application/json

{
  "location": "Kyoto, Japan"
}
```

### Get Available Models
```http
GET /api/ai/models
```

## 🤖 Available Models & Free Tier

### Qwen Models

| Model | Description | Free Tier | Best For |
|-------|-------------|-----------|----------|
| `qwen-turbo` | Fast and efficient | 1M tokens/month | General chat, testing |
| `qwen-plus` | More powerful | Limited free usage | Content generation, creative writing |
| `qwen-max` | Most advanced | Premium only | Professional content, complex reasoning |
| `qwen-max-longcontext` | Long context support | Premium only | Long documents, extended conversations |
| `qwen-vl-plus` | Vision-language model | Limited free usage | Image analysis, photo descriptions |
| `qwen-vl-max` | Advanced vision model | Premium only | Professional image analysis |

## 💻 Code Examples

### Frontend Integration (React)

```tsx
// src/hooks/useAliCloudAI.ts
import { useState } from 'react';

interface AIResponse {
  text: string;
  usage: {
    prompt_tokens: number;
    completion_tokens: number;
    total_tokens: number;
  };
  request_id: string;
}

export function useAliCloudAI() {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const generateText = async (prompt: string, model = 'qwen-turbo'): Promise<string> => {
    setLoading(true);
    setError(null);
    
    try {
      const response = await fetch('/api/ai/generate', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          prompt,
          model,
          options: {
            temperature: 0.7,
            maxTokens: 2000
          }
        }),
      });

      if (!response.ok) {
        throw new Error(`API error: ${response.status}`);
      }

      const data: AIResponse = await response.json();
      return data.text;
    } catch (err) {
      const errorMessage = err instanceof Error ? err.message : 'Unknown error';
      setError(errorMessage);
      throw err;
    } finally {
      setLoading(false);
    }
  };

  const generatePhotoCaption = async (photoDescription: string): Promise<string> => {
    setLoading(true);
    setError(null);
    
    try {
      const response = await fetch('/api/ai/photo-caption', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ photoDescription }),
      });

      if (!response.ok) {
        throw new Error(`API error: ${response.status}`);
      }

      const data = await response.json();
      return data.caption;
    } catch (err) {
      const errorMessage = err instanceof Error ? err.message : 'Unknown error';
      setError(errorMessage);
      throw err;
    } finally {
      setLoading(false);
    }
  };

  const generateTravelDescription = async (location: string): Promise<string> => {
    setLoading(true);
    setError(null);
    
    try {
      const response = await fetch('/api/ai/travel-description', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ location }),
      });

      if (!response.ok) {
        throw new Error(`API error: ${response.status}`);
      }

      const data = await response.json();
      return data.description;
    } catch (err) {
      const errorMessage = err instanceof Error ? err.message : 'Unknown error';
      setError(errorMessage);
      throw err;
    } finally {
      setLoading(false);
    }
  };

  return {
    generateText,
    generatePhotoCaption,
    generateTravelDescription,
    loading,
    error
  };
}
```

### Usage in React Components

```tsx
// src/components/AIPhotoCaption.tsx
import React, { useState } from 'react';
import { useAliCloudAI } from '../hooks/useAliCloudAI';
import { Button } from './ui/button';
import { Input } from './ui/input';
import { Card } from './ui/card';

export function AIPhotoCaption() {
  const [description, setDescription] = useState('');
  const [caption, setCaption] = useState('');
  const { generatePhotoCaption, loading, error } = useAliCloudAI();

  const handleGenerate = async () => {
    if (!description.trim()) return;
    
    try {
      const generatedCaption = await generatePhotoCaption(description);
      setCaption(generatedCaption);
    } catch (err) {
      console.error('Failed to generate caption:', err);
    }
  };

  return (
    <Card className="p-6">
      <h3 className="text-lg font-semibold mb-4">AI Photo Caption Generator</h3>
      
      <div className="space-y-4">
        <Input
          placeholder="Describe your photo..."
          value={description}
          onChange={(e) => setDescription(e.target.value)}
        />
        
        <Button 
          onClick={handleGenerate} 
          disabled={loading || !description.trim()}
        >
          {loading ? 'Generating...' : 'Generate Caption'}
        </Button>
        
        {error && (
          <div className="text-red-500 text-sm">
            Error: {error}
          </div>
        )}
        
        {caption && (
          <div className="p-4 bg-gray-50 rounded-md">
            <p className="text-sm font-medium text-gray-700 mb-2">Generated Caption:</p>
            <p className="italic">{caption}</p>
          </div>
        )}
      </div>
    </Card>
  );
}
```

## 🛠 CLI Testing Examples

Test your API endpoints using curl:

```bash
# Test API connectivity
curl -X GET https://your-domain.com/api/ai/test

# Generate simple text
curl -X POST https://your-domain.com/api/ai/generate \
  -H "Content-Type: application/json" \
  -d '{
    "prompt": "Write a professional bio for a travel photographer",
    "model": "qwen-turbo"
  }'

# Generate photo caption
curl -X POST https://your-domain.com/api/ai/photo-caption \
  -H "Content-Type: application/json" \
  -d '{
    "photoDescription": "A bustling night market in Bangkok with colorful food stalls and neon lights"
  }'

# Generate travel description
curl -X POST https://your-domain.com/api/ai/travel-description \
  -H "Content-Type: application/json" \
  -d '{
    "location": "Santorini, Greece"
  }'

# Chat example
curl -X POST https://your-domain.com/api/ai/chat \
  -H "Content-Type: application/json" \
  -d '{
    "messages": [
      {"role": "user", "content": "What makes a great travel photograph?"}
    ],
    "model": "qwen-plus"
  }'
```

## 💰 Managing Your Free Credits

### Monitoring Usage
- Check your usage in the Alibaba Cloud DashScope console
- Free tier typically includes 1M tokens per month
- Monitor token usage to avoid unexpected charges

### Best Practices
1. **Start with `qwen-turbo`** for testing and development
2. **Use appropriate max_tokens** to avoid wasting credits
3. **Cache responses** when possible
4. **Use temperature wisely** (lower = more consistent, higher = more creative)

### Token Optimization Tips
- Keep prompts concise but descriptive
- Use system messages to set context once rather than repeating
- Set appropriate `max_tokens` limits
- Consider using shorter models for simple tasks

## 🔧 Troubleshooting

### Common Issues

1. **API Key Not Working**
   - Verify the key is correct in `.dev.vars`
   - Check if the key has proper permissions
   - Ensure you've activated DashScope service

2. **Rate Limiting**
   - Implement exponential backoff
   - Space out your requests
   - Check your account limits

3. **CORS Issues**
   - Verify your domain is in the CORS allowlist
   - Check the function deployment

4. **Token Limit Exceeded**
   - Reduce `max_tokens` in requests
   - Use more efficient prompts
   - Consider upgrading to paid tier

### Debug Mode
Add debugging to your requests:

```typescript
const response = await fetch('/api/ai/generate', {
  method: 'POST',
  headers: {
    'Content-Type': 'application/json',
  },
  body: JSON.stringify({
    prompt: 'Your prompt here',
    model: 'qwen-turbo',
    options: { temperature: 0.7 }
  }),
});

console.log('Response status:', response.status);
const data = await response.json();
console.log('Response data:', data);
```

## 🔐 Security Considerations

1. **Never expose API keys** in client-side code
2. **Use environment variables** for all sensitive data
3. **Implement rate limiting** in production
4. **Validate user inputs** to prevent injection attacks
5. **Monitor usage** to prevent abuse

## 📈 Next Steps

1. **Explore other AI services**: Computer Vision, Speech, etc.
2. **Implement caching**: Redis or Cloudflare KV for responses
3. **Add authentication**: Protect your endpoints
4. **Monitor and optimize**: Track usage and performance
5. **Scale up**: Consider paid tiers for production use

---

## 🆘 Support

- **Alibaba Cloud Documentation**: [https://help.aliyun.com/](https://help.aliyun.com/)
- **DashScope API Docs**: [https://help.aliyun.com/zh/dashscope/](https://help.aliyun.com/zh/dashscope/)
- **Community Forums**: Alibaba Cloud Community

Happy coding with Alibaba Cloud AI! 🚀