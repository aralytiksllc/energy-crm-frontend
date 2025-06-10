import * as React from 'react';
import { Table } from 'antd';
import { List } from '@refinedev/antd';
import { columns as baseColumns } from '../constants/table';
import { mockProjects } from '../constants/projects';
import { ArrowRightOutlined } from '@ant-design/icons';
import { ColumnsType } from 'antd/es/table';
import { IProject } from '../types/types';

const kanbanColumn: ColumnsType<IProject>[number] = {
  title: 'Kanban',
  dataIndex: 'kanban',
  key: 'kanban',
  render: (_: unknown, record: IProject) => (
    <a href={`/projects/${record.id}`} title="Open Kanban Board">
      <ArrowRightOutlined style={{ fontSize: 18, color: '#2563eb' }} />
    </a>
  ),
};

const columns: ColumnsType<IProject> = [
  ...baseColumns.slice(0, 2),
  kanbanColumn,
  ...baseColumns.slice(2),
];

const ProjectsList: React.FC = () => {
  return (
    <List>
      <div style={{ overflowX: 'auto' }}>
        <Table
          dataSource={mockProjects as IProject[]}
          columns={columns}
          rowKey="id"
          scroll={{ x: 'max-content' }}
        />
      </div>
    </List>
  );
};

export default ProjectsList;
