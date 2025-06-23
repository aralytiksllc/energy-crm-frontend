// External dependencies
import type { ButtonProps } from 'antd';

// Internal dependencies

export interface DeleteButtonProps extends ButtonProps {
  resource: string;

  resourceId: number;

  confirmTitle?: string;

  confirmMessage?: string;
}
