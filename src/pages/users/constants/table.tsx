import { Space } from 'antd';
import { useCan } from '@refinedev/core';
import { IUser } from '@interfaces/users';
import { EditButton } from '@components/edit-button';
import { DeleteButton } from '@components/delete-button';
import { FilterColumn } from '@components/column-filter/column-filter.types';
import { formatTableDate } from '@helpers/date-utils';

export const createColumns = (): FilterColumn<IUser>[] => [
  {
    title: 'ID',
    dataIndex: 'id',
    key: 'id',
    sorter: true,
    filterType: 'number',
  },
  {
    title: 'First Name',
    dataIndex: 'firstName',
    key: 'firstName',
    sorter: true,
    filterType: 'text',
  },
  {
    title: 'Last Name',
    dataIndex: 'lastName',
    key: 'lastName',
    sorter: true,
    filterType: 'text',
  },
  {
    title: 'Email',
    dataIndex: 'email',
    key: 'email',
    sorter: true,
    filterType: 'text',
  },
  {
    title: 'Role',
    dataIndex: ['role', 'name'],
    key: 'role',
    sorter: true,
    filterType: 'text',
    render: (_, record) => record.role?.name || '-',
  },
  {
    title: 'Team',
    dataIndex: 'team',
    key: 'team',
    sorter: true,
    filterType: 'text',
  },
  {
    title: 'Date of Birth',
    dataIndex: 'dateOfBirth',
    key: 'dateOfBirth',
    sorter: true,
    filterType: 'date',
  },
  {
    title: 'Date of Joining',
    dataIndex: 'dateOfJoining',
    key: 'dateOfJoining',
    sorter: true,
    filterType: 'date',
  },
  {
    title: 'Active',
    dataIndex: 'isActive',
    key: 'isActive',
    sorter: true,
    filterType: 'text',
    render: (value: boolean) => (value ? 'Yes' : 'No'),
  },
  {
    title: 'Created At',
    dataIndex: 'createdAt',
    key: 'createdAt',
    sorter: true,
    filterType: 'date',
    render: (date: Date | string) => formatTableDate(date),
  },
  {
    title: 'Actions',
    dataIndex: 'actions',
    key: 'actions',
    fixed: 'right',
    width: 100,
    render: (_, record) => {
      const ActionButtons = () => {
        const { data: canEdit } = useCan({
          resource: 'users',
          action: 'edit',
          params: { id: record.id },
        });

        const { data: canDelete } = useCan({
          resource: 'users',
          action: 'delete',
          params: { id: record.id },
        });

        return (
          <Space size={8}>
            {canEdit?.can && (
              <EditButton
                resourceId={record.id as number}
                resource="users"
                type="default"
                size="small"
                danger={false}
              />
            )}
            {canDelete?.can && (
              <DeleteButton
                confirmTitle={`Are you sure you want to delete "${record.firstName} ${record.lastName}"?`}
                confirmMessage="This action cannot be undone."
                resourceId={record.id as number}
                resource="users"
                type="primary"
                size="small"
                danger={true}
              />
            )}
          </Space>
        );
      };

      return <ActionButtons />;
    },
  },
];

export const columns = createColumns();
