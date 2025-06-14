import * as React from 'react';
import { Table } from 'antd';
import { List, useTable } from '@refinedev/antd';
import { IUser } from '@/interfaces/users';
import { columns } from './constants/table';

export const UsersList: React.FC = () => {
  const { tableProps } = useTable<IUser>({
    resource: 'users',
    filters: { mode: 'server' },
    syncWithLocation: true,
  });

  return (
    <List>
      <Table {...tableProps} columns={columns} rowKey="id" />
    </List>
  );
};
