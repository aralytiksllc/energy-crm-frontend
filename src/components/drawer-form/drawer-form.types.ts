// External dependencies
import type { ReactNode } from 'react';
import type { FormProps } from 'antd/es/form';
import type { UseDrawerFormReturnType } from '@refinedev/antd';

// Internal dependencies
import type { DrawerTabItem } from '../drawer-tabs';

export interface DrawerFormProps extends UseDrawerFormReturnType {
  renderForm: (formProps: FormProps) => ReactNode;
  title?: string;
  width?: number;
  open?: boolean;
  tabs?: DrawerTabItem[];
  activeTab?: string;
  onTabChange?: (activeKey: string) => void;
}
