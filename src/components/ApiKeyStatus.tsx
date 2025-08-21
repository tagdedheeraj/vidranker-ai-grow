
import { useState, useEffect } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Alert, AlertDescription } from '@/components/ui/alert';
import { Button } from '@/components/ui/button';
import { AlertCircle, CheckCircle, ExternalLink, Key } from 'lucide-react';
import { AimlApiService } from '@/services/aimlApiService';

export const ApiKeyStatus = () => {
  const [isChecking, setIsChecking] = useState(false);
  const [apiStatus, setApiStatus] = useState<'checking' | 'valid' | 'invalid' | 'verification-needed'>('checking');
  const [errorMessage, setErrorMessage] = useState<string>('');

  const checkApiStatus = async () => {
    setIsChecking(true);
    setErrorMessage('');
    
    try {
      const aimlService = new AimlApiService();
      const isValid = await aimlService.isAvailable();
      
      if (isValid) {
        setApiStatus('valid');
      } else {
        setApiStatus('verification-needed');
        setErrorMessage('API key requires billing verification');
      }
    } catch (error) {
      setApiStatus('invalid');
      setErrorMessage(error instanceof Error ? error.message : 'Unknown error');
    } finally {
      setIsChecking(false);
    }
  };

  useEffect(() => {
    checkApiStatus();
  }, []);

  const getStatusContent = () => {
    switch (apiStatus) {
      case 'valid':
        return {
          icon: <CheckCircle className="w-5 h-5 text-green-600" />,
          title: 'AI/ML API Status: Active',
          description: 'Your API key is valid and ready to generate images.',
          variant: 'default' as const,
          color: 'text-green-700'
        };
      case 'verification-needed':
        return {
          icon: <AlertCircle className="w-5 h-5 text-orange-600" />,
          title: 'API Key Needs Verification',
          description: 'Your AI/ML API key requires billing verification to generate images.',
          variant: 'destructive' as const,
          color: 'text-orange-700'
        };
      case 'invalid':
        return {
          icon: <AlertCircle className="w-5 h-5 text-red-600" />,
          title: 'API Key Invalid',
          description: 'There is an issue with your AI/ML API key.',
          variant: 'destructive' as const,
          color: 'text-red-700'
        };
      default:
        return {
          icon: <Key className="w-5 h-5 text-blue-600" />,
          title: 'Checking API Status...',
          description: 'Validating your AI/ML API key...',
          variant: 'default' as const,
          color: 'text-blue-700'
        };
    }
  };

  const status = getStatusContent();

  return (
    <Card className="glass">
      <CardHeader>
        <CardTitle className="flex items-center gap-2">
          {status.icon}
          {status.title}
        </CardTitle>
      </CardHeader>
      <CardContent className="space-y-4">
        <Alert variant={status.variant}>
          <AlertDescription className={status.color}>
            {status.description}
            {errorMessage && (
              <div className="mt-2 text-sm">
                Error: {errorMessage}
              </div>
            )}
          </AlertDescription>
        </Alert>

        {apiStatus === 'verification-needed' && (
          <div className="space-y-3">
            <p className="text-sm text-muted-foreground">
              To use AI image generation, you need to complete billing verification on AI/ML API:
            </p>
            <div className="flex gap-2">
              <Button
                onClick={() => window.open('https://aimlapi.com/app/billing/verification', '_blank')}
                className="flex items-center gap-2"
              >
                <ExternalLink className="w-4 h-4" />
                Complete Verification
              </Button>
              <Button
                onClick={checkApiStatus}
                disabled={isChecking}
                variant="outline"
              >
                {isChecking ? 'Checking...' : 'Recheck Status'}
              </Button>
            </div>
          </div>
        )}

        {(apiStatus === 'invalid' || apiStatus === 'checking') && (
          <Button
            onClick={checkApiStatus}
            disabled={isChecking}
            variant="outline"
            className="w-full"
          >
            {isChecking ? 'Checking...' : 'Check API Status'}
          </Button>
        )}
      </CardContent>
    </Card>
  );
};
