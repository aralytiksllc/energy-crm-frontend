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
            <Space style={{ marginTop: 8 }}>
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
      <div
        style={{
          display: 'flex',
          justifyContent: 'space-between',
          alignItems: 'flex-start',
          marginBottom: 12,
        }}
      >
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
            style={{ margin: 0, cursor: 'pointer' }}
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
          style={{
            margin: '0 0 8px 0',
            cursor: 'pointer',
            padding: '4px 0',
          }}
          onClick={() => handleFieldEdit('title')}
        >
          {editedTask.title}
        </Title>
      )}

      {isEditing === 'description' ? (
        renderEditableField(
          'description',
          <div>
            <div
              style={{
                border: '1px solid #d9d9d9',
                borderRadius: 6,
                padding: 12,
                minHeight: 100,
                backgroundColor: '#fff',
              }}
            >
              <div
                style={{
                  borderBottom: '1px solid #f0f0f0',
                  paddingBottom: 8,
                  marginBottom: 8,
                  display: 'flex',
                  gap: 8,
                }}
              >
                <Button size="small" type="text" disabled={disabled}>
                  <strong>B</strong>
                </Button>
                <Button size="small" type="text" disabled={disabled}>
                  <em>I</em>
                </Button>
                <Button size="small" type="text" disabled={disabled}>
                  <u>U</u>
                </Button>
                <div
                  style={{
                    borderLeft: '1px solid #d9d9d9',
                    height: 20,
                    margin: '0 4px',
                  }}
                />
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
                style={{ resize: 'none' }}
              />
            </div>
          </div>,
        )
      ) : (
        <Paragraph
          style={{
            margin: '0 0 16px 0',
            cursor: 'pointer',
            padding: '4px 0',
            minHeight: '20px',
          }}
          onClick={() => handleFieldEdit('description')}
        >
          {editedTask.description || 'Click to add description'}
        </Paragraph>
      )}

      <Space
        split={
          <div style={{ width: 1, height: 16, backgroundColor: '#f0f0f0' }} />
        }
        style={{ width: '100%', justifyContent: 'space-between' }}
      >
        {isEditing === 'dueDate' ? (
          <div style={{ minWidth: 150 }}>
            {renderEditableField(
              'dueDate',
              <DatePicker
                value={editedTask.dueDate ? dayjs(editedTask.dueDate) : null}
                onChange={(date) =>
                  handleFieldChange('dueDate', date?.toDate())
                }
                disabled={disabled}
                style={{ width: '100%' }}
              />,
              false,
            )}
          </div>
        ) : (
          <Space
            style={{
              cursor: 'pointer',
              padding: '4px',
              borderRadius: 4,
            }}
            onClick={() => handleFieldEdit('dueDate')}
          >
            <span style={{ color: '#8c8c8c' }}>📅</span>
            <span style={{ color: '#8c8c8c' }}>
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
          <div style={{ minWidth: 200 }}>
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
                  const assignees: TaskAssignee[] = selectedUsers.map(
                    (user: IUser) => ({
                      user,
                      userId: user.id,
                      taskId: editedTask.id,
                      estimatedHours: 0,
                      actualHours: 0,
                    }),
                  );
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
            style={{
              cursor: 'pointer',
              padding: '4px',
              borderRadius: 4,
            }}
            onClick={() => handleFieldEdit('assignees')}
          >
            <span style={{ color: '#8c8c8c' }}>👥</span>
            <span style={{ color: '#8c8c8c', fontSize: 12 }}>
              {editedTask.assignees && editedTask.assignees.length > 0
                ? `${editedTask.assignees.length} assigned`
                : 'Unassigned'}
            </span>
          </Space>
        )}
      </Space>

      {isEditing && (
        <div
          style={{
            marginTop: 16,
            borderTop: '1px solid #f0f0f0',
            paddingTop: 12,
          }}
        >
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
