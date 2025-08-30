// External
import * as React from 'react';
import { useForm } from '@refinedev/antd';
import type { HttpError } from '@refinedev/core';

// Internal
import type { IRole } from '@/interfaces/roles';
import { Edit } from '@/components/edit';
import { RoleForm } from './components/role-form';

export type RoleEditProps = {};

export const RoleEdit: React.FC<RoleEditProps> = () => {
  const { formLoading, formProps, saveButtonProps } = useForm<
    IRole,
    HttpError,
    IRole
  >({
    resource: 'roles',
    action: 'edit',
    redirect: 'list',
  });

  return (
    <Edit
      title="Edit Role"
      resource="roles"
      saveButtonProps={saveButtonProps}
      isLoading={formLoading}
    >
      <RoleForm formProps={formProps} />
    </Edit>
  );
};
