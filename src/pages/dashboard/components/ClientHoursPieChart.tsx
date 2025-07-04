import React from 'react';
import { Card, Empty } from 'antd';
import { Pie } from '@ant-design/plots';
import { PIE_CHART_COLORS } from '../constants';

interface ClientHoursPieChartProps {
  data: { type: string; value: number }[];
  title: string;
}

export const ClientHoursPieChart: React.FC<ClientHoursPieChartProps> = ({
  data,
  title,
}) => {
  if (data.length === 0) {
    return (
      <Card title={title}>
        <Empty
          description="No client data available"
          style={{ height: '400px' }}
        />
      </Card>
    );
  }

  return (
    <Card title={title}>
      <Pie
        appendPadding={10}
        data={data}
        angleField="value"
        colorField="type"
        color={PIE_CHART_COLORS}
        radius={0.8}
        innerRadius={0.6}
        label={{
          type: 'inner',
          offset: '-30%',
          content: ({ percent }: { percent: number }) =>
            `${(percent * 100).toFixed(0)}%`,
          style: {
            fontSize: 14,
            textAlign: 'center',
          },
        }}
        interactions={[
          {
            type: 'element-active',
          },
        ]}
        height={400}
      />
    </Card>
  );
};
