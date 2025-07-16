import React, { useCallback, useMemo } from 'react';
import type { FormProps } from 'antd';
import { useCan, useList } from '@refinedev/core';
import type { Task } from '@interfaces/task';
import { IProject } from '@interfaces/project';
import { IUser } from '@interfaces/users';
import { CrudTable } from '@components/crud-table/crud-table';
import { TaskForm } from './components/task-form';
import { createColumns } from './constants/table';
import { DeleteButton } from '@components/delete-button';
import { EditButton } from '@components/edit-button';
import { Space } from 'antd';

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

  const { data: planningsData } = useList({
    resource: 'plannings',
    pagination: { mode: 'off' },
  });

  const taskRelationships = useMemo(() => {
    const plannings = planningsData?.data || [];
    const map: Record<
      number,
      { hasRelated: boolean; message: React.ReactNode }
    > = {};

    plannings.forEach((planning: any) => {
      if (!map[planning.taskId]) {
        map[planning.taskId] = { hasRelated: false, message: null };
      }
      map[planning.taskId].hasRelated = true;
    });

    Object.keys(map).forEach((taskId) => {
      const relatedPlannings = plannings.filter(
        (planning: any) => planning.taskId === Number(taskId),
      );
      if (relatedPlannings.length > 0) {
        map[Number(taskId)].message = (
          <div>
            <p>This task cannot be deleted because it has active planning:</p>
            <p>
              <strong>
                {relatedPlannings
                  .slice(0, 3)
                  .map((p: any) => p.title)
                  .join(', ')}
              </strong>
            </p>
            {relatedPlannings.length > 3 && (
              <p>... and {relatedPlannings.length - 3} more</p>
            )}
            <p>
              Please delete or reassign these planning items first before
              deleting the task.
            </p>
          </div>
        );
      }
    });
    return map;
  }, [planningsData]);

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
          render: (_: any, record: Task) => {
            const ActionButtons = () => {
              const { data: canEditRecord } = useCan({
                resource: 'tasks',
                action: 'edit',
                params: { id: record.id },
              });

              const { data: canDeleteRecord } = useCan({
                resource: 'tasks',
                action: 'delete',
                params: { id: record.id },
              });

              const taskRel = taskRelationships[record.id] || {
                hasRelated: false,
                message: null,
              };

              return (
                <Space size="middle">
                  {canEditRecord?.can && (
                    <EditButton
                      resource="tasks"
                      resourceId={record.id}
                      type="default"
                      size="small"
                    />
                  )}
                  {canDeleteRecord?.can && (
                    <DeleteButton
                      resource="tasks"
                      resourceId={record.id}
                      confirmTitle={`Delete task "${record.title}"?`}
                      type="primary"
                      size="small"
                      hasRelatedData={taskRel.hasRelated}
                      relatedInfoMessage={taskRel.message}
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
  }, [hasActionsPermission, taskRelationships]);

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
          projects={projectsData?.data}
          projectsLoading={projectsLoading}
        />
      );
    },
    [projectsData?.data, usersData?.data, projectsLoading, usersLoading],
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
