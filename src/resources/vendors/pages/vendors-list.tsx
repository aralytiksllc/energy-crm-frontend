import * as React from 'react';
import { Table } from 'antd';
import { List, useTable } from '@refinedev/antd';
import { columns } from '../constants/table';
import { IVendor } from '../types';

export const VendorsList: React.FC = () => {
  const { tableProps } = useTable<IVendor>({
    filters: { mode: 'server' },
    syncWithLocation: true,
  });

  return (
    <List>
      <Table {...tableProps} columns={columns} rowKey="id" />
    </List>
  );
};
