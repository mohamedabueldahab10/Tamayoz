import React, { useState, useEffect } from 'react';

const ErrorBoundary = ({ children }) => {
  const [hasError, setHasError] = useState(false);
  const [errorInfo, setErrorInfo] = useState(null);

  const resetErrorBoundary = () => {
    setHasError(false);
    setErrorInfo(null);
  };

  useEffect(() => {
    const errorHandler = (error, errorInfo) => {
      setHasError(true);
      setErrorInfo(error);
      console.error('ErrorBoundary caught an error', error, errorInfo);
    };

    // Attach error handler
    const originalConsoleError = console.error;
    console.error = errorHandler;

    return () => {
      // Clean up and restore the original console.error
      console.error = originalConsoleError;
    };
  }, []);

  if (hasError) {
    return (
      <div role="alert">
        <p>Something went wrong:</p>
        <pre>{errorInfo?.toString()}</pre>
        <button onClick={resetErrorBoundary}>Try again</button>
      </div>
    );
  }

  return children;
};

export default ErrorBoundary;
