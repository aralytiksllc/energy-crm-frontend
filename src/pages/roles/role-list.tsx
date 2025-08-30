// External
import * as React from 'react';
import { Table, Empty } from 'antd';
import { useTable } from '@refinedev/antd';

// Internal
import { IRole } from '@/interfaces/roles';
import { List } from '@/components/list';
import { columns } from './constants/role-columns';

export type RoleListProps = {};

const emptyText = <Empty description="No roles found." />;

export const RoleList: React.FC<RoleListProps> = () => {
  const { tableProps } = useTable<IRole>({
    resource: 'roles',
  });

  return (
    <List title="Roles">
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
