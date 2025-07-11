import { AccessControlProvider } from '@refinedev/core';
import { authProvider } from '../auth-provider';
import { IUser } from '../../interfaces';

export const accessControlProvider: AccessControlProvider = {
  async can({ resource, action, params }) {
    const identity = (await authProvider.getIdentity?.()) as IUser | null;

    if (identity?.role?.name === 'manager' && resource === 'permissions') {
      return { can: true };
    }

    const permissions = (await authProvider.getPermissions?.()) as string[];

    if (!permissions) {
      return { can: false };
    }

    if (resource === 'plannings') {
      const requiredPermission = `plannings:${action}`;
      if (action === 'list') {
        return {
          can: permissions.some(
            (p) => p === 'plannings' || p.startsWith('plannings:'),
          ),
        };
      }
      return { can: permissions.includes(requiredPermission) };
    }

    if (action === 'list' || action === 'show') {
      return {
        can: permissions.some(
          (permission) =>
            permission.startsWith(`${resource}:`) || permission === resource,
        ),
      };
    }

    const requiredPermission = `${resource}:${action}`;

    return {
      can: permissions.includes(requiredPermission),
    };
  },
};
