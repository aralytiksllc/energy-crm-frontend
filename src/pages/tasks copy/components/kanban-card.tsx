import * as React from 'react';
import { Card, Typography, Tooltip, Col, Row, Tag } from 'antd';
import {
  ClockCircleOutlined,
  CommentOutlined,
  CalendarOutlined,
} from '@ant-design/icons';
import dayjs from 'dayjs';

import './animations.css';

import { UserAvatars } from '@/components/user-avatars';
import { useCrudMenuItems } from '@/hooks/use-crud-menu-items';
import { DropdownActions } from '@/components/dropdown-actions';
import { IUser } from '@/interfaces/users';
import { stripHtmlTags } from '@/helpers/text-utils';
import type { Task } from '../types';

import { useStyles } from './kanban-card.styles';

const { Text, Paragraph } = Typography;

const paragraphEllipsis = { rows: 2 };

export const useTicketActions = (ticket: any): React.ReactNode[] => {
  const { estimatedTime, commentsCount, createdDate } = ticket;

  return React.useMemo(() => {
    return [
      <Tooltip title="Estimated time" key="time">
        <span>
          <ClockCircleOutlined /> {estimatedTime || '—'}
        </span>
      </Tooltip>,
      <Tooltip title="Comments" key="comments">
        <span>
          <CommentOutlined /> {commentsCount ?? 0}
        </span>
      </Tooltip>,
      <Tooltip title="Created date" key="date">
        <span>
          <CalendarOutlined /> {createdDate || '—'}
        </span>
      </Tooltip>,
    ];
  }, [estimatedTime, commentsCount, createdDate]);
};

interface KanbanCardProps {
  task: Task;
}

export const KanbanCard: React.FC<KanbanCardProps> = ({ task }) => {
  const { styles } = useStyles();

  // Calculate estimated time from assignees
  const estimatedTime =
    task.assignees?.reduce(
      (total, assignee) => total + (assignee.estimatedHours || 0),
      0,
    ) || 0;

  // Format dates
  const dueDate = task.dueDate ? dayjs(task.dueDate).format('MMM DD') : null;
  const createdDate = dayjs(task.createdAt).format('MMM DD');

  // Get task type color
  const getTypeColor = (type: string) => {
    const colorMap: Record<string, string> = {
      FEATURE: 'blue',
      BUG: 'red',
      CODE_REVIEW: 'cyan',
      TESTING: 'magenta',
      DOCUMENTATION: 'green',
      REFACTOR: 'orange',
      MEETING: 'geekblue',
      DEPLOYMENT: 'gold',
      RESEARCH: 'purple',
      OTHER: 'default',
    };
    return colorMap[type] || 'default';
  };

  // Get priority color
  const getPriorityColor = (priority?: string) => {
    const colorMap: Record<string, string> = {
      Low: 'green',
      Medium: 'orange',
      High: 'red',
      Critical: 'volcano',
    };
    return priority ? colorMap[priority] || 'default' : 'default';
  };

  const ticketActions = useTicketActions({
    estimatedTime: estimatedTime > 0 ? `${estimatedTime}h` : '—',
    commentsCount: 0, // TODO: Add comments count when available
    createdDate,
  });

  const crudMenuItems = useCrudMenuItems({
    confirmTitle: `Delete task "${task.title}"?`,
    confirmMessage: 'This action is irreversible.',
    resource: 'tasks',
    resourceId: task.id,
  });

  // Convert assignees to IUser format for UserAvatars component
  const assigneeUsers: IUser[] =
    task.assignees?.map((assignee) => ({
      id: assignee.userId,
      firstName: assignee.user?.name?.split(' ')[0] || `User`,
      lastName: assignee.user?.name?.split(' ')[1] || `${assignee.userId}`,
      email: `user${assignee.userId}@example.com`,
      password: '',
      dateOfBirth: null,
      dateOfJoining: null,
      settings: {},
      notes: null,
      avatar: assignee.user?.avatar || null,
      isActive: true,
      createdAt: new Date(),
      updatedAt: new Date(),
    })) || [];

  // Strip HTML tags from description
  const plainTextDescription = task.description
    ? stripHtmlTags(task.description)
    : '';

  return (
    <Card
      title={
        <div style={{ display: 'flex', alignItems: 'center', gap: 8 }}>
          <Text strong>{`TASK-${task.id}`}</Text>
          {task.isCompleted && <Tag color="success">Completed</Tag>}
        </div>
      }
      extra={<DropdownActions items={crudMenuItems} />}
      actions={ticketActions}
      variant="borderless"
      size="small"
    >
      <Row align="middle" gutter={8} wrap={false} style={{ marginBottom: 8 }}>
        <Col flex="auto">
          <div style={{ display: 'flex', gap: 4, flexWrap: 'wrap' }}>
            <Tag color={getTypeColor(task.type)}>
              {task.type.replace('_', ' ')}
            </Tag>
            {task.priority && (
              <Tag color={getPriorityColor(task.priority)}>{task.priority}</Tag>
            )}
            {dueDate && (
              <Tag
                color={dayjs(task.dueDate).isBefore(dayjs()) ? 'red' : 'blue'}
              >
                Due: {dueDate}
              </Tag>
            )}
          </div>
        </Col>
        <Col flex="none">
          <UserAvatars users={assigneeUsers} />
        </Col>
      </Row>
      <Paragraph
        className={styles.paragraph}
        ellipsis={paragraphEllipsis}
        strong={true}
      >
        {task.title}
      </Paragraph>
      {plainTextDescription && (
        <Paragraph
          className={styles.paragraph}
          ellipsis={paragraphEllipsis}
          strong={false}
        >
          {plainTextDescription}
        </Paragraph>
      )}
    </Card>
  );
};
