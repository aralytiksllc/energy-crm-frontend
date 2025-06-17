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
      create: '/users/create',
      edit: '/users/edit/:id',
      show: '/users/show/:id',
      meta: {
        canDelete: true,
      },
    },
    {
      name: 'projects',
      list: '/projects',
      create: '/projects/create',
      edit: '/projects/edit/:id',
      show: '/projects/show/:id',
      meta: {
        canDelete: true,
      },
    },
    {
      name: 'tasks',
      list: '/tasks',
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
