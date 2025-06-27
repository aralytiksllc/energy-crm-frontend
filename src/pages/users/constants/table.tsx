// External dependencies
import type { ColumnsType } from 'antd/es/table';
import { Space } from 'antd';

// Internal dependencies
import { IUser } from '@interfaces/users';
import { EditButton } from '@components/edit-button';
import { DeleteButton } from '@components/delete-button';

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
  {
    title: 'Created At',
    dataIndex: 'createdAt',
    key: 'createdAt',
    sorter: true,
  },
  {
    title: 'Actions',
    dataIndex: 'actions',
    key: 'actions',
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
