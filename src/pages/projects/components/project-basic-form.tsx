// External imports
import * as React from 'react';
import {
  Form,
  Input,
  Select,
  DatePicker,
  InputNumber,
  Switch,
  Typography,
} from 'antd';
import type { FormProps } from 'antd/es/form';

// Rich text editor
import { ReactQuillEditor } from '@/components/rich-text-editor';

// Internal imports
import { IProject, ProjectStatus, ProjectPriority } from '../types/types';
import { rules } from '../constants/validation';
import { useProjectBasicFormStyles } from './project-basic-form.styles';

interface ProjectBasicFormProps {
  formProps?: FormProps<IProject>;
}

export const ProjectBasicForm: React.FC<ProjectBasicFormProps> = () => {
  const { styles } = useProjectBasicFormStyles();

  return (
    <div className={styles.container}>
      <div className={styles.formGrid}>
        {/* Client - Full width */}
        <Form.Item
          name="clientName"
          label="Client Name"
          className={`${styles.formItem} ${styles.fullWidthField}`}
          rules={rules.clientName}
        >
          <Input placeholder="Enter client name" className={styles.input} />
        </Form.Item>

        {/* Project Name - Full width */}
        <Form.Item
          name="name"
          label="Project Name"
          className={`${styles.formItem} ${styles.fullWidthField}`}
          rules={rules.name}
        >
          <Input placeholder="Enter project name" className={styles.input} />
        </Form.Item>

        {/* Description - Full width */}
        <Form.Item
          name="description"
          label="Description"
          className={`${styles.formItem} ${styles.fullWidthField}`}
          rules={rules.description}
        >
          <ReactQuillEditor
            placeholder="Enter project description"
            height={300}
          />
        </Form.Item>

        {/* Status and Priority - Two columns */}
        <div className={styles.twoColumnRow}>
          <Form.Item
            name="status"
            label="Status"
            className={`${styles.formItem} ${styles.halfWidthField}`}
            rules={rules.status}
          >
            <Select placeholder="Select status" className={styles.select}>
              {Object.values(ProjectStatus).map((status) => (
                <Select.Option key={status} value={status}>
                  {status.replace(/([A-Z])/g, ' $1').trim()}
                </Select.Option>
              ))}
            </Select>
          </Form.Item>

          <Form.Item
            name="priority"
            label="Priority"
            className={`${styles.formItem} ${styles.halfWidthField}`}
            rules={rules.priority}
          >
            <Select placeholder="Select priority" className={styles.select}>
              {Object.values(ProjectPriority).map((priority) => (
                <Select.Option key={priority} value={priority}>
                  {priority}
                </Select.Option>
              ))}
            </Select>
          </Form.Item>
        </div>

        {/* Budget - Full width */}
        <Form.Item
          name="budget"
          label="Budget"
          className={`${styles.formItem} ${styles.fullWidthField}`}
          rules={rules.budget}
        >
          <InputNumber
            placeholder="Enter budget amount"
            className={styles.inputNumber}
            min={0}
            precision={2}
            prefix="€"
          />
        </Form.Item>

        {/* Start Date and End Date - Two columns */}
        <div className={styles.twoColumnRow}>
          <Form.Item
            name="startDate"
            label="Start Date"
            className={`${styles.formItem} ${styles.halfWidthField}`}
            rules={rules.startDate}
          >
            <DatePicker
              placeholder="Select start date"
              className={styles.datePicker}
              format="YYYY-MM-DD"
            />
          </Form.Item>

          <Form.Item
            name="deadline"
            label="End Date"
            className={`${styles.formItem} ${styles.halfWidthField}`}
            rules={rules.deadline}
          >
            <DatePicker
              placeholder="Select end date"
              className={styles.datePicker}
              format="YYYY-MM-DD"
            />
          </Form.Item>
        </div>

        {/* isArchived Switch */}
        <Form.Item
          name="isArchived"
          className={`${styles.formItem} ${styles.fullWidthField}`}
          valuePropName="checked"
        >
          <div className={styles.switchContainer}>
            <Switch size="small" />
            <Typography.Text className={styles.switchLabel}>
              Archive this project
            </Typography.Text>
          </div>
        </Form.Item>

        {/* isPrivate Switch */}
        <Form.Item
          name="isPrivate"
          className={`${styles.formItem} ${styles.fullWidthField}`}
          valuePropName="checked"
        >
          <div className={styles.switchContainer}>
            <Switch size="small" />
            <Typography.Text className={styles.switchLabel}>
              Make this project private
            </Typography.Text>
          </div>
        </Form.Item>

        {/* Tags and Technologies - Two columns */}
        <div className={styles.twoColumnRow}>
          <Form.Item
            name="tags"
            label="Tags"
            className={`${styles.formItem} ${styles.halfWidthField}`}
            rules={rules.tags}
          >
            <Select
              mode="tags"
              placeholder="Add tags"
              className={styles.select}
              tokenSeparators={[',']}
            />
          </Form.Item>

          <Form.Item
            name="technologies"
            label="Technologies"
            className={`${styles.formItem} ${styles.halfWidthField}`}
            rules={rules.technologies}
          >
            <Select
              mode="tags"
              placeholder="Add technologies"
              className={styles.select}
              tokenSeparators={[',']}
            />
          </Form.Item>
        </div>
      </div>
    </div>
  );
};
