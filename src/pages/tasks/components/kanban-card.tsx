import * as React from 'react';
import { Card, Typography, Tooltip, Col, Row, Tag } from 'antd';
import {
  ClockCircleOutlined,
  CommentOutlined,
  CalendarOutlined,
} from '@ant-design/icons';
import dayjs from 'dayjs';

import './animations.css';

import { UserAvatars } from '@components/user-avatars';
import { useCrudMenuItems } from '@hooks/use-crud-menu-items';
import { DropdownActions } from '@components/dropdown-actions';

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
  task: any;
}

export const KanbanCard: React.FC<KanbanCardProps> = ({ task }) => {
  const { styles } = useStyles();

  // Calculate estimated time from assignees
  const estimatedTime = 0;

  // Format dates
  const createdDate = dayjs(new Date()).format('MMM DD');

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

  return (
    <Card
      title={
        <div
          style={{
            display: 'flex',
            alignItems: 'center',
            gap: 8,
          }}
        >
          <Text strong>{`TASK-${task.id}`}</Text>
          {task.isCompleted && <Tag color="success">Completed</Tag>}
        </div>
      }
      extra={<DropdownActions items={crudMenuItems} />}
      actions={ticketActions}
      loading={false}
      variant="borderless"
      size="small"
    >
      <Row align="middle" gutter={8} wrap={false} style={{ marginBottom: 8 }}>
        <Col flex="auto">
          <div style={{ display: 'flex', gap: 4, flexWrap: 'wrap' }}>
            <Tag color={getTypeColor(task.type)}>task.type</Tag>
            {/* {task.priority && (
              <Tag color={getPriorityColor(task.priority)}>{task.priority}</Tag>
            )}
            {dueDate && (
              <Tag
                color={dayjs(task.dueDate).isBefore(dayjs()) ? 'red' : 'blue'}
              >
                Due: {dueDate}
              </Tag>
            )} */}
          </div>
        </Col>
        <Col flex="none">
          <UserAvatars users={[]} />
        </Col>
      </Row>
      <Paragraph
        className={styles.paragraph}
        ellipsis={paragraphEllipsis}
        strong={true}
      >
        {task.title}
      </Paragraph>
      <Paragraph
        className={styles.paragraph}
        ellipsis={paragraphEllipsis}
        strong={false}
      >
        {'plainTextDescription'}
      </Paragraph>
    </Card>
  );
};
