// External
import { ResourceProps } from '@refinedev/core';

// Internal

export const resources: ResourceProps[] = [
  {
    name: 'customers',
    identifier: 'customers',
    create: '/customers',
    edit: '/customers/:id',
    meta: { canDelete: true },
  },
  {
    name: 'branches',
    identifier: 'branches',
    list: '/customers/:customerId/branches',
    create: '/customers/:customerId/branches/create',
    edit: '/customers/:customerId/branches/:id',
    meta: { canDelete: true },
  },
  {
    name: 'contacts',
    identifier: 'contacts',
    list: '/customers/:customerId/contacts',
    create: '/customers/:customerId/contacts/create',
    edit: '/customers/:customerId/contacts/:id',
    meta: { canDelete: true },
  },
  {
    name: 'metering-points',
    identifier: 'metering-points',
    list: '/customers/:customerId/metering-points',
    create: '/customers/:customerId/metering-points/create',
    edit: '/customers/:customerId/metering-points/:id',
    meta: { canDelete: true },
  },
  {
    name: 'contracts',
    identifier: 'contracts',
    list: '/contracts',
    create: '/contracts/create',
    edit: '/contracts/:id',
    meta: { canDelete: true },
  },
];
