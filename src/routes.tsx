// External imports
import '@refinedev/antd/dist/reset.css';
import { ErrorComponent } from '@refinedev/antd';
import { Authenticated, useGetIdentity } from '@refinedev/core';
import { NavigateToResource } from '@refinedev/react-router';
import { Route, Routes as ReactRoutes, Outlet } from 'react-router';
import { Navigate } from 'react-router';

// Internal imports
import {
  Register,
  Login,
  ForgotPassword,
  UpdatePassword,
} from '@modules/authentication';
import { Users } from '@modules/users';
import { Contracts } from '@modules/contracts';
import { ManageCustomers } from '@modules/manage-customers';
import { NewCustomer } from '@modules/new-customer';
import { Forecast } from '@modules/forecast';
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

export const Routes: React.FC = () => {
  return (
    <ReactRoutes>
      <Route
        element={
          <>
            {/* Temporarily disabled authentication protection */}
            {/* <Authenticated
              key="authenticated-inner"
              fallback={<CatchAllNavigate to="/login" />}
            > */}
              <Outlet />
            {/* </Authenticated> */}
          </>
        }
      >
        <Route index element={<RoleBasedRedirect />} />
        <Route path="/users" element={<Users />} />
        <Route path="/customers" element={<ManageCustomers />} />
        <Route path="/contracts" element={<Contracts />} />
        <Route path="/new-customer" element={<NewCustomer />} />
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
};
