// External imports
import * as React from 'react';
import { Form, Input, DatePicker, Switch, Select } from 'antd';
import type { FormProps } from 'antd/lib/form';
import { useSelect } from '@refinedev/antd';

// Internal imports
import type { IUser } from '@interfaces/users';
import { DayjsTransformer } from '@helpers/dayjs-transformer';
import { useStyles } from './user-form.styles';
import { rules } from './user-form.rules';
import { Team } from '@interfaces/team.enum';
import { UserRole } from '@interfaces/user-role.enum';
import { useMemo } from 'react';

const teamOptions = Object.values(Team).map((team) => ({
  label: team,
  value: team,
}));

const roleOptions = Object.values(UserRole).map((role) => ({
  label: role.charAt(0).toUpperCase() + role.slice(1),
  value: role,
}));

interface UserFormProps {
  formProps: FormProps<IUser>;
  mode: 'create' | 'edit';
}

export const UsersForm: React.FC<UserFormProps> = ({
  formProps,
  mode,
}: UserFormProps) => {
  const { selectProps } = useSelect({
    resource: 'roles',
    optionLabel: 'name',
    optionValue: 'id',
  });

  const title = useMemo(() => {
    if (mode === 'create') return 'Create User';
    return 'Edit User';
  }, [mode]);

  const { styles } = useStyles();

  return (
    <Form {...formProps} layout="vertical" autoComplete="off">
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

      <Form.Item
        label="Role"
        name="roleId"
        rules={[{ required: true, message: 'Please select a role' }]}
      >
        <Select {...selectProps} placeholder="Select a role" />
      </Form.Item>

      <Form.Item label="Team" name="team" className={styles.formItem}>
        <Select placeholder="Select a team" options={teamOptions} allowClear />
      </Form.Item>

      {mode === 'create' ? (
        <Form.Item
          label="Password"
          name="password"
          rules={rules.password}
          className={styles.formItem}
        >
          <Input.Password autoComplete="new-password" />
        </Form.Item>
      ) : (
        <Form.Item
          label="Password"
          name="password"
          rules={rules.passwordOptional}
          className={styles.formItem}
        >
          <Input.Password placeholder="Enter new password (optional)" />
        </Form.Item>
      )}

      <Form.Item
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
      </Form.Item>

      <Form.Item
        label="Active Status"
        name="isActive"
        valuePropName="checked"
        initialValue={mode === 'create' ? true : undefined}
      >
        <Switch checkedChildren="Active" unCheckedChildren="Inactive" />
      </Form.Item>
    </Form>
  );
};
