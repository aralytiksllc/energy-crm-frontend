// External
import { Avatar, Space, Tag } from 'antd';
import { UserOutlined } from '@ant-design/icons';
import { EditButton } from '@refinedev/antd';
import type { ColumnsType } from 'antd/es/table';

// Internal
import type { IContact } from '@/interfaces/contacts';
import { DeleteButton } from '@/components/delete-button';

export const columns: ColumnsType<IContact> = [
  {
    title: 'ID',
    dataIndex: 'id',
    key: 'id',
  },
  {
    title: 'Contact Name',
    dataIndex: 'name',
    key: 'name',
    render: (text: string) => (
      <Space>
        <Avatar icon={<UserOutlined />} size="small" />
        {text}
      </Space>
    ),
  },
  {
    title: 'Type',
    dataIndex: 'type',
    key: 'type',
  },
  {
    title: 'Role',
    dataIndex: 'role',
    key: 'role',
  },
  {
    title: 'Phone',
    dataIndex: 'phone',
    key: 'phone',
  },
  {
    title: 'Email',
    dataIndex: 'email',
    key: 'email',
  },
  {
    title: 'Status',
    dataIndex: 'status',
    key: 'status',
    render: (status: string) => (
      <Tag color={status === 'ACTIVE' ? 'success' : 'warning'}>{status}</Tag>
    ),
  },
  {
    title: 'Actions',
    key: 'actions',
    fixed: 'right',
    render: (_value, record) => (
      <Space size="small" key={`actions-${record.id}`}>
        <EditButton
          recordItemId={record.id}
          resource="contacts"
          size="small"
          hideText
        />
        <DeleteButton
          confirmTitle={`Are you sure you want to delete "${record.name}"?`}
          confirmMessage="This action cannot be undone."
          recordItemId={record.id}
          resource="contacts"
          size="small"
        />
      </Space>
    ),
  },
];
