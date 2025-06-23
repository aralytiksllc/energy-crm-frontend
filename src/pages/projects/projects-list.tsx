// External imports
import React from 'react';
import { Table } from 'antd';
import { List, useTable } from '@refinedev/antd';
import { Outlet } from 'react-router';

// Internal imports
import { IProject } from '@/interfaces/project';
import { columns } from './constants/table';

export const ProjectsList: React.FC = () => {
  const { tableProps } = useTable<IProject>({
    resource: 'projects',
    filters: { mode: 'server' },
    syncWithLocation: true,
  });

  return (
    <>
      <List headerProps={{ breadcrumb: <></> }}>
        <Table {...tableProps} columns={columns} rowKey="id" size="small" />
      </List>
      <Outlet />
    </>
  );
};
