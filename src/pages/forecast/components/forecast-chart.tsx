import React from 'react';
import { Area } from '@ant-design/plots';

export const ForecastChart: React.FC = () => {
  // Mock data for forecast vs actual consumption
  const data = [
    { time: '00:00', type: 'Forecast', value: 120 },
    { time: '04:00', type: 'Forecast', value: 140 },
    { time: '08:00', type: 'Forecast', value: 180 },
    { time: '12:00', type: 'Forecast', value: 220 },
    { time: '16:00', type: 'Forecast', value: 200 },
    { time: '20:00', type: 'Forecast', value: 160 },
    { time: '24:00', type: 'Forecast', value: 130 },
    { time: '00:00', type: 'Actual', value: 115 },
    { time: '04:00', type: 'Actual', value: 135 },
    { time: '08:00', type: 'Actual', value: 175 },
    { time: '12:00', type: 'Actual', value: 210 },
    { time: '16:00', type: 'Actual', value: 195 },
    { time: '20:00', type: 'Actual', value: 155 },
    { time: '24:00', type: 'Actual', value: 125 },
  ];

  const config = {
    data,
    xField: 'time',
    yField: 'value',
    seriesField: 'type',
    smooth: true,
    areaStyle: {
      fillOpacity: 0.6,
    },
    line: {
      size: 2,
    },
    point: {
      size: 4,
      shape: 'circle',
      style: {
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
    legend: {
      position: 'top-right',
      marker: {
        symbol: 'square',
      },
    },
    color: ['#722ed1', '#52c41a'], // Purple for Forecast, Green for Actual
    height: 400,
  };

  return <Area {...config} />;
};
