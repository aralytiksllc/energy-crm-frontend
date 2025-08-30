// External
import { Space } from 'antd';
import { EditButton } from '@refinedev/antd';
import type { ColumnsType } from 'antd/es/table';

// Internal
import type { IRole } from '@/interfaces/roles';
import { DeleteButton } from '@/components/delete-button';

export const columns: ColumnsType<IRole> = [
  {
    title: 'ID',
    dataIndex: 'id',
    key: 'id',
    sorter: true,
  },
  {
    title: 'Name',
    dataIndex: 'name',
    key: 'name',
    sorter: true,
  },
  {
    title: 'Description',
    dataIndex: 'description',
    key: 'description',
    sorter: true,
  },
  {
    title: 'Actions',
    key: 'actions',
    fixed: 'right',
    render: (_value, record) => (
      <Space size="small" key={`actions-${record.id}`}>
        <EditButton
          recordItemId={record.id}
          resource="roles"
          size="small"
          hideText
        />
        <DeleteButton
          recordItemId={record.id as number}
          confirmTitle={`Are you sure you want to delete "${record.name}"?`}
          confirmMessage="This action cannot be undone."
          resource="roles"
          size="small"
        />
      </Space>
    ),
  },
];
