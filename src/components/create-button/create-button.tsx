// External dependencies
import * as React from 'react';
import { Button } from 'antd';
import { useCreateButton } from '@refinedev/core';
import { PlusSquareOutlined } from '@ant-design/icons';

// Internal dependencies
import type { CreateButtonProps } from './create-button.types';

export const CreateButton: React.FC<CreateButtonProps> = (props) => {
  const { resource, onClick, ...restProps } = props;

  const { canAccess, disabled } = useCreateButton({ resource });

  if (canAccess) {
    return (
      <Button
        icon={<PlusSquareOutlined />}
        disabled={disabled}
        onClick={onClick}
        {...restProps}
      />
    );
  }

  return null;
};
