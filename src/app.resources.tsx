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
    name: 'documents',
    identifier: 'documents',
    list: '/customers/:customerId/documents',
    create: '/customers/:customerId/documents/create',
    edit: '/customers/:customerId/documents/:id',
    meta: { canDelete: true },
  },

  {
    name: 'consumptions',
    identifier: 'consumptions',
    list: '/customers/:customerId/consumptions',
    create: '/customers/:customerId/consumptions/create',
    edit: '/customers/:customerId/consumptions/:id',
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

  {
    name: 'roles',
    identifier: 'roles',
    list: '/roles',
    create: '/roles/create',
    edit: '/roles/:id/edit',
    meta: { canDelete: true },
  },

  {
    name: 'users',
    identifier: 'users',
    list: '/users',
    create: '/users/create',
    edit: '/users/:id/edit',
    meta: { canDelete: true },
  },

  {
    name: 'dashboard',
    identifier: 'dashboard',
    list: '/',
    meta: { canDelete: true },
  },
];
