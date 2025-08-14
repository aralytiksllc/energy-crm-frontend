import { AccessControlProvider } from '@refinedev/core';
import { authProvider } from '@providers/auth-provider';
import { IUser } from '../../interfaces';

export const accessControlProvider: AccessControlProvider = {
  async can({ resource, action }) {
    const identity = (await authProvider.getIdentity?.()) as IUser | null;
    const permissions = (await authProvider.getPermissions?.()) as string[];

    if (resource === 'users') {
      if (action === 'list') {
        return { can: true };
      }

      const allowedRoles = ['superadmin', 'manager'];
      const userRole = identity?.role?.name;
      const canManageUsers = userRole ? allowedRoles.includes(userRole) : false;

      return {
        can: canManageUsers,
        reason: canManageUsers
          ? undefined
          : 'Only SuperAdmin and Manager can manage users',
      };
    }

    if (resource === 'customers') {
      return { can: true };
    }

    if (resource === 'contracts') {
      return { can: true };
    }

    if (!permissions) {
      return { can: false };
    }

    const requiredPermission = `${resource}:${action}`;
    return { can: permissions.includes(requiredPermission) };
  },
};
