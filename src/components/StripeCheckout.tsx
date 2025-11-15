import { useState } from 'react';
import { Button } from '@/components/ui/button';

interface StripeCheckoutProps {
  priceId: string;
  quantity: number;
  productName: string;
}

export default function StripeCheckout({ priceId, quantity, productName }: StripeCheckoutProps) {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const handleCheckout = async () => {
    setLoading(true);
    setError(null);
    
    try {
      const response = await fetch('/api/create-checkout-session', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ priceId, quantity }),
      });

      const data = await response.json();

      if (!response.ok || !data?.url) {
        throw new Error(data?.error || 'Unable to start checkout');
      }

      window.location.href = data.url;
    } catch (err) {
      console.error('Error:', err);
      setError(err instanceof Error ? err.message : 'Unexpected checkout error');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="space-y-1">
      <Button 
        onClick={handleCheckout}
        disabled={loading}
        className="w-full"
      >
        {loading ? 'Processing...' : `Buy ${quantity} ${productName}`}
      </Button>
      {error ? (
        <p className="text-xs text-red-600 dark:text-red-500" aria-live="polite">
          {error}
        </p>
      ) : null}
    </div>
  );
}
