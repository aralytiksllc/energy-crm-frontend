// External imports
import React, { useCallback, useMemo } from 'react';
import { FormProps } from 'antd';
import { useCan, useList } from '@refinedev/core';

// Internal imports
import type { IUser } from '@interfaces/users';
import { CrudTable } from '@components/crud-table/crud-table';
import { UsersForm } from './components/user-form';
import { createColumns } from './constants/table';
import { useResourcePermissions } from '@hooks/use-resource-permissions';
import { DeleteButton } from '@components/delete-button';
import { EditButton } from '@components/edit-button';
import { Space } from 'antd';

export const Users: React.FC = () => {
  const { data: canCreate } = useCan({
    resource: 'users',
    action: 'create',
  });

  const { data: canEdit } = useCan({
    resource: 'users',
    action: 'edit',
  });

  const { data: canDelete } = useCan({
    resource: 'users',
    action: 'delete',
  });

  const permissions = useResourcePermissions({ resource: 'users' });

  const { data: tasksData } = useList({
    resource: 'tasks',
    pagination: { mode: 'off' },
  });

  const { data: planningsData } = useList({
    resource: 'plannings',
    pagination: { mode: 'off' },
  });

  const userRelationships = useMemo(() => {
    const tasks = tasksData?.data || [];
    const plannings = planningsData?.data || [];
    const map: Record<
      number,
      { hasRelated: boolean; message: React.ReactNode }
    > = {};

    tasks.forEach((task: any) => {
      (task.assignees || []).forEach((assignee: any) => {
        if (!map[assignee.userId]) {
          map[assignee.userId] = { hasRelated: false, message: null };
        }
        map[assignee.userId].hasRelated = true;
      });
    });

    plannings.forEach((planning: any) => {
      if (!map[planning.assignedUserId]) {
        map[planning.assignedUserId] = { hasRelated: false, message: null };
      }
      map[planning.assignedUserId].hasRelated = true;
    });

    Object.keys(map).forEach((userId) => {
      const relatedTasks = tasks.filter((task: any) =>
        (task.assignees || []).some(
          (assignee: any) => assignee.userId === Number(userId),
        ),
      );
      const relatedPlannings = plannings.filter(
        (planning: any) => planning.assignedUserId === Number(userId),
      );

      if (relatedTasks.length > 0 || relatedPlannings.length > 0) {
        const taskNames = relatedTasks
          .slice(0, 3)
          .map((t: any) => t.title)
          .join(', ');
        const planningNames = relatedPlannings
          .slice(0, 3)
          .map((p: any) => p.title)
          .join(', ');

        let message =
          'This user cannot be deleted because they have active assignments:';
        if (relatedTasks.length > 0) {
          message += `\n• Tasks: ${taskNames}`;
          if (relatedTasks.length > 3)
            message += ` (and ${relatedTasks.length - 3} more)`;
        }
        if (relatedPlannings.length > 0) {
          message += `\n• Planning: ${planningNames}`;
          if (relatedPlannings.length > 3)
            message += ` (and ${relatedPlannings.length - 3} more)`;
        }
        message +=
          '\n\nPlease reassign or delete these items first before deleting the user.';

        map[Number(userId)].message = (
          <div style={{ whiteSpace: 'pre-line' }}>{message}</div>
        );
      }
    });
    return map;
  }, [tasksData, planningsData]);

  const hasActionsPermission = canEdit?.can || canDelete?.can;

  const tableColumns = useMemo(() => {
    const allColumns = createColumns();

    if (!hasActionsPermission) {
      return allColumns.filter((column) => column.key !== 'actions');
    }

    return allColumns.map((col) => {
      if (col.key === 'actions') {
        return {
          ...col,
          render: (_: any, record: IUser) => {
            const ActionButtons = () => {
              const { data: canEditRecord } = useCan({
                resource: 'users',
                action: 'edit',
                params: { id: record.id },
              });

              const { data: canDeleteRecord } = useCan({
                resource: 'users',
                action: 'delete',
                params: { id: record.id },
              });

              const userRel = userRelationships[record.id as number] || {
                hasRelated: false,
                message: null,
              };

              return (
                <Space size="middle">
                  {canEditRecord?.can && (
                    <EditButton
                      resource="users"
                      resourceId={record.id as number}
                      type="default"
                      size="small"
                    />
                  )}
                  {canDeleteRecord?.can && (
                    <DeleteButton
                      resource="users"
                      resourceId={record.id as number}
                      confirmTitle={`Delete user "${record.firstName} ${record.lastName}"?`}
                      type="primary"
                      size="small"
                      hasRelatedData={userRel.hasRelated}
                      relatedInfoMessage={userRel.message}
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
  }, [hasActionsPermission, userRelationships]);

  const renderForm = useCallback((formProps: FormProps) => {
    const isEdit = !!formProps?.initialValues?.id;
    return (
      <UsersForm formProps={formProps} mode={isEdit ? 'edit' : 'create'} />
    );
  }, []);

  return (
    <CrudTable<IUser & { id: number }>
      resource="users"
      renderForm={renderForm}
      columns={tableColumns}
      drawerTitles={{
        create: 'Create User',
        edit: 'Edit User',
        view: 'User Details',
      }}
      showCreateButton={canCreate?.can}
    />
  );
};
