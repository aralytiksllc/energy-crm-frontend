import React, { useState, useEffect } from 'react';
import {
  Card,
  Typography,
  Input,
  DatePicker,
  Button,
  Space,
  Tag,
  Select,
} from 'antd';
import { CheckOutlined, CloseOutlined } from '@ant-design/icons';
import type { TaskCardEditProps, Task, TaskAssignee } from './task-card.types';
import { TaskType } from '@interfaces/task-type.enum';
import { IUser } from '@interfaces/users';
import { UserSelector } from './user-selector';
import dayjs from 'dayjs';
import { useTaskCardEditStyles } from './task-card-edit.styles';

const { Title, Paragraph } = Typography;
const { TextArea } = Input;

const typeColors: Record<TaskType, string> = {
  [TaskType.FEATURE]: '#52c41a',
  [TaskType.BUG]: '#f5222d',
  [TaskType.CODE_REVIEW]: '#faad14',
  [TaskType.TESTING]: '#722ed1',
  [TaskType.DOCUMENTATION]: '#1890ff',
  [TaskType.REFACTOR]: '#fa8c16',
  [TaskType.MEETING]: '#13c2c2',
  [TaskType.DEPLOYMENT]: '#eb2f96',
  [TaskType.RESEARCH]: '#52c41a',
  [TaskType.OTHER]: '#8c8c8c',
};

const taskTypeOptions = Object.values(TaskType).map((type) => ({
  label: type,
  value: type,
}));

export const TaskCardEdit: React.FC<TaskCardEditProps> = ({
  task,
  users = [],
  onSave,
  onCancel,
  disabled = false,
  loading = false,
  editingField = null,
  className,
  style,
}) => {
  const [editedTask, setEditedTask] = useState<Task>(task);
  const [isEditing, setIsEditing] = useState<keyof Task | null>(editingField);
  const { styles } = useTaskCardEditStyles();

  useEffect(() => {
    setIsEditing(editingField);
  }, [editingField]);

  const handleFieldChange = (field: keyof Task, value: any) => {
    setEditedTask((prev: Task) => ({
      ...prev,
      [field]: value,
    }));
  };

  const handleSave = () => {
    if (onSave) {
      onSave(editedTask);
    }
    setIsEditing(null);
  };

  const handleCancel = () => {
    setEditedTask(task);
    setIsEditing(null);
    if (onCancel) {
      onCancel();
    }
  };

  const handleFieldEdit = (field: keyof Task) => {
    setIsEditing(field);
  };

  const renderEditableField = (
    field: keyof Task,
    component: React.ReactNode,
    actions = true,
  ) => {
    if (isEditing === field) {
      return (
        <div>
          {component}
          {actions && (
            <Space className={styles.actionButtons}>
              <Button
                type="primary"
                size="small"
                icon={<CheckOutlined />}
                onClick={handleSave}
                loading={loading}
                disabled={disabled}
              />
              <Button
                size="small"
                icon={<CloseOutlined />}
                onClick={handleCancel}
                disabled={disabled}
              />
            </Space>
          )}
        </div>
      );
    }

    return null;
  };

  return (
    <Card className={className} style={style} bodyStyle={{ padding: 16 }}>
      <div className={styles.header}>
        {isEditing === 'type' ? (
          renderEditableField(
            'type',
            <Select
              value={editedTask.type}
              onChange={(value) => handleFieldChange('type', value)}
              options={taskTypeOptions}
              style={{ width: 120 }}
              disabled={disabled}
            />,
          )
        ) : (
          <Tag
            color={typeColors[editedTask.type]}
            className={styles.tag}
            onClick={() => handleFieldEdit('type')}
          >
            {editedTask.type}
          </Tag>
        )}
      </div>

      {isEditing === 'title' ? (
        renderEditableField(
          'title',
          <Input
            value={editedTask.title}
            onChange={(e) => handleFieldChange('title', e.target.value)}
            placeholder="Task title"
            disabled={disabled}
            autoFocus
          />,
        )
      ) : (
        <Title
          level={5}
          className={styles.title}
          onClick={() => handleFieldEdit('title')}
        >
          {editedTask.title}
        </Title>
      )}

      {isEditing === 'description' ? (
        renderEditableField(
          'description',
          <div>
            <div className={styles.descriptionEditor}>
              <div className={styles.editorToolbar}>
                <Button size="small" type="text" disabled={disabled}>
                  <strong>B</strong>
                </Button>
                <Button size="small" type="text" disabled={disabled}>
                  <em>I</em>
                </Button>
                <Button size="small" type="text" disabled={disabled}>
                  <u>U</u>
                </Button>
                <div className={styles.toolbarDivider} />
                <Button size="small" type="text" disabled={disabled}>
                  •
                </Button>
                <Button size="small" type="text" disabled={disabled}>
                  1.
                </Button>
              </div>
              <TextArea
                value={editedTask.description}
                onChange={(e) =>
                  handleFieldChange('description', e.target.value)
                }
                placeholder="Description"
                bordered={false}
                rows={4}
                disabled={disabled}
                className={styles.textArea}
              />
            </div>
          </div>,
        )
      ) : (
        <Paragraph
          className={styles.description}
          onClick={() => handleFieldEdit('description')}
        >
          {editedTask.description || 'Click to add description'}
        </Paragraph>
      )}

      <Space
        split={<div className={styles.footerDivider} />}
        className={styles.footer}
      >
        {isEditing === 'dueDate' ? (
          <div className={styles.dateContainer}>
            {renderEditableField(
              'dueDate',
              <DatePicker
                value={editedTask.dueDate ? dayjs(editedTask.dueDate) : null}
                onChange={(date) =>
                  handleFieldChange('dueDate', date?.toDate())
                }
                disabled={disabled}
                className={styles.datePicker}
              />,
              false,
            )}
          </div>
        ) : (
          <Space
            className={styles.dateDisplay}
            onClick={() => handleFieldEdit('dueDate')}
          >
            <span className={styles.dateIcon}>📅</span>
            <span className={styles.dateText}>
              {editedTask.dueDate
                ? new Intl.DateTimeFormat('en-US', {
                    month: 'short',
                    day: 'numeric',
                    year: 'numeric',
                  }).format(editedTask.dueDate)
                : 'Set due date'}
            </span>
          </Space>
        )}

        {isEditing === 'assignees' ? (
          <div className={styles.assigneeContainer}>
            {renderEditableField(
              'assignees',
              <UserSelector
                value={
                  editedTask.assignees?.map(
                    (assignee: TaskAssignee) =>
                      assignee.user?.id || assignee.userId,
                  ) || []
                }
                onChange={(userIds: number[]) => {
                  const selectedUsers = users.filter((user: IUser) =>
                    userIds.includes(user.id),
                  );
                  const assignees = selectedUsers.map((user: IUser) => ({
                    userId: user.id,
                    estimatedHours: 0,
                  }));
                  handleFieldChange('assignees', assignees);
                }}
                users={users}
                disabled={disabled}
                placeholder="Select users"
              />,
              false,
            )}
          </div>
        ) : (
          <Space
            size={4}
            className={styles.assigneeDisplay}
            onClick={() => handleFieldEdit('assignees')}
          >
            <span className={styles.assigneeIcon}>👥</span>
            <span className={styles.assigneeText}>
              {editedTask.assignees && editedTask.assignees.length > 0
                ? `${editedTask.assignees.length} assigned`
                : 'Unassigned'}
            </span>
          </Space>
        )}
      </Space>

      {isEditing && (
        <div className={styles.actionsContainer}>
          <Space>
            <Button
              type="primary"
              onClick={handleSave}
              loading={loading}
              disabled={disabled}
            >
              Save
            </Button>
            <Button onClick={handleCancel} disabled={disabled}>
              Cancel
            </Button>
          </Space>
        </div>
      )}
    </Card>
  );
};
