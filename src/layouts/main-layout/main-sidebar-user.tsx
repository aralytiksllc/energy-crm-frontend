import React from 'react';
import { Card, Typography, Dropdown } from 'antd';
import {
  UserOutlined,
  CreditCardOutlined,
  BellOutlined,
  MoreOutlined,
} from '@ant-design/icons';
import { createStyles } from 'antd-style';
import { useLogout } from '@refinedev/core';
import { useGetIdentity } from '@refinedev/core';
import { IUser } from '@/interfaces/users';
import { Avatar } from '@/components/avatar';

const { Text } = Typography;

type SidebarUserCardProps = {
  collapsed: boolean;
};

const useStyles = createStyles(({ token }) => {
  const dur = token.motionDurationMid; // ~200ms

  return {
    card: {
      '& .ant-card-body': {
        padding: token.paddingSM,
      },
    },

    // Dropdown "user-info" item
    menuUserInfo: {
      display: 'flex',
      gap: token.marginSM,
      alignItems: 'center',
    },
    menuEmail: {
      fontSize: token.fontSizeSM,
      color: token.colorTextSecondary,
    },

    // Main row
    row: {
      display: 'flex',
      alignItems: 'center',
      transition: `gap ${dur} ${token.motionEaseInOut}, justify-content ${dur} ${token.motionEaseInOut}`,
    },
    rowExpanded: {
      gap: token.marginSM,
      justifyContent: 'flex-start',
    },
    rowCollapsed: {
      gap: 0,
      justifyContent: 'center',
    },

    // Username/email container
    info: {
      flex: 1,
      minWidth: 0,
      overflow: 'hidden',
      transition: `max-width ${dur} ${token.motionEaseInOut}, opacity ${dur} ${token.motionEaseInOut}`,
      maxWidth: 500,
      opacity: 1,
    },
    infoCollapsed: {
      maxWidth: 0,
      opacity: 0,
    },

    // "More" icon
    moreIcon: {
      transition: `opacity ${dur} ${token.motionEaseInOut}, width ${dur} ${token.motionEaseInOut}, margin-left ${dur} ${token.motionEaseInOut}`,
      width: 16,
      marginLeft: token.marginXS,
      opacity: 1,
    },
    moreIconCollapsed: {
      width: 0,
      marginLeft: 0,
      opacity: 0,
    },

    // Inline email under avatar (card)
    emailInline: {
      fontSize: token.fontSizeSM,
    },
  };
});

export const MainSidebarUser: React.FC<SidebarUserCardProps> = ({
  collapsed,
}) => {
  const { styles, cx } = useStyles();

  const { mutate, isLoading } = useLogout();

  const { data: identity } = useGetIdentity<IUser>();

  const name = `${identity?.firstName} ${identity?.lastName}`;

  const items: any[] = [
    {
      key: 'user-info',
      label: (
        <div className={styles.menuUserInfo}>
          <Avatar name={name} size={40} />
          <div>
            <Text strong>{name}</Text>
            <br />
            <Text type="secondary" className={styles.menuEmail}>
              {identity?.email}
            </Text>
          </div>
        </div>
      ),
    },
    { type: 'divider' },
    { key: 'account', icon: <UserOutlined />, label: 'Account' },
    { key: 'billing', icon: <CreditCardOutlined />, label: 'Billing' },
    {
      key: 'notifications',
      icon: <BellOutlined />,
      label: 'Notifications',
    },
    { type: 'divider' },
    { key: 'logout', danger: true, label: 'Log out' },
  ];

  return (
    <Dropdown
      placement="topLeft"
      trigger={['click']}
      menu={{
        items,
        onClick: ({ key }) => {
          if (key === 'logout' && !isLoading) {
            mutate();
          }
        },
      }}
    >
      <Card size="small" className={styles.card}>
        <div
          className={cx(
            styles.row,
            collapsed ? styles.rowCollapsed : styles.rowExpanded,
          )}
        >
          <Avatar name={name} size={collapsed ? 32 : 40} />

          <div className={cx(styles.info, collapsed && styles.infoCollapsed)}>
            <Text strong ellipsis>
              {identity?.firstName} {identity?.lastName}
            </Text>
            <br />
            <Text type="secondary" ellipsis className={styles.emailInline}>
              {identity?.email}
            </Text>
          </div>

          <MoreOutlined
            className={cx(
              styles.moreIcon,
              collapsed && styles.moreIconCollapsed,
            )}
          />
        </div>
      </Card>
    </Dropdown>
  );
};
