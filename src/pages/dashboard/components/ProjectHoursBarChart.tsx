import React from 'react';
import { Card, Empty } from 'antd';
import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  ResponsiveContainer,
  Legend,
  LabelList,
} from 'recharts';
import { BAR_CHART_COLORS } from '../constants';

interface ProjectHoursData {
  name: string;
  plannedHours: number;
  actualHours: number;
}

interface ProjectHoursBarChartProps {
  data: ProjectHoursData[];
  title: string;
}

const ProjectNameLabel = (props: any) => {
  const { x, y, value } = props;
  return (
    <text x={x} y={y} dy={-10} textAnchor="start" fill="#666">
      {value}
    </text>
  );
};

export const ProjectHoursBarChart: React.FC<ProjectHoursBarChartProps> = ({
  data,
  title,
}) => {
  if (data.length === 0) {
    return (
      <Card title={title}>
        <Empty
          description="No project data available"
          style={{ height: '400px' }}
        />
      </Card>
    );
  }

  return (
    <Card title={title}>
      <ResponsiveContainer width="100%" height={400}>
        <BarChart
          data={data}
          layout="vertical"
          margin={{ top: 30, right: 30, left: 20, bottom: 5 }}
        >
          <CartesianGrid strokeDasharray="3 3" />
          <XAxis type="number" />
          <YAxis type="category" dataKey="name" hide={true} />
          <Legend />
          <Bar
            dataKey="plannedHours"
            stackId="a"
            fill={BAR_CHART_COLORS.planned}
            name="Orët e planifikuara"
            barSize={20}
          >
            <LabelList dataKey="plannedHours" position="inside" fill="white" />
            <LabelList dataKey="name" content={<ProjectNameLabel />} />
          </Bar>
          <Bar
            dataKey="actualHours"
            stackId="a"
            fill={BAR_CHART_COLORS.actual}
            name="Orët reale"
            barSize={20}
          >
            <LabelList dataKey="actualHours" position="inside" fill="white" />
          </Bar>
        </BarChart>
      </ResponsiveContainer>
    </Card>
  );
};
