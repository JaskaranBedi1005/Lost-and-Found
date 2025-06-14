import React from "react";
import { BrowserRouter } from "react-router-dom";
import { createRoot } from 'react-dom/client'
import App from './App.jsx'
import { SnackbarProvider } from "notistack"

createRoot(document.getElementById('root')).render(
  <BrowserRouter>
    <SnackbarProvider>
      <App />
    </SnackbarProvider>
  </BrowserRouter>
)
