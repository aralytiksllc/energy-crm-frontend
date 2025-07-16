// External imports
import React, { useCallback, useMemo } from 'react';
import { FormProps } from 'antd';
import { useCan, useList } from '@refinedev/core';

// Internal imports
import type { IProject } from '@interfaces/project';
import { CrudTable } from '@components/crud-table/crud-table';
import { ProjectForm } from './components/project-form';
import { createColumns } from './constants/table';
import { augmentProjectFormProps } from './components/utils/form-helpers';
import { IUser } from '@interfaces/users';
import { DeleteButton } from '@components/delete-button';
import { EditButton } from '@components/edit-button';
import { Space } from 'antd';

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

  const { data: usersData, isLoading: usersLoading } = useList<IUser>({
    resource: 'users',
    pagination: { mode: 'off' },
  });

  const { data: tasksData } = useList({
    resource: 'tasks',
    pagination: { mode: 'off' },
  });

  const projectRelationships = useMemo(() => {
    const tasks = tasksData?.data || [];
    const map: Record<
      number,
      { hasRelated: boolean; message: React.ReactNode }
    > = {};

    tasks.forEach((task: any) => {
      if (!map[task.projectId]) {
        map[task.projectId] = { hasRelated: false, message: null };
      }
      map[task.projectId].hasRelated = true;
    });

    Object.keys(map).forEach((projectId) => {
      const relatedTasks = tasks.filter(
        (task: any) => task.projectId === Number(projectId),
      );
      if (relatedTasks.length > 0) {
        map[Number(projectId)].message = (
          <div>
            <p>This project cannot be deleted because it has active tasks:</p>
            <p>
              <strong>
                {relatedTasks
                  .slice(0, 5)
                  .map((t: any) => t.title)
                  .join(', ')}
              </strong>
            </p>
            {relatedTasks.length > 5 && (
              <p>... and {relatedTasks.length - 5} more</p>
            )}
            <p>
              Please delete or reassign these tasks first before deleting the
              project.
            </p>
          </div>
        );
      }
    });
    return map;
  }, [tasksData]);

  // Check if user has any actions permissions
  const hasActionsPermission = canEdit?.can || canDelete?.can;

  // Create columns based on permissions
  const tableColumns = useMemo(() => {
    const allColumns = createColumns();

    // If user has no actions permissions, remove the actions column entirely
    if (!hasActionsPermission) {
      return allColumns.filter((column) => column.key !== 'actions');
    }

    return allColumns.map((col) => {
      if (col.key === 'actions') {
        return {
          ...col,
          render: (_: any, record: IProject) => {
            const ActionButtons = () => {
              const { data: canEditRecord } = useCan({
                resource: 'projects',
                action: 'edit',
                params: { id: record.id },
              });

              const { data: canDeleteRecord } = useCan({
                resource: 'projects',
                action: 'delete',
                params: { id: record.id },
              });

              const projectRel = projectRelationships[record.id] || {
                hasRelated: false,
                message: null,
              };

              return (
                <Space size="middle">
                  {canEditRecord?.can && (
                    <EditButton
                      resource="projects"
                      resourceId={record.id}
                      type="default"
                      size="small"
                    />
                  )}
                  {canDeleteRecord?.can && (
                    <DeleteButton
                      resource="projects"
                      resourceId={record.id}
                      confirmTitle={`Delete project "${record.name}"?`}
                      type="primary"
                      size="small"
                      hasRelatedData={projectRel.hasRelated}
                      relatedInfoMessage={projectRel.message}
                    />
                  )}
                </Space>
              );
            };
            return <ActionButtons />;
          },
        };
      }
      return col;
    });
  }, [hasActionsPermission, projectRelationships]);

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
      showCreateButton={canCreate?.can}
    />
  );
};
