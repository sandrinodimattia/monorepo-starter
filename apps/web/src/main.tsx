import './index.css';
import { StrictMode } from 'react';
import { createRoot } from 'react-dom/client';

import { Calculator } from '@/components/calculator.js';

const rootElement = document.getElementById('root');
if (rootElement) {
  createRoot(rootElement).render(
    <StrictMode>
      <Calculator />
    </StrictMode>
  );
} else {
  throw new Error('Root element with id "root" not found.');
}
