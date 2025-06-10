import * as React from 'react';
import { Form, Input } from 'antd';

export const ProjectsForm: React.FC<{ formProps: any }> = ({ formProps }) => {
  return (
    <Form layout="vertical" {...formProps}>
      <Form.Item name="name" label="Name" rules={[{ required: true }]}>
        <Input />
      </Form.Item>
      <Form.Item
        name="description"
        label="Description"
        rules={[{ required: true }]}
      >
        <Input.TextArea rows={3} />
      </Form.Item>
    </Form>
  );
};
