
import React from 'react';
import ReactDOM from 'react-dom/client';
import App from './App';

const startApp = () => {
  const rootElement = document.getElementById('root');
  if (!rootElement) return;

  try {
    const root = ReactDOM.createRoot(rootElement);
    root.render(
      <React.StrictMode>
        <App />
      </React.StrictMode>
    );
  } catch (err) {
    console.error("React Mount Error:", err);
    rootElement.innerHTML = `<div style="color:white; padding:20px; text-align:center; font-family:sans-serif;">
      <h2>Sistem Başlatılamadı</h2>
      <p>Lütfen sayfayı yenileyiniz.</p>
    </div>`;
  }
};

if (document.readyState === 'loading') {
  document.addEventListener('DOMContentLoaded', startApp);
} else {
  startApp();
}
