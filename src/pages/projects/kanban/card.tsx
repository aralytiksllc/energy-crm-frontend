import { memo } from 'react';

import {
  ClockCircleOutlined,
  DeleteOutlined,
  EyeOutlined,
  MoreOutlined,
} from '@ant-design/icons';
import type { MenuProps } from 'antd';
import {
  Button,
  Card,
  ConfigProvider,
  Dropdown,
  Skeleton,
  Tag,
  theme,
  Tooltip,
  Typography,
  Avatar,
} from 'antd';
import dayjs from 'dayjs';
import { UserOutlined } from '@ant-design/icons';
import styles from '../styles/projectCard.module.css';
import stylesSkeleton from '../styles/projectCardSkeleton.module.css';

const { Text } = Typography;

type ProjectCardProps = {
  id: string;
  title: string;
  description?: string;
  dueDate?: string;
  users?: {
    id: string;
    name: string;
    avatarUrl?: string;
  }[];
  onEdit?: (id: string) => void;
  onDelete?: (id: string) => void;
};

export const ProjectCard = ({
  id,
  title,
  description,
  dueDate,
  users,
  onEdit,
  onDelete,
}: ProjectCardProps) => {
  const { token } = theme.useToken();

  const dropdownItems: MenuProps['items'] = [
    {
      label: 'View card',
      key: '1',
      icon: <EyeOutlined />,
      onClick: () => {
        onEdit?.(id);
      },
    },
    {
      danger: true,
      label: 'Delete card',
      key: '2',
      icon: <DeleteOutlined />,
      onClick: () => {
        onDelete?.(id);
      },
    },
  ];

  const dueDateOptions = dueDate
    ? {
        color: dayjs(dueDate).isBefore(dayjs()) ? 'error' : 'default',
        text: dayjs(dueDate).format('MMM D'),
      }
    : null;

  return (
    <ConfigProvider
      theme={{
        components: {
          Tag: {
            colorText: token.colorTextSecondary,
          },
          Card: {
            headerBg: 'transparent',
          },
        },
      }}
    >
      <Card
        size="small"
        className={styles.cardFixed}
        title={<Text ellipsis={{ tooltip: title }}>{title}</Text>}
        onClick={() => {
          onEdit?.(id);
        }}
        extra={
          <Dropdown
            trigger={['click']}
            menu={{
              items: dropdownItems,
              onPointerDown: (e) => {
                e.stopPropagation();
              },
              onClick: (e) => {
                e.domEvent.stopPropagation();
              },
            }}
            placement="bottom"
            arrow={{ pointAtCenter: true }}
          >
            <Button
              type="text"
              shape="circle"
              icon={
                <MoreOutlined
                  style={{
                    transform: 'rotate(90deg)',
                  }}
                />
              }
              onPointerDown={(e) => {
                e.stopPropagation();
              }}
              onClick={(e) => {
                e.stopPropagation();
              }}
            />
          </Dropdown>
        }
      >
        {description && (
          <Text type="secondary" className={styles.cardDescription}>
            {description}
          </Text>
        )}
        <div className={styles.cardMetaRow}>
          {dueDateOptions && (
            <Tag
              icon={<ClockCircleOutlined className={styles.cardMetaIcon} />}
              className={styles.cardMetaTag}
              color={dueDateOptions.color}
              bordered={dueDateOptions.color !== 'default'}
            >
              {dueDateOptions.text}
            </Tag>
          )}
          {!!users?.length && (
            <Avatar.Group
              max={{
                count: 2,
                style: { color: '#f56a00', backgroundColor: '#fde3cf' },
              }}
            >
              {users.map((user) => (
                <Tooltip key={user.id} title={user.name} placement="top">
                  <Avatar
                    src={user.avatarUrl}
                    style={{
                      backgroundColor: user.avatarUrl ? undefined : '#87d068',
                    }}
                    icon={!user.avatarUrl && <UserOutlined />}
                  >
                    {!user.avatarUrl && user.name.charAt(0).toUpperCase()}
                  </Avatar>
                </Tooltip>
              ))}
            </Avatar.Group>
          )}
        </div>
      </Card>
    </ConfigProvider>
  );
};

export const ProjectCardSkeleton = () => {
  return (
    <Card
      size="small"
      bodyStyle={stylesSkeleton.bodyStyle}
      title={
        <Skeleton.Button
          active
          size="small"
          style={stylesSkeleton.titleButton}
        />
      }
    >
      <Skeleton.Button
        active
        size="small"
        style={stylesSkeleton.contentButton}
      />
      <Skeleton.Avatar active size="small" />
    </Card>
  );
};

export const ProjectCardMemo = memo(ProjectCard, (prev, next) => {
  return (
    prev.id === next.id &&
    prev.title === next.title &&
    prev.description === next.description &&
    prev.dueDate === next.dueDate &&
    prev.users?.length === next.users?.length
  );
});
