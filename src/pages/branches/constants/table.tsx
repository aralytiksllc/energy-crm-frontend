// External
import { EditButton } from '@refinedev/antd';
import { ColumnsType } from 'antd/es/table';
import { Space } from 'antd';

// Internal
import { IBranch } from '@/interfaces/branches';
import { DeleteButton } from '@/components/delete-button';

export const columns: ColumnsType<IBranch> = [
  { title: 'ID', dataIndex: 'id', key: 'id' },

  {
    title: 'Branch Name',
    dataIndex: 'branchName',
    key: 'branchName',
  },
  {
    title: 'Peak Load (kW)',
    dataIndex: 'peakLoadKw',
    key: 'peakLoadKw',
    render: (value) => value ?? '-',
  },
  {
    title: 'Weather Data Linkage',
    dataIndex: 'weatherDataLinkage',
    key: 'weatherDataLinkage',
    render: (value) => value ?? '-',
  },
  {
    title: 'Customer ID',
    dataIndex: 'customerId',
    key: 'customerId',
    render: (value) => value ?? '-',
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
];
