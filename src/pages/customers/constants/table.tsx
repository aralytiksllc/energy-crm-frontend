import { Space, Tag, Typography } from 'antd';

import type { Customer } from '@modules/customers/types/customer.types';
import { EditButton } from '@components/edit-button';
import { DeleteButton } from '@components/delete-button';
import { FilterColumn } from '@components/column-filter/column-filter.types';
import { formatTableDate } from '@helpers/date-utils';

const { Text } = Typography;

export const columns: FilterColumn<Customer>[] = [
  {
    title: 'ID',
    dataIndex: 'id',
    key: 'id',
    width: 80,
    sorter: true,
    filterType: 'number',
  },
  {
    title: 'Name',
    dataIndex: 'name',
    key: 'name',
    sorter: true,
    render: (name: string) => <Text strong>{name}</Text>,
    filterType: 'text',
  },
  {
    title: 'Description',
    dataIndex: 'notes',
    key: 'notes',
    sorter: true,
    render: (notes: string | null) => (
      <Text type="secondary">{notes || '-'}</Text>
    ),
    filterType: 'text',
    ellipsis: true,
  },
  {
    title: 'Status',
    dataIndex: 'isActive',
    key: 'isActive',
    sorter: true,
    render: (isActive: boolean) => (
      <Tag color={isActive ? 'green' : 'red'}>
        {isActive ? 'Active' : 'Inactive'}
      </Tag>
    ),
  },
  {
    title: 'Created At',
    dataIndex: 'createdAt',
    key: 'createdAt',
    sorter: true,
    render: (date: Date) => formatTableDate(date),
    filterType: 'date',
  },
  {
    title: 'Actions',
    dataIndex: 'actions',
    key: 'actions',
    width: 100,
    render: (_, record) => (
      <Space size="middle">
        <EditButton
          resource="customers"
          resourceId={record.id}
          type="default"
          size="small"
        />
        <DeleteButton
          resource="customers"
          resourceId={record.id}
          confirmTitle={`Delete customer "${record.name}"?`}
          type="primary"
          size="small"
        />
      </Space>
    ),
    fixed: 'right',
  },
];
