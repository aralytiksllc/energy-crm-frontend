import React, { useCallback, useMemo } from 'react';
import type { FormProps } from 'antd';
import { useGetIdentity, useList } from '@refinedev/core';
import type { Task } from '@interfaces/task';
import { IProject } from '@interfaces/project';
import { IUser } from '@interfaces/users';
import { CrudTable } from '@components/crud-table/crud-table';
import { TaskForm } from './components/task-form';
import { createColumns } from './constants/table';
import { ActionButtons } from '@components/action-buttons';
import { usePermissions } from '@hooks/use-permissions';
import { useRelationshipCheck } from '@hooks/use-relationship-check';

interface AssigneeValue {
  userId?: number;
  estimatedHours?: number;
}

export const Tasks: React.FC = () => {
  const { data: identity } = useGetIdentity<IUser>();
  const permissions = usePermissions({ resource: 'tasks' });

  const { data: projectsData, isLoading: projectsLoading } = useList<IProject>({
    resource: 'projects',
    pagination: { mode: 'off' },
  });

  const { data: usersData, isLoading: usersLoading } = useList<IUser>({
    resource: 'users',
    pagination: { mode: 'off' },
  });

  const taskRelationships = useRelationshipCheck({
    resource: 'task',
    relatedResource: 'plannings',
    foreignKey: 'taskId',
    titleField: 'title',
  });

  const userProjects = useMemo(() => {
    if (!projectsData?.data || !identity?.id) {
      return [];
    }

    const isAdminOrManager =
      identity.role?.name === 'superadmin' || identity.role?.name === 'manager';

    if (isAdminOrManager) {
      return projectsData.data;
    }

    return projectsData.data.filter((project) => {
      return project.members?.some(
        (member) => member.userId === identity.id && member.isActive,
      );
    });
  }, [projectsData?.data, identity]);

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
          render: (_: any, record: Task) => (
            <ActionButtons
              resource="tasks"
              recordId={record.id}
              recordTitle={record.title}
              relationshipInfo={taskRelationships[record.id]}
            />
          ),
        };
      }
      return col;
    });
  }, [permissions.hasActionsPermission, taskRelationships]);

  const renderForm = useCallback(
    (formProps: FormProps) => {
      const { onFinish, initialValues, ...restFormProps } = formProps;

      const customOnFinish = async (values: any) => {
        const transformedValues = { ...values };

        if (Array.isArray(transformedValues.assignees)) {
          transformedValues.assignees = transformedValues.assignees
            .filter((a: AssigneeValue) => a && a.userId)
            .map((a: AssigneeValue) => ({
              userId: Number(a.userId),
              estimatedHours: a.estimatedHours || 0,
            }));
        } else {
          transformedValues.assignees = [];
        }

        if (onFinish) {
          const result = await onFinish(transformedValues);
          return result;
        }
      };

      return (
        <TaskForm
          formProps={{
            ...restFormProps,
            onFinish: customOnFinish,
            initialValues,
          }}
          users={usersData?.data}
          usersLoading={usersLoading}
          projects={userProjects}
          projectsLoading={projectsLoading}
        />
      );
    },
    [userProjects, usersData?.data, projectsLoading, usersLoading],
  );

  const permanentFilters = useMemo(() => {
    if (
      identity?.role?.name === 'superadmin' ||
      identity?.role?.name === 'manager'
    ) {
      return [];
    }

    if (identity?.id) {
      return [
        {
          field: 'assignees',
          operator: 'contains',
          value: { userId: identity.id },
        },
      ];
    }

    return [];
  }, [identity]);

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
      showCreateButton={permissions.canCreate}
      permanentFilters={permanentFilters}
    />
  );
};
