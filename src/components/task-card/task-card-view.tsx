import React from 'react';
import { Card, Typography, Avatar, Space, Tooltip, Tag } from 'antd';
import {
  UserOutlined,
  ClockCircleOutlined,
  EditOutlined,
} from '@ant-design/icons';
import type { TaskCardViewProps } from './task-card.types';
import { TaskType } from '../task-form/task-form.types';

const { Title, Paragraph, Text } = Typography;

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

const formatDate = (date: Date): string => {
  return new Intl.DateTimeFormat('en-US', {
    month: 'short',
    day: 'numeric',
    year: 'numeric',
  }).format(date);
};

export const TaskCardView: React.FC<TaskCardViewProps> = ({
  task,
  onEdit,
  onFieldEdit,
  disabled = false,
  className,
  style,
}) => {
  const handleFieldClick = (field: keyof typeof task) => {
    if (!disabled && onFieldEdit) {
      onFieldEdit(field);
    }
  };

  const editableFieldStyle = {
    transition: 'background-color 0.2s',
  };

  return (
    <Card
      className={className}
      style={style}
      hoverable={!disabled}
      bodyStyle={{ padding: 16 }}
    >
      <div
        style={{
          display: 'flex',
          justifyContent: 'space-between',
          alignItems: 'flex-start',
          marginBottom: 12,
        }}
      >
        <Tag color={typeColors[task.type]} style={{ margin: 0 }}>
          {task.type}
        </Tag>
        {onEdit && !disabled && (
          <EditOutlined
            onClick={onEdit}
            style={{ cursor: 'pointer', color: '#8c8c8c' }}
          />
        )}
      </div>

      <Title
        level={5}
        style={{
          margin: '0 0 8px 0',
          cursor: !disabled && onFieldEdit ? 'pointer' : 'default',
          padding: '4px 0',
          ...editableFieldStyle,
        }}
        onClick={() => handleFieldClick('title')}
        onMouseEnter={(e) => {
          if (!disabled && onFieldEdit) {
            e.currentTarget.style.backgroundColor = '#fafafa';
            e.currentTarget.style.borderRadius = '4px';
          }
        }}
        onMouseLeave={(e) => {
          if (!disabled && onFieldEdit) {
            e.currentTarget.style.backgroundColor = 'transparent';
          }
        }}
      >
        {task.title}
      </Title>

      <Paragraph
        style={{
          margin: '0 0 16px 0',
          cursor: !disabled && onFieldEdit ? 'pointer' : 'default',
          padding: '4px 0',
          minHeight: '20px',
          ...editableFieldStyle,
        }}
        onClick={() => handleFieldClick('description')}
        onMouseEnter={(e) => {
          if (!disabled && onFieldEdit) {
            e.currentTarget.style.backgroundColor = '#fafafa';
            e.currentTarget.style.borderRadius = '4px';
          }
        }}
        onMouseLeave={(e) => {
          if (!disabled && onFieldEdit) {
            e.currentTarget.style.backgroundColor = 'transparent';
          }
        }}
      >
        {task.description}
      </Paragraph>

      <Space
        split={
          <div style={{ width: 1, height: 16, backgroundColor: '#f0f0f0' }} />
        }
        style={{ width: '100%', justifyContent: 'space-between' }}
      >
        {/* Due Date */}
        <Space
          style={{
            cursor: !disabled && onFieldEdit ? 'pointer' : 'default',
            padding: '4px',
            borderRadius: 4,
            ...editableFieldStyle,
          }}
          onClick={() => handleFieldClick('dueDate')}
          onMouseEnter={(e) => {
            if (!disabled && onFieldEdit) {
              e.currentTarget.style.backgroundColor = '#fafafa';
            }
          }}
          onMouseLeave={(e) => {
            if (!disabled && onFieldEdit) {
              e.currentTarget.style.backgroundColor = 'transparent';
            }
          }}
        >
          <ClockCircleOutlined style={{ color: '#8c8c8c' }} />
          <Text type="secondary">{formatDate(task.dueDate)}</Text>
        </Space>

        <Space
          size={4}
          style={{
            cursor: !disabled && onFieldEdit ? 'pointer' : 'default',
            padding: '4px',
            borderRadius: 4,
            ...editableFieldStyle,
          }}
          onClick={() => handleFieldClick('assignedTo')}
          onMouseEnter={(e) => {
            if (!disabled && onFieldEdit) {
              e.currentTarget.style.backgroundColor = '#fafafa';
            }
          }}
          onMouseLeave={(e) => {
            if (!disabled && onFieldEdit) {
              e.currentTarget.style.backgroundColor = 'transparent';
            }
          }}
        >
          {task.assignedTo?.map((user) => (
            <Tooltip key={user.id} title={user.name}>
              <Avatar
                size="small"
                src={user.avatar}
                icon={!user.avatar && <UserOutlined />}
              />
            </Tooltip>
          ))}
          {(!task.assignedTo || task.assignedTo.length === 0) && (
            <Text type="secondary" style={{ fontSize: 12 }}>
              Unassigned
            </Text>
          )}
        </Space>
      </Space>
    </Card>
  );
};
