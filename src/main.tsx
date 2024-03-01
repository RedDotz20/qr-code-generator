import React from 'react';
import ReactDOM from 'react-dom/client';
import { ChakraProvider } from '@chakra-ui/react';
import { ErrorBoundery } from './ErrorBoundery';
import App from './App';
import './index.css';

ReactDOM.createRoot(document.getElementById('root') as HTMLElement).render(
	<React.StrictMode>
		<ErrorBoundery fallback={<h1>An Error Has Occured</h1>}>
			<ChakraProvider>
				<App />
			</ChakraProvider>
		</ErrorBoundery>
	</React.StrictMode>
);
