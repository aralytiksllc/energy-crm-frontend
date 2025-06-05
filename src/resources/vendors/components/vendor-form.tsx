import * as React from 'react';
import { Form, Input, Switch } from 'antd';
import { FormProps } from 'antd/lib/form';
import { rules } from '../constants/validation';
import { styles } from '../constants/styles';

export interface VendorFormProps {
  formProps: FormProps;
}

export const VendorForm: React.FC<VendorFormProps> = (props) => {
  const { formProps } = props;

  return (
    <Form
      {...formProps}
      layout="horizontal"
      labelCol={{ span: 6 }}
      wrapperCol={{ span: 14 }}
      style={styles.form}
    >
      <Form.Item
        label="Name"
        name="name"
        rules={rules.name}
        style={styles.formItem}
      >
        <Input />
      </Form.Item>

      <Form.Item
        label="Description"
        name="description"
        rules={rules.description}
        style={styles.formItem}
      >
        <Input.TextArea />
      </Form.Item>

      <Form.Item
        label="Contact Email"
        name="contactEmail"
        rules={rules.contactEmail}
        style={styles.formItem}
      >
        <Input />
      </Form.Item>

      <Form.Item
        label="Contact Phone"
        name="contactPhone"
        rules={rules.contactPhone}
        style={styles.formItem}
      >
        <Input />
      </Form.Item>

      <Form.Item
        label="Website"
        name="website"
        rules={rules.website}
        style={styles.formItem}
      >
        <Input />
      </Form.Item>

      <Form.Item
        label="Active"
        name="isActive"
        valuePropName="checked"
        rules={rules.isActive}
        style={styles.formItem}
      >
        <Switch />
      </Form.Item>
    </Form>
  );
};
