import { RefineProps } from '@refinedev/core';
import { useNotificationProvider } from '@refinedev/antd';
import routerBindings from '@refinedev/react-router';
import { authProvider } from './providers/auth';
import { createDataProvider } from './providers/data';
import { resources, authConfig } from './routes';
import axios from 'axios';

export const axiosInstance = axios.create({
  baseURL: 'http://localhost:3000',
});

const dataProvider = createDataProvider(axiosInstance);

export const refineConfig: Omit<RefineProps, 'children'> = {
  dataProvider,
  notificationProvider: useNotificationProvider,
  routerProvider: routerBindings,
  authProvider,
  resources,
  options: {
    syncWithLocation: true,
    warnWhenUnsavedChanges: true,
    useNewQueryKeys: true,
    projectId: '0HcJGd-NygC1C-sWSoXm',
  },
  LoginPage: authConfig.login.component,
  RegisterPage: authConfig.register.component,
  ForgotPasswordPage: authConfig.forgotPassword.component,
};
