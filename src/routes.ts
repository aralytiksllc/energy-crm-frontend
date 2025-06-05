import { ResourceProps } from '@refinedev/core';
import { ThemedSiderV2 } from '@refinedev/antd';
import { Header } from './components/header';
import { Login } from './pages/login';
import { Register } from './pages/register';
import { ForgotPassword } from './pages/forgotPassword';
import { productsResource } from './resources/products';
import { vendorsResource } from './resources/users';
import { customersResource } from './resources/customers';

export const resources: ResourceProps[] = [
  {
    ...productsResource,
    meta: {
      ...productsResource.meta,
      order: 1,
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

export const layoutConfig = {
  Header,
  Sider: ThemedSiderV2,
};
