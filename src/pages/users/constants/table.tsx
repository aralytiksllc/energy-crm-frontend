// External dependencies
import type { ColumnsType } from 'antd/es/table';
import { Space } from 'antd';

// Internal dependencies
import { IUser } from '@/interfaces/users';
import { EditButton } from '@/components/edit-button';
import { DeleteButton } from '@/components/delete-button';

export const columns: ColumnsType<IUser> = [
  {
    dataIndex: 'id',
    title: 'ID',
    sorter: true,
  },
  {
    dataIndex: 'firstName',
    title: 'First Name',
    sorter: true,
  },
  {
    dataIndex: 'lastName',
    title: 'Last Name',
    sorter: true,
  },
  {
    dataIndex: 'email',
    title: 'Email',
    sorter: true,
  },
  {
    dataIndex: 'dateOfBirth',
    title: 'Date of Birth',
    sorter: true,
  },
  {
    dataIndex: 'dateOfJoining',
    title: 'Date of Joining',
    sorter: true,
  },
  {
    dataIndex: 'isActive',
    title: 'Active',
    sorter: true,
    render: (value: boolean) => (value ? 'Yes' : 'No'),
  },
  {
    dataIndex: 'createdAt',
    title: 'Created At',
    sorter: true,
  },
  {
    title: 'Actions',
    dataIndex: 'actions',
    fixed: 'right',
    width: 100,
    render: (_, record) => (
      <Space size={8}>
        <EditButton
          resourceId={record.id}
          resource="users"
          type="default"
          size="small"
          danger={false}
        />
        <DeleteButton
          confirmTitle={`Are you sure you want to delete "${record.firstName} ${record.lastName}"?`}
          confirmMessage={`This action cannot be undone.`}
          resourceId={record.id}
          resource="users"
          type="primary"
          size="small"
          danger={true}
        />
      </Space>
    ),
  },
];
