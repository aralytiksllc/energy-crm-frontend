import React from 'react';
import {
  Form,
  Input,
  Select,
  DatePicker,
  Card,
  Space,
  Spin,
  Segmented,
  Row,
  Col,
  Tag,
  Button,
  Typography,
} from 'antd';
import type { UploadFile } from 'antd';
import {
  FlagOutlined,
  EyeOutlined,
  PaperClipOutlined,
  HistoryOutlined,
  CommentOutlined,
  SaveOutlined,
  CloseOutlined,
} from '@ant-design/icons';
import { useTaskFormStyles } from './task-form.styles';
import { ReactQuillEditor } from '../rich-text-editor';
import { FileUpload } from '../file-upload';
import { ActivityHistory } from '../activity-history';
import {
  TaskFormProps,
  TaskType,
  TaskFormTab,
  PRIORITY_OPTIONS,
} from './task-form.types';
import taskFormValidation from './validation';

const { Text } = Typography;

export const TaskForm: React.FC<TaskFormProps> = ({
  form,
  initialValues,
  layout = 'vertical',
  showCard = false,
  disabled = false,
  loading = false,
  onFinish,
  activeTab = 'overview',
  onTabChange,
  showActions = false,
  onSave,
  onCancel,
  renderAssigneeSection,
  renderCommentsSection,
  projects = [],
  projectsLoading = false,
  showProjectSelection = false,
}) => {
  const { styles, cx } = useTaskFormStyles();
  const [internalTab, setInternalTab] = React.useState<TaskFormTab>('overview');
  const [attachments, setAttachments] = React.useState<UploadFile[]>([]);

  const currentTab = activeTab !== undefined ? activeTab : internalTab;
  const handleTabChange = onTabChange || setInternalTab;

  const renderTabContent = () => {
    switch (currentTab) {
      case 'overview':
        return (
          <Space direction="vertical" className={styles.formContainer}>
            <Row gutter={[16, 16]} align="middle">
              <Col flex="auto">
                <Form.Item
                  name="title"
                  label="Task Title"
                  rules={taskFormValidation.title}
                >
                  <Input
                    placeholder="Enter task title"
                    size="large"
                    className={styles.titleInput}
                  />
                </Form.Item>
              </Col>
            </Row>

            {showProjectSelection && (
              <Form.Item
                name="projectId"
                label="Project"
                rules={[{ required: true, message: 'Please select a project' }]}
              >
                <Select
                  placeholder={
                    projectsLoading ? 'Loading projects...' : 'Select a project'
                  }
                  size="large"
                  className={styles.fieldSelect}
                  loading={projectsLoading}
                  disabled={disabled || projectsLoading}
                  notFoundContent={
                    (projects || []).length === 0
                      ? 'No projects available. Please create a project first.'
                      : 'No projects found'
                  }
                >
                  {(projects || []).map((project) => (
                    <Select.Option key={project.id} value={project.id}>
                      {project.name}
                    </Select.Option>
                  ))}
                </Select>
              </Form.Item>
            )}

            <Row gutter={[16, 16]}>
              <Col span={12}>
                <Form.Item
                  name="type"
                  label="Task Type"
                  rules={taskFormValidation.type}
                >
                  <Select
                    placeholder="Select task type"
                    size="large"
                    className={styles.fieldSelect}
                  >
                    {Object.values(TaskType).map((type) => (
                      <Select.Option key={type} value={type}>
                        {type.replace('_', ' ')}
                      </Select.Option>
                    ))}
                  </Select>
                </Form.Item>
              </Col>
              <Col span={12}>
                <Form.Item
                  name="priority"
                  label="Priority"
                  rules={taskFormValidation.priority}
                >
                  <Select
                    placeholder="Select priority"
                    size="large"
                    className={styles.fieldSelect}
                  >
                    {PRIORITY_OPTIONS.map((option) => (
                      <Select.Option key={option.value} value={option.value}>
                        <Space align="center">
                          <Tag
                            color={option.color}
                            className={styles.priorityTag}
                          >
                            <FlagOutlined />
                          </Tag>
                          {option.label}
                        </Space>
                      </Select.Option>
                    ))}
                  </Select>
                </Form.Item>
              </Col>
            </Row>

            <Form.Item
              name="dueDate"
              label="Due Date"
              rules={taskFormValidation.dueDate}
            >
              <DatePicker
                className={styles.datePicker}
                size="large"
                placeholder="Select due date"
                showTime
                format="MMMM DD, YYYY - h:mma"
              />
            </Form.Item>

            <Form.Item
              name="description"
              label="Description"
              rules={taskFormValidation.description}
            >
              <ReactQuillEditor
                placeholder="Enter task description"
                height={150}
              />
            </Form.Item>

            {renderAssigneeSection && renderAssigneeSection()}
          </Space>
        );

      case 'attachments':
        return (
          <div className={styles.tabContent}>
            <FileUpload
              files={attachments}
              onChange={setAttachments}
              disabled={disabled}
              maxCount={10}
              maxSize={10}
            />
          </div>
        );

      case 'history':
        return (
          <div className={styles.tabContent}>
            <ActivityHistory activities={[]} loading={loading} />
          </div>
        );

      case 'comments':
        return (
          <div className={styles.tabContent}>
            {renderCommentsSection ? (
              renderCommentsSection()
            ) : (
              <div className={styles.emptyState}>
                <Text type="secondary">Comments section not configured</Text>
              </div>
            )}
          </div>
        );

      default:
        return null;
    }
  };

  const tabOptions = [
    {
      label: (
        <Space>
          <EyeOutlined />
          Overview
        </Space>
      ),
      value: 'overview' as TaskFormTab,
    },
    {
      label: (
        <Space>
          <PaperClipOutlined />
          Attachments
        </Space>
      ),
      value: 'attachments' as TaskFormTab,
    },
    {
      label: (
        <Space>
          <CommentOutlined />
          Comments
        </Space>
      ),
      value: 'comments' as TaskFormTab,
    },
    {
      label: (
        <Space>
          <HistoryOutlined />
          History
        </Space>
      ),
      value: 'history' as TaskFormTab,
    },
  ];

  const formContent = (
    <Spin spinning={loading}>
      <div className={styles.formHeader}>
        <Segmented
          options={tabOptions}
          value={currentTab}
          onChange={(value) => handleTabChange(value as TaskFormTab)}
          className={styles.tabSegmented}
        />
      </div>

      <Form
        form={form}
        layout={layout}
        initialValues={initialValues}
        disabled={disabled}
        onFinish={onFinish}
        className={styles.form}
      >
        {renderTabContent()}

        {showActions && (
          <div className={styles.actionContainer}>
            <Button
              onClick={onCancel}
              disabled={loading}
              className={cx(styles.actionButton, styles.cancelButton)}
              icon={<CloseOutlined />}
            >
              Cancel
            </Button>
            <Button
              type="primary"
              onClick={onSave}
              loading={loading}
              className={cx(styles.actionButton, styles.saveButton)}
              icon={<SaveOutlined />}
            >
              Save
            </Button>
          </div>
        )}
      </Form>
    </Spin>
  );

  if (showCard) {
    return (
      <Card
        title="Task Details"
        className={styles.card}
        bordered={false}
        loading={loading}
      >
        {formContent}
      </Card>
    );
  }

  return formContent;
};
