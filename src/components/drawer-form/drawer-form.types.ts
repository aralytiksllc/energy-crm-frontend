// External dependencies
import type { ReactNode } from 'react';
import type { FormProps } from 'antd/es/form';
import type { UseDrawerFormReturnType } from '@refinedev/antd';

// Internal dependencies

export interface DrawerFormProps extends UseDrawerFormReturnType {
  renderForm: (formProps: FormProps) => ReactNode;
  title?: string;
  width?: number;
}
