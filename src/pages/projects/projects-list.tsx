// External imports
import React from 'react';
import { Table } from 'antd';
import { List, useTable } from '@refinedev/antd';

// Internal imports
import { useProjectColumns } from './constants/table';
import { IProject } from './types/types';
import { CreateProjectModal } from './components/create-project-modal';

export const ProjectsList: React.FC = () => {
  const { tableProps, tableQuery } = useTable<IProject>({
    resource: 'projects',
    filters: { mode: 'server' },
    syncWithLocation: true,
  });

  const handleProjectCreated = (project: IProject) => {
    // Refetch the table data to include the new project
    tableQuery.refetch();
  };

  const handleProjectUpdated = () => {
    // Refetch the table data after project update
    tableQuery.refetch();
  };

  const columns = useProjectColumns(handleProjectUpdated);

  return (
    <List
      headerButtons={() => (
        <CreateProjectModal onProjectCreated={handleProjectCreated} />
      )}
    >
      <div style={{ overflowX: 'auto' }}>
        <Table
          {...tableProps}
          columns={columns}
          rowKey="id"
          scroll={{ x: 'max-content' }}
          size="middle"
          loading={tableProps.loading}
        />
      </div>
    </List>
  );
};
