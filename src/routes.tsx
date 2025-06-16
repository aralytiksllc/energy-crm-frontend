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
import { UsersCreate, UsersEdit, UsersList, UsersShow } from './pages/users';
import {
  ProjectsList,
  ProjectsCreate,
  ProjectsEdit,
  ProjectsShow,
} from './pages/projects';
import MultipleContainers from './pages/projects/multiple-containers';

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
      <Route index element={<NavigateToResource resource="users" />} />
      <Route path="/users">
        <Route index element={<UsersList />} />
        <Route path="create" element={<UsersCreate />} />
        <Route path="edit/:id" element={<UsersEdit />} />
        <Route path="show/:id" element={<UsersShow />} />
      </Route>
      <Route path="/projects">
        <Route index element={<ProjectsList />} />
        <Route path="create" element={<ProjectsCreate />} />
        <Route path="edit/:id" element={<ProjectsEdit />} />
        <Route path="show/:id" element={<ProjectsShow />} />
        <Route path=":id/board" element={<MultipleContainers />} />
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
      <Route path="/update-password/:token" element={<UpdatePassword />} />
    </Route>
  </ReactRoutes>
);
