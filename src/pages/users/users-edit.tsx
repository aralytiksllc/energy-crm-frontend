import * as React from 'react';
import { Edit, useForm } from '@refinedev/antd';
import { IUser } from '@/interfaces/users';
import { UsersForm } from './components/user-form';

export const UsersEdit: React.FC = () => {
  const { formProps, saveButtonProps } = useForm<IUser>();

  return (
    <Edit saveButtonProps={saveButtonProps}>
      <UsersForm formProps={formProps} />
    </Edit>
  );
};
