import React, { useState, useEffect } from 'react';
import { GoogleVoiceService } from '@/lib/google-voice-service';

interface VoiceReaderProps {
  text: string;
  title?: string;
  className?: string;
}

interface VoiceOption {
  name: string;
  languageCodes: string[];
  ssmlGender: string;
}

const VoiceReader: React.FC<VoiceReaderProps> = ({ text, title = "Listen to this article", className = "" }) => {
  const [isPlaying, setIsPlaying] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [voices, setVoices] = useState<VoiceOption[]>([]);
  const [selectedVoice, setSelectedVoice] = useState<string>('en-US-Wavenet-D');
  const [speed, setSpeed] = useState<number>(1.0);
  const [pitch, setPitch] = useState<number>(0.0);
  const [error, setError] = useState<string | null>(null);

  // Initialize the voice service
  const voiceService = new GoogleVoiceService({
    apiKey: import.meta.env.VITE_GOOGLE_TTS_API_KEY || ''
  });

  // Load available voices on component mount
  useEffect(() => {
    const loadVoices = async () => {
      if (!import.meta.env.VITE_GOOGLE_TTS_API_KEY) {
        setError('Google TTS API key not configured');
        return;
      }

      try {
        const availableVoices = await voiceService.listVoices('en');
        const filteredVoices = availableVoices
          .filter(voice => voice.languageCodes.some((lang: string) => lang.startsWith('en')))
          .map((voice: any) => ({
            name: voice.name,
            languageCodes: voice.languageCodes,
            ssmlGender: voice.ssmlGender
          }));

        setVoices(filteredVoices);
        if (filteredVoices.length > 0) {
          setSelectedVoice(filteredVoices[0].name);
        }
      } catch (err) {
        console.error('Error loading voices:', err);
        setError('Failed to load available voices');
      }
    };

    loadVoices();
  }, []);

  const handlePlay = async () => {
    if (!import.meta.env.VITE_GOOGLE_TTS_API_KEY) {
      setError('Google TTS API key not configured');
      return;
    }

    setIsLoading(true);
    setError(null);

    try {
      setIsPlaying(true);
      
      // Find the selected voice details
      const voiceDetails = voices.find(v => v.name === selectedVoice);
      
      await voiceService.speakText(text, {
        name: selectedVoice,
        ssmlGender: voiceDetails?.ssmlGender as 'MALE' | 'FEMALE' | 'NEUTRAL' || 'NEUTRAL',
        speakingRate: speed,
        pitch: pitch
      });
      
      setIsPlaying(false);
    } catch (err) {
      console.error('Error during speech synthesis:', err);
      setError('Failed to convert text to speech');
      setIsPlaying(false);
    } finally {
      setIsLoading(false);
    }
  };

  const handleStop = () => {
    // In a real implementation, we would stop the audio
    // For now, just reset the state
    setIsPlaying(false);
  };

  if (!import.meta.env.VITE_GOOGLE_TTS_API_KEY) {
    return (
      <div className={`bg-yellow-50 border border-yellow-200 rounded-lg p-4 ${className}`}>
        <p className="text-yellow-700">
          Text-to-speech is not configured. Please set the VITE_GOOGLE_TTS_API_KEY environment variable.
        </p>
      </div>
    );
  }

  return (
    <div className={`border rounded-lg p-4 bg-white dark:bg-gray-800 ${className}`}>
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 mb-4">
        <h3 className="font-medium text-gray-900 dark:text-white">{title}</h3>
        
        <div className="flex flex-wrap gap-2">
          <button
            onClick={handlePlay}
            disabled={isPlaying || isLoading}
            className={`px-4 py-2 rounded-md text-white font-medium flex items-center gap-2 ${
              isPlaying || isLoading 
                ? 'bg-blue-400 cursor-not-allowed' 
                : 'bg-blue-600 hover:bg-blue-700'
            }`}
          >
            {isLoading ? (
              <>
                <span className="animate-spin h-4 w-4 border-2 border-white border-t-transparent rounded-full"></span>
                <span>Processing...</span>
              </>
            ) : isPlaying ? (
              <>
                <span className="h-4 w-4 bg-white rounded-sm"></span>
                <span>Playing...</span>
              </>
            ) : (
              <>
                <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" className="h-4 w-4">
                  <path fillRule="evenodd" d="M4.5 5.653c0-1.427 1.529-2.33 2.779-1.643l11.54 6.347c1.295.712 1.295 2.573 0 3.286L7.28 19.99c-1.25.687-2.779-.217-2.779-1.643V5.653Z" clipRule="evenodd" />
                </svg>
                <span>Listen</span>
              </>
            )}
          </button>
          
          {isPlaying && (
            <button
              onClick={handleStop}
              className="px-4 py-2 rounded-md bg-red-600 hover:bg-red-700 text-white font-medium flex items-center gap-2"
            >
              <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" className="h-4 w-4">
                <path fillRule="evenodd" d="M4.5 7.5a3 3 0 0 1 3-3h9a3 3 0 0 1 3 3v9a3 3 0 0 1-3 3h-9a3 3 0 0 1-3-3v-9Z" clipRule="evenodd" />
              </svg>
              <span>Stop</span>
            </button>
          )}
        </div>
      </div>

      {error && (
        <div className="mb-4 p-3 bg-red-50 border border-red-200 rounded-md">
          <p className="text-red-700">{error}</p>
        </div>
      )}

      <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mt-4">
        <div>
          <label htmlFor="voice-select" className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
            Voice
          </label>
          <select
            id="voice-select"
            value={selectedVoice}
            onChange={(e) => setSelectedVoice(e.target.value)}
            className="w-full rounded-md border border-gray-300 bg-white py-2 px-3 shadow-sm focus:border-blue-500 focus:outline-none focus:ring-blue-500 dark:border-gray-600 dark:bg-gray-700 dark:text-white sm:text-sm"
            disabled={isPlaying || isLoading}
          >
            {voices.map((voice, index) => (
              <option key={`${voice.name}-${index}`} value={voice.name}>
                {voice.name} ({voice.ssmlGender})
              </option>
            ))}
          </select>
        </div>

        <div>
          <label htmlFor="speed-control" className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
            Speed: {speed.toFixed(1)}x
          </label>
          <input
            type="range"
            id="speed-control"
            min="0.25"
            max="4.0"
            step="0.25"
            value={speed}
            onChange={(e) => setSpeed(parseFloat(e.target.value))}
            className="w-full h-2 bg-gray-200 rounded-lg appearance-none cursor-pointer dark:bg-gray-700"
            disabled={isPlaying || isLoading}
          />
          <div className="flex justify-between text-xs text-gray-500 dark:text-gray-400 mt-1">
            <span>Slower</span>
            <span>Faster</span>
          </div>
        </div>

        <div>
          <label htmlFor="pitch-control" className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
            Pitch: {pitch.toFixed(1)}
          </label>
          <input
            type="range"
            id="pitch-control"
            min="-20.0"
            max="20.0"
            step="1.0"
            value={pitch}
            onChange={(e) => setPitch(parseFloat(e.target.value))}
            className="w-full h-2 bg-gray-200 rounded-lg appearance-none cursor-pointer dark:bg-gray-700"
            disabled={isPlaying || isLoading}
          />
          <div className="flex justify-between text-xs text-gray-500 dark:text-gray-400 mt-1">
            <span>Lower</span>
            <span>Higher</span>
          </div>
        </div>

        <div className="flex items-end">
          <div className="bg-blue-50 dark:bg-blue-900/30 text-blue-700 dark:text-blue-300 text-xs p-2 rounded inline-block">
            <p>Characters: {text.length}</p>
            <p>Estimated duration: ~{(text.length / 15).toFixed(0)} seconds</p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default VoiceReader;