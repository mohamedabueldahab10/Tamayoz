import React, { Suspense } from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import App from './App';
import { BrowserRouter } from 'react-router-dom';
import { Provider } from 'react-redux';
import store from './redux/store';
import { ErrorBoundary } from 'react-error-boundary';
import Loading from './components/Loading';
import { QueryClient, QueryClientProvider } from 'react-query';
import { ReactQueryDevtools } from 'react-query/devtools';

const root = ReactDOM.createRoot(document.getElementById('root'));
const client = new QueryClient();
const ErrorFallback = ({ error, resetErrorBoundary }) => {
  return (
    <div role="alert">
      <p>⚠️Something went wrong:</p>
      <pre>{error.message}</pre>
      <button onClick={resetErrorBoundary}>Try again</button>
    </div>
  );
};
root.render(
  <Provider store={store}>
    <BrowserRouter>
      <Suspense fallback={<Loading />}>
        <ErrorBoundary FallbackComponent={ErrorFallback}>
          <QueryClientProvider client={client}>
            <App />
            <ReactQueryDevtools />
          </QueryClientProvider>
        </ErrorBoundary>
      </Suspense>
    </BrowserRouter>
  </Provider>
);
