import React from 'react';
import { Card, Typography } from 'antd';
import { ProductivityMetrics } from '../../utils';
import { useProductivityCardStyles } from './productivity-card.styles';

const { Title, Text } = Typography;

interface ProductivityCardProps {
  productivityMetrics: ProductivityMetrics;
  title?: string;
}

export const ProductivityCard: React.FC<ProductivityCardProps> = ({
  productivityMetrics,
  title = 'Productivity',
}) => {
  const { styles } = useProductivityCardStyles();
  return (
    <Card title={title}>
      <div className={styles.container}>
        <Title level={2} className={styles.title}>
          {productivityMetrics.taskCompletionRate}%
        </Title>
        <Text type="secondary">Task Completion Rate</Text>
        <br />
        <br />
        <Text type="secondary">
          {productivityMetrics.mostActiveProject?.name && (
            <>
              Most active project:{' '}
              <Text strong>{productivityMetrics.mostActiveProject.name}</Text>
              <br />
              Hours:{' '}
              <Text strong>{productivityMetrics.mostActiveProject.hours}h</Text>
            </>
          )}
        </Text>
      </div>
    </Card>
  );
};
