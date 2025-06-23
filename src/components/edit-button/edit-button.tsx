// External dependencies
import * as React from 'react';
import { Button } from 'antd';
import { EditOutlined } from '@ant-design/icons';
import { useEditButton } from '@refinedev/core';

// Internal dependencies
import type { EditButtonProps } from './edit-button.types';

export const EditButton: React.FC<EditButtonProps> = (props) => {
  const { resource, resourceId, onClick, ...restProps } = props;

  const { canAccess, disabled } = useEditButton({
    id: resourceId,
    resource,
  });

  const handleClick = React.useCallback(
    () => onClick(resourceId),
    [resourceId, onClick],
  );

  if (canAccess) {
    return (
      <Button
        icon={<EditOutlined />}
        disabled={disabled}
        onClick={handleClick}
        {...restProps}
      />
    );
  }

  return null;
};
