import * as React from 'react';
import { Create, useForm } from '@refinedev/antd';
import { UsersForm } from '../components/user-form';
import { IUser } from '../types';
import dayjs from 'dayjs';

export const UsersCreate: React.FC = () => {
  const { formProps, saveButtonProps } = useForm<IUser>({
    meta: {
      onMutation: (values: IUser) => ({
        ...values,
        dateOfBirth: dayjs(values.dateOfBirth).format('YYYY-MM-DD'),
        dateOfJoining: dayjs(values.dateOfJoining).format('YYYY-MM-DD'),
        settings: values.settings ? JSON.parse(String(values.settings)) : {},
      }),
    },
  });

  return (
    <Create saveButtonProps={saveButtonProps}>
      <UsersForm formProps={formProps} />
    </Create>
  );
};
