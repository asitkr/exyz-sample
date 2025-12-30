import React from 'react';
import { Provider } from 'react-redux';
import ReactDOM from 'react-dom/client';
import { Toaster } from 'react-hot-toast';
import reportWebVitals from './reportWebVitals';

import './index.css';
import App from './App';
import { ThemeProvider } from './context/ThemeProvider';
import { store } from './redux/store';

const root = ReactDOM.createRoot(
  document.getElementById('root') as HTMLElement
);
root.render(
  <React.StrictMode>
    <ThemeProvider>
      <Provider store={store}>
        <App />
      </Provider>
      <Toaster
        position="top-center"
        toastOptions={{
          duration: 4000,
          className:
            'dark:bg-slate-800 dark:text-white dark:border dark:border-white/10 shadow-xl',
        }}
      />
    </ThemeProvider>
  </React.StrictMode>
);

reportWebVitals();
