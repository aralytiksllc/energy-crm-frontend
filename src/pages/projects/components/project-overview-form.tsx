import React from 'react';
import {
  Form,
  Input,
  InputNumber,
  Select,
  DatePicker,
  Switch,
  Row,
  Col,
  FormProps,
  Checkbox,
} from 'antd';
import { ProjectStatus } from '@interfaces/project-status.enum';
import { ProjectPriority } from '@interfaces/project-priority.enum';
import { Wysiwyg } from '@components/rich-text-editor';
import { DayjsTransformer } from '@helpers/dayjs-transformer';
import { RemoteSelect } from '@components/remote-select';

const statusOptions = Object.values(ProjectStatus).map((status) => ({
  label: status,
  value: status,
}));

const priorityOptions = Object.values(ProjectPriority).map((priority) => ({
  label: priority,
  value: priority,
}));

export interface ProjectOverviewFormProps {
  formProps?: FormProps;
}

export const ProjectOverviewForm: React.FC<ProjectOverviewFormProps> = () => {
  return (
    <>
      <Form.Item
        name="customerId"
        label="Customer"
        rules={[{ required: true, message: 'Please select a customer' }]}
      >
        <RemoteSelect
          resource="customers"
          optionValue="id"
          optionLabel="name"
          placeholder="Select customer"
        />
      </Form.Item>

      <Form.Item name="name" label="Project Name" rules={[{ required: true }]}>
        <Input placeholder="Enter project name" />
      </Form.Item>

      <Form.Item
        name="description"
        label="Description"
        rules={[{ required: true }]}
      >
        <Wysiwyg />
      </Form.Item>

      <Form.Item name="budget" label="Budget" rules={[{ required: true }]}>
        <InputNumber
          placeholder="Enter budget amount"
          min={0}
          precision={2}
          prefix="€"
          style={{ width: '100%' }}
        />
      </Form.Item>

      <Row gutter={16}>
        <Col span={12}>
          <Form.Item name="status" label="Status" rules={[{ required: true }]}>
            <Select placeholder="Select status" options={statusOptions} />
          </Form.Item>
        </Col>
        <Col span={12}>
          <Form.Item
            name="priority"
            label="Priority"
            rules={[{ required: true }]}
          >
            <Select placeholder="Select priority" options={priorityOptions} />
          </Form.Item>
        </Col>
      </Row>

      <Row gutter={16}>
        <Col span={12}>
          <Form.Item
            name="startDate"
            label="Start Date"
            getValueProps={DayjsTransformer.toValueProps}
            normalize={DayjsTransformer.toNormalizedDate}
            rules={[{ required: true }]}
          >
            <DatePicker style={{ width: '100%' }} format="DD-MM-YYYY" />
          </Form.Item>
        </Col>
        <Col span={12}>
          <Form.Item
            name="deadline"
            label="End Date"
            getValueProps={DayjsTransformer.toValueProps}
            normalize={DayjsTransformer.toNormalizedDate}
          >
            <DatePicker style={{ width: '100%' }} format="DD-MM-YYYY" />
          </Form.Item>
        </Col>
      </Row>

      <Row gutter={16}>
        <Col span={12}>
          <Form.Item name="tags" label="Tags">
            <Select
              mode="tags"
              placeholder="Add tags"
              tokenSeparators={[',']}
            />
          </Form.Item>
        </Col>
        <Col span={12}>
          <Form.Item name="technologies" label="Technologies">
            <Select
              mode="tags"
              placeholder="Add technologies"
              tokenSeparators={[',']}
            />
          </Form.Item>
        </Col>
      </Row>

      <Form.Item
        label="Archive this project"
        name="isArchived"
        valuePropName="checked"
      >
        <Checkbox />
      </Form.Item>

      <Form.Item
        label="Make this project private"
        name="isPrivate"
        valuePropName="checked"
      >
        <Switch />
      </Form.Item>
    </>
  );
};
