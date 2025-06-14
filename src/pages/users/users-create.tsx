import * as React from 'react';
import { Create, useForm } from '@refinedev/antd';
import { IUser } from '@/interfaces/users';
import { UsersForm } from './components/user-form';

export const UsersCreate: React.FC = () => {
  const { formProps, saveButtonProps } = useForm<IUser>();

  return (
    <Create saveButtonProps={saveButtonProps}>
      <UsersForm formProps={formProps} />
    </Create>
  );
};
