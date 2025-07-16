// External imports
import React from 'react';
import { Modal, Button, message } from 'antd';
import { DeleteOutlined } from '@ant-design/icons';
import { useDeleteButton } from '@refinedev/core';

// Internal dependencies
import type { DeleteButtonProps } from './delete-button.types';

export const DeleteButton: React.FC<DeleteButtonProps> = (props) => {
  const {
    resource,
    resourceId,
    confirmTitle = 'Are you sure you want to delete this item?',
    confirmMessage = 'This action cannot be undone.',
    onSuccess,
    hasRelatedData = false,
    relatedInfoMessage,
    ...restProps
  } = props;

  const { canAccess, onConfirm } = useDeleteButton({
    resource,
    id: resourceId,
  });

  const handleClick = React.useCallback(
    (event: React.MouseEvent) => {
      event.stopPropagation();

      if (hasRelatedData && relatedInfoMessage) {
        Modal.warning({
          title: 'Cannot Delete',
          content: relatedInfoMessage,
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
            onSuccess?.(resourceId);
          } catch (error: any) {
            message.error(`Failed to delete ${resource.slice(0, -1)}`);
            console.error('Delete error:', error);
          }
        },
      });
    },
    [
      confirmTitle,
      confirmMessage,
      onConfirm,
      hasRelatedData,
      relatedInfoMessage,
      resource,
      resourceId,
      onSuccess,
    ],
  );

  return (
    <Button
      icon={<DeleteOutlined />}
      danger
      onClick={handleClick}
      {...restProps}
    />
  );
};
