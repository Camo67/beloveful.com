import React, { useEffect, useState } from 'react';
import prefixMappedData from '@/lib/cloudinary-assets/prefix-mapped.json';

const TestData: React.FC = () => {
  const [data, setData] = useState<any>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    try {
      console.log('Prefix mapped data:', prefixMappedData);
      setData(prefixMappedData);
      setLoading(false);
    } catch (err) {
      console.error('Error loading data:', err);
      setError(err instanceof Error ? err.message : 'Unknown error');
      setLoading(false);
    }
  }, []);

  if (loading) {
    return <div style={{ color: 'white', padding: '20px' }}>Loading data...</div>;
  }

  if (error) {
    return <div style={{ color: 'red', padding: '20px' }}>Error: {error}</div>;
  }

  return (
    <div style={{ color: 'white', padding: '20px' }}>
      <h1>Prefix-mapped Data Test</h1>
      <pre>{JSON.stringify(data, null, 2)}</pre>
    </div>
  );
};

export default TestData;