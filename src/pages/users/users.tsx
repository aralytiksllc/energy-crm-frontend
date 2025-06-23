// External imports
import * as React from 'react';

// Internal imports
import type { IUser } from '@/interfaces/users';
import { CrudTable } from '@/components/crud-table/crud-table';
import { UsersForm } from './components/user-form';
import { columns } from './constants/table';

interface UsersListProps {}

export const UsersList: React.FC<UsersListProps> = () => {
  const renderForm = React.useCallback(
    (formProps: any) => <UsersForm formProps={formProps} />,
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
