// External dependencies
import * as React from 'react';
import type { BaseRecord } from '@refinedev/core';

// Internal dependencies
import type { DrawerFormContextType } from './drawer-form-context.types';
import { DrawerFormContext } from './drawer-form-context';

export function DrawerFormProvider<T extends BaseRecord>(
  props: DrawerFormContextType<T>,
) {
  const { drawerForm, children } = props;

  return (
    <DrawerFormContext.Provider value={{ drawerForm }}>
      {children}
    </DrawerFormContext.Provider>
  );
}
