// External
import * as React from 'react';
import { Form, Input, DatePicker, Select, Switch } from 'antd';

// Internal
import { DayjsTransformer } from '@/helpers/dayjs-transformer';
import { RemoteSelect } from '@/components/remote-select';
import { rules } from './user-form.rules';
import { useStyles } from './user-form.styles';
import type { UserFormProps } from './user-form.types';

export const UserForm: React.FC<UserFormProps> = (props) => {
  const { formProps } = props;

  const { styles } = useStyles();

  return (
    <Form
      {...formProps}
      layout="vertical"
      scrollToFirstError={true}
      autoComplete="off"
    >
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
        <Input autoComplete="off" />
      </Form.Item>

      <Form.Item label="Role" name="roleId" rules={rules.roleId}>
        <RemoteSelect
          resource="roles"
          optionLabel="name"
          optionValue="id"
          placeholder="Select a role"
        />
      </Form.Item>

      <Form.Item label="Team" name="team" className={styles.formItem}>
        <Select placeholder="Select a team" options={[]} allowClear />
      </Form.Item>

      <Form.Item
        label="Password"
        name="password"
        rules={rules.password}
        className={styles.formItem}
      >
        <Input.Password />
      </Form.Item>

      {/* <Form.Item
        label="Date of Birth"
        name="dateOfBirth"
        className={styles.formItem}
        getValueProps={DayjsTransformer.toValueProps}
        normalize={DayjsTransformer.toNormalizedDate}
      >
        <DatePicker className={styles.datePicker} />
      </Form.Item>

      <Form.Item
        label="Date of Joining"
        name="dateOfJoining"
        className={styles.formItem}
        getValueProps={DayjsTransformer.toValueProps}
        normalize={DayjsTransformer.toNormalizedDate}
      >
        <DatePicker className={styles.datePicker} />
      </Form.Item> */}

      <Form.Item label="Active Status" name="isActive">
        <Switch />
      </Form.Item>
    </Form>
  );
};
