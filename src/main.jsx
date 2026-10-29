import React from 'react';
import ReactDOM from 'react-dom/client';
import App from './App.jsx';
import './index.css';
import { AppProvider } from './context/AppContext.jsx'; // <-- IMPORTA ESTO

ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <AppProvider>
      {' '}
      {/* <-- ENVUELVE A <App /> */}
      <App />
    </AppProvider>
  </React.StrictMode>
);
