import React from 'react';
import { Button, ButtonProps } from 'antd';
import { PlusSquareOutlined } from '@ant-design/icons';
import { useCreateButton } from '@refinedev/core';

interface CreateButtonProps extends ButtonProps {
  resource: string;
}

export const CreateButton: React.FC<CreateButtonProps> = (props) => {
  const { resource, onClick, ...restProps } = props;

  const { hidden, disabled, label } = useCreateButton({ resource });

  if (hidden) return null;

  return (
    <Button
      icon={<PlusSquareOutlined />}
      disabled={disabled}
      onClick={onClick}
      type="primary"
      {...restProps}
    >
      {label}
    </Button>
  );
};
