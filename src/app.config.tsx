// External
import { RefineProps } from '@refinedev/core';
import { useNotificationProvider } from '@refinedev/antd';
import routerBindings from '@refinedev/react-router';

// Internal
import { LogoSvg } from './components/logo-svg';
import { authProvider } from './providers/auth-provider';
import { createDataProvider } from './providers/data-provider';
import { resources } from './app.resources';

export const appConfig: RefineProps = {
  authProvider: authProvider,
  dataProvider: createDataProvider(resources),
  routerProvider: routerBindings,
  notificationProvider: useNotificationProvider,
  resources: resources,
  options: {
    syncWithLocation: false,
    warnWhenUnsavedChanges: false,
    useNewQueryKeys: true,
    projectId: 'DLUNzF-hNHv7s-rovOa5',
    mutationMode: 'optimistic',
    title: {
      icon: null,
      text: 'MDA Energy',
    },
  },
};
