// External
import '@refinedev/antd/dist/reset.css';

import * as React from 'react';
import { App as AntdApp } from 'antd';
import { BrowserRouter } from 'react-router';
import { Refine } from '@refinedev/core';
import { DevtoolsPanel, DevtoolsProvider } from '@refinedev/devtools';
import { RefineKbar, RefineKbarProvider } from '@refinedev/kbar';
import { DocumentTitleHandler } from '@refinedev/react-router';
import { UnsavedChangesNotifier } from '@refinedev/react-router';

// Internal
import { ColorModeContextProvider } from './contexts/color-mode';
import { appConfig } from './app.config';
import { AppRoutes } from './app.routes';

import './app.styles.css';

type AppProps = {};

export const App: React.FC<AppProps> = () => (
  <BrowserRouter>
    <RefineKbarProvider>
      <ColorModeContextProvider>
        <AntdApp>
          <DevtoolsProvider>
            <Refine {...appConfig}>
              <AppRoutes />
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