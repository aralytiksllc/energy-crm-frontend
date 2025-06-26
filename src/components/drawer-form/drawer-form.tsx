// External dependencies
import * as React from 'react';
import { Drawer, Space, Button } from 'antd';

// Internal dependencies
import type { DrawerFormProps } from './drawer-form.types';
import { DrawerTabs } from '../drawer-tabs';

export const DrawerForm: React.FC<DrawerFormProps> = (props) => {
  const {
    title,
    width,
    saveButtonProps,
    drawerProps,
    formProps,
    renderForm,
    close,
    tabs,
    activeTab,
    onTabChange,
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

  const content = tabs ? (
    <DrawerTabs items={tabs} activeKey={activeTab} onChange={onTabChange} />
  ) : (
    renderForm(formProps)
  );

  return (
    <Drawer
      {...drawerProps}
      title={title}
      footer={footer}
      width={width}
      destroyOnHidden
    >
      {content}
    </Drawer>
  );
};
