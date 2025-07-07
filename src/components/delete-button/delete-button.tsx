// External imports
import React from 'react';
import { Modal, Button, message } from 'antd';
import { DeleteOutlined } from '@ant-design/icons';
import { useDeleteButton, useList } from '@refinedev/core';

// Internal dependencies
import type { DeleteButtonProps } from './delete-button.types';

export const DeleteButton: React.FC<DeleteButtonProps> = (props) => {
  const {
    resource,
    resourceId,
    confirmTitle = 'Are you sure you want to delete this item?',
    confirmMessage = 'This action cannot be undone.',
    ...restProps
  } = props;

  const { canAccess, onConfirm } = useDeleteButton({
    resource,
    id: resourceId,
  });

  // Fetch related projects when dealing with customers
  const { data: projectsData } = useList({
    resource: 'projects',
    filters: [
      {
        field: 'customerId',
        operator: 'eq',
        value: resourceId,
      },
    ],
    pagination: { mode: 'off' },
    queryOptions: {
      enabled: resource === 'customers',
    },
  });

  // Fetch related tasks when dealing with projects
  const { data: tasksData } = useList({
    resource: 'tasks',
    filters: [
      {
        field: 'projectId',
        operator: 'eq',
        value: resourceId,
      },
    ],
    pagination: { mode: 'off' },
    queryOptions: {
      enabled: resource === 'projects',
    },
  });

  const relatedProjects = projectsData?.data || [];
  const relatedTasks = tasksData?.data || [];

  const handleClick = React.useCallback(
    (event: React.MouseEvent) => {
      event.stopPropagation();

      // Check for related projects before showing delete confirmation
      if (resource === 'customers' && relatedProjects.length > 0) {
        const projectNames = relatedProjects
          .map((project: any) => project.name)
          .join(', ');
        Modal.warning({
          title: 'Cannot Delete Customer',
          content: (
            <div>
              <p>
                This customer cannot be deleted because it has active projects:
              </p>
              <p>
                <strong>{projectNames}</strong>
              </p>
              <p>
                Please delete or reassign these projects first before deleting
                the customer.
              </p>
            </div>
          ),
          okText: 'Understood',
          centered: true,
        });
        return;
      }

      // Check for related tasks before showing delete confirmation
      if (resource === 'projects' && relatedTasks.length > 0) {
        const taskTitles = relatedTasks
          .map((task: any) => task.title)
          .join(', ');
        Modal.warning({
          title: 'Cannot Delete Project',
          content: (
            <div>
              <p>This project cannot be deleted because it has active tasks:</p>
              <p>
                <strong>{taskTitles}</strong>
              </p>
              <p>
                Please delete or reassign these tasks first before deleting the
                project.
              </p>
            </div>
          ),
          okText: 'Understood',
          centered: true,
        });
        return;
      }

      Modal.confirm({
        title: confirmTitle,
        content: confirmMessage,
        okText: 'Delete',
        okType: 'danger',
        cancelText: 'Cancel',
        centered: true,
        transitionName: 'fade',
        maskTransitionName: 'fade',
        onOk: async () => {
          try {
            await onConfirm();
          } catch (error: any) {
            // Handle foreign key constraint errors
            if (
              error?.code === '23503' ||
              (error?.message &&
                error.message.includes('referenced from table'))
            ) {
              if (resource === 'customers') {
                message.error(
                  'Cannot delete customer: This customer has active projects. Please delete or reassign the projects first.',
                );
              } else if (resource === 'projects') {
                message.error(
                  'Cannot delete project: This project has active tasks. Please delete or reassign the tasks first.',
                );
              } else {
                message.error(
                  'Cannot delete: This item is being used by other records. Please remove dependencies first.',
                );
              }
            } else {
              // Generic error message for other types of errors
              message.error(`Failed to delete ${resource.slice(0, -1)}`);
            }
            console.error('Delete error:', error);
          }
        },
      });
    },
    [
      confirmTitle,
      confirmMessage,
      onConfirm,
      resource,
      relatedProjects,
      relatedTasks,
    ],
  );

  if (canAccess) {
    return (
      <Button
        icon={<DeleteOutlined />}
        onClick={handleClick}
        danger={true}
        {...restProps}
      />
    );
  }

  return null;
};
