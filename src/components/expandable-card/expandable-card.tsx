import React, { useState } from 'react';
import { Card, Avatar, Typography } from 'antd';
import { UserOutlined } from '@ant-design/icons';

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
  const [internalExpanded, setInternalExpanded] = useState(false);

  const isExpanded = controlled ? controlled.expanded : internalExpanded;
  const toggleExpanded = controlled
    ? controlled.onToggle
    : () => setInternalExpanded(!internalExpanded);

  const hasExpandableContent = expandableContent && showExpandToggle;

  return (
    <Card
      {...cardProps}
      className={className}
      style={{
        marginBottom: 16,
        ...style,
      }}
      title={
        <div style={{ display: 'flex', alignItems: 'center', gap: 8 }}>
          {title}
        </div>
      }
      extra={actions}
    >
      <div style={{ display: 'flex', gap: 12, alignItems: 'flex-start' }}>
        {avatar && (
          <Avatar
            size={avatar.size || 'small'}
            src={avatar.src}
            icon={avatar.icon || <UserOutlined />}
            style={{ alignSelf: 'flex-start', flexShrink: 0 }}
          />
        )}

        <div style={{ flex: 1 }}>
          {subtitle}

          {hasExpandableContent && !isExpanded && (
            <Text
              style={{
                fontSize: '12px',
                cursor: 'pointer',
                marginTop: 4,
                color: '#1890ff',
                display: 'block',
              }}
              onClick={toggleExpanded}
            >
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
          <Text
            style={{
              fontSize: '12px',
              cursor: 'pointer',
              color: '#1890ff',
            }}
            onClick={toggleExpanded}
          >
            {collapseText}
          </Text>
        </div>
      )}
    </Card>
  );
};
