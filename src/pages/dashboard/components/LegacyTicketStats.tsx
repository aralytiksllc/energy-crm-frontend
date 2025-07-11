import React from 'react';
import { Card, Row, Col, Statistic } from 'antd';

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
  return (
    <Card title="Statistikat e Tiketave">
      <Row gutter={16}>
        {stats.map((ticket, index) => (
          <Col span={6} key={index}>
            <Card>
              <Statistic title={ticket.type} value={ticket.count} />
            </Card>
          </Col>
        ))}
      </Row>
    </Card>
  );
};
