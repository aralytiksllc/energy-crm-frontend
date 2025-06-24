// External imports
import React, { useCallback } from 'react';
import { FormProps } from 'antd';

// Internal imports
import type { IProject } from '@/interfaces/project';
import { CrudTable } from '@/components/crud-table/crud-table';
import { ProjectForm } from './components/project-form';
import { columns } from './constants/table';

export const Projects: React.FC = () => {
  const renderForm = useCallback(
    (formProps: FormProps) => <ProjectForm formProps={formProps} />,
    [],
  );

  return (
    <CrudTable<IProject>
      resource="projects"
      renderForm={renderForm}
      columns={columns}
      drawerTitles={{
        create: 'Create Project',
        edit: 'Edit Project',
        view: 'Project Details',
      }}
    />
  );
};
