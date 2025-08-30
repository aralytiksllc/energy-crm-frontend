// External
import * as React from 'react';
import { Form, Input } from 'antd';

// Internal
import { rules } from './role-form.rules';
import { useStyles } from './role-form.styles';
import type { RoleFormProps } from './role-form.types';

const { TextArea } = Input;

export const RoleForm: React.FC<RoleFormProps> = (props) => {
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
        label="Name"
        name="name"
        rules={rules.name}
        className={styles.formItem}
      >
        <Input />
      </Form.Item>

      {/* <Form.Item
        label="Description"
        name="description"
        rules={rules.description}
        className={styles.formItem}
      >
        <TextArea />
      </Form.Item> */}
    </Form>
  );
};
