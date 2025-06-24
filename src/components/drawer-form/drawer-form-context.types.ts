// External dependencies
import * as React from 'react';
import type { UseDrawerFormReturnType } from '@refinedev/antd';
import type { BaseRecord } from '@refinedev/core';

// Internal dependencies

export interface DrawerFormContextType<T extends BaseRecord> {
  drawerForm?: UseDrawerFormReturnType<T>;
  children?: React.ReactNode;
}
