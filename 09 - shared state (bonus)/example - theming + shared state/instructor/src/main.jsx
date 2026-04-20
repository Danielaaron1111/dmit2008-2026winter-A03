import { StrictMode } from 'react';
import { createRoot } from 'react-dom/client';
import './index.css';
import App from './App.jsx';
import { ThemeProvider } from './context/ThemeProvider';

// anything that gets wrapped gets access to the shared state.
// e.g. if my shared state were for user auth, I could choose to
//      wrap only the component groups / pages that needed auth etc.
createRoot(document.getElementById('root')).render(
  <StrictMode>
    <ThemeProvider>
      <App />
    </ThemeProvider>
  </StrictMode>,
);
