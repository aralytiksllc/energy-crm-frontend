// External
import * as React from 'react';
import { useForm } from '@refinedev/antd';
import type { HttpError } from '@refinedev/core';

// Internal
import type { IRole } from '@/interfaces/roles';
import { Create } from '@/components/create';
import { RoleForm } from './components/role-form';

export type RoleCreateProps = {};

export const RoleCreate: React.FC<RoleCreateProps> = () => {
  const { formLoading, formProps, saveButtonProps } = useForm<
    IRole,
    HttpError,
    IRole
  >({
    resource: 'roles',
    action: 'create',
    redirect: 'list',
  });

  return (
    <Create
      title="Create Role"
      resource="roles"
      saveButtonProps={saveButtonProps}
      isLoading={formLoading}
    >
      <RoleForm formProps={formProps} />
    </Create>
  );
};
