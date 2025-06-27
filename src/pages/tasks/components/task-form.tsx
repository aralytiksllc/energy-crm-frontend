import React from 'react';
import {
  Form,
  Input,
  Select,
  DatePicker,
  Switch,
  Row,
  Col,
  FormProps,
} from 'antd';
import { TaskPriority } from '@interfaces/task-priority.enum';
import { TaskType } from '@interfaces/task-type.enum';
import { RemoteSelect } from '@components/remote-select';
import { DayjsTransformer } from '@helpers/dayjs-transformer';
import { Wysiwyg } from '@components/rich-text-editor';
import { AssigneeManager } from '@components/assignee-manager/assignee-manager';

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

export const TaskForm: React.FC<TaskFormProps> = ({ formProps }) => {
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
        <Wysiwyg />
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
        getValueProps={DayjsTransformer.toValueProps}
        normalize={DayjsTransformer.toNormalizedDate}
      >
        <DatePicker style={{ width: '100%' }} format="DD-MM-YYYY" />
      </Form.Item>

      <Form.List name="assignees">
        {(fields, { add, remove }) => (
          <AssigneeManager fields={fields} add={add} remove={remove} />
        )}
      </Form.List>
    </Form>
  );
};
