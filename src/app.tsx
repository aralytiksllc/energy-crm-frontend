import React, { useState } from 'react';
import { Refine } from '@refinedev/core';
import { RefineKbar, RefineKbarProvider } from '@refinedev/kbar';
import {
  ThemedLayoutV2,
  useNotificationProvider,
} from '@refinedev/antd';
import routerBindings, {
  DocumentTitleHandler,
  UnsavedChangesNotifier,
} from '@refinedev/react-router';
import { BrowserRouter, Routes, Route, Outlet } from 'react-router';
import { ColorModeContextProvider } from '@contexts/color-mode';
import { Header } from '@components/header';
import { CustomSider } from '@components/sider';
import { refineProps } from './config';
import { Routes as AppRoutes } from './routes';

const App: React.FC = () => {
  const [collapsed, setCollapsed] = useState(false);

  const handleCollapse = (collapsed: boolean) => {
    setCollapsed(collapsed);
  };

  return (
    <BrowserRouter>
      <RefineKbarProvider>
        <ColorModeContextProvider>
          <Refine
            {...refineProps}
            routerProvider={routerBindings}
            notificationProvider={useNotificationProvider}
            resources={refineProps.resources}
            options={{
              ...refineProps.options,
              syncWithLocation: true,
              warnWhenUnsavedChanges: true,
            }}
          >
            <Routes>
              <Route
                element={
                  <ThemedLayoutV2
                    Header={() => (
                      <Header 
                        collapsed={collapsed} 
                        onCollapse={handleCollapse} 
                      />
                    )}
                    Sider={() => (
                      <CustomSider 
                        collapsed={collapsed} 
                        onCollapse={handleCollapse} 
                      />
                    )}
                  >
                    <Outlet />
                  </ThemedLayoutV2>
                }
              >
                <Route path="*" element={<AppRoutes />} />
              </Route>
            </Routes>
            <RefineKbar />
            <UnsavedChangesNotifier />
            <DocumentTitleHandler />
          </Refine>
        </ColorModeContextProvider>
      </RefineKbarProvider>
    </BrowserRouter>
  );
};

export default App;
