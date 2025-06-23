import { ColumnsType } from 'antd/es/table';
import { Tag, Progress, Space, Typography } from 'antd';
import dayjs from 'dayjs';
import { IProject } from '@/interfaces/project';
import { ProjectStatus } from '@/interfaces/project-status.enum';
import { ProjectPriority } from '@/interfaces/project-priority.enum';

const { Text } = Typography;

export const columns: ColumnsType<IProject> = [
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
    render: (status: ProjectStatus) => <Tag>{status}</Tag>,
  },
  {
    title: 'Priority',
    dataIndex: 'priority',
    key: 'priority',
    width: 100,
    sorter: true,
    render: (priority: ProjectPriority) => <Tag>{priority}</Tag>,
  },
  {
    title: 'Progress',
    dataIndex: 'progress',
    key: 'progress',
    width: 120,
    sorter: true,
    render: (progress: number) => <Progress percent={progress} size="small" />,
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
    render: (date: string) => (date ? dayjs(date).format('MMM DD, YYYY') : '-'),
  },
  {
    title: 'Deadline',
    dataIndex: 'deadline',
    key: 'deadline',
    width: 120,
    sorter: true,
    render: (date: string) => (date ? dayjs(date).format('MMM DD, YYYY') : '-'),
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
    render: (date: string) => (date ? dayjs(date).format('MMM DD, YYYY') : '-'),
  },
];
