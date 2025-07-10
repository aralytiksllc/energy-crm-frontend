// External imports
import '@refinedev/antd/dist/reset.css';
import { ErrorComponent, ThemedLayoutV2, ThemedSiderV2 } from '@refinedev/antd';
import { Authenticated } from '@refinedev/core';
import { CatchAllNavigate, NavigateToResource } from '@refinedev/react-router';
import { Outlet, Route, Routes as ReactRoutes } from 'react-router';

// Internal imports
import { Header } from '@components/header';
import { ColorModeContextProvider } from '@contexts/color-mode';
import {
  Register,
  Login,
  ForgotPassword,
  UpdatePassword,
} from '@modules/authentication';
import { Users } from '@modules/users';
import { Tasks } from '@modules/tasks';
import { Dashboard } from '@modules/dashboard';
import { Planning } from '@modules/planning';
import { Projects } from '@modules/projects';
import { Customers } from '@modules/customers';
import { PermissionsMatrix } from '@modules/permissions';

export const Routes: React.FC = () => (
  <ReactRoutes>
    <Route
      element={
        <ColorModeContextProvider>
          <Authenticated
            key="authenticated-inner"
            fallback={<CatchAllNavigate to="/login" />}
          >
            <ThemedLayoutV2
              Header={Header}
              Sider={(props) => (
                <ThemedSiderV2
                  {...props}
                  fixed
                  render={({ items, logout }) => (
                    <>
                      {items}
                      {logout}
                    </>
                  )}
                />
              )}
            >
              <Outlet />
            </ThemedLayoutV2>
          </Authenticated>
        </ColorModeContextProvider>
      }
    >
      <Route index element={<NavigateToResource resource="dashboard" />} />
      <Route path="/dashboard" element={<Dashboard />} />
      <Route path="/users" element={<Users />} />
      <Route path="/tasks" element={<Tasks />} />
      <Route path="/planning" element={<Planning />} />
      <Route path="/projects" element={<Projects />} />
      <Route path="/customers" element={<Customers />} />
      <Route path="/permissions" element={<PermissionsMatrix />} />
      <Route path="*" element={<ErrorComponent />} />
    </Route>
    <Route
      element={
        <Authenticated key="authenticated-outer" fallback={<Outlet />}>
          <NavigateToResource />
        </Authenticated>
      }
    >
      <Route path="/register" element={<Register />} />
      <Route path="/login" element={<Login />} />
      <Route path="/forgot-password" element={<ForgotPassword />} />
      <Route path="/update-password/:token" element={<UpdatePassword />} />
    </Route>
  </ReactRoutes>
);
