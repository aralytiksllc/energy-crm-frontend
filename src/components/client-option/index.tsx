import React from 'react';
import { Avatar, Typography } from 'antd';
import { UserOutlined } from '@ant-design/icons';
import { useClientOptionStyles } from './client-option.styles';
import { IClient } from '@/constants/clients';

const { Text } = Typography;

interface ClientOptionProps {
  client: IClient;
  compact?: boolean;
}

export const ClientOption: React.FC<ClientOptionProps> = ({
  client,
  compact = false,
}) => {
  const { styles } = useClientOptionStyles();

  return (
    <div className={compact ? styles.compactContainer : styles.container}>
      <Avatar
        size={compact ? 20 : 24}
        src={client.avatar}
        icon={<UserOutlined />}
        className={styles.avatar}
      />
      <div className={styles.content}>
        <Text className={styles.name} ellipsis>
          {client.name}
        </Text>
        {!compact && client.email && (
          <Text className={styles.email} ellipsis>
            {client.email}
          </Text>
        )}
      </div>
    </div>
  );
};
