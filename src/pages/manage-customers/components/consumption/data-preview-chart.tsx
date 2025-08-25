import React from 'react';
import { Line } from '@ant-design/plots';

interface ChartDataPoint {
  time: string;
  value: number;
}

interface DataPreviewChartProps {
  data: ChartDataPoint[];
}

export const DataPreviewChart: React.FC<DataPreviewChartProps> = ({ data }) => {
  const config = {
    data,
    xField: 'time',
    yField: 'value',
    smooth: true,
    area: {
      style: {
        fill: 'l(270) 0:#ffffff 0.5:#7ec2f3 1:#1890ff',
      },
    },
    line: {
      color: '#1890ff',
      size: 2,
    },
    point: {
      size: 4,
      shape: 'circle',
      style: {
        fill: '#1890ff',
        stroke: '#ffffff',
        lineWidth: 2,
      },
    },
    xAxis: {
      type: 'time',
      tickCount: 7,
      label: {
        style: {
          fontSize: 12,
        },
      },
    },
    yAxis: {
      label: {
        style: {
          fontSize: 12,
        },
      },
      tickCount: 5,
      min: 0,
      max: 250,
    },
    grid: {
      line: {
        style: {
          stroke: '#f0f0f0',
          lineWidth: 1,
        },
      },
    },
    tooltip: {
      showMarkers: false,
      showCrosshairs: true,
      crosshairs: {
        type: 'xy',
      },
    },
    height: 300,
  };

  return <Line {...config} />;
};
