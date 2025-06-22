import React from 'react';
import {
  Form,
  Input,
  Select,
  DatePicker,
  Switch,
  Typography,
  Row,
  Col,
  FormProps,
} from 'antd';
import { TaskPriority } from '@/interfaces/task-priority.enum';
import { TaskType } from '@/interfaces/task-type.enum';
import { RemoteSelect } from '@/components/remote-select';
import { DayjsForm } from '@/helpers/dayjs-form';
import { Wysiwyg } from '@/components/rich-text-editor';

const priorityOptions = Object.values(TaskPriority).map((priority) => ({
  label: priority,
  value: priority,
}));

const typeOptions = Object.values(TaskType).map((type) => ({
  label: type,
  value: type,
}));

export interface TaskFormProps {
  formProps: FormProps;
}

export const TaskForm: React.FC<TaskFormProps> = (props) => {
  const { formProps } = props;

  return (
    <Form layout="vertical" {...formProps}>
      <Form.Item
        name="projectId"
        label="Project"
        rules={[{ required: true, message: 'Please select a project' }]}
      >
        <RemoteSelect
          resource="projects"
          optionValue="id"
          optionLabel="name"
          placeholder="Select project"
        />
      </Form.Item>

      <Form.Item
        name="title"
        label="Task Title"
        rules={[{ required: true, message: 'Please enter a title' }]}
      >
        <Input placeholder="Enter task title" />
      </Form.Item>

      <Form.Item name="description" label="Description">
      <Input placeholder="Enter task title" />
      </Form.Item>

      <Row gutter={16}>
        <Col span={12}>
          <Form.Item
            name="type"
            label="Task Type"
            rules={[{ required: true, message: 'Please select a type' }]}
          >
            <Select placeholder="Select type" options={typeOptions} />
          </Form.Item>
        </Col>
        <Col span={12}>
          <Form.Item name="priority" label="Priority">
            <Select placeholder="Select priority" options={priorityOptions} />
          </Form.Item>
        </Col>
      </Row>

      <Form.Item
        name="dueDate"
        label="Due Date"
        getValueProps={DayjsForm.getValueProps}
        normalize={DayjsForm.normalize}
      >
        <DatePicker style={{ width: '100%' }} format="DD-MM-YYYY" />
      </Form.Item>

      <Form.Item
        name="isCompleted"
        label="Is Completed"
        valuePropName="checked"
      >
        <Switch />
      </Form.Item>

      <Form.Item
        name="completedDate"
        label="Completed Date"
        getValueProps={DayjsForm.getValueProps}
        normalize={DayjsForm.normalize}
      >
        <DatePicker style={{ width: '100%' }} format="DD-MM-YYYY" />
      </Form.Item>

      <Form.Item
        name="assignees"
        label="Assignees"
        extra="You can select multiple users to assign this task"
      >
        <RemoteSelect
          resource="users"
          optionValue="id"
          optionLabel="fullName"
          placeholder="Select assignees"
          mode="multiple"
        />
      </Form.Item>
    </Form>
  );
};
