import * as React from 'react';
import { Table, Space, Button } from 'antd';
import { PlusOutlined } from '@ant-design/icons';
import { List, useTable } from '@refinedev/antd';
import { IUser } from '@interfaces/users';
import { columns as allColumns } from './constants/table';
import { ColumnVisibilitySelector } from '@components/column-visibility-selector';
import { useColumnVisibility } from '@hooks/useColumnVisibility';

export const UsersList: React.FC = () => {
  const { tableProps } = useTable<IUser>({
    resource: 'users',
    filters: { mode: 'server' },
    syncWithLocation: true,
  });

  const { columnOptions, visibleColumns, setVisibleColumns, filteredColumns } =
    useColumnVisibility(allColumns, 'users-table-columns');

  return (
    <List
      headerButtons={() => (
        <Space>
          <ColumnVisibilitySelector
            options={columnOptions}
            selected={visibleColumns}
            onChange={setVisibleColumns}
          />
          <Button type="primary" icon={<PlusOutlined />} href="/users/create">
            Create User
          </Button>
        </Space>
      )}
    >
      <Table {...tableProps} columns={filteredColumns} rowKey="id" />
    </List>
  );
};
