// External dependencies
import * as React from 'react';

// Internal dependencies
import type { DrawerFormContextType } from './drawer-form-context.types';

export const DrawerFormContext = React.createContext<
  DrawerFormContextType<any>
>({});
