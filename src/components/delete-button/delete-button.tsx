// External imports
import React, { useState } from 'react';
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

  const [isModalVisible, setIsModalVisible] = useState(false);
  const [isDeleting, setIsDeleting] = useState(false);

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

      setIsModalVisible(true);
    },
    [hasRelatedData, relatedInfoMessage],
  );

  const handleOk = async () => {
    setIsDeleting(true);
    try {
      await onConfirm();
      onSuccess?.(resourceId);
      message.success(`${resource.slice(0, -1)} deleted successfully`);
    } catch (error: any) {
      message.error(`Failed to delete ${resource.slice(0, -1)}`);
      console.error('Delete error:', error);
    } finally {
      setIsDeleting(false);
      setIsModalVisible(false);
    }
  };

  const handleCancel = () => {
    setIsModalVisible(false);
  };

  return (
    <>
      <Button
        icon={<DeleteOutlined />}
        danger
        onClick={handleClick}
        {...restProps}
      />
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
    </>
  );
};
