// External
import * as React from 'react';
import { Table, Empty } from 'antd';
import { useTable } from '@refinedev/antd';

// Internal
import { IUser } from '@/interfaces/users';
import { List } from '@/components/list';
import { columns } from './constants/user-columns';

export type UserListProps = {};

const emptyText = <Empty description="No users found." />;

export const UserList: React.FC<UserListProps> = () => {
  const { tableProps } = useTable<IUser>({
    resource: 'users',
  });

  return (
    <List title="Users">
      <Table
        {...tableProps}
        columns={columns}
        scroll={{ x: 'max-content' }}
        locale={{ emptyText }}
        pagination={false}
        rowKey="id"
      />
    </List>
  );
};
