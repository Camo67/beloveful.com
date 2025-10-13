import { useState, useCallback } from 'react';

interface AIResponse {
  text: string;
  usage: {
    prompt_tokens: number;
    completion_tokens: number;
    total_tokens: number;
  };
  request_id: string;
}

interface ChatResponse {
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

interface QwenMessage {
  role: 'system' | 'user' | 'assistant';
  content: string;
}

interface GenerateOptions {
  temperature?: number;
  maxTokens?: number;
  topP?: number;
}

interface UseAliCloudAIReturn {
  // Text generation
  generateText: (prompt: string, model?: string, options?: GenerateOptions) => Promise<string>;
  
  // Chat functionality
  chat: (messages: QwenMessage[], model?: string, options?: GenerateOptions) => Promise<ChatResponse>;
  
  // Photography-specific functions
  generatePhotoCaption: (photoDescription: string) => Promise<string>;
  generateTravelDescription: (location: string) => Promise<string>;
  
  // Utility functions
  testConnection: () => Promise<{ status: string; message: string }>;
  getAvailableModels: () => Promise<any>;
  
  // State
  loading: boolean;
  error: string | null;
}

export function useAliCloudAI(): UseAliCloudAIReturn {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const handleRequest = useCallback(async <T>(
    url: string,
    options: RequestInit
  ): Promise<T> => {
    setLoading(true);
    setError(null);
    
    try {
      const response = await fetch(url, {
        ...options,
        headers: {
          'Content-Type': 'application/json',
          ...options.headers,
        },
      });

      if (!response.ok) {
        const errorData = await response.text();
        throw new Error(`API error (${response.status}): ${errorData}`);
      }

      return await response.json();
    } catch (err) {
      const errorMessage = err instanceof Error ? err.message : 'Unknown error';
      setError(errorMessage);
      throw err;
    } finally {
      setLoading(false);
    }
  }, []);

  const generateText = useCallback(async (
    prompt: string, 
    model = 'qwen-turbo',
    options: GenerateOptions = {}
  ): Promise<string> => {
    const data = await handleRequest<AIResponse>('/api/ai/generate', {
      method: 'POST',
      body: JSON.stringify({
        prompt,
        model,
        options: {
          temperature: options.temperature || 0.7,
          maxTokens: options.maxTokens || 2000,
          topP: options.topP || 1.0,
        }
      }),
    });

    return data.text;
  }, [handleRequest]);

  const chat = useCallback(async (
    messages: QwenMessage[],
    model = 'qwen-turbo',
    options: GenerateOptions = {}
  ): Promise<ChatResponse> => {
    return await handleRequest<ChatResponse>('/api/ai/chat', {
      method: 'POST',
      body: JSON.stringify({
        messages,
        model,
        options: {
          temperature: options.temperature || 0.7,
          maxTokens: options.maxTokens || 2000,
          topP: options.topP || 1.0,
        }
      }),
    });
  }, [handleRequest]);

  const generatePhotoCaption = useCallback(async (photoDescription: string): Promise<string> => {
    const data = await handleRequest<{ caption: string }>('/api/ai/photo-caption', {
      method: 'POST',
      body: JSON.stringify({ photoDescription }),
    });

    return data.caption;
  }, [handleRequest]);

  const generateTravelDescription = useCallback(async (location: string): Promise<string> => {
    const data = await handleRequest<{ description: string }>('/api/ai/travel-description', {
      method: 'POST',
      body: JSON.stringify({ location }),
    });

    return data.description;
  }, [handleRequest]);

  const testConnection = useCallback(async (): Promise<{ status: string; message: string }> => {
    return await handleRequest<{ status: string; message: string }>('/api/ai/test', {
      method: 'GET',
    });
  }, [handleRequest]);

  const getAvailableModels = useCallback(async () => {
    return await handleRequest<{ models: any[] }>('/api/ai/models', {
      method: 'GET',
    });
  }, [handleRequest]);

  return {
    generateText,
    chat,
    generatePhotoCaption,
    generateTravelDescription,
    testConnection,
    getAvailableModels,
    loading,
    error,
  };
}

// Utility hook for quick text generation with common photography prompts
export function usePhotographyAI() {
  const { generateText, loading, error } = useAliCloudAI();

  const generateImageAltText = useCallback(async (imageDescription: string): Promise<string> => {
    const prompt = `Generate concise, SEO-friendly alt text for this image: ${imageDescription}. Keep it under 125 characters and focus on the visual elements that matter for accessibility.`;
    return await generateText(prompt, 'qwen-turbo', { maxTokens: 100 });
  }, [generateText]);

  const generateBlogPost = useCallback(async (location: string, highlights: string[]): Promise<string> => {
    const prompt = `Write an engaging travel photography blog post about ${location}. Include these highlights: ${highlights.join(', ')}. Make it personal, inspiring, and around 300-400 words. Include photography tips specific to this location.`;
    return await generateText(prompt, 'qwen-plus', { maxTokens: 600 });
  }, [generateText]);

  const generateSEODescription = useCallback(async (pageTitle: string, content: string): Promise<string> => {
    const prompt = `Create an SEO meta description (150-160 characters) for a photography website page titled "${pageTitle}". Content focus: ${content}. Make it compelling and include relevant photography keywords.`;
    return await generateText(prompt, 'qwen-turbo', { maxTokens: 100 });
  }, [generateText]);

  const generateHashtags = useCallback(async (photoDescription: string): Promise<string[]> => {
    const prompt = `Generate 10-15 relevant Instagram hashtags for this travel photo: ${photoDescription}. Mix popular and niche hashtags. Return as a comma-separated list.`;
    const response = await generateText(prompt, 'qwen-turbo', { maxTokens: 150 });
    return response.split(',').map(tag => tag.trim().replace('#', '')).filter(tag => tag.length > 0);
  }, [generateText]);

  return {
    generateImageAltText,
    generateBlogPost,
    generateSEODescription,
    generateHashtags,
    loading,
    error,
  };
}

// Hook for AI-powered content moderation and quality checks
export function useContentAI() {
  const { generateText, loading, error } = useAliCloudAI();

  const checkContentQuality = useCallback(async (content: string): Promise<{
    score: number;
    suggestions: string[];
    readabilityLevel: string;
  }> => {
    const prompt = `Analyze this content for quality, readability, and engagement. Content: "${content}". 
    Provide:
    1. Quality score (1-10)
    2. 3-5 specific improvement suggestions
    3. Readability level (Elementary, High School, College, Graduate)
    
    Format as JSON with keys: score, suggestions (array), readabilityLevel`;
    
    const response = await generateText(prompt, 'qwen-plus', { maxTokens: 400, temperature: 0.3 });
    
    try {
      return JSON.parse(response);
    } catch {
      // Fallback if JSON parsing fails
      return {
        score: 7,
        suggestions: ["Consider adding more descriptive language", "Break up long sentences", "Add more engaging hooks"],
        readabilityLevel: "High School"
      };
    }
  }, [generateText]);

  const improveContent = useCallback(async (content: string, targetAudience: string = "travel photography enthusiasts"): Promise<string> => {
    const prompt = `Improve this content for ${targetAudience}. Make it more engaging, clear, and compelling while maintaining the original meaning. Original: "${content}"`;
    return await generateText(prompt, 'qwen-plus', { maxTokens: 500, temperature: 0.7 });
  }, [generateText]);

  const translateContent = useCallback(async (content: string, targetLanguage: string): Promise<string> => {
    const prompt = `Translate this travel photography content to ${targetLanguage}, maintaining the artistic and emotional tone: "${content}"`;
    return await generateText(prompt, 'qwen-plus', { maxTokens: 400 });
  }, [generateText]);

  return {
    checkContentQuality,
    improveContent,
    translateContent,
    loading,
    error,
  };
}

export default useAliCloudAI;