// External
import * as React from 'react';
import { Table, Empty } from 'antd';
import { useTable } from '@refinedev/antd';

// Internal
import { IContract } from '@/interfaces/contracts';
import { List } from '@/components/list';
import { columns } from './constants/contract-columns';

export type ContractListProps = {};

const emptyText = <Empty description="No contracts found." />;

export const ContractList: React.FC<ContractListProps> = () => {
  const { tableProps } = useTable<IContract>({
    resource: 'contracts',
  });

  return (
    <List title="contracts">
      <Table
        {...tableProps}
        columns={columns}
        scroll={{ x: 'max-content' }}
        locale={{ emptyText }}
        rowKey="id"
      />
    </List>
  );
};
