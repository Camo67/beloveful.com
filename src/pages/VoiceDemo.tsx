import React from 'react';
import { Header } from '@/components/Header';
import FooterStrip from '@/components/FooterStrip';
import PageContainer from '@/components/PageContainer';
import VoiceReader from '@/components/VoiceReader';

const VoiceDemoPage: React.FC = () => {
  const sampleText = `
    Welcome to Beloveful.com, a travel photography website showcasing the beautiful work of Tony Menias. 
    Our mission is to capture the essence of places through photography, bringing distant lands closer to home.
    
    Through our carefully curated galleries, you'll discover stunning landscapes, vibrant cultures, and moments 
    frozen in time. Each photograph tells a story of places near and far, inviting you to experience the world 
    through our lens.
    
    From the bustling streets of India to the serene fjords of Norway, our collections transport you across 
    continents, offering glimpses into diverse cultures and breathtaking natural wonders. Every image represents 
    hours of patient waiting, creative vision, and technical expertise.
    
    Explore our galleries, learn about upcoming workshops, and discover limited edition prints available for purchase. 
    Join us on this journey of discovery and wonder.
  `;

  return (
    <div className="min-h-screen flex flex-col">
      <Header variant="default" />
      
      <main className="flex-grow">
        <PageContainer className="py-12">
          <div className="max-w-3xl mx-auto">
            <h1 className="text-3xl md:text-4xl font-light mb-8 text-black dark:text-white text-center">
              Text-to-Speech Demo
            </h1>
            
            <div className="bg-white dark:bg-gray-800 rounded-xl shadow-md p-6 mb-8">
              <h2 className="text-xl font-semibold mb-4 text-gray-900 dark:text-white">About This Feature</h2>
              
              <p className="text-gray-700 dark:text-gray-300 mb-4">
                Our text-to-speech functionality allows visitors to listen to content on our site. 
                This feature enhances accessibility and provides an alternative way to consume our articles and descriptions.
              </p>
              
              <p className="text-gray-700 dark:text-gray-300">
                Using Google Cloud Text-to-Speech technology, we provide natural-sounding voices in multiple languages 
                and accents. Adjust the settings to customize your listening experience.
              </p>
            </div>
            
            <div className="bg-blue-50 dark:bg-blue-900/20 border border-blue-200 dark:border-blue-800 rounded-xl p-6 mb-8">
              <VoiceReader 
                text={sampleText} 
                title="Listen to Our Story" 
                className="bg-white dark:bg-gray-800"
              />
            </div>
            
            <div className="bg-white dark:bg-gray-800 rounded-xl shadow-md p-6">
              <h2 className="text-xl font-semibold mb-4 text-gray-900 dark:text-white">How It Works</h2>
              
              <ol className="list-decimal pl-5 space-y-2 text-gray-700 dark:text-gray-300">
                <li>Select the "Listen" button to begin audio playback</li>
                <li>Choose from multiple voice options to customize the sound</li>
                <li>Adjust the speed and pitch to your preference</li>
                <li>Use the stop button to pause playback at any time</li>
              </ol>
              
              <div className="mt-6 p-4 bg-gray-50 dark:bg-gray-700/50 rounded-lg">
                <h3 className="font-medium text-gray-900 dark:text-white mb-2">Technical Details</h3>
                <p className="text-gray-700 dark:text-gray-300 text-sm">
                  This implementation uses Google Cloud Text-to-Speech API to convert text to natural-sounding audio. 
                  The service offers multiple voice types and customization options. To use this feature in production, 
                  you'll need to configure your Google Cloud credentials in the environment variables.
                </p>
              </div>
            </div>
          </div>
        </PageContainer>
      </main>
      
      <FooterStrip />
    </div>
  );
};

export default VoiceDemoPage;