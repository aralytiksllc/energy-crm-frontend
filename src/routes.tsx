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
  LogIn,
  ForgotPassword,
  UpdatePassword,
} from './pages/authentication';
// import {
//   ProjectsCreate,
//   ProjectsEdit,
//   ProjectsList,
//   ProjectsShow,
// } from './pages/projects';

import { TasksPage, TaskCreatePage, TaskEditPage } from './pages/tasks';

interface RoutesProps {}

export const Routes: React.FC<RoutesProps> = () => (
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
      <Route index element={<NavigateToResource resource="projects" />} />
      <Route path="/projects">
        <Route index element={<TasksPage />} />
        <Route path="create" element={<TaskCreatePage />} />
        <Route path="edit/:id" element={<TaskEditPage />} />
        <Route path="show/:id" element={<TaskEditPage />} />
      </Route>
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
      <Route path="/login" element={<LogIn />} />
      <Route path="/forgot-password" element={<ForgotPassword />} />
      <Route path="/update-password" element={<UpdatePassword />} />
    </Route>
  </ReactRoutes>
);
