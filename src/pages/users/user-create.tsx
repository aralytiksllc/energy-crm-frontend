// External
import * as React from 'react';
import { useForm } from '@refinedev/antd';
import type { HttpError } from '@refinedev/core';

// Internal
import type { IUser } from '@/interfaces/users';
import { Create } from '@/components/create';
import { UserForm } from './components/user-form';

export type UserCreateProps = {};

export const UserCreate: React.FC<UserCreateProps> = () => {
  const { formLoading, formProps, saveButtonProps } = useForm<
    IUser,
    HttpError,
    IUser
  >({
    resource: 'users',
    action: 'create',
    redirect: 'list',
  });

  return (
    <Create
      title="Create User"
      resource="users"
      saveButtonProps={saveButtonProps}
      isLoading={formLoading}
    >
      <UserForm formProps={formProps} />
    </Create>
  );
};
