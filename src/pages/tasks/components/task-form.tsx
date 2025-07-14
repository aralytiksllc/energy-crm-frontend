import React from 'react';
import { Form, Input, Select, DatePicker, Row, Col, FormProps } from 'antd';
import { useList, useGetIdentity } from '@refinedev/core';
import { TaskPriority } from '@interfaces/task-priority.enum';
import { TaskType } from '@interfaces/task-type.enum';
import { DayjsTransformer } from '@helpers/dayjs-transformer';
import { Wysiwyg } from '@components/rich-text-editor';
import { AssigneeManager } from '@components/assignee-manager/assignee-manager';
import { useTaskFormStyles } from './task-form.styles';
import { IUser } from '@interfaces/users';
import { IProject } from '@interfaces/project';

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
  const { form } = formProps;
  const { styles } = useTaskFormStyles();
  const { data: currentUser } = useGetIdentity<IUser>();

  const { data: projectsData, isLoading: projectsLoading } = useList<IProject>({
    resource: 'projects',
    pagination: { mode: 'off' },
  });

  const allProjects = projectsData?.data || [];

  const userProjects = allProjects.filter((project) => {
    if (!currentUser?.id) return false;

    if (currentUser.role?.name === 'manager') {
      return true;
    }

    return project.members?.some(
      (member) => String(member.userId) === String(currentUser.id),
    );
  });

  const projectOptions = userProjects.map((project) => ({
    label: project.name,
    value: project.id,
  }));

  const hasProjectAccess = projectOptions.length > 0;
  const isManager = currentUser?.role?.name === 'manager';

  const getProjectPlaceholder = () => {
    if (projectsLoading) return 'Loading projects...';
    if (!hasProjectAccess && isManager) return 'No projects available';
    if (!hasProjectAccess)
      return 'You have not been assigned to any projects yet';
    return 'Select project';
  };

  return (
    <Form {...formProps} layout="vertical">
      <Form.Item name="status" className={styles.hiddenField}>
        <Input />
      </Form.Item>
      <Form.Item
        name="projectId"
        label="Project"
        rules={[{ required: true, message: 'Please select a project' }]}
      >
        <Select
          placeholder={getProjectPlaceholder()}
          options={projectOptions}
          loading={projectsLoading}
          disabled={!hasProjectAccess}
          notFoundContent={
            !hasProjectAccess && !projectsLoading
              ? isManager
                ? 'No projects available'
                : 'You need to be added to a project to create tasks'
              : 'No projects found'
          }
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
        <DatePicker
          className={styles.fullWidthDatePicker}
          format="DD-MM-YYYY"
        />
      </Form.Item>

      <Form.List name="assignees">
        {(fields, { add, remove }) => (
          <AssigneeManager fields={fields} add={add} remove={remove} />
        )}
      </Form.List>
    </Form>
  );
};
