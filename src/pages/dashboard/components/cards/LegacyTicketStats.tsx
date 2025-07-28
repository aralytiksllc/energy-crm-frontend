import React from 'react';
import { Card, Row, Col, Statistic } from 'antd';
import { useLegacyTicketStatsStyles } from './LegacyTicketStats.styles';

interface TicketStat {
  type: string;
  count: number;
}

interface LegacyTicketStatsProps {
  stats: TicketStat[];
}

export const LegacyTicketStats: React.FC<LegacyTicketStatsProps> = ({
  stats,
}) => {
  const { styles } = useLegacyTicketStatsStyles();
  return (
    <Card title="Statistikat e Tiketave">
      <Row gutter={16}>
        {stats.map((ticket, index) => (
          <Col span={6} key={index} className={styles.column}>
            <Card className={styles.card}>
              <Statistic
                title={ticket.type}
                value={ticket.count}
                className={styles.statistic}
              />
            </Card>
          </Col>
        ))}
      </Row>
    </Card>
  );
};
