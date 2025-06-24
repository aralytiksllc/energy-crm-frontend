// External dependencies
import * as React from 'react';
import type { BaseRecord } from '@refinedev/core';

// Internal dependencies
import type { DrawerFormContextType } from './drawer-form-context.types';
import { DrawerFormContext } from './drawer-form-context';

export function useDrawerFormContext<T extends BaseRecord>() {
  return React.useContext<DrawerFormContextType<T>>(DrawerFormContext);
}
