// External dependencies
import * as React from 'react';
import { Drawer, Button } from 'antd';

// Internal dependencies
import type { DrawerFormProps } from './drawer-form.types';

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
