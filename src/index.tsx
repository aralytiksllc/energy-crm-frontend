// External
import * as React from 'react';
import { createRoot } from 'react-dom/client';

import '@refinedev/antd/dist/reset.css';

// Internal
import { App } from './app';

const container = document.getElementById('root') as HTMLElement;

const root = createRoot(container);

root.render(
  <React.StrictMode>
    <App />
  </React.StrictMode>,
);
