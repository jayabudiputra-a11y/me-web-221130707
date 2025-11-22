// File: src/main.jsx

import React from 'react';
import ReactDOM from 'react-dom/client';
// Import BrowserRouter untuk Routing
import { BrowserRouter } from 'react-router-dom'; 
import App from './App.jsx';
import './index.css';

ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <BrowserRouter>
      <App />
    </BrowserRouter>
  </React.StrictMode>
);