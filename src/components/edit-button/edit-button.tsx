import React from 'react';
import { Button, ButtonProps } from 'antd';
import { EditOutlined } from '@ant-design/icons';
import { useEditButton } from '@refinedev/core';

interface EditButtonProps extends Omit<ButtonProps, 'onClick'> {
  resource: string;
  resourceId: number;
  onClick: (id: number) => void;
}

export const EditButton: React.FC<EditButtonProps> = (props) => {
  const { resource, resourceId, onClick, ...restProps } = props;

  const { disabled, canAccess } = useEditButton({
    id: resourceId,
    resource,
  });

  const handleClick = React.useCallback(
    () => onClick(resourceId),
    [resourceId, onClick],
  );

  if (!canAccess) return null;

  return (
    <Button
      icon={<EditOutlined />}
      disabled={disabled}
      onClick={handleClick}
      {...restProps}
    >
      {/* {label} */}
    </Button>
  );
};
