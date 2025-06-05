import { ResourceProps } from '@refinedev/core';
import { ThemedSiderV2 } from '@refinedev/antd';
import { Header } from './components/header';
import { Login } from './pages/login';
import { Register } from './pages/register';
import { ForgotPassword } from './pages/forgotPassword';
import { productsResource } from './resources/products';
import { vendorsResource } from './resources/vendors';
import { customersResource } from './resources/customers';

// Combine all resources
export const resources: ResourceProps[] = [
  {
    ...productsResource,
    meta: {
      ...productsResource.meta,
      order: 1, // This determines the order in the sidebar
    },
  },
  {
    ...vendorsResource,
    meta: {
      ...vendorsResource.meta,
      order: 2,
    },
  },
  {
    ...customersResource,
    meta: {
      ...customersResource.meta,
      order: 3,
    },
  },
];

// Define auth configuration
export const authConfig = {
  login: {
    path: '/login',
    component: Login,
  },
  register: {
    path: '/register',
    component: Register,
  },
  forgotPassword: {
    path: '/forgot-password',
    component: ForgotPassword,
  },
};

// Define layout configuration
export const layoutConfig = {
  Header,
  Sider: ThemedSiderV2,
};
