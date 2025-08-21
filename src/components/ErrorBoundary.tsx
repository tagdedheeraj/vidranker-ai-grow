
import React, { Component, ErrorInfo, ReactNode } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { AlertTriangle, RefreshCw, Shield } from "lucide-react";

interface Props {
  children?: ReactNode;
}

interface State {
  hasError: boolean;
  error?: Error;
  errorCount: number;
}

class ErrorBoundary extends Component<Props, State> {
  public state: State = {
    hasError: false,
    errorCount: 0
  };

  public static getDerivedStateFromError(error: Error): State {
    return { 
      hasError: true, 
      error,
      errorCount: 0 
    };
  }

  public componentDidCatch(error: Error, errorInfo: ErrorInfo) {
    console.error('ErrorBoundary caught an error:', error, errorInfo);
    
    // Log additional context for debugging
    console.error('Error stack:', error.stack);
    console.error('Component stack:', errorInfo.componentStack);
    
    // Increment error count to prevent infinite loops
    this.setState(prevState => ({
      errorCount: prevState.errorCount + 1
    }));

    // If too many errors, prevent further attempts
    if (this.state.errorCount > 3) {
      console.error('Too many errors detected, stopping error boundary resets');
    }
  }

  private handleReset = () => {
    if (this.state.errorCount <= 3) {
      console.log('Attempting to reset error boundary...');
      this.setState({ 
        hasError: false, 
        error: undefined,
        errorCount: this.state.errorCount + 1
      });
    } else {
      console.log('Maximum reset attempts reached, reloading app...');
      window.location.reload();
    }
  };

  private handleSafeReload = () => {
    try {
      // Clear any cached data that might be causing issues
      if (typeof window !== 'undefined') {
        localStorage.clear();
        sessionStorage.clear();
      }
      
      // Force reload
      window.location.href = '/';
    } catch (reloadError) {
      console.error('Safe reload failed:', reloadError);
      window.location.reload();
    }
  };

  public render() {
    if (this.state.hasError) {
      const isMaxErrors = this.state.errorCount > 3;
      
      return (
        <div className="min-h-screen flex items-center justify-center p-4 bg-background">
          <Card className="w-full max-w-md">
            <CardHeader className="text-center">
              <div className="mx-auto w-12 h-12 bg-destructive/10 rounded-full flex items-center justify-center mb-4">
                {isMaxErrors ? (
                  <Shield className="w-6 h-6 text-destructive" />
                ) : (
                  <AlertTriangle className="w-6 h-6 text-destructive" />
                )}
              </div>
              <CardTitle>
                {isMaxErrors ? 'App Protection Active' : 'Something went wrong'}
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <p className="text-sm text-muted-foreground text-center">
                {isMaxErrors 
                  ? 'The app has encountered multiple errors. We\'ll restart it safely to protect your data.'
                  : 'The app encountered an unexpected error. Don\'t worry, we can fix this.'
                }
              </p>
              
              {this.state.error && !isMaxErrors && (
                <details className="text-xs bg-muted p-2 rounded">
                  <summary className="cursor-pointer">Error details</summary>
                  <pre className="mt-2 whitespace-pre-wrap text-xs">
                    {this.state.error.message}
                  </pre>
                </details>
              )}
              
              <div className="space-y-2">
                {!isMaxErrors ? (
                  <div className="flex gap-2">
                    <Button 
                      onClick={this.handleReset}
                      className="flex-1"
                      variant="outline"
                    >
                      <RefreshCw className="w-4 h-4 mr-2" />
                      Try Again ({4 - this.state.errorCount} left)
                    </Button>
                    <Button 
                      onClick={this.handleSafeReload}
                      className="flex-1"
                    >
                      Safe Restart
                    </Button>
                  </div>
                ) : (
                  <Button 
                    onClick={this.handleSafeReload}
                    className="w-full"
                  >
                    <Shield className="w-4 h-4 mr-2" />
                    Restart App Safely
                  </Button>
                )}
              </div>
              
              <p className="text-xs text-muted-foreground text-center">
                VidRanker v1.0 • Crash Protection Active
              </p>
            </CardContent>
          </Card>
        </div>
      );
    }

    return this.props.children;
  }
}

export default ErrorBoundary;
