// External dependencies
import * as React from 'react';
import { Drawer, Space, Button } from 'antd';

// Internal dependencies
import type { DrawerFormProps } from './drawer-form.types';

export const DrawerForm: React.FC<DrawerFormProps> = (props) => {
  const {
    title,
    width,
    saveButtonProps,
    drawerProps,
    formProps,
    renderForm,
    close,
  } = props;

  const footer = (
    <Space direction="horizontal" align="center">
      <Button type="primary" size="large" block={true} {...saveButtonProps}>
        Save
      </Button>
      <Button type="default" size="large" block={true} onClick={close}>
        Close
      </Button>
    </Space>
  );

  return (
    <Drawer {...drawerProps} title={title} footer={footer} width={width}>
      {renderForm(formProps)}
    </Drawer>
  );
};
