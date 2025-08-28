// External
import { Avatar, Empty, Space } from 'antd';
import { TableProps } from 'antd/es/table';
import { UserOutlined } from '@ant-design/icons';
import { EditButton } from '@refinedev/antd';

// Internal
import { IBranch } from '@/interfaces/branches';
import { DeleteButton } from '@/components/delete-button';

export const defaultTableProps: TableProps<IBranch> = {
  scroll: { x: 'max-content' },

  locale: { emptyText: <Empty description="No contacts found" /> },

  columns: [
    { title: 'ID', dataIndex: 'id', key: 'id' },
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
        <span
          style={{
            color: status === 'Active' ? '#52c41a' : '#faad14',
            fontWeight: 'bold',
          }}
        >
          {status}
        </span>
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
            resource="branches"
            size="small"
            hideText
          />
          <DeleteButton
            recordItemId={record.id}
            confirmTitle={`Are you sure you want to delete "${record.branchName}"?`}
            confirmMessage="This action cannot be undone."
            resource="branches"
            size="small"
          />
        </Space>
      ),
    },
  ],
};
