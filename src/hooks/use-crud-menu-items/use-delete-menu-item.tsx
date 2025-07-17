// External imports
import React, { useState } from 'react';
import { Modal } from 'antd';
import { DeleteOutlined } from '@ant-design/icons';
import { useDeleteButton } from '@refinedev/core';
import type { MenuInfo } from 'rc-menu/lib/interface';

// Internal imports
import { useLatestRef } from '@hooks/use-latest-ref';
import type {
  UseDeleteMenuItem,
  UseDeleteMenuItemProps,
} from './use-delete-menu-item.types';

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

  const [isModalVisible, setIsModalVisible] = useState(false);
  const [isDeleting, setIsDeleting] = useState(false);

  const { onConfirm } = useDeleteButton({ resource, id: resourceId });

  const onConfirmRef = useLatestRef(onConfirm);

  const handleConfirm = React.useCallback(() => onConfirm(), [onConfirm]);

  const handleOk = async () => {
    setIsDeleting(true);
    try {
      await handleConfirm();
    } catch (error) {
      console.error('Delete error:', error);
    } finally {
      setIsDeleting(false);
      setIsModalVisible(false);
    }
  };

  const handleCancel = () => {
    setIsModalVisible(false);
  };

  const handleClick = React.useCallback((info: MenuInfo) => {
    info.domEvent.stopPropagation();
    setIsModalVisible(true);
  }, []);

  const DeleteModal = () => (
    <Modal
      title={confirmTitle}
      open={isModalVisible}
      onOk={handleOk}
      onCancel={handleCancel}
      confirmLoading={isDeleting}
      okText="Delete"
      cancelText="Cancel"
      okType="danger"
      centered
    >
      <p>{confirmMessage}</p>
    </Modal>
  );

  return React.useMemo(
    () => ({
      key: 'delete-menu-item',
      icon: <DeleteOutlined />,
      label: label ?? 'Delete',
      danger: true,
      onClick: handleClick,
      modal: <DeleteModal />,
    }),
    [label, handleClick],
  );
};
