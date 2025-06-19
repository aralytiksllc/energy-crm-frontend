import * as React from 'react';
import { Card, Typography, Tooltip, Col, Row } from 'antd';
import {
  ClockCircleOutlined,
  CommentOutlined,
  CalendarOutlined,
} from '@ant-design/icons';

import './animations.css';

import { UserAvatars } from '@/components/user-avatars';
import { useCrudMenuItems } from '@/hooks/use-crud-menu-items';
import { DropdownActions } from '@/components/dropdown-actions';
import { Priority } from '@/components/priority';
import { IUser } from '@/interfaces/users';

import { useStyles } from './kanban-card.styles';

const { Text, Paragraph } = Typography;

// Static data
const staticData = {
  cardTitle: 'PROJ-123',
  taskTitle: 'Fix responsive issues on login page',
  taskDescription:
    'Fix responsive issues on login page when resizing on tablet view. Also check alignment problems and inconsistent font sizes.',
  tag: {
    color: 'red',
    text: 'shume tekst shume tekst shume tekst shume tekst',
  },
  estimatedTime: '3h',
  commentsCount: 5,
  createdDate: '15 May',
};

// Dummy users
const users: IUser[] = Array.from({ length: 20 }, (_, i) => {
  const id = i + 1;
  const firstName = `User${id}`;
  const lastName = `Test${id}`;
  const fullNameSeed = `${firstName}${lastName}`;

  return {
    id,
    firstName,
    lastName,
    email: `user${id}@example.com`,
    password: `hashed_password_${id}`,
    dateOfBirth: new Date(1990 + (i % 10), i % 12, (i % 28) + 1),
    dateOfJoining: new Date(2023, i % 12, (i % 28) + 1),
    settings: {},
    notes: i % 3 === 0 ? `Note for user ${id}` : null,
    avatar:
      i % 4 === 0
        ? null
        : `https://api.dicebear.com/7.x/miniavs/svg?seed=${fullNameSeed}`,
    isActive: i % 2 === 0,
    createdAt: new Date(),
    updatedAt: new Date(),
  };
});

import {} from 'antd';

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

export const KanbanCard: React.FC = () => {
  const {
    cardTitle,
    taskTitle,
    taskDescription,
    tag,
    estimatedTime,
    commentsCount,
    createdDate,
  } = staticData;

  const { styles } = useStyles();

  const ticketActions = useTicketActions({
    estimatedTime,
    commentsCount,
    createdDate,
  });

  const crudMenuItems = useCrudMenuItems({
    confirmTitle: `Delete project test "${cardTitle}"?`,
    confirmMessage: 'This action is irreversible.',
    resource: 'tasks',
    resourceId: 1,
  });

  return (
    <Card
      title={<Text strong={true}>{cardTitle}</Text>}
      extra={<DropdownActions items={crudMenuItems} />}
      actions={ticketActions}
      variant="borderless"
      size="small"
    >
      <Row align="middle" gutter={8} wrap={false}>
        <Col flex="auto">
          <Priority text={tag.text} />
        </Col>
        <Col flex="none">
          <UserAvatars users={users} />
        </Col>
      </Row>
      <Paragraph
        className={styles.paragraph}
        ellipsis={paragraphEllipsis}
        strong={true}
      >
        {taskTitle}
      </Paragraph>
      <Paragraph
        className={styles.paragraph}
        ellipsis={paragraphEllipsis}
        strong={false}
      >
        {taskDescription}
      </Paragraph>
    </Card>
  );
};
