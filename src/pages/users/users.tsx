// External imports
import React from 'react';
import { CrudTable } from '@/components/crud-table/crud-table';
import { IUser } from '@/interfaces/users';

// Internal imports
import { UsersForm } from './components/user-form';
import { UsersShow } from './components/users-show';
import { columns } from './constants/table';

export const UsersList: React.FC = () => {
  return (
    <CrudTable<IUser>
      resource="users"
      columns={columns}
      FormComponent={UsersForm}
      DetailsComponent={UsersShow}
      drawerTitles={{
        create: 'Create User',
        edit: 'Edit User',
        view: 'User Details',
      }}
    />
  );
};
