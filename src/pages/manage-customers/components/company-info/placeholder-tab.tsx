import React from 'react';
import { Typography, Empty } from 'antd';

const { Text } = Typography;

interface PlaceholderTabProps {
  message: string;
}

export const PlaceholderTab: React.FC<PlaceholderTabProps> = ({ message }) => {
  return (
    <Empty
      description={<Text type="secondary">{message}</Text>}
      style={{ margin: '40px 0' }}
    />
  );
};
