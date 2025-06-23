// External dependencies
import type { ButtonProps } from 'antd';

// Internal dependencies

export interface EditButtonProps extends Omit<ButtonProps, 'onClick'> {
  resource: string;

  resourceId: number;

  onClick: (id: number) => void;
}
