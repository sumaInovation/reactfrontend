import React from 'react';
import ReactDOM from 'react-dom/client';
import "../node_modules/react-bootstrap/dist/react-bootstrap"
import "../node_modules/bootstrap/dist/css/bootstrap.css"

import './index.css';
import App from './App';
import { WebSocketProvider } from './Components/Common/WebSocketContext'; // Import WebSocket provider

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <React.StrictMode>
    {/* Waraping websocket provider */}
    <WebSocketProvider>
    <App />
    </WebSocketProvider>
    
  </React.StrictMode>
);


