import React, { useCallback, useMemo } from 'react';
import type { FormProps } from 'antd';
import { useCan, useList } from '@refinedev/core';
import type { Task } from '@interfaces/task';
import { IProject } from '@interfaces/project';
import { IUser } from '@interfaces/users';
import { CrudTable } from '@components/crud-table/crud-table';
import { TaskForm } from './components/task-form';
import { columns, createColumns } from './constants/table';

interface AssigneeValue {
  userId?: number;
  estimatedHours?: number;
}

export const Tasks: React.FC = () => {
  const { data: canCreate } = useCan({
    resource: 'tasks',
    action: 'create',
  });

  const { data: canEdit } = useCan({
    resource: 'tasks',
    action: 'edit',
  });

  const { data: canDelete } = useCan({
    resource: 'tasks',
    action: 'delete',
  });

  const { data: projectsData, isLoading: projectsLoading } = useList<IProject>({
    resource: 'projects',
    pagination: { mode: 'off' },
  });

  const { data: usersData, isLoading: usersLoading } = useList<IUser>({
    resource: 'users',
    pagination: { mode: 'off' },
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

  const renderForm = useCallback(
    (formProps: FormProps) => {
      const { onFinish, initialValues, ...restFormProps } = formProps;

      const handleFinish = async (values: any) => {
        const transformedValues = { ...values };

        if (Array.isArray(transformedValues.assignees)) {
          transformedValues.assignees = transformedValues.assignees
            .filter((a: AssigneeValue) => a && a.userId)
            .map((a: AssigneeValue) => ({
              userId: a.userId,
              estimatedHours: a.estimatedHours || 0,
            }));
        } else {
          transformedValues.assignees = [];
        }

        if (onFinish) {
          await onFinish(transformedValues);
        }
      };

      const augmentedFormProps = {
        ...restFormProps,
        onFinish: handleFinish,
        initialValues: initialValues
          ? {
              ...initialValues,
              assignees: initialValues.assignees?.map((a: any) => ({
                userId: a.userId,
                estimatedHours: a.estimatedHours,
              })),
            }
          : undefined,
      };

      return (
        <TaskForm
          formProps={augmentedFormProps}
          projects={projectsData?.data}
          users={usersData?.data}
          projectsLoading={projectsLoading}
        />
      );
    },
    [projectsData, usersData, projectsLoading],
  );

  return (
    <CrudTable<Task>
      resource="tasks"
      renderForm={renderForm}
      columns={tableColumns}
      createInitialValues={{ assignees: [{}] }}
      drawerTitles={{
        create: 'Create Task',
        edit: 'Edit Task',
      }}
      showCreateButton={canCreate?.can}
    />
  );
};
