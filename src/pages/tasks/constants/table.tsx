import type { ColumnsType } from 'antd/es/table';
import { Space, Tag, Typography } from 'antd';
import dayjs from 'dayjs';

import type { Task } from '@/interfaces/task';
import { EditButton } from '@/components/edit-button';
import { DeleteButton } from '@/components/delete-button';

const { Text } = Typography;

export const columns: ColumnsType<Task> = [
  {
    title: 'ID',
    dataIndex: 'id',
    key: 'id',
    width: 80,
    sorter: true,
  },
  {
    title: 'Title',
    dataIndex: 'title',
    key: 'title',
    sorter: true,
    render: (title: string) => <Text strong>{title}</Text>,
  },
  {
    title: 'Priority',
    dataIndex: 'priority',
    key: 'priority',
    sorter: true,
    render: (priority: string) => <Tag>{priority}</Tag>,
  },
  {
    title: 'Status',
    dataIndex: 'isCompleted',
    key: 'isCompleted',
    sorter: true,
    render: (isCompleted: boolean) => (
      <Tag color={isCompleted ? 'green' : 'blue'}>
        {isCompleted ? 'Completed' : 'In Progress'}
      </Tag>
    ),
  },
  {
    title: 'Due Date',
    dataIndex: 'dueDate',
    key: 'dueDate',
    sorter: true,
    render: (date?: string) =>
      date ? dayjs(date).format('MMM DD, YYYY') : '-',
  },
  {
    title: 'Actions',
    dataIndex: 'actions',
    key: 'actions',
    width: 100,
    render: (_, record) => (
      <Space size="middle">
        <EditButton
          resource="tasks"
          resourceId={record.id}
          type="default"
          size="small"
        />
        <DeleteButton
          resource="tasks"
          resourceId={record.id}
          confirmTitle={`Delete task "${record.title}"?`}
          type="primary"
          size="small"
        />
      </Space>
    ),
    fixed: 'right',
  },
];
