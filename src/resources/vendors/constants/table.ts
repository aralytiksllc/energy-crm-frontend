import { ColumnType } from 'antd/es/table';
import { createActions } from '@/components/actions/create-actions';
import { IVendor } from '../types';

export const columns: ColumnType<IVendor>[] = [
  {
    dataIndex: 'id',
    title: 'ID',
    sorter: true,
  },
  {
    dataIndex: 'name',
    title: 'Name',
    sorter: true,
  },
  {
    dataIndex: 'description',
    title: 'Description',
    sorter: true,
  },
  {
    dataIndex: 'contactEmail',
    title: 'Contact Email',
    sorter: true,
  },
  {
    dataIndex: 'contactPhone',
    title: 'Contact Phone',
    sorter: true,
  },
  {
    dataIndex: 'website',
    title: 'Website',
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
