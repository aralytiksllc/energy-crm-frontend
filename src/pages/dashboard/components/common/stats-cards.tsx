import React from 'react';
import { Row, Col, Card, Typography } from 'antd';
import { cx } from '@emotion/css';
import { useStatsCardsStyles } from './stats-cards.styles';

const { Title, Text } = Typography;

interface StatCard {
  title: string;
  value: number;
  color: string;
}

interface StatsCardsProps {
  stats: StatCard[];
}

export const StatsCards: React.FC<StatsCardsProps> = ({ stats }) => {
  const { styles } = useStatsCardsStyles();
  return (
    <Row gutter={[16, 16]}>
      {stats.map((stat, index) => (
        <Col xs={6} md={6} key={index}>
          <Card>
            <div className={styles.cardContainer}>
              <Title
                level={2}
                className={cx(styles.title, styles.titleWithColor)}
                style={{ color: stat.color }}
              >
                {stat.value}
              </Title>
              <Text type="secondary">{stat.title}</Text>
            </div>
          </Card>
        </Col>
      ))}
    </Row>
  );
};
