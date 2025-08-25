// External
import * as React from 'react';
import { Button, Modal } from 'antd';
import { DeleteOutlined } from '@ant-design/icons';
import { useDeleteButton } from '@refinedev/core';

// Internal
import type { DeleteButtonProps } from './delete-button.types';

export const DeleteButton: React.FC<DeleteButtonProps> = (props) => {
  const {
    resource,
    recordItemId,
    confirmTitle = 'Are you sure you want to delete this item?',
    confirmMessage = 'This action cannot be undone.',
    ...restProps
  } = props;

  const { canAccess, disabled, onConfirm } = useDeleteButton({
    resource,
    id: recordItemId,
  });

  const handleClick = React.useCallback(
    (e: React.MouseEvent<HTMLElement>) => {
      e.stopPropagation();
      Modal.confirm({
        title: confirmTitle,
        content: confirmMessage,
        okText: 'Delete',
        okType: 'danger',
        cancelText: 'Cancel',
        centered: true,
        transitionName: '',
        onOk: onConfirm,
      });
    },
    [confirmTitle, confirmMessage],
  );

  if (canAccess) {
    return (
      <Button
        onClick={handleClick}
        icon={<DeleteOutlined />}
        danger={true}
        disabled={disabled}
        {...restProps}
      />
    );
  }

  return null;
};
