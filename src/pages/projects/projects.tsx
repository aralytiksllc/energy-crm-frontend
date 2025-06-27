// External imports
import React, { useCallback } from 'react';
import { FormProps } from 'antd';

// Internal imports
import type { IProject } from '@interfaces/project';
import { CrudTable } from '@components/crud-table/crud-table';
import { ProjectForm } from './components/project-form';
import { columns } from './constants/table';
import { augmentProjectFormProps } from './components/utils/form-helpers';

export const Projects: React.FC = () => {
  const renderForm = useCallback((formProps: FormProps) => {
    const augmentedFormProps = augmentProjectFormProps(formProps);
    return <ProjectForm formProps={augmentedFormProps} />;
  }, []);

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
