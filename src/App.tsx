import '@refinedev/antd/dist/reset.css';
import axios from 'axios';
import { Refine, RefineProps, Authenticated } from '@refinedev/core';
import { DevtoolsPanel, DevtoolsProvider } from '@refinedev/devtools';
import { RefineKbar, RefineKbarProvider } from '@refinedev/kbar';
import {
  ErrorComponent,
  ThemedLayoutV2,
  ThemedSiderV2,
  useNotificationProvider,
} from '@refinedev/antd';
import routerBindings, {
  CatchAllNavigate,
  DocumentTitleHandler,
  NavigateToResource,
  UnsavedChangesNotifier,
} from '@refinedev/react-router';
import { App } from 'antd';
import { BrowserRouter, Outlet, Route, Routes } from 'react-router';
import { Header } from './components/header';
import { ColorModeContextProvider } from './contexts/color-mode';
import { ForgotPassword } from './pages/forgotPassword';
import { Login } from './pages/login';
import { Register } from './pages/register';
import { authProvider } from './providers/auth';
import { createDataProvider } from './providers/data';
import { vendorsResource } from './resources/vendors';
import { VendorsList } from './resources/vendors/pages/vendors-list';
import { VendorCreate } from './resources/vendors/pages/vendor-create';
import { VendorEdit } from './resources/vendors/pages/vendor-edit';
import { VendorShow } from './resources/vendors/pages/vendor-show';

export const axiosInstance = axios.create({
  baseURL: 'http://localhost:3000',
});

const dataProvider = createDataProvider(axiosInstance);

const refineProps: RefineProps = {
  dataProvider,
  notificationProvider: useNotificationProvider,
  routerProvider: routerBindings,
  authProvider,
  resources: [vendorsResource],
  options: {
    syncWithLocation: true,
  },
};

export default function CoreFlow() {
  return (
    <BrowserRouter>
      <RefineKbarProvider>
        <ColorModeContextProvider>
          <App>
            <DevtoolsProvider>
              <Refine {...refineProps}>
                <Routes>
                  <Route
                    element={
                      <Authenticated
                        key="authenticated-inner"
                        fallback={<CatchAllNavigate to="/login" />}
                      >
                        <ThemedLayoutV2
                          Header={Header}
                          Sider={(props) => <ThemedSiderV2 {...props} fixed />}
                        >
                          <Outlet />
                        </ThemedLayoutV2>
                      </Authenticated>
                    }
                  >
                    <Route
                      index
                      element={<NavigateToResource resource="items" />}
                    />
                    <Route path="/vendors">
                      <Route index element={<VendorsList />} />
                      <Route path="create" element={<VendorCreate />} />
                      <Route path="edit/:id" element={<VendorEdit />} />
                      <Route path="show/:id" element={<VendorShow />} />
                    </Route>
                    <Route path="*" element={<ErrorComponent />} />
                  </Route>
                  <Route
                    element={
                      <Authenticated
                        key="authenticated-outer"
                        fallback={<Outlet />}
                      >
                        <NavigateToResource />
                      </Authenticated>
                    }
                  >
                    <Route path="/login" element={<Login />} />
                    <Route path="/register" element={<Register />} />
                    <Route
                      path="/forgot-password"
                      element={<ForgotPassword />}
                    />
                  </Route>
                </Routes>
                <RefineKbar />
                <UnsavedChangesNotifier />
                <DocumentTitleHandler />
              </Refine>
              <DevtoolsPanel />
            </DevtoolsProvider>
          </App>
        </ColorModeContextProvider>
      </RefineKbarProvider>
    </BrowserRouter>
  );
}
