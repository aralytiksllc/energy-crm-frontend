import React, { useMemo } from 'react';
import {
  Card,
  Tag,
  Typography,
  Tooltip,
  Dropdown,
  Menu,
  Button,
  Flex,
  Modal,
  message,
  MenuProps,
} from 'antd';
import {
  ClockCircleOutlined,
  CommentOutlined,
  CalendarOutlined,
  EllipsisOutlined,
  EyeOutlined,
  DeleteOutlined,
  MoreOutlined,
} from '@ant-design/icons';

import './animations.css';

import { UserAvatars } from '@/components/user-avatars';
import { useCrudMenuItems } from '@/hooks/use-crud-menu-items';
import { DropdownActions } from '@/components/dropdown-actions';
import { useDeleteMenuItem } from '@/hooks/use-delete-menu-item';
import { IUser } from '@/interfaces/users';

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

  const actions = [
    <Tooltip title="Estimated time" key="time">
      <span>
        <ClockCircleOutlined /> {estimatedTime}
      </span>
    </Tooltip>,
    <Tooltip title="Comments" key="comments">
      <span>
        <CommentOutlined /> {commentsCount}
      </span>
    </Tooltip>,
    <Tooltip title="Created date" key="date">
      <span>
        <CalendarOutlined /> {createdDate}
      </span>
    </Tooltip>,
  ];

  const crudMenuItems = useCrudMenuItems({

    confirmTitle: `Delete project "${cardTitle}"?`,
    confirmMessage: 'This action is irreversible.',
    resource: 'tasks',
    resourceId: 1,
  });

  return (
    <Card
      size="small"
      variant="borderless"
      actions={actions}
      title={<Text strong>{cardTitle}</Text>}
      extra={<DropdownActions items={crudMenuItems} />}
    >
    <Flex style={styles.cardHeader}>
      <Flex style={styles.tagContainer}>
        <Tooltip title="Test">
          <Tag color="blue" style={styles.ellipsisTag}>
            {'tagText'}
          </Tag>
        </Tooltip>
      </Flex>
      <UserAvatars users={users} />
    </Flex>

      <Card.Meta
        title={taskTitle}
        description={
          <Paragraph ellipsis={{ rows: 2 }} style={{ marginBottom: 0 }}>
            {taskDescription}
          </Paragraph>
        }
      />
    </Card>
  );
};
