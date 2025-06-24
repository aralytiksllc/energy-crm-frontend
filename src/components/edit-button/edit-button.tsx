// External dependencies
import * as React from 'react';
import { Button } from 'antd';
import { useEditButton } from '@refinedev/core';
import { EditOutlined } from '@ant-design/icons';

// Internal dependencies
import type { EditButtonProps } from './edit-button.types';

// TODO: FIX THIS
import { useDrawerFormContext } from '@/components/drawer-form';

export const EditButton: React.FC<EditButtonProps> = (props) => {
  const { resource, resourceId, ...restProps } = props;

  const { drawerForm } = useDrawerFormContext();

  const { canAccess, disabled } = useEditButton({
    id: resourceId,
    resource,
  });

  const handleClick = React.useCallback(
    () => drawerForm?.show(resourceId),
    [drawerForm?.show, resourceId],
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
