// External imports
import React, { useCallback, useMemo } from 'react';
import { FormProps } from 'antd';
import { useList } from '@refinedev/core';

// Internal imports
import type { IProject } from '@interfaces/project';
import { CrudTable } from '@components/crud-table/crud-table';
import { ProjectForm } from './components/project-form';
import { createColumns } from './constants/table';
import { augmentProjectFormProps } from './components/utils/form-helpers';
import { IUser } from '@interfaces/users';
import { ActionButtons } from '@components/action-buttons';
import { usePermissions } from '@hooks/use-permissions';
import { useRelationshipCheck } from '@hooks/use-relationship-check';

export const Projects: React.FC = () => {
  const permissions = usePermissions({ resource: 'projects' });

  const { data: usersData, isLoading: usersLoading } = useList<IUser>({
    resource: 'users',
    pagination: { mode: 'off' },
  });

  const projectRelationships = useRelationshipCheck({
    resource: 'project',
    relatedResource: 'tasks',
    foreignKey: 'projectId',
    titleField: 'title',
    maxDisplayItems: 5,
  }) as unknown as Record<
    number,
    import('@hooks/use-relationship-check').RelationshipInfo
  >;

  // Create columns based on permissions
  const tableColumns = useMemo(() => {
    const allColumns = createColumns();

    if (!permissions.hasActionsPermission) {
      return allColumns.filter((column) => column.key !== 'actions');
    }

    return allColumns.map((col) => {
      if (col.key === 'actions') {
        return {
          ...col,
          render: (_: any, record: IProject) => (
            <ActionButtons
              resource="projects"
              recordId={record.id}
              recordTitle={record.name}
              relationshipInfo={projectRelationships?.[record.id]}
            />
          ),
        };
      }
      return col;
    });
  }, [permissions.hasActionsPermission, projectRelationships]);

  const renderForm = useCallback(
    (formProps: FormProps) => {
      const augmentedFormProps = augmentProjectFormProps(formProps);
      return (
        <ProjectForm
          formProps={augmentedFormProps}
          users={usersData?.data}
          usersLoading={usersLoading}
        />
      );
    },
    [usersData, usersLoading],
  );

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
      showCreateButton={permissions.canCreate}
    />
  );
};
