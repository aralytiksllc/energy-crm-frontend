import React from 'react';
import {
  Form,
  Input,
  Button,
  Select,
  Typography,
  Card,
  message,
  Switch,
  Radio,
  Menu,
} from 'antd';
import type { MenuProps } from 'antd';

// ------- Constants
export const ROLE_OPTIONS = ['Admin', 'Manager', 'Member', 'Viewer'] as const;
export const DEPT_OPTIONS = [
  'Engineering',
  'Design',
  'Sales',
  'Marketing',
  'Finance',
  'Operations',
  'HR',
] as const;

// ------- Types
export type NewUserForm = {
  name: string;
  email: string;
  role: (typeof ROLE_OPTIONS)[number];
  department: (typeof DEPT_OPTIONS)[number];
  password?: string;
  confirmPassword?: string;
  active: boolean;
  inviteMode: 'invite' | 'password';
  mfaRequired?: boolean;
};

// ==========================================================
// Component 1: SettingsMenu (vetëm menuja – e pandryshuar)
// ==========================================================
export type SettingsMenuItemKey = 'details' | 'permissions' | 'notifications' | 'security';

export function SettingsMenu({
  selected,
  onSelect,
  style,
}: {
  selected?: SettingsMenuItemKey;
  onSelect?: (key: SettingsMenuItemKey) => void;
  style?: React.CSSProperties;
}) {
  const items: MenuProps['items'] = [
    { key: 'details', label: 'Details' },
    { key: 'permissions', label: 'Permissions' },
    { key: 'notifications', label: 'Notifications' },
    { key: 'security', label: 'Security' },
  ];

  return (
    <Menu
      mode="inline"
      selectedKeys={selected ? [selected] : undefined}
      items={items}
      onClick={(e) => onSelect?.(e.key as SettingsMenuItemKey)}
      style={style}
    />
  );
}

// ==========================================================
// Component 2: UsersCreateForm – **versioni i thjeshtuar** (single column)
// ==========================================================
export function UsersCreateForm({
  initialValues,
  onSubmit,
  showHeader = true,
}: {
  initialValues?: Partial<NewUserForm>;
  onSubmit?: (payload: NewUserForm) => void;
  showHeader?: boolean;
}) {
  const [form] = Form.useForm<NewUserForm>();
  const inviteMode = Form.useWatch('inviteMode', form) as NewUserForm['inviteMode'];

  const onFinish = (values: NewUserForm) => {
    const { confirmPassword, ...payload } = values;
    message.success(`User ${payload.name} ready to be created`);
    onSubmit?.(payload as NewUserForm);
  };

  return (
    <Card bodyStyle={{ padding: 16 }}>
      {showHeader && (
        <div style={{ marginBottom: 8 }}>
          <Typography.Title level={4} style={{ margin: 0 }}>
            User management
          </Typography.Title>
          <Typography.Text type="secondary">
            Manage your team members and their account permissions here.
          </Typography.Text>
        </div>
      )}

      <Form<NewUserForm>
        form={form}
        layout="horizontal"
        labelCol={{ flex: '180px' }}
        wrapperCol={{ flex: 1 }}
        style={{ marginTop: 4, maxWidth: 720 }}
        size={'middle'}
        onFinish={onFinish}
        initialValues={{
          role: 'Member',
          department: 'Engineering',
          active: true,
          inviteMode: 'invite',
          mfaRequired: false,
          ...initialValues,
        }}
      >
        {/* Single-column fields – çdo fushë në një rresht */}
        <Form.Item
          label="Full name"
          name="name"
          rules={[{ required: true, message: 'Please enter full name' }]}
        >
          <Input allowClear placeholder="Enter full name" />
        </Form.Item>

        <Form.Item
          label="Email"
          name="email"
          rules={[
            { required: true, message: 'Please enter email' },
            { type: 'email', message: 'Email is not valid' },
          ]}
        >
          <Input allowClear placeholder="Enter email" />
        </Form.Item>

        <Form.Item
          label="Role"
          name="role"
          rules={[{ required: true, message: 'Please select a role' }]}
        >
          <Select placeholder="Select role" options={ROLE_OPTIONS.map(r => ({ value: r, label: r }))} />
        </Form.Item>

        <Form.Item
          label="Department"
          name="department"
          rules={[{ required: true, message: 'Please select a department' }]}
        >
          <Select placeholder="Select department" options={DEPT_OPTIONS.map(d => ({ value: d, label: d }))} />
        </Form.Item>

        <Form.Item label="Active" name="active" valuePropName="checked">
          <Switch checkedChildren="Active" unCheckedChildren="Inactive" />
        </Form.Item>

        {/* Sign-in mode */}
        <Form.Item label="Sign-in mode" name="inviteMode">
          <Radio.Group optionType="button" buttonStyle="solid">
            <Radio.Button value="invite">Send invite link</Radio.Button>
            <Radio.Button value="password">Set password now</Radio.Button>
          </Radio.Group>
        </Form.Item>

        {inviteMode === 'password' && (
          <>
            <Form.Item
              label="Password"
              name="password"
              rules={[
                { required: true, message: 'Please enter a password' },
                { pattern: /^(?=.*[A-Za-z])(?=.*\\d).{8,}$/, message: 'Min 8 characters, include letters and numbers' },
              ]}
            >
              <Input.Password placeholder="Create a password" />
            </Form.Item>
            <Form.Item
              label="Confirm password"
              name="confirmPassword"
              dependencies={["password"]}
              rules={[
                { required: true, message: 'Please confirm password' },
                ({ getFieldValue }) => ({
                  validator(_, value) {
                    if (!value || getFieldValue('password') === value) return Promise.resolve();
                    return Promise.reject(new Error('Passwords do not match'));
                  },
                }),
              ]}
            >
              <Input.Password placeholder="Repeat the password" />
            </Form.Item>
          </>
        )}

        {/* Security – vetëm Require 2FA */}
        <Form.Item label="Require 2FA" name="mfaRequired" valuePropName="checked">
          <Switch />
        </Form.Item>

        {/* Actions */}
        <div style={{ display: 'flex', justifyContent: 'flex-end', gap: 8, marginTop: 8 }}>
          <Button onClick={() => form.resetFields()}>Reset</Button>
          <Button type="primary" onClick={() => form.submit()}>
            {inviteMode === 'invite' ? 'Create & Send invite' : 'Create user'}
          </Button>
        </div>
      </Form>
    </Card>
  );
}

// ==========================================================
// Component 3: UserCreateSimple – wrapper i thjeshtë (opsional)
// ==========================================================
export function UsersCreate({ onSubmit }: { onSubmit?: (payload: NewUserForm) => void; }) {
  return <UsersCreateForm onSubmit={onSubmit} showHeader={false} />;
}
