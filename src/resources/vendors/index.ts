import { ResourceProps } from '@refinedev/core';
import { VendorsList } from './pages/vendors-list';
import { VendorCreate } from './pages/vendor-create';
import { VendorEdit } from './pages/vendor-edit';
import { VendorShow } from './pages/vendor-show';

export const vendorsResource: ResourceProps = {
  name: 'vendors',
  list: VendorsList,
  create: VendorCreate,
  edit: VendorEdit,
  show: VendorShow,
  meta: {
    canDelete: true,
    label: 'Vendors',
    // icon: 'shop',
  },
  options: {
    auditLogProvider: {
      create: true,
      update: true,
      delete: true,
    },
  },
};

// Export all components
export * from './pages/vendors-list';
export * from './pages/vendor-create';
export * from './pages/vendor-edit';
export * from './pages/vendor-show';
export * from './types';
