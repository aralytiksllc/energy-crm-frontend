// External imports
import '@refinedev/antd/dist/reset.css';
import { App as AntdApp } from 'antd';
import { BrowserRouter } from 'react-router';
import { Refine } from '@refinedev/core';
import { DevtoolsPanel, DevtoolsProvider } from '@refinedev/devtools';
import { RefineKbar, RefineKbarProvider } from '@refinedev/kbar';
import {
  DocumentTitleHandler,
  UnsavedChangesNotifier,
} from '@refinedev/react-router';

// Internal imports
import { ColorModeContextProvider } from './contexts/color-mode';
import { refineProps } from './config';
import { Routes } from './routes';

interface AppProps {}

export const App: React.FC<AppProps> = () => (
  <BrowserRouter>
    <RefineKbarProvider>
      <ColorModeContextProvider>
        <AntdApp>
          <DevtoolsProvider>
            <Refine {...refineProps}>
              <Routes />
              <RefineKbar />
              <UnsavedChangesNotifier />
              <DocumentTitleHandler />
            </Refine>
            <DevtoolsPanel />
          </DevtoolsProvider>
        </AntdApp>
      </ColorModeContextProvider>
    </RefineKbarProvider>
  </BrowserRouter>
);
