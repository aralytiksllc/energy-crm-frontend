import { RefineProps } from '@refinedev/core';
import { useNotificationProvider } from '@refinedev/antd';
import routerBindings from '@refinedev/react-router';
import {
  UserOutlined,
  GlobalOutlined,
  FileTextOutlined,
  TeamOutlined,
} from '@ant-design/icons';

import { authProvider, dataProvider, accessControlProvider } from '@providers';
import { LogoSvg } from '@components/logo-svg';

export const refineProps: RefineProps = {
  authProvider: authProvider,
  dataProvider: dataProvider,
  accessControlProvider: accessControlProvider,
  routerProvider: routerBindings,
  notificationProvider: useNotificationProvider,
  resources: [
    
    {
      name: 'users',
      list: '/users',
      meta: {
        canDelete: true,
        canEdit: false,
        icon: <UserOutlined />,
      },
    },
    {
      name: 'customers',
      list: '/customers',
      meta: {
        canDelete: true,
        icon: <GlobalOutlined />,
      },
    },
    {
      name: 'contracts',
      list: '/contracts',
      create: '/contracts/create',
      edit: '/contracts/edit/:id',
      show: '/contracts/show/:id',
      meta: {
        canDelete: true,
        icon: <FileTextOutlined />,
      },
    },
    {
      name: 'manage-customers',
      list: '/manage-customers',
      meta: {
        label: 'Manage Customers',
        icon: <TeamOutlined />,
      },
    },
    {
      name: 'roles',
      meta: {
        hide: true,
      },
    },
    {
      name: 'role-permissions',
      meta: {
        hide: true,
      },
    },
  ],
  options: {
    syncWithLocation: false,
    warnWhenUnsavedChanges: true,
    useNewQueryKeys: true,
    projectId: 'DLUNzF-hNHv7s-rovOa5',
    title: {
      icon: <LogoSvg width={24} height={24} fill="#000" />,
      text: 'MDA Energy',
    },
  },
};
