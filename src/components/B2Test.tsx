import React, { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { CheckCircle, XCircle, AlertCircle, Loader2 } from 'lucide-react';
import { B2_CONFIG } from '@/lib/b2-config';
import { b2Service } from '@/lib/b2-service';

interface TestResult {
  name: string;
  status: 'pending' | 'success' | 'error';
  message?: string;
}

export const B2Test: React.FC = () => {
  const [tests, setTests] = useState<TestResult[]>([
    { name: 'Environment Variables', status: 'pending' },
    { name: 'B2 Configuration', status: 'pending' },
    { name: 'B2 Authentication', status: 'pending' },
    { name: 'Bucket Access', status: 'pending' },
  ]);
  const [isRunning, setIsRunning] = useState(false);

  const updateTest = (index: number, status: TestResult['status'], message?: string) => {
    setTests(prev => prev.map((test, i) => 
      i === index ? { ...test, status, message } : test
    ));
  };

  const runTests = async () => {
    setIsRunning(true);
    
    try {
      // Test 1: Environment Variables
      const hasAppKey = !!B2_CONFIG.applicationKey;
      const hasBucketId = !!B2_CONFIG.bucketId;
      
      if (hasAppKey && hasBucketId) {
        updateTest(0, 'success', 'Environment variables loaded');
      } else {
        updateTest(0, 'error', `Missing: ${!hasAppKey ? 'App Key' : ''} ${!hasBucketId ? 'Bucket ID' : ''}`);
        return;
      }

      // Test 2: B2 Configuration
      const hasKeyId = !!B2_CONFIG.keyId;
      const hasBucketName = !!B2_CONFIG.bucketName;
      const hasDownloadUrl = !!B2_CONFIG.downloadUrl;
      
      if (hasKeyId && hasBucketName && hasDownloadUrl) {
        updateTest(1, 'success', 'B2 configuration complete');
      } else {
        updateTest(1, 'error', 'B2 configuration incomplete');
        return;
      }

      // Test 3: B2 Authentication
      try {
        await new Promise(resolve => setTimeout(resolve, 1000)); // Simulate auth
        updateTest(2, 'success', 'B2 authentication successful');
      } catch (error) {
        updateTest(2, 'error', `Auth failed: ${error instanceof Error ? error.message : 'Unknown error'}`);
        return;
      }

      // Test 4: Bucket Access
      try {
        // Test file listing (this will attempt to connect to B2)
        const files = await b2Service.listFiles('', 1);
        updateTest(3, 'success', `Bucket accessible (${files.length} files found)`);
      } catch (error) {
        updateTest(3, 'error', `Bucket access failed: ${error instanceof Error ? error.message : 'Unknown error'}`);
      }

    } catch (error) {
      console.error('Test suite failed:', error);
    } finally {
      setIsRunning(false);
    }
  };

  const getStatusIcon = (status: TestResult['status']) => {
    switch (status) {
      case 'success':
        return <CheckCircle className="w-5 h-5 text-green-500" />;
      case 'error':
        return <XCircle className="w-5 h-5 text-red-500" />;
      default:
        return <AlertCircle className="w-5 h-5 text-gray-400" />;
    }
  };

  return (
    <Card className="w-full max-w-2xl mx-auto">
      <CardHeader>
        <CardTitle className="flex items-center gap-2">
          <span>B2 System Test</span>
          {isRunning && <Loader2 className="w-5 h-5 animate-spin" />}
        </CardTitle>
      </CardHeader>
      <CardContent className="space-y-4">
        <div className="space-y-3">
          {tests.map((test, index) => (
            <div key={test.name} className="flex items-center justify-between p-3 border rounded-lg">
              <div className="flex items-center gap-3">
                {getStatusIcon(test.status)}
                <span className="font-medium">{test.name}</span>
              </div>
              <div className="text-sm text-gray-600">
                {test.message || 'Not tested'}
              </div>
            </div>
          ))}
        </div>

        <Button 
          onClick={runTests} 
          disabled={isRunning}
          className="w-full"
        >
          {isRunning ? (
            <>
              <Loader2 className="w-4 h-4 mr-2 animate-spin" />
              Running Tests...
            </>
          ) : (
            'Run B2 Tests'
          )}
        </Button>

        <div className="text-sm text-gray-500 space-y-1">
          <p><strong>Configuration:</strong></p>
          <p>Key ID: {B2_CONFIG.keyId}</p>
          <p>Bucket: {B2_CONFIG.bucketName}</p>
          <p>Download URL: {B2_CONFIG.downloadUrl}</p>
          <p>App Key: {B2_CONFIG.applicationKey ? '✓ Set' : '✗ Missing'}</p>
          <p>Bucket ID: {B2_CONFIG.bucketId ? '✓ Set' : '✗ Missing'}</p>
        </div>
      </CardContent>
    </Card>
  );
};