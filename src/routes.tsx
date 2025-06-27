// External imports
import '@refinedev/antd/dist/reset.css';
import { ErrorComponent, ThemedLayoutV2, ThemedSiderV2 } from '@refinedev/antd';
import { Authenticated } from '@refinedev/core';
import { CatchAllNavigate, NavigateToResource } from '@refinedev/react-router';
import { Outlet, Route, Routes as ReactRoutes } from 'react-router';

// Internal imports
import { Header } from '@components/header';
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

export const Routes: React.FC = () => (
  <ReactRoutes>
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
      <Route index element={<NavigateToResource resource="users" />} />
      <Route index path="/dashboard" element={<Dashboard />} />
      <Route index path="/users" element={<Users />} />
      <Route index path="/tasks" element={<Tasks />} />
      <Route index path="/planning" element={<Planning />} />
      <Route index path="/projects" element={<Projects />} />
      <Route index path="/customers" element={<Customers />} />
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
