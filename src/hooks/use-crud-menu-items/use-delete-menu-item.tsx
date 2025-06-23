// External imports
import React from 'react';
import { Modal } from 'antd';
import { DeleteOutlined } from '@ant-design/icons';
import { useDeleteButton } from '@refinedev/core';
import type { MenuInfo } from 'rc-menu/lib/interface';

// Internal imports
import { useLatestRef } from '../use-latest-ref';
import type {
  UseDeleteMenuItem,
  UseDeleteMenuItemProps,
} from '../use-delete-menu-item/use-delete-menu-item.types';

export const useDeleteMenuItem = (
  props: UseDeleteMenuItemProps,
): UseDeleteMenuItem => {
  const {
    resource,
    resourceId,
    confirmTitle = 'Are you sure you want to delete this item?',
    confirmMessage = 'This action cannot be undone.',
    label,
  } = props;

  const { onConfirm } = useDeleteButton({ resource, id: resourceId });

  const onConfirmRef = useLatestRef(onConfirm);

  const handleConfirm = React.useCallback(() => onConfirm(), [onConfirm]);

  const handleClick = React.useCallback(
    (info: MenuInfo) => {
      info.domEvent.stopPropagation();

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

  return React.useMemo(
    () => ({
      key: 'delete-menu-item',
      icon: <DeleteOutlined />,
      label: label ?? 'Delete',
      danger: true,
      onClick: handleClick,
    }),
    [label, handleClick],
  );
};
