import React from 'react';
import ReactDOM from 'react-dom/client';
import App from './App';
import Exemplo from './Exemplo';

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <React.StrictMode>
    <App />
    <Exemplo />
  </React.StrictMode>
);