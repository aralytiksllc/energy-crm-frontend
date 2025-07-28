import React from 'react';
import { Form, Input, FormProps } from 'antd';
import { rules } from './customer-form.rules';
import { ActiveSwitch } from '@components/active-switch';

export interface CustomerFormProps {
  formProps: FormProps;
}

export const CustomerForm: React.FC<CustomerFormProps> = ({ formProps }) => {
  return (
    <Form layout="vertical" {...formProps}>
      <Form.Item name="name" label="Customer Name" rules={rules.name}>
        <Input placeholder="Enter customer name" />
      </Form.Item>
      <Form.Item name="notes" label="Notes">
        <Input.TextArea
          placeholder="Enter notes about the customer"
          autoSize={{ minRows: 4 }}
        />
      </Form.Item>
      <Form.Item name="isActive" label="Active Status" valuePropName="checked">
        <ActiveSwitch />
      </Form.Item>
    </Form>
  );
};
