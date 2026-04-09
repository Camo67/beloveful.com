import { GcsTtsConfig } from '../types';

/**
 * Google Cloud Text-to-Speech Service
 * Provides functionality to convert text to speech using Google's TTS API
 */
export class GoogleVoiceService {
  private readonly baseUrl = 'https://texttospeech.googleapis.com/v1beta1/text:synthesize';
  private readonly apiKey: string;

  constructor(config: GcsTtsConfig) {
    this.apiKey = config.apiKey;
  }

  /**
   * Synthesizes text to speech using Google Cloud TTS
   * @param text The text to convert to speech
   * @param voiceConfig Optional voice configuration
   * @returns Promise resolving to audio content as base64 string
   */
  async synthesizeText(
    text: string,
    voiceConfig?: {
      languageCode?: string;
      name?: string;
      ssmlGender?: 'MALE' | 'FEMALE' | 'NEUTRAL';
      speakingRate?: number;
      pitch?: number;
    }
  ): Promise<string> {
    const requestBody = {
      input: {
        text: text,
      },
      voice: {
        languageCode: voiceConfig?.languageCode || 'en-US',
        name: voiceConfig?.name || 'en-US-Wavenet-D',
        ssmlGender: voiceConfig?.ssmlGender || 'NEUTRAL',
      },
      audioConfig: {
        audioEncoding: 'MP3',
        speakingRate: voiceConfig?.speakingRate || 1.0,
        pitch: voiceConfig?.pitch || 0.0,
      },
    };

    try {
      const response = await fetch(`${this.baseUrl}?key=${this.apiKey}`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(requestBody),
      });

      if (!response.ok) {
        throw new Error(`Google TTS API error: ${response.status} ${response.statusText}`);
      }

      const data = await response.json();
      return data.audioContent;
    } catch (error) {
      console.error('Error synthesizing text:', error);
      throw error;
    }
  }

  /**
   * Gets a list of available voices
   * @param languageCode Optional language code to filter voices
   * @returns Promise resolving to array of available voices
   */
  async listVoices(languageCode?: string): Promise<any[]> {
    const url = `https://texttospeech.googleapis.com/v1beta1/voices?key=${this.apiKey}${
      languageCode ? `&languageCode=${languageCode}` : ''
    }`;

    try {
      const response = await fetch(url, {
        method: 'GET',
        headers: {
          'Content-Type': 'application/json',
        },
      });

      if (!response.ok) {
        throw new Error(`Google TTS API error: ${response.status} ${response.statusText}`);
      }

      const data = await response.json();
      return data.voices || [];
    } catch (error) {
      console.error('Error getting voices list:', error);
      throw error;
    }
  }

  /**
   * Converts text to speech and plays it directly in the browser
   * @param text The text to convert to speech
   * @param voiceConfig Optional voice configuration
   */
  async speakText(
    text: string,
    voiceConfig?: {
      languageCode?: string;
      name?: string;
      ssmlGender?: 'MALE' | 'FEMALE' | 'NEUTRAL';
      speakingRate?: number;
      pitch?: number;
    }
  ): Promise<void> {
    try {
      const audioContent = await this.synthesizeText(text, voiceConfig);
      
      // Create an audio blob and play it
      const binary = atob(audioContent);
      const array = new Uint8Array(binary.length);
      for (let i = 0; i < binary.length; i++) {
        array[i] = binary.charCodeAt(i);
      }
      
      const audioBlob = new Blob([array], { type: 'audio/mp3' });
      const audioUrl = URL.createObjectURL(audioBlob);
      
      const audio = new Audio(audioUrl);
      await audio.play();
      
      // Clean up the object URL after playback
      audio.onended = () => {
        URL.revokeObjectURL(audioUrl);
      };
    } catch (error) {
      console.error('Error playing synthesized speech:', error);
      throw error;
    }
  }
}

/**
 * Type definition for Google Cloud Text-to-Speech configuration
 */
export type GcsTtsConfig = {
  apiKey: string;
};