import { ResourceProps } from '@refinedev/core';
import { UsersList } from './pages/users-list';
import { UsersCreate } from './pages/users-create';
import { UsersEdit } from './pages/users-edit';
import { UsersShow } from './pages/users-show';

export const vendorsResource: ResourceProps = {
  name: 'users',
  list: UsersList,
  create: UsersCreate,
  edit: UsersEdit,
  show: UsersShow,
  meta: {
    canDelete: true,
    label: 'Users',
  },
  options: {
    auditLogProvider: {
      create: true,
      update: true,
      delete: true,
    },
  },
};

export * from './pages/users-list';
export * from './pages/users-create';
export * from './pages/users-edit';
export * from './pages/users-show';
export * from './types';
