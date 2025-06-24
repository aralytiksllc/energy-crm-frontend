import type { ColumnsType } from 'antd/es/table';
import { Space, Tag, Typography } from 'antd';
import dayjs from 'dayjs';

import type { Customer } from '../types/customer.types';
import { EditButton } from '@/components/edit-button';
import { DeleteButton } from '@/components/delete-button';

const { Text } = Typography;

export const columns: ColumnsType<Customer> = [
  {
    title: 'ID',
    dataIndex: 'id',
    key: 'id',
    width: 80,
    sorter: true,
  },
  {
    title: 'Name',
    dataIndex: 'name',
    key: 'name',
    sorter: true,
    render: (name: string) => <Text strong>{name}</Text>,
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
    render: (date: Date) => dayjs(date).format('MMM DD, YYYY'),
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
