import React from 'react';
import ReactDOM from 'react-dom/client';
import App from './App';
import './index.css';

import { ErrorBoundery } from './ErrorBoundery';

ReactDOM.createRoot(document.getElementById('root') as HTMLElement).render(
	<React.StrictMode>
		<ErrorBoundery fallback={<h1>An Error Has Occured</h1>}>
			<App />
		</ErrorBoundery>
	</React.StrictMode>
);
