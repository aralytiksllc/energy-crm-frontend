// External
import type { ButtonProps } from 'antd';

// Internal

export interface DeleteButtonProps extends ButtonProps {
  resource: string;

  recordItemId: number;

  confirmTitle?: string;

  confirmMessage?: string;
}
