import React from 'react';
import ReactDOM from 'react-dom/client';
import App from './App';
import './styles/index.css';

import { ErrorBoundery } from './components/ErrorBoundery';

ReactDOM.createRoot(document.getElementById('root') as HTMLElement).render(
  <React.StrictMode>
    <ErrorBoundery fallback={<h1>An Error Has Occured</h1>}>
      <App />
    </ErrorBoundery>
  </React.StrictMode>
);
