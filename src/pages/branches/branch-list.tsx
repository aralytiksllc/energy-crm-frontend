// External
import * as React from 'react';
import { useTable } from '@refinedev/antd';
import { Empty, Table } from 'antd';
import { useParams } from 'react-router';

// Internal
import { IBranch } from '@/interfaces/branches';
import { List } from '@/components/list';
import { columns } from './constants';

export type BranchListProps = {};

const emptyText = <Empty description="No branches found" />;

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

  const keyExtractor = React.useCallback(
    (record: IBranch, _index?: number) => record.id,
    [],
  );

  return (
    <List title="Branches">
      <Table
        {...tableProps}
        rowKey={keyExtractor}
        pagination={false}
        columns={columns}
        locale={{ emptyText }}
      />
    </List>
  );
};
