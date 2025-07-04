// External imports
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
} from '@ant-design/icons';

// Internal imports
import { authProvider, dataProvider } from '@providers';
import { LogoSvg } from '@components/logo-svg';

export const refineProps: RefineProps = {
  authProvider: authProvider,
  dataProvider: dataProvider,
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
      name: 'planning',
      list: '/planning',
      meta: {
        label: 'Planning',
        icon: <CalendarOutlined />,
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
    syncWithLocation: true,
    warnWhenUnsavedChanges: true,
    useNewQueryKeys: true,
    projectId: 'DLUNzF-hNHv7s-rovOa5',
    title: {
      icon: <LogoSvg width={24} height={24} fill="#000" />,
      text: 'Aralytiks',
    },
  },
};
