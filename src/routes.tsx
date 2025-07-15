// External imports
import '@refinedev/antd/dist/reset.css';
import { ErrorComponent, ThemedLayoutV2, ThemedSiderV2 } from '@refinedev/antd';
import { Authenticated, useGetIdentity, CanAccess } from '@refinedev/core';
import { CatchAllNavigate, NavigateToResource } from '@refinedev/react-router';
import { Outlet, Route, Routes as ReactRoutes } from 'react-router';
import { Navigate } from 'react-router';

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
import { TasksKanban } from '@modules/tasks';
import { Dashboard } from '@modules/dashboard';
import { Planning } from '@modules/planning';
import { Projects } from '@modules/projects';
import { Customers } from '@modules/customers';
import { PermissionsMatrix } from '@modules/permissions';
import { IUser } from '@interfaces/users';
import { Result } from 'antd';

// Role-based redirect component
const RoleBasedRedirect: React.FC = () => {
  const { data: identity, isLoading } = useGetIdentity<IUser>();

  // Show loading state while fetching identity
  if (isLoading || !identity) {
    return <Navigate to="/dashboard" replace />;
  }

  if (identity.role?.name === 'manager') {
    return <Navigate to="/dashboard" replace />;
  } else if (identity.role?.name === 'user') {
    return <Navigate to="/tasks" replace />;
  }

  // Fallback for unknown roles
  return <Navigate to="/dashboard" replace />;
};

// Protected route wrapper for permissions
const ProtectedPermissions: React.FC = () => {
  return (
    <CanAccess
      resource="permissions"
      action="list"
      fallback={<Navigate to="/dashboard" replace />}
    >
      <PermissionsMatrix />
    </CanAccess>
  );
};

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
      <Route index element={<RoleBasedRedirect />} />
      <Route path="/dashboard" element={<Dashboard />} />
      <Route path="/users" element={<Users />} />
      <Route path="/tasks" element={<TasksKanban />} />
      <Route path="/planning" element={<Planning />} />
      <Route path="/projects" element={<Projects />} />
      <Route path="/customers" element={<Customers />} />
      <Route path="/permissions" element={<ProtectedPermissions />} />
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
