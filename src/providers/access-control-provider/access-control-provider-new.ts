import { AccessControlProvider } from '@refinedev/core';
import { authProvider } from '@providers/auth-provider';
import { IUser } from '../../interfaces';
import { UserRole } from '../../interfaces/user-role.enum';

export const accessControlProvider: AccessControlProvider = {
  async can({ resource, action }) {
    const identity = (await authProvider.getIdentity?.()) as IUser | null;
    const permissions = (await authProvider.getPermissions?.()) as string[];

    if (resource === 'permissions') {
      const isSuperAdmin = identity?.role?.name === UserRole.SuperAdmin;
      return {
        can: isSuperAdmin,
        reason: isSuperAdmin
          ? undefined
          : 'Only SuperAdmin can access permissions page',
      };
    }

    if (resource === 'users') {
      if (action === 'list') {
        return { can: true };
      }

      const allowedRoles = [UserRole.SuperAdmin, UserRole.Manager];
      const userRole = identity?.role?.name as UserRole;
      const canManageUsers = userRole ? allowedRoles.includes(userRole) : false;

      return {
        can: canManageUsers,
        reason: canManageUsers
          ? undefined
          : 'Only SuperAdmin and Manager can manage users',
      };
    }

    if (resource === 'tasks') {
      return { can: true };
    }

    if (!permissions) {
      return { can: false };
    }

    const requiredPermission = `${resource}:${action}`;
    return { can: permissions.includes(requiredPermission) };
  },
};
