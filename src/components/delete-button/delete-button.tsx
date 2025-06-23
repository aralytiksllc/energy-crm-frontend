// External imports
import React from 'react';
import { Modal, Button } from 'antd';
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
    ...restProps
  } = props;

  const { canAccess, onConfirm } = useDeleteButton({
    resource,
    id: resourceId,
  });

  const handleClick = React.useCallback(
    (event: React.MouseEvent) => {
      event.stopPropagation();
      Modal.confirm({
        title: confirmTitle,
        content: confirmMessage,
        okText: 'Delete',
        okType: 'danger',
        cancelText: 'Cancel',
        centered: true,
        transitionName: 'fade',
        maskTransitionName: 'fade',
        onOk: onConfirm,
      });
    },
    [confirmTitle, confirmMessage, onConfirm],
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
