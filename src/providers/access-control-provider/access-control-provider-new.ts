import { AccessControlProvider } from '@refinedev/core';
import { authProvider } from '@providers/auth-provider';
import { IUser } from '../../interfaces';
import { UserRole } from '../../interfaces/user-role.enum';

export const accessControlProvider: AccessControlProvider = {
  async can({ resource, action, params }) {
    const identity = (await authProvider.getIdentity?.()) as IUser | null;
    const permissions = (await authProvider.getPermissions?.()) as string[];

    if (resource === 'permissions') {
      return {
        can: identity?.role?.name === UserRole.SuperAdmin,
        reason:
          identity?.role?.name === UserRole.SuperAdmin
            ? undefined
            : 'Only SuperAdmin can access permissions page',
      };
    }

    if (!permissions) {
      return { can: false };
    }

    const requiredPermission = `${resource}:${action}`;
    return { can: permissions.includes(requiredPermission) };
  },
};
