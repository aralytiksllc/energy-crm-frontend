// External imports
import React, { useCallback, useMemo } from 'react';
import { FormProps } from 'antd';
import { useCan } from '@refinedev/core';

// Internal imports
import type { IProject } from '@interfaces/project';
import { CrudTable } from '@components/crud-table/crud-table';
import { ProjectForm } from './components/project-form';
import { columns, createColumns } from './constants/table';
import { augmentProjectFormProps } from './components/utils/form-helpers';

export const Projects: React.FC = () => {
  const { data: canCreate } = useCan({
    resource: 'projects',
    action: 'create',
  });

  const { data: canEdit } = useCan({
    resource: 'projects',
    action: 'edit',
  });

  const { data: canDelete } = useCan({
    resource: 'projects',
    action: 'delete',
  });

  // Check if user has any actions permissions
  const hasActionsPermission = canEdit?.can || canDelete?.can;

  // Create columns based on permissions
  const tableColumns = useMemo(() => {
    const allColumns = createColumns();

    // If user has no actions permissions, remove the actions column entirely
    if (!hasActionsPermission) {
      return allColumns.filter((column) => column.key !== 'actions');
    }

    return allColumns;
  }, [hasActionsPermission]);

  const renderForm = useCallback((formProps: FormProps) => {
    const augmentedFormProps = augmentProjectFormProps(formProps);
    return <ProjectForm formProps={augmentedFormProps} />;
  }, []);

  return (
    <CrudTable<IProject>
      resource="projects"
      renderForm={renderForm}
      columns={tableColumns}
      drawerTitles={{
        create: 'Create Project',
        edit: 'Edit Project',
        view: 'Project Details',
      }}
      showCreateButton={canCreate?.can}
    />
  );
};
