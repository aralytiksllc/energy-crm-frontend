// External imports
import { useNotificationProvider } from '@refinedev/antd';
import { RefineProps } from '@refinedev/core';
import { DashboardOutlined } from '@ant-design/icons';
import { AralytiksIcon } from './components/logo';
import routerBindings from '@refinedev/react-router';

// Internal imports
import { authProvider } from './providers/auth-provider';
import { dataProvider } from './providers/data-provider';

export const refineProps: RefineProps = {
  authProvider: authProvider,
  dataProvider: dataProvider,
  routerProvider: routerBindings,
  notificationProvider: useNotificationProvider,
  resources: [
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
