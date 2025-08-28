// External
import * as React from 'react';
import { Table } from 'antd';
import { useTable } from '@refinedev/antd';
import { useParams } from 'react-router';

// Internal
import { IMeteringPoint } from '@/interfaces/metering-points';
import { List } from '@/components/list';
import { defaultTableProps } from './constants/table';

export type MeteringPointListProps = {};

export const MeteringPointList: React.FC<MeteringPointListProps> = () => {
  const { customerId } = useParams();

  const { tableProps } = useTable<IMeteringPoint>({
    resource: 'metering-points',
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
    <List title="MeteringPoint">
      <Table
        {...defaultTableProps}
        {...tableProps}
        pagination={false}
        rowKey="id"
      />
    </List>
  );
};
