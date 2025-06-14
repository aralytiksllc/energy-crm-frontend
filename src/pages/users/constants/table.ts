import { ColumnsType } from 'antd/es/table';
import { createActions } from '@/components/actions/create-actions';
import { IUser } from '@/interfaces/users';

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
    key: 'actions',
    sorter: false,
    render: createActions({
      showButton: {},
      editButton: {},
      deleteButton: {},
    }),
  },
];
