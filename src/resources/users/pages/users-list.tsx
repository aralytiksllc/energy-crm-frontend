import * as React from 'react';
import { Table } from 'antd';
import { List, useTable } from '@refinedev/antd';
import { columns } from '../constants/table';
import { IUser } from '../types';

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
