// External imports
import * as React from 'react';
import { Form, Input, Button, Space, Typography } from 'antd';
import type { FormProps } from 'antd/es/form';
import { useState } from 'react';

// Internal imports
import type { IProject } from '../types/types';
import styles from '../styles/ProjectsForm.module.css';
import { rules } from '../constants/validation';
import { CollapsibleSection } from './CollapsibleSection';
import { ScrollableSection } from './ScrollableSection';

interface ProjectsFormProps {
  formProps: FormProps<IProject>;
}

export const ProjectsForm: React.FC<ProjectsFormProps> = ({ formProps }) => {
  const [openSection, setOpenSection] = useState<'stages' | 'tags'>('stages');

  return (
    <Form layout="vertical" {...formProps} className={styles.formRoot}>
      <div className={styles.formGrid}>
        <div className={styles.leftColumn}>
          <Typography.Title level={3} className={styles.formTitle}>
            Project
          </Typography.Title>
          <Form.Item name="name" label="Name" rules={rules.name}>
            <Input />
          </Form.Item>
          <Form.Item
            name="description"
            label="Description"
            rules={rules.description}
          >
            <Input.TextArea rows={1} />
          </Form.Item>
          <Form.Item name="functionalArea" label="Functional Area">
            <Input />
          </Form.Item>
          <Form.Item name="customerType" label="Customer Type">
            <Input />
          </Form.Item>
          <Form.Item name="division" label="Division">
            <Input />
          </Form.Item>
        </div>
        <div className={styles.rightColumn}>
          <div className={styles.scrollableSections}>
            <Form.List name="stages" rules={rules.stagesList}>
              {(fields, { add, remove }, { errors }) => (
                <CollapsibleSection
                  title="Stages"
                  isOpen={openSection === 'stages'}
                  onClick={() => setOpenSection('stages')}
                >
                  <ScrollableSection>
                    {fields.map((field, idx) => (
                      <Space
                        key={
                          field.key != null ? String(field.key) : String(idx)
                        }
                        align="baseline"
                        className={styles.listItem}
                      >
                        <Form.Item
                          {...field}
                          name={field.name}
                          rules={rules.stageItem}
                          className={styles.inputItem}
                        >
                          <Input placeholder="Stage name" />
                        </Form.Item>
                        {fields.length > 1 && (
                          <Button
                            type="link"
                            onClick={() => remove(field.name)}
                          >
                            Remove
                          </Button>
                        )}
                      </Space>
                    ))}
                  </ScrollableSection>
                  <Form.ErrorList errors={errors} />
                  <Button
                    type="link"
                    onClick={() => add()}
                    className={styles.addButton}
                  >
                    Add new stage
                  </Button>
                </CollapsibleSection>
              )}
            </Form.List>
            <Form.List name="tags" rules={rules.tagsList}>
              {(fields, { add, remove }, { errors }) => (
                <CollapsibleSection
                  title="Tags"
                  isOpen={openSection === 'tags'}
                  onClick={() => setOpenSection('tags')}
                >
                  <ScrollableSection>
                    {fields.map((field, idx) => (
                      <Space
                        key={
                          field.key != null ? String(field.key) : String(idx)
                        }
                        align="baseline"
                        className={styles.listItem}
                      >
                        <Form.Item
                          {...field}
                          name={field.name}
                          rules={rules.tagItem}
                          className={styles.inputItem}
                        >
                          <Input placeholder="Tag (e.g. React, Node.js)" />
                        </Form.Item>
                        {fields.length > 1 && (
                          <Button
                            type="link"
                            onClick={() => remove(field.name)}
                          >
                            Remove
                          </Button>
                        )}
                      </Space>
                    ))}
                  </ScrollableSection>
                  <Form.ErrorList errors={errors} />
                  <Button
                    type="link"
                    onClick={() => add()}
                    className={styles.addButton}
                  >
                    Add new tag
                  </Button>
                </CollapsibleSection>
              )}
            </Form.List>
          </div>
        </div>
      </div>
    </Form>
  );
};
