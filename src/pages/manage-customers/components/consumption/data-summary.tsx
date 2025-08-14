import React from 'react';
import { Row, Col, Card, Typography } from 'antd';
import { COLORS, BORDER_RADIUS, FONT_SIZE } from '../../../../styles/theme';

const { Title, Text } = Typography;

interface SummaryBoxProps {
  title: string;
  description: string;
}

const SummaryBox: React.FC<SummaryBoxProps> = ({ title, description }) => (
  <Card 
    style={{ 
      textAlign: 'center',
      border: `1px solid ${COLORS.border.light}`,
      borderRadius: BORDER_RADIUS.lg,
      backgroundColor: COLORS.background.light
    }}
    bodyStyle={{ padding: '20px 16px' }}
  >
    <Title level={5} style={{ margin: '0 0 8px 0', color: COLORS.text.primary }}>
      {title}
    </Title>
    <Text type="secondary" style={{ fontSize: FONT_SIZE.xl }}>
      {description}
    </Text>
  </Card>
);

export const DataSummary: React.FC = () => {
  const summaryData = [
    {
      title: 'Data Range Covered',
      description: 'Auto-filled after upload'
    },
    {
      title: 'Average Daily kWh',
      description: 'Auto-calculated after upload'
    },
    {
      title: 'Peak Load (kW)',
      description: 'Auto-calculated after upload'
    },
    {
      title: 'Weather Data Linkage',
      description: 'Auto-calculated after upload'
    }
  ];

  return (
    <Row gutter={[16, 16]}>
      {summaryData.map((item, index) => (
        <Col xs={24} sm={12} lg={6} key={index}>
          <SummaryBox 
            title={item.title}
            description={item.description}
          />
        </Col>
      ))}
    </Row>
  );
};
