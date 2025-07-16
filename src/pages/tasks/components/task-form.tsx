import React from 'react';
import { Form, Input, Select, DatePicker, Row, Col, FormProps } from 'antd';
import { useGetIdentity } from '@refinedev/core';
import { TaskPriority } from '@interfaces/task-priority.enum';
import { TaskType } from '@interfaces/task-type.enum';
import { DayjsTransformer } from '@helpers/dayjs-transformer';
import { Wysiwyg } from '@components/rich-text-editor';
import { AssigneeManager } from '@components/assignee-manager/assignee-manager';
import { useTaskFormStyles } from './task-form.styles';
import { IUser } from '@interfaces/users';
import { IProject } from '@interfaces/project';
import { rules } from './task-form.rules';

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
  projects?: IProject[];
  users?: IUser[];
  projectsLoading?: boolean;
  usersLoading?: boolean;
}

export const TaskForm: React.FC<TaskFormProps> = ({
  formProps,
  projects = [],
  users = [],
  projectsLoading = false,
  usersLoading = false,
}) => {
  const { form } = formProps;
  const { styles } = useTaskFormStyles();
  const { data: currentUser } = useGetIdentity<IUser>();

  const userProjects = projects;

  const projectOptions = userProjects.map((project) => ({
    label: project.name,
    value: project.id,
  }));

  const hasProjectAccess = projectOptions.length > 0;

  const getProjectPlaceholder = () => {
    if (projectsLoading) return 'Loading projects...';
    if (!hasProjectAccess) return 'No projects available';
    return 'Select project';
  };

  return (
    <Form {...formProps} layout="vertical">
      <Form.Item name="status" className={styles.hiddenField}>
        <Input />
      </Form.Item>
      <Form.Item name="projectId" label="Project" rules={rules.projectId}>
        <Select
          placeholder={getProjectPlaceholder()}
          options={projectOptions}
          loading={projectsLoading}
          disabled={!hasProjectAccess}
          notFoundContent={
            !hasProjectAccess && !projectsLoading
              ? 'No projects available'
              : 'No projects found'
          }
        />
      </Form.Item>

      <Form.Item name="title" label="Task Title" rules={rules.title}>
        <Input placeholder="Enter task title" />
      </Form.Item>

      <Form.Item name="description" label="Description">
        <Wysiwyg />
      </Form.Item>

      <Row gutter={16}>
        <Col span={12}>
          <Form.Item name="type" label="Task Type" rules={rules.type}>
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
        <DatePicker
          className={styles.fullWidthDatePicker}
          format="DD-MM-YYYY"
        />
      </Form.Item>

      <Form.List name="assignees">
        {(fields, { add, remove }) => (
          <AssigneeManager
            fields={fields}
            add={add}
            remove={remove}
            users={users}
            usersLoading={usersLoading}
          />
        )}
      </Form.List>
    </Form>
  );
};
