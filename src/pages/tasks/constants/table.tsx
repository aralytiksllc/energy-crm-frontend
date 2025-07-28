import { Space, Tag, Typography } from 'antd';
import { useCan } from '@refinedev/core';

import type { Task } from '@interfaces/task';
import { EditButton } from '@components/edit-button';
import { DeleteButton } from '@components/delete-button';
import { FilterColumn } from '@components/column-filter/column-filter.types';
import { formatTableDate } from '@helpers/date-utils';

const { Text } = Typography;

// Create a function to generate columns with permission checks
export const createColumns = (): FilterColumn<Task>[] => [
  {
    title: 'ID',
    dataIndex: 'id',
    key: 'id',
    width: 80,
    sorter: true,
    filterType: 'number',
  },
  {
    title: 'Title',
    dataIndex: 'title',
    key: 'title',
    sorter: true,
    render: (title: string) => <Text strong>{title}</Text>,
    filterType: 'text',
  },
  {
    title: 'Priority',
    dataIndex: 'priority',
    key: 'priority',
    sorter: true,
    render: (priority: string) => <Tag>{priority}</Tag>,
    filterType: 'text',
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
    title: 'Start Date',
    dataIndex: 'startDate',
    key: 'startDate',
    sorter: true,
    render: (date?: string) => formatTableDate(date),
    filterType: 'date',
  },
  {
    title: 'Due Date',
    dataIndex: 'dueDate',
    key: 'dueDate',
    sorter: true,
    render: (date?: string) => formatTableDate(date),
    filterType: 'date',
  },
  {
    title: 'Actions',
    dataIndex: 'actions',
    key: 'actions',
    width: 100,
    render: (_, record) => {
      const ActionButtons = () => {
        const { data: canEdit } = useCan({
          resource: 'tasks',
          action: 'edit',
          params: { id: record.id },
        });

        const { data: canDelete } = useCan({
          resource: 'tasks',
          action: 'delete',
          params: { id: record.id },
        });

        return (
          <Space size="middle">
            {canEdit?.can && (
              <EditButton
                resource="tasks"
                resourceId={record.id}
                type="default"
                size="small"
              />
            )}
            {canDelete?.can && (
              <DeleteButton
                resource="tasks"
                resourceId={record.id}
                confirmTitle={`Delete task "${record.title}"?`}
                type="primary"
                size="small"
              />
            )}
          </Space>
        );
      };

      return <ActionButtons />;
    },
    fixed: 'right',
  },
];

// Export the columns for backward compatibility
export const columns = createColumns();
