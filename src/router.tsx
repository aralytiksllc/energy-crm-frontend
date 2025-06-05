import { Authenticated } from '@refinedev/core';
import { ThemedLayoutV2 } from '@refinedev/antd';
import { Navigate, Outlet, Route } from 'react-router';
import { layoutConfig } from './routes';
import { Login } from './pages/login';
import { Register } from './pages/register';
import { ForgotPassword } from './pages/forgotPassword';
import { VendorsList } from './resources/vendors/pages/vendors-list';
import { VendorCreate } from './resources/vendors/pages/vendor-create';
import { VendorEdit } from './resources/vendors/pages/vendor-edit';
import { VendorShow } from './resources/vendors/pages/vendor-show';
import { ProductsList } from './resources/products/pages/products-list';
import { ProductCreate } from './resources/products/pages/product-create';
import { ProductEdit } from './resources/products/pages/product-edit';
import { ProductShow } from './resources/products/pages/product-show';

export const RouterComponent: React.FC = () => {
  return (
    <>
      {/* Public Routes */}
      <Route path="/login" element={<Login />} />
      <Route path="/register" element={<Register />} />
      <Route path="/forgot-password" element={<ForgotPassword />} />

      {/* Protected Routes */}
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
        {/* Vendor Routes */}
        <Route path="/vendors">
          <Route index element={<VendorsList />} />
          <Route path="create" element={<VendorCreate />} />
          <Route path="edit/:id" element={<VendorEdit />} />
          <Route path="show/:id" element={<VendorShow />} />
        </Route>

        {/* Product Routes */}
        <Route path="/products">
          <Route index element={<ProductsList />} />
          <Route path="create" element={<ProductCreate />} />
          <Route path="edit/:id" element={<ProductEdit />} />
          <Route path="show/:id" element={<ProductShow />} />
        </Route>

        {/* Redirect to vendors list by default */}
        <Route path="/" element={<Navigate to="/vendors" replace />} />
      </Route>
    </>
  );
};
