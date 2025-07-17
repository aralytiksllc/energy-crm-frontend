import { useCan } from '@refinedev/core';

export interface UsePermissionsOptions {
  resource: string;
  actions?: ('create' | 'edit' | 'delete')[];
}

export interface Permissions {
  canCreate: boolean;
  canEdit: boolean;
  canDelete: boolean;
  hasActionsPermission: boolean;
}

export const usePermissions = (options: UsePermissionsOptions): Permissions => {
  const { resource } = options;

  const { data: canCreate } = useCan({
    resource,
    action: 'create',
  });

  const { data: canEdit } = useCan({
    resource,
    action: 'edit',
  });

  const { data: canDelete } = useCan({
    resource,
    action: 'delete',
  });

  return {
    canCreate: canCreate?.can || false,
    canEdit: canEdit?.can || false,
    canDelete: canDelete?.can || false,
    hasActionsPermission: canEdit?.can || false || canDelete?.can || false,
  };
};
