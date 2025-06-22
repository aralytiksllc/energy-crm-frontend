// External imports
import { RefineProps } from '@refinedev/core';
import { useNotificationProvider } from '@refinedev/antd';
import routerBindings from '@refinedev/react-router';

// Internal imports
import { authProvider } from './providers/auth-provider';
import { dataProvider } from './providers/data-provider';
import { AralytiksIcon } from './components/logo';

export const refineProps: RefineProps = {
  authProvider: authProvider,
  dataProvider: dataProvider,
  routerProvider: routerBindings,
  notificationProvider: useNotificationProvider,
  resources: [
    {
      name: 'users',
      list: '/users',
      meta: {
        canDelete: true,
      },
    },
    {
      name: 'projects',
      list: '/projects',
      meta: {
        canDelete: true,
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
      },
    },
    {
      name: 'dashboard',
      list: '/dashboard',
      meta: {
        label: 'Dashboard',
      },
    },
  ],
  options: {
    syncWithLocation: true,
    warnWhenUnsavedChanges: true,
    useNewQueryKeys: true,
    projectId: 'DLUNzF-hNHv7s-rovOa5',
    title: {
      icon: <AralytiksIcon width={24} height={24} fill="#000" />,
      text: 'Aralytiks',
    },
  },
};
