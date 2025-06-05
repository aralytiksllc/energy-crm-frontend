import * as React from 'react';
import { Form, Input, DatePicker, Switch, InputNumber } from 'antd';
import { FormProps } from 'antd/lib/form';
import { styles } from '../constants/styles';
import { rules } from '../constants/validation';

export interface VendorFormProps {
  formProps: FormProps;
}

export const UsersForm: React.FC<VendorFormProps> = ({ formProps }) => {
  return (
    <Form
      {...formProps}
      layout="horizontal"
      labelCol={{ span: 6 }}
      wrapperCol={{ span: 14 }}
      style={styles.form}
    >
      <Form.Item
        label="First Name"
        name="firstName"
        rules={rules.firstName}
        style={styles.formItem}
      >
        <Input />
      </Form.Item>

      <Form.Item
        label="Last Name"
        name="lastName"
        rules={rules.lastName}
        style={styles.formItem}
      >
        <Input />
      </Form.Item>

      <Form.Item
        label="Email"
        name="email"
        rules={rules.email}
        style={styles.formItem}
      >
        <Input />
      </Form.Item>

      <Form.Item
        label="Password"
        name="password"
        rules={rules.password}
        style={styles.formItem}
      >
        <Input.Password />
      </Form.Item>

      <Form.Item
        label="Date of Birth"
        name="dateOfBirth"
        rules={rules.dateOfBirth}
        style={styles.formItem}
      >
        <DatePicker style={{ width: '100%' }} />
      </Form.Item>

      <Form.Item
        label="Date of Joining"
        name="dateOfJoining"
        rules={rules.dateOfJoining}
        style={styles.formItem}
      >
        <DatePicker style={{ width: '100%' }} />
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

      <Form.Item
        label="createdById"
        name="createdById"
        rules={rules.createdById}
        style={styles.formItem}
      >
        <InputNumber />
      </Form.Item>

      <Form.Item
        label="updatedById"
        name="updatedById"
        rules={rules.updatedById}
        style={styles.formItem}
      >
        <InputNumber />
      </Form.Item>

      <Form.Item name="createdById" hidden>
        <Input type="number" />
      </Form.Item>
      <Form.Item name="updatedById" hidden>
        <Input type="number" />
      </Form.Item>
    </Form>
  );
};
