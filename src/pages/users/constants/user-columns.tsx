// External
import { Space } from 'antd';
import { EditButton } from '@refinedev/antd';
import type { ColumnsType } from 'antd/es/table';

// Internal
import type { IUser } from '@/interfaces/users';
import { DeleteButton } from '@/components/delete-button';

export const columns: ColumnsType<IUser> = [
  {
    title: 'ID',
    dataIndex: 'id',
    key: 'id',
    sorter: true,
  },
  {
    title: 'First Name',
    dataIndex: 'firstName',
    key: 'firstName',
    sorter: true,
  },
  {
    title: 'Last Name',
    dataIndex: 'lastName',
    key: 'lastName',
    sorter: true,
  },
  {
    title: 'Email',
    dataIndex: 'email',
    key: 'email',
    sorter: true,
  },
  {
    title: 'Role',
    dataIndex: ['role', 'name'],
    key: 'role',
    sorter: true,
    render: (_, record) => record.role?.name || '-',
  },
  {
    title: 'Team',
    dataIndex: 'team',
    key: 'team',
    sorter: true,
  },
  {
    title: 'Date of Birth',
    dataIndex: 'dateOfBirth',
    key: 'dateOfBirth',
    sorter: true,
  },
  {
    title: 'Date of Joining',
    dataIndex: 'dateOfJoining',
    key: 'dateOfJoining',
    sorter: true,
  },
  {
    title: 'Active',
    dataIndex: 'isActive',
    key: 'isActive',
    sorter: true,
    render: (value: boolean) => (value ? 'Yes' : 'No'),
  },
  // {
  //   title: 'Created At',
  //   dataIndex: 'createdAt',
  //   key: 'createdAt',
  //   sorter: true,
  //   render: (date: Date | string) => date.toString(),
  // },
  {
    title: 'Actions',
    key: 'actions',
    fixed: 'right',
    render: (_value, record) => (
      <Space size="small" key={`actions-${record.id}`}>
        <EditButton
          recordItemId={record.id}
          resource="users"
          size="small"
          hideText
        />
        <DeleteButton
          recordItemId={record.id as number}
          confirmTitle={`Are you sure you want to delete "${record.email}"?`}
          confirmMessage="This action cannot be undone."
          resource="users"
          size="small"
        />
      </Space>
    ),
  },
];
