// External imports
import React, { useCallback } from 'react';
import type { FormProps } from 'antd';

// Internal imports
import { IUser } from '@interfaces/users';
import { UsersForm } from './components/user-form';
import { columns } from './constants/table';
import { CrudTable } from '@components/crud-table/crud-table';

export const Users: React.FC = () => {
  const renderForm = useCallback(
    (formProps: FormProps) => <UsersForm formProps={formProps} />,
    [],
  );

  return (
    <CrudTable<IUser>
      resource="users"
      renderForm={renderForm}
      columns={columns}
      drawerTitles={{
        create: 'Create User',
        edit: 'Edit User',
        view: 'User Details',
      }}
    />
  );
};
