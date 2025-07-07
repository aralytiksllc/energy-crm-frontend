import React, { useMemo } from 'react';
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
  Popconfirm,
  Space,
  Tag,
  theme,
  Tooltip,
  Typography,
  Avatar,
} from 'antd';
import dayjs from 'dayjs';
import { truncate } from '../../../utils/text-utils';
import { useCardStyles } from './card.styles';

const { Text } = Typography;

type KanbanCardProps = {
  task: any;
  onClick?: () => void;
  onDelete?: () => void;
};

export const KanbanCard = ({ task, onClick, onDelete }: KanbanCardProps) => {
  const { token } = theme.useToken();
  const { styles } = useCardStyles();

  const dropdownItems = useMemo(() => {
    const dropdownItems: MenuProps['items'] = [
      {
        label: 'View card',
        key: '1',
        icon: <EyeOutlined />,
        onClick: () => {
          onClick?.();
        },
      },
      {
        danger: true,
        label: (
          <Popconfirm
            title="Are you sure you want to delete this task?"
            onConfirm={() => onDelete?.()}
            okText="Yes"
            cancelText="No"
          >
            Delete card
          </Popconfirm>
        ),
        key: '2',
        icon: <DeleteOutlined />,
      },
    ];

    return dropdownItems;
  }, [onClick, onDelete]);

  const dueDateOptions = useMemo(() => {
    if (!task.dueDate) return null;

    const date = dayjs(task.dueDate);
    const now = dayjs();
    const diffDays = date.diff(now, 'day');

    let color = 'default';
    if (diffDays < 0) color = 'error';
    else if (diffDays <= 3) color = 'warning';
    else if (diffDays <= 7) color = 'processing';

    return {
      color,
      text: date.format('MMM D'),
    };
  }, [task.dueDate]);

  const assignees =
    task.assignees?.map((assignee: any) => ({
      id: assignee.user.id,
      name: `${assignee.user.firstName} ${assignee.user.lastName}`,
      avatar: assignee.user.avatar,
      estimatedHours: assignee.estimatedHours,
    })) || [];

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
        title={<Text ellipsis={{ tooltip: task.title }}>{task.title}</Text>}
        onClick={onClick}
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
              icon={<MoreOutlined className={styles.moreOutlined} />}
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
        <div className={styles.cardContent}>
          {task.project && (
            <Tag color="blue" style={{ fontSize: '11px' }}>
              <Tooltip title={task.project.name}>
                {truncate(task.project.name, 7)}
              </Tooltip>
            </Tag>
          )}
          {dueDateOptions && (
            <Tag
              icon={<ClockCircleOutlined className={styles.dueDateIcon} />}
              className={styles.dueDateTag}
              style={{
                backgroundColor:
                  dueDateOptions.color === 'default' ? 'transparent' : 'unset',
              }}
              color={dueDateOptions.color}
              bordered={dueDateOptions.color !== 'default'}
            >
              {dueDateOptions.text}
            </Tag>
          )}
          {!!assignees?.length && (
            <Space
              size={4}
              wrap
              direction="horizontal"
              align="center"
              className={styles.assigneeSpace}
            >
              <Avatar.Group
                max={{
                  count: 3,
                  style: {
                    color: 'black',
                    backgroundColor: '#fff7e6',
                    fontWeight: 400,
                  },
                }}
                size={24}
              >
                {assignees.map((user: any) => (
                  <Tooltip key={user.id} title={user.name}>
                    <Avatar src={user.avatar} className={styles.avatar}>
                      {user.name
                        .split(' ')
                        .map((n: string) => n[0])
                        .join('')
                        .toUpperCase()}
                    </Avatar>
                  </Tooltip>
                ))}
              </Avatar.Group>
            </Space>
          )}
        </div>
      </Card>
    </ConfigProvider>
  );
};
