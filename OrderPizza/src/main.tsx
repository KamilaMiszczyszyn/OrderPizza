import React from 'react';
import ReactDOM from 'react-dom/client';
import App from './App.tsx';
import { BrowserRouter } from 'react-router-dom';
import { AuthProvider } from './context/AuthContext.tsx';
import { ThemeProvider } from 'styled-components';
import theme from './styles/Theme.ts';
import { ShoppingCartProvider } from './context/ShoppingCartContext.tsx';

ReactDOM.createRoot(document.getElementById('root')!).render(
  <React.StrictMode>
    <AuthProvider>
      <ThemeProvider theme={theme}>
        <ShoppingCartProvider>
          <BrowserRouter>
            <App />
          </BrowserRouter>
        </ShoppingCartProvider>
      </ThemeProvider>
    </AuthProvider>
  </React.StrictMode>
);
