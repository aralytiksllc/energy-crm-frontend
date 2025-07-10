import { RefineProps } from '@refinedev/core';
import { useNotificationProvider } from '@refinedev/antd';
import routerBindings from '@refinedev/react-router';
import {
  UserOutlined,
  BarChartOutlined,
  GlobalOutlined,
  ProfileOutlined,
  CalendarOutlined,
  CheckSquareOutlined,
  SettingOutlined,
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
      name: 'dashboard',
      list: '/dashboard',
      meta: {
        label: 'Dashboard',
        icon: <BarChartOutlined />,
      },
    },
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
      name: 'projects',
      list: '/projects',
      edit: '/projects/edit/:id',
      meta: {
        canDelete: true,
        icon: <ProfileOutlined />,
      },
    },
    {
      name: 'tasks',
      list: '/tasks',
      create: '/tasks/create',
      edit: '/tasks/edit/:id',
      show: '/tasks/show/:id',
      meta: {
        canDelete: true,
        icon: <CheckSquareOutlined />,
      },
    },
    {
      name: 'plannings',
      list: '/planning',
      meta: {
        label: 'Planning',
        icon: <CalendarOutlined />,
      },
    },
    {
      name: 'permissions',
      list: '/permissions',
      meta: {
        label: 'Permissions',
        icon: <SettingOutlined />,
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
    {
      name: 'project-members',
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
      text: 'Aralytiks',
    },
  },
};
