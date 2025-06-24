// External imports
import * as React from 'react';
import type { FormProps } from 'antd';

// Internal imports
import type { IUser } from '@/interfaces/users';
import { CrudTable } from '@/components/crud-table/crud-table';
import { UsersForm } from './components/user-form';
import { columns } from './constants/table';

export const Users = () => {
  const renderForm = React.useCallback(
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
