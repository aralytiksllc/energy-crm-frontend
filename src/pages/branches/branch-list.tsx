// External
import * as React from 'react';
import { Table, Empty } from 'antd';
import { useTable } from '@refinedev/antd';
import { useParams } from 'react-router';

// Internal
import { IBranch } from '@/interfaces/branches';
import { List } from '@/components/list';
import { columns } from './constants/branch-columns';

export type BranchListProps = {};

const emptyText = <Empty description="No branches found." />;

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
