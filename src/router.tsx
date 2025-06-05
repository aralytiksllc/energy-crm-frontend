import { Authenticated } from '@refinedev/core';
import { ThemedLayoutV2 } from '@refinedev/antd';
import { Navigate, Outlet, Route } from 'react-router';
import { layoutConfig } from './routes';
import { Login } from './pages/login';
import { Register } from './pages/register';
import { ForgotPassword } from './pages/forgotPassword';
import { UsersList } from './resources/users/pages/users-list';
import { UsersCreate } from './resources/users/pages/users-create';
import { UsersEdit } from './resources/users/pages/users-edit';
import { UsersShow } from './resources/users/pages/users-show';

export const RouterComponent: React.FC = () => {
  return (
    <>
      <Route path="/login" element={<Login />} />
      <Route path="/register" element={<Register />} />
      <Route path="/forgot-password" element={<ForgotPassword />} />

      <Route
        element={
          <Authenticated
            fallback={<Navigate to="/login" />}
            loading={<div>Loading...</div>}
            v3LegacyAuthProviderCompatible
          >
            <ThemedLayoutV2
              Header={layoutConfig.Header}
              Sider={layoutConfig.Sider}
            >
              <Outlet />
            </ThemedLayoutV2>
          </Authenticated>
        }
      >
        <Route path="/users">
          <Route index element={<UsersList />} />
          <Route path="create" element={<UsersCreate />} />
          <Route path="edit/:id" element={<UsersEdit />} />
          <Route path="show/:id" element={<UsersShow />} />
        </Route>

        <Route path="/" element={<Navigate to="/vendors" replace />} />
      </Route>
    </>
  );
};
