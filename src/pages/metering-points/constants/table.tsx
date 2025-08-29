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
      title: 'Branch',
      dataIndex: ['branch', 'branchName'],
      key: 'branchName',
    },
    {
      title: 'Location Address',
      dataIndex: 'locationAddress',
      key: 'locationAddress',
    },
    {
      title: 'City/Locality',
      dataIndex: 'cityOrLocality',
      key: 'cityOrLocality',
    },
    { title: 'Country', dataIndex: 'country', key: 'country' },
    { title: 'Voltage Level', dataIndex: 'voltageLevel', key: 'voltageLevel' },
    { title: 'Meter Type', dataIndex: 'meterType', key: 'meterType' },
    {
      title: 'Metering Point Status',
      dataIndex: 'meteringPointStatus',
      key: 'meteringPointStatus',
    },
    {
      title: 'Operational Status',
      dataIndex: 'operationalStatus',
      key: 'operationalStatus',
    },
    {
      title: 'Actions',
      key: 'actions',
      fixed: 'right',
      render: (_value, record) => (
        <Space size="small" key={`actions-${record.id}`}>
          <EditButton
            recordItemId={record.id}
            resource="metering-points"
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
