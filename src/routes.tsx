// External imports
import '@refinedev/antd/dist/reset.css';
import { ErrorComponent, ThemedLayoutV2, ThemedSiderV2 } from '@refinedev/antd';
import { Authenticated } from '@refinedev/core';
import { CatchAllNavigate, NavigateToResource } from '@refinedev/react-router';
import { Outlet, Route, Routes as ReactRoutes } from 'react-router';

// Internal imports
import { Header } from './components/header';
import {
  Register,
  Login,
  ForgotPassword,
  UpdatePassword,
} from './pages/authentication';
import { Users } from './pages/users';
import { Tasks } from './pages/tasks';
import { Dashboard } from './pages/dashboard';
import { Projects } from './pages/projects';
import { Customers } from './pages/customers';

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
      <Route path="/projects" element={<Projects />}></Route>
      <Route index path="/tasks" element={<Tasks />} />
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
