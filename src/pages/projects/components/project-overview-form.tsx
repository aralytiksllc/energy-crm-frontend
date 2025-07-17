import React from 'react';
import {
  Form,
  Input,
  InputNumber,
  Select,
  DatePicker,
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
import { ActiveSwitch } from '@components/active-switch';
import { rules } from './project-overview-form.rules';
import { useProjectOverviewFormStyles } from './project-overview-form.styles';

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
  const { styles } = useProjectOverviewFormStyles();
  return (
    <>
      <Form.Item name="customerId" label="Customer" rules={rules.customerId}>
        <RemoteSelect
          resource="customers"
          optionValue="id"
          optionLabel="name"
          placeholder="Select customer"
        />
      </Form.Item>

      <Form.Item name="name" label="Project Name" rules={rules.name}>
        <Input placeholder="Enter project name" />
      </Form.Item>

      <Form.Item
        name="description"
        label="Description"
        rules={rules.description}
      >
        <Wysiwyg />
      </Form.Item>

      <Form.Item name="budget" label="Budget" rules={rules.budget}>
        <InputNumber
          placeholder="Enter budget amount"
          min={0}
          precision={2}
          prefix="€"
          className={styles.fullWidth}
        />
      </Form.Item>

      <Row gutter={16}>
        <Col span={12}>
          <Form.Item name="status" label="Status" rules={rules.status}>
            <Select placeholder="Select status" options={statusOptions} />
          </Form.Item>
        </Col>
        <Col span={12}>
          <Form.Item name="priority" label="Priority" rules={rules.priority}>
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
            rules={rules.startDate}
          >
            <DatePicker className={styles.fullWidth} format="DD-MM-YYYY" />
          </Form.Item>
        </Col>
        <Col span={12}>
          <Form.Item
            name="deadline"
            label="End Date"
            getValueProps={DayjsTransformer.toValueProps}
            normalize={DayjsTransformer.toNormalizedDate}
          >
            <DatePicker className={styles.fullWidth} format="DD-MM-YYYY" />
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
        <ActiveSwitch checkedLabel="Private" uncheckedLabel="Public" />
      </Form.Item>
    </>
  );
};
