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
import { Customers } from '@modules/customers';
import { Contracts } from '@modules/contracts';
import { ManageCustomers } from '@modules/manage-customers';
import { IUser } from '@interfaces/users';

// Role-based redirect component
const RoleBasedRedirect: React.FC = () => {
  const { data: identity, isLoading } = useGetIdentity<IUser>();

  // Show loading state while fetching identity
  if (isLoading || !identity) {
    return <Navigate to="/manage-customers" replace />;
  }

  return <Navigate to="/manage-customers" replace />;
};

export const Routes: React.FC = () => (
  <ReactRoutes>
    <Route
      element={
        <ColorModeContextProvider>
          {/* Temporarily disabled authentication protection */}
          {/* <Authenticated
            key="authenticated-inner"
            fallback={<CatchAllNavigate to="/login" />}
          > */}
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
          {/* </Authenticated> */}
        </ColorModeContextProvider>
      }
    >
      <Route index element={<RoleBasedRedirect />} />
      <Route path="/users" element={<Users />} />
      <Route path="/customers" element={<ManageCustomers />} />
      <Route path="/contracts" element={<Contracts />} />
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
