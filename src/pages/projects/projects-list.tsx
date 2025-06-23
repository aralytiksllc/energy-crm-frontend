// External imports
import React from 'react';
import { Table, Space } from 'antd';
import { List, useTable } from '@refinedev/antd';

// Internal imports
import { useProjectColumns } from './constants/table';
import { IProject } from './types/types';
import { CreateProjectModal } from './components/create-project-modal';
import { ColumnVisibilitySelector } from '@/components/column-visibility-selector';
import { useColumnVisibility } from '@/hooks/useColumnVisibility';

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

  const allColumns = useProjectColumns(handleProjectUpdated);
  const { columnOptions, visibleColumns, setVisibleColumns, filteredColumns } =
    useColumnVisibility(allColumns, 'projects-table-columns');

  return (
    <List
      headerButtons={() => (
        <Space>
          <ColumnVisibilitySelector
            options={columnOptions}
            selected={visibleColumns}
            onChange={setVisibleColumns}
          />
          <CreateProjectModal onProjectCreated={handleProjectCreated} />
        </Space>
      )}
    >
      <div style={{ overflowX: 'auto' }}>
        <Table
          {...tableProps}
          columns={filteredColumns}
          rowKey="id"
          scroll={{ x: 'max-content' }}
          size="middle"
          loading={tableProps.loading}
        />
      </div>
    </List>
  );
};
