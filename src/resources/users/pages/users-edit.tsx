import * as React from 'react';
import { Edit, useForm } from '@refinedev/antd';
import { UsersForm } from '../components/user-form';
import { IUser } from '../types';
import dayjs from 'dayjs';

export const UsersEdit: React.FC = () => {
  const { formProps, saveButtonProps } = useForm<IUser>({
    meta: {
      onMutation: (values: IUser) => ({
        ...values,
        dateOfBirth: values.dateOfBirth
          ? dayjs(values.dateOfBirth).format('YYYY-MM-DD')
          : undefined,
        dateOfJoining: values.dateOfJoining
          ? dayjs(values.dateOfJoining).format('YYYY-MM-DD')
          : undefined,
        settings: values.settings ? JSON.parse(values.settings as string) : {},
      }),
    },
  });

  formProps.initialValues = {
    ...formProps.initialValues,
    dateOfBirth: formProps.initialValues?.dateOfBirth
      ? dayjs(formProps.initialValues.dateOfBirth)
      : undefined,
    dateOfJoining: formProps.initialValues?.dateOfJoining
      ? dayjs(formProps.initialValues.dateOfJoining)
      : undefined,
    settings:
      typeof formProps.initialValues?.settings === 'object'
        ? JSON.stringify(formProps.initialValues.settings, null, 2)
        : formProps.initialValues?.settings,
  };

  return (
    <Edit saveButtonProps={saveButtonProps}>
      <UsersForm formProps={formProps} />
    </Edit>
  );
};
