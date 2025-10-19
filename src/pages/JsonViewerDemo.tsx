import React, { useState } from 'react';
import JsonViewer from '../components/JsonViewer';
import { Button } from '../components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '../components/ui/card';
import { Textarea } from '../components/ui/textarea';

const JsonViewerDemo: React.FC = () => {
  const [jsonInput, setJsonInput] = useState('');
  const [parsedData, setParsedData] = useState(null);
  const [error, setError] = useState('');

  // Sample data for demonstration
  const sampleData = {
    name: "Beloveful Visions",
    type: "Photography Portfolio",
    regions: [
      {
        name: "Africa",
        countries: ["Egypt", "Morocco", "Kenya"],
        totalPhotos: 45
      },
      {
        name: "Asia",
        countries: ["China", "Hong Kong", "Thailand"],
        totalPhotos: 67
      }
    ],
    metadata: {
      createdAt: new Date().toISOString(),
      version: "1.0.0",
      features: {
        lightbox: true,
        responsiveImages: true,
        themes: ["light", "dark"]
      }
    },
    statistics: {
      totalVisitors: 12543,
      averageSessionTime: "4m 32s",
      bounceRate: 0.23
    }
  };

  const handleJsonParse = () => {
    try {
      const parsed = JSON.parse(jsonInput);
      setParsedData(parsed);
      setError('');
    } catch (err) {
      setError('Invalid JSON format');
      setParsedData(null);
    }
  };

  const loadSampleData = () => {
    setParsedData(sampleData);
    setJsonInput(JSON.stringify(sampleData, null, 2));
    setError('');
  };

  return (
    <div className="min-h-screen bg-background p-6">
      <div className="max-w-7xl mx-auto space-y-6">
        <div className="text-center space-y-2">
          <h1 className="text-3xl font-bold">JSON Viewer Demo</h1>
          <p className="text-muted-foreground">
            Interactive JSON viewer component for visualizing and exploring JSON data
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          {/* Input Section */}
          <Card>
            <CardHeader>
              <CardTitle>JSON Input</CardTitle>
              <CardDescription>
                Paste your JSON data here or use the sample data
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="space-y-2">
                <Button onClick={loadSampleData} className="w-full">
                  Load Sample Data
                </Button>
              </div>
              
              <Textarea
                value={jsonInput}
                onChange={(e) => setJsonInput(e.target.value)}
                placeholder="Enter or paste JSON data here..."
                className="min-h-[200px] font-mono text-sm"
              />
              
              <Button onClick={handleJsonParse} className="w-full">
                Parse & Visualize JSON
              </Button>
              
              {error && (
                <div className="text-red-500 text-sm p-2 bg-red-50 rounded">
                  {error}
                </div>
              )}
            </CardContent>
          </Card>

          {/* Viewer Section */}
          <Card>
            <CardHeader>
              <CardTitle>JSON Viewer</CardTitle>
              <CardDescription>
                Interactive visualization of your JSON data
              </CardDescription>
            </CardHeader>
            <CardContent>
              <div className="border rounded-lg min-h-[400px]">
                {parsedData ? (
                  <JsonViewer
                    data={parsedData}
                    theme="auto"
                    collapsed={1}
                    displayObjectSize={true}
                    displayDataTypes={true}
                    enableClipboard={true}
                  />
                ) : (
                  <div className="flex items-center justify-center h-[400px] text-muted-foreground">
                    No JSON data to display
                  </div>
                )}
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Features Section */}
        <Card>
          <CardHeader>
            <CardTitle>JsonViewer Features</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 text-sm">
              <div className="space-y-1">
                <h4 className="font-medium">Interactive Expansion</h4>
                <p className="text-muted-foreground">Click to expand/collapse objects and arrays</p>
              </div>
              <div className="space-y-1">
                <h4 className="font-medium">Theme Support</h4>
                <p className="text-muted-foreground">Auto-adapts to light/dark mode</p>
              </div>
              <div className="space-y-1">
                <h4 className="font-medium">Copy to Clipboard</h4>
                <p className="text-muted-foreground">Click any value to copy it</p>
              </div>
              <div className="space-y-1">
                <h4 className="font-medium">Type Information</h4>
                <p className="text-muted-foreground">Shows data types for each value</p>
              </div>
              <div className="space-y-1">
                <h4 className="font-medium">Object Size</h4>
                <p className="text-muted-foreground">Displays count of object properties</p>
              </div>
              <div className="space-y-1">
                <h4 className="font-medium">Syntax Highlighting</h4>
                <p className="text-muted-foreground">Color-coded JSON syntax</p>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
};

export default JsonViewerDemo;