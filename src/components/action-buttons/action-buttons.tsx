import React from 'react';
import { Space } from 'antd';
import { useCan } from '@refinedev/core';
import { DeleteButton } from '@components/delete-button';
import { EditButton } from '@components/edit-button';
import type { RelationshipInfo } from '@hooks/use-relationship-check';

export interface ActionButtonsProps {
  resource: string;
  recordId: number;
  recordTitle: string;
  relationshipInfo?: RelationshipInfo;
  showEdit?: boolean;
  showDelete?: boolean;
  editButtonProps?: Record<string, any>;
  deleteButtonProps?: Record<string, any>;
}

export const ActionButtons: React.FC<ActionButtonsProps> = ({
  resource,
  recordId,
  recordTitle,
  relationshipInfo,
  showEdit = true,
  showDelete = true,
  editButtonProps = {},
  deleteButtonProps = {},
}) => {
  const { data: canEditRecord } = useCan({
    resource,
    action: 'edit',
    params: { id: recordId },
  });

  const { data: canDeleteRecord } = useCan({
    resource,
    action: 'delete',
    params: { id: recordId },
  });

  const defaultEditProps = {
    resource,
    resourceId: recordId,
    type: 'default' as const,
    size: 'small' as const,
    ...editButtonProps,
  };

  const defaultDeleteProps = {
    resource,
    resourceId: recordId,
    confirmTitle: `Delete ${resource.slice(0, -1)} "${recordTitle}"?`,
    type: 'primary' as const,
    size: 'small' as const,
    hasRelatedData: relationshipInfo?.hasRelated || false,
    relatedInfoMessage: relationshipInfo?.message,
    ...deleteButtonProps,
  };

  return (
    <Space size="middle">
      {showEdit && canEditRecord?.can && <EditButton {...defaultEditProps} />}
      {showDelete && canDeleteRecord?.can && (
        <DeleteButton {...defaultDeleteProps} />
      )}
    </Space>
  );
};
