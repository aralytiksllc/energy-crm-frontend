// External
import { Empty, Space } from 'antd';
import { TableProps } from 'antd/es/table';
import { EditButton } from '@refinedev/antd';

// Internal
import { IMeteringPoint } from '@/interfaces/metering-points';
import { DeleteButton } from '@/components/delete-button';

export const defaultTableProps: TableProps<IMeteringPoint> = {
  scroll: { x: 'max-content' },

  locale: { emptyText: <Empty description="No metering point found" /> },

  columns: [
    { title: 'ID', dataIndex: 'id', key: 'id' },
    {
      title: 'Branch Name',
      dataIndex: 'branchName',
      key: 'branchName',
    },
    {
      title: 'Branch ID',
      dataIndex: 'branchId',
      key: 'branchId',
    },
    {
      title: 'Address',
      dataIndex: 'address',
      key: 'address',
    },
    {
      title: 'City / Region',
      dataIndex: 'cityRegion',
      key: 'cityRegion',
    },
    {
      title: 'Contact',
      dataIndex: 'contact',
      key: 'contact',
    },
    {
      title: 'Status',
      dataIndex: 'status',
      key: 'status',
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
            confirmTitle={`Are you sure you want to delete "${record.id}"?`}
            confirmMessage="This action cannot be undone."
            resource="metering-points"
            size="small"
          />
        </Space>
      ),
    },
  ],
};
