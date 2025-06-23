// External imports
import * as React from 'react';
import { Form, Input, DatePicker, Switch } from 'antd';
import type { FormProps } from 'antd/lib/form';

// Internal imports
import type { IUser } from '@/interfaces/users';
import { DayjsForm } from '@/helpers/dayjs-form';
import { useStyles } from './user-form.styles';
import { rules } from './user-form.rules';

export interface UsersFormProps {
  formProps: FormProps<IUser>;
}

export const UsersForm: React.FC<UsersFormProps> = (props) => {
  const { formProps } = props;

  const { styles } = useStyles();

  return (
    <Form {...formProps} layout="vertical">
      <Form.Item
        label="First Name"
        name="firstName"
        rules={rules.firstName}
        className={styles.formItem}
      >
        <Input />
      </Form.Item>

      <Form.Item
        label="Last Name"
        name="lastName"
        rules={rules.lastName}
        className={styles.formItem}
      >
        <Input />
      </Form.Item>

      <Form.Item
        label="Email"
        name="email"
        rules={rules.email}
        className={styles.formItem}
      >
        <Input />
      </Form.Item>

      <Form.Item
        label="Password"
        name="password"
        rules={rules.password}
        className={styles.formItem}
      >
        <Input.Password />
      </Form.Item>

      <Form.Item
        label="Date of Birth"
        name="dateOfBirth"
        className={styles.formItem}
        getValueProps={DayjsForm.getValueProps}
        normalize={DayjsForm.normalize}
        rules={rules.dateOfBirth}
      >
        <DatePicker className={styles.datePicker} />
      </Form.Item>

      <Form.Item
        label="Date of Joining"
        name="dateOfJoining"
        className={styles.formItem}
        getValueProps={DayjsForm.getValueProps}
        normalize={DayjsForm.normalize}
        rules={rules.dateOfJoining}
      >
        <DatePicker className={styles.datePicker} />
      </Form.Item>

      <Form.Item
        label="Active"
        name="isActive"
        valuePropName="checked"
        rules={rules.isActive}
        className={styles.formItem}
      >
        <Switch />
      </Form.Item>
    </Form>
  );
};
