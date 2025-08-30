// External
import * as React from 'react';
import { useForm } from '@refinedev/antd';
import type { HttpError } from '@refinedev/core';

// Internal
import type { IUser } from '@/interfaces/users';
import { Edit } from '@/components/edit';
import { UserForm } from './components/user-form';

export type UserEditProps = {};

export const UserEdit: React.FC<UserEditProps> = () => {
  const { formLoading, formProps, saveButtonProps } = useForm<
    IUser,
    HttpError,
    IUser
  >({
    resource: 'users',
    action: 'edit',
    redirect: 'list',
  });

  return (
    <Edit
      title="Edit User"
      resource="users"
      saveButtonProps={saveButtonProps}
      isLoading={formLoading}
    >
      <UserForm formProps={formProps} />
    </Edit>
  );
};
