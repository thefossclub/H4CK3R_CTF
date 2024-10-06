import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import App from './App';

const root = ReactDOM.createRoot(
  document.getElementById('root') as HTMLElement
);
root.render(
  <React.StrictMode>
    <div className="custom-cursor" id="custom-cursor"></div>
    <App />
  </React.StrictMode>
);

// Add custom cursor logic
document.addEventListener('mousemove', (e) => {
  const cursor = document.getElementById('custom-cursor');
  if (cursor) {
    cursor.style.left = e.clientX + 'px';
    cursor.style.top = e.clientY + 'px';
  }
});