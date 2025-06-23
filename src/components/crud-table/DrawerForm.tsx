// External dependencies
import React from 'react';
import { Drawer, Button } from 'antd';
import type { UseDrawerFormReturnType } from '@refinedev/antd';
import type { FormProps } from 'antd/es/form';

// Internal dependencies

interface DrawerFormProps extends UseDrawerFormReturnType {
  renderForm: (formProps: FormProps) => React.ReactNode;
  title?: string;
  width?: number;
}

export const DrawerForm: React.FC<DrawerFormProps> = (props) => {
  const { title, width, saveButtonProps, drawerProps, formProps, renderForm } =
    props;

  const footer = (
    <Button type="primary" {...saveButtonProps}>
      Save
    </Button>
  );

  return (
    <Drawer {...drawerProps} title={title} footer={footer} width={width}>
      {renderForm(formProps)}
    </Drawer>
  );
};
