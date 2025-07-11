import { Progress, Space } from 'antd';
import { DateField, NumberField, TagField, TextField } from '@refinedev/antd';

import type { IProject } from '@interfaces/project';
import { EditButton } from '@components/edit-button';
import { DeleteButton } from '@components/delete-button';
import { FilterColumn } from '@components/column-filter/column-filter.types';

export const columns: FilterColumn<IProject>[] = [
  {
    title: 'ID',
    dataIndex: 'id',
    key: 'id',
    width: 80,
    sorter: true,
    render: (value) => <NumberField value={value} />,
    filterType: 'number',
  },
  {
    title: 'Project Name',
    dataIndex: 'name',
    key: 'name',
    width: 200,
    sorter: true,
    ellipsis: true,
    render: (value) => <TextField value={value} strong />,
    filterType: 'text',
  },
  {
    title: 'Client',
    dataIndex: ['customer', 'name'],
    key: 'customerName',
    width: 150,
    sorter: true,
    ellipsis: true,
    render: (value) => <TextField value={value || '-'} />,
    filterType: 'text',
  },
  {
    title: 'Status',
    dataIndex: 'status',
    key: 'status',
    width: 120,
    sorter: true,
    render: (value) => <TagField value={value || 'Unknown'} />,
    filterType: 'text',
  },
  {
    title: 'Priority',
    dataIndex: 'priority',
    key: 'priority',
    width: 100,
    sorter: true,
    render: (value) => <TagField value={value || 'Medium'} />,
    filterType: 'text',
  },
  {
    title: 'Progress',
    dataIndex: 'progress',
    key: 'progress',
    width: 120,
    sorter: true,
    render: (value: number) => <Progress percent={value || 0} size="small" />,
    filterType: 'number',
  },
  {
    title: 'Budget',
    dataIndex: 'budget',
    key: 'budget',
    width: 120,
    sorter: true,
    render: (value) => (
      <NumberField
        value={value || 0}
        options={{ style: 'currency', currency: 'EUR' }}
      />
    ),
    filterType: 'number',
  },
  {
    title: 'Start Date',
    dataIndex: 'startDate',
    key: 'startDate',
    width: 120,
    sorter: true,
    render: (value) => <DateField value={value} format="MMM DD, YYYY" />,
    filterType: 'date',
  },
  {
    title: 'Deadline',
    dataIndex: 'deadline',
    key: 'deadline',
    width: 120,
    sorter: true,
    render: (value) => <DateField value={value} format="MMM DD, YYYY" />,
    filterType: 'date',
  },
  {
    title: 'Created',
    dataIndex: 'createdAt',
    key: 'createdAt',
    width: 120,
    sorter: true,
    render: (value) => <DateField value={value} format="MMM DD, YYYY" />,
    filterType: 'date',
  },
  {
    title: 'Actions',
    dataIndex: 'actions',
    key: 'actions',
    width: 100,
    fixed: 'right',
    render: (_, record) => (
      <Space size="middle">
        <EditButton
          resource="projects"
          resourceId={record.id}
          type="default"
          size="small"
        />
        <DeleteButton
          resource="projects"
          resourceId={record.id}
          confirmTitle={`Delete project "${record.name}"?`}
          type="primary"
          size="small"
        />
      </Space>
    ),
  },
];
