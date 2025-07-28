import { useCan } from '@refinedev/core';
import { useMemo } from 'react';
import { ResourcePermissions } from './use-resource-permissions.types';

interface UseResourcePermissionsProps {
  resource: string;
  id?: string | number;
}

export const useResourcePermissions = ({
  resource,
  id,
}: UseResourcePermissionsProps): ResourcePermissions => {
  const { data: canCreate } = useCan({
    resource,
    action: 'create',
  });

  const { data: canEdit } = useCan({
    resource,
    action: 'edit',
    params: id ? { id } : undefined,
  });

  const { data: canDelete } = useCan({
    resource,
    action: 'delete',
    params: id ? { id } : undefined,
  });

  const { data: canList } = useCan({
    resource,
    action: 'list',
  });

  return useMemo(() => {
    const permissions = {
      canCreate: canCreate?.can ?? false,
      canEdit: canEdit?.can ?? false,
      canDelete: canDelete?.can ?? false,
      canList: canList?.can ?? false,
    };

    return {
      ...permissions,
      hasAnyPermission: Object.values(permissions).some(Boolean),
      hasActionsPermission: permissions.canEdit || permissions.canDelete,
    };
  }, [canCreate?.can, canEdit?.can, canDelete?.can, canList?.can]);
};
