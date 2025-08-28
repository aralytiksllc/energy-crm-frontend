// External
import * as React from 'react';
import { Table } from 'antd';
import { useTable } from '@refinedev/antd';
import { useParams } from 'react-router';

// Internal
import { IBranch } from '@/interfaces/branches';
import { List } from '@/components/list';
import { defaultTableProps } from './constants/table';

export type BranchListProps = {};

export const BranchList: React.FC<BranchListProps> = () => {
  const { customerId } = useParams();

  const { tableProps } = useTable<IBranch>({
    resource: 'branches',
    filters: {
      initial: [
        {
          field: 'customerId',
          operator: '=' as any,
          value: customerId,
        },
      ],
    },
  });

  return (
    <List title="Branches">
      <Table
        {...defaultTableProps}
        {...tableProps}
        pagination={false}
        rowKey="id"
      />
    </List>
  );
};
