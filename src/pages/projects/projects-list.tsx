// External imports
import React from 'react';
import { Table, Space } from 'antd';
import { List, useTable, CreateButton } from '@refinedev/antd';

// Internal imports
import { useProjectColumns } from './constants/table';
import { IProject } from './types/types';
import { CreateProjectModal } from './components/create-project-modal';

export const ProjectsList: React.FC = () => {
  const { tableProps } = useTable<IProject>({
    resource: 'projects',
    filters: { mode: 'server' },
    syncWithLocation: true,
  });

  const handleProjectCreated = (project: IProject) => {
    // Handle successful project creation
  };

  const handleProjectUpdated = () => {
    // Refetch the table data after project update
    tableProps.onChange?.();
  };

  const columns = useProjectColumns(handleProjectUpdated);

  return (
    <List
      headerButtons={({ defaultButtons }) => (
        <>
          {defaultButtons}
          <CreateButton />
        </>
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
