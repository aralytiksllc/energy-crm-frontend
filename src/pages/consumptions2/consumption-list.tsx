// External
import * as React from 'react';
import { Table, Empty } from 'antd';
import { useTable } from '@refinedev/antd';
import { useParams } from 'react-router';

// Internal
import { IConsumptionFile } from '@/interfaces/consumptions';
import { List } from '@/components/list';
import { columns } from './constants/consumption-columns';

export type ConsumptionListProps = {};

const emptyText = <Empty description="No consumptions found." />;

export const ConsumptionList: React.FC<ConsumptionListProps> = () => {
  const { customerId } = useParams();

  const { tableProps } = useTable<IConsumptionFile>({
    resource: 'consumptions',
    // filters: {
    //   initial: [
    //     {
    //       field: 'customerId',
    //       operator: '=' as any,
    //       value: customerId,
    //     },
    //   ],
    // },
  });

  return (
    <List title="Consumptions">
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
