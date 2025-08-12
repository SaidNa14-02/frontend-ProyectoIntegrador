import React  from 'react'
import { createRoot } from 'react-dom/client'
import App from './App.jsx'
import AppRouter from './routes.jsx';

createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <AppRouter/>
  </React.StrictMode>
);