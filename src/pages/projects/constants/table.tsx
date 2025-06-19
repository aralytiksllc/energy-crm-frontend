import React from 'react';
import { ColumnsType } from 'antd/es/table';
import { Tag, Progress, Space, Typography, Button, Popconfirm } from 'antd';
import { DeleteOutlined, EyeOutlined } from '@ant-design/icons';
import { useNavigation, useDelete } from '@refinedev/core';
import dayjs from 'dayjs';
import { IProject, ProjectStatus, ProjectPriority } from '../types/types';
import {
  formatProjectStatus,
  getStatusColor,
  getPriorityColor,
} from '../utils/project-transformer';
import { EditProjectButton } from '../components/edit-project-button';

const { Text } = Typography;

export const useProjectColumns = (
  onProjectUpdated?: () => void,
): ColumnsType<IProject> => {
  const { show } = useNavigation();
  const { mutate: deleteProject } = useDelete();

  return [
    {
      title: 'ID',
      dataIndex: 'id',
      key: 'id',
      width: 80,
      sorter: true,
      render: (id: number) => id,
    },
    {
      title: 'Project Name',
      dataIndex: 'name',
      key: 'name',
      width: 200,
      sorter: true,
      ellipsis: true,
      render: (name: string) => <Text strong>{name}</Text>,
    },
    {
      title: 'Client',
      dataIndex: 'clientName',
      key: 'clientName',
      width: 150,
      sorter: true,
      ellipsis: true,
      render: (clientName: string) => clientName || '-',
    },
    {
      title: 'Status',
      dataIndex: 'status',
      key: 'status',
      width: 120,
      sorter: true,
      render: (status: ProjectStatus) => (
        <Tag color={getStatusColor(status)}>{formatProjectStatus(status)}</Tag>
      ),
    },
    {
      title: 'Priority',
      dataIndex: 'priority',
      key: 'priority',
      width: 100,
      sorter: true,
      render: (priority: ProjectPriority) => (
        <Tag color={getPriorityColor(priority)}>{priority}</Tag>
      ),
    },
    {
      title: 'Progress',
      dataIndex: 'progress',
      key: 'progress',
      width: 120,
      sorter: true,
      render: (progress: number) => (
        <Progress percent={progress} size="small" />
      ),
    },
    {
      title: 'Budget',
      dataIndex: 'budget',
      key: 'budget',
      width: 120,
      sorter: true,
      render: (budget: number) => (
        <Text>{budget ? `€${budget.toLocaleString()}` : '-'}</Text>
      ),
    },
    {
      title: 'Start Date',
      dataIndex: 'startDate',
      key: 'startDate',
      width: 120,
      sorter: true,
      render: (date: string) =>
        date ? dayjs(date).format('MMM DD, YYYY') : '-',
    },
    {
      title: 'Deadline',
      dataIndex: 'deadline',
      key: 'deadline',
      width: 120,
      sorter: true,
      render: (date: string) =>
        date ? dayjs(date).format('MMM DD, YYYY') : '-',
    },
    {
      title: 'Technologies',
      dataIndex: 'technologies',
      key: 'technologies',
      width: 150,
      render: (technologies: string[]) => (
        <Space size={[0, 4]} wrap>
          {technologies?.slice(0, 2).map((tech) => (
            <Tag key={tech} color="blue" style={{ fontSize: '11px' }}>
              {tech}
            </Tag>
          ))}
          {technologies?.length > 2 && (
            <Tag color="default" style={{ fontSize: '11px' }}>
              +{technologies.length - 2}
            </Tag>
          )}
        </Space>
      ),
    },
    {
      title: 'Tags',
      dataIndex: 'tags',
      key: 'tags',
      width: 150,
      render: (tags: string[]) => (
        <Space size={[0, 4]} wrap>
          {tags?.slice(0, 2).map((tag) => (
            <Tag key={tag} color="green" style={{ fontSize: '11px' }}>
              {tag}
            </Tag>
          ))}
          {tags?.length > 2 && (
            <Tag color="default" style={{ fontSize: '11px' }}>
              +{tags.length - 2}
            </Tag>
          )}
        </Space>
      ),
    },
    {
      title: 'Created',
      dataIndex: 'createdAt',
      key: 'createdAt',
      width: 120,
      sorter: true,
      render: (date: string) =>
        date ? dayjs(date).format('MMM DD, YYYY') : '-',
    },
    {
      title: 'Actions',
      key: 'actions',
      width: 120,
      fixed: 'right',
      render: (_: any, record: IProject) => (
        <Space>
          <Button
            type="primary"
            ghost
            size="small"
            icon={<EyeOutlined />}
            onClick={() => {
              show('projects', record.id);
            }}
          />
          <EditProjectButton
            projectId={record.id}
            size="small"
            hideText={true}
            onProjectUpdated={onProjectUpdated}
          />
          <Popconfirm
            title="Delete Project"
            description="Are you sure you want to delete this project? This action cannot be undone."
            onConfirm={() => {
              deleteProject({
                resource: 'projects',
                id: record.id,
              });
            }}
            okText="Yes, Delete"
            cancelText="Cancel"
            okType="danger"
          >
            <Button danger size="small" icon={<DeleteOutlined />} />
          </Popconfirm>
        </Space>
      ),
    },
  ];
};
