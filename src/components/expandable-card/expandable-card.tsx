import React, { useState } from 'react';
import { Card, Avatar, Typography } from 'antd';
import { UserOutlined } from '@ant-design/icons';
import { useExpandableCardStyles } from './expandable-card.styles';

const { Text } = Typography;

export interface ExpandableCardProps<T> {
  data: T;
  title: React.ReactNode;
  subtitle?: React.ReactNode;
  avatar?: {
    src?: string;
    icon?: React.ReactNode;
    size?: 'small' | 'default' | 'large';
  };
  expandableContent?: React.ReactNode;
  actions?: React.ReactNode;
  cardProps?: Record<string, unknown>;
  expandText?: string;
  collapseText?: string;
  showExpandToggle?: boolean;
  controlled?: {
    expanded: boolean;
    onToggle: () => void;
  };
  className?: string;
  style?: React.CSSProperties;
}

export const ExpandableCard = <T,>({
  data,
  title,
  subtitle,
  avatar,
  expandableContent,
  actions,
  cardProps = {},
  expandText = 'View more details',
  collapseText = 'See less',
  showExpandToggle = true,
  controlled,
  className,
  style,
}: ExpandableCardProps<T>) => {
  const { styles, cx } = useExpandableCardStyles();
  const [internalExpanded, setInternalExpanded] = useState(false);

  const isExpanded = controlled ? controlled.expanded : internalExpanded;
  const toggleExpanded = controlled
    ? controlled.onToggle
    : () => setInternalExpanded(!internalExpanded);

  const hasExpandableContent = expandableContent && showExpandToggle;

  return (
    <Card
      {...cardProps}
      className={cx(styles.card, className)}
      style={style}
      title={<div className={styles.titleContainer}>{title}</div>}
      extra={actions}
    >
      <div className={styles.contentContainer}>
        {avatar && (
          <Avatar
            size={avatar.size || 'small'}
            src={avatar.src}
            icon={avatar.icon || <UserOutlined />}
            className={styles.avatar}
          />
        )}

        <div className={styles.content}>
          {subtitle}

          {hasExpandableContent && !isExpanded && (
            <Text className={styles.toggleText} onClick={toggleExpanded}>
              {expandText}
            </Text>
          )}
        </div>
      </div>

      {hasExpandableContent && isExpanded && (
        <div>
          <br />
          {expandableContent}
          <br />
          <Text className={styles.collapseText} onClick={toggleExpanded}>
            {collapseText}
          </Text>
        </div>
      )}
    </Card>
  );
};
