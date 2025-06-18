import * as React from 'react';
import { Button, Modal } from 'antd';
import { DeleteOutlined } from '@ant-design/icons';
import { useDeleteButton } from '@refinedev/core';
import type { ButtonProps } from 'antd';

interface DeleteButtonProps extends ButtonProps {
  resource: string;
  resourceId: number;
  confirmTitle?: string;
  confirmMessage?: string;
}

export const DeleteButton: React.FC<DeleteButtonProps> = (props) => {
  const {
    resource,
    resourceId: id,
    confirmTitle = 'Are you sure you want to delete this item?',
    confirmMessage = 'This action cannot be undone.',
    ...buttonProps
  } = props;

  const { onConfirm } = useDeleteButton({ resource, id });

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
        transitionName: 'fade',
        maskTransitionName: 'fade',
        onOk: onConfirm,
      });
    },
    [confirmTitle, confirmMessage, onConfirm],
  );

  return (
    <Button
      onClick={handleClick}
      icon={<DeleteOutlined />}
      danger={true}
      {...buttonProps}
    />
  );
};
