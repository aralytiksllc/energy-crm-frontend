import React from 'react';
import { Table, Checkbox } from 'antd';
import { SearchOutlined } from '@ant-design/icons';
import type { ColumnsType } from 'antd/es/table';

interface ForecastDataType {
  key: string;
  date: string;
  hour: string;
  predictedKwh: number;
  actualKwh: number;
  difference: string;
}

export const ForecastTable: React.FC = () => {
  const data: ForecastDataType[] = [
    {
      key: '1',
      date: '2025-01-15',
      hour: '00:00',
      predictedKwh: 45.230,
      actualKwh: 44.500,
      difference: '4.3%',
    },
    {
      key: '2',
      date: '2025-03-17',
      hour: '01:00',
      predictedKwh: 42.130,
      actualKwh: 41.000,
      difference: '2.5%',
    },
    {
      key: '3',
      date: '2025-04-18',
      hour: '02:00',
      predictedKwh: 38.450,
      actualKwh: 37.200,
      difference: '3.7%',
    },
    {
      key: '4',
      date: '2025-05-19',
      hour: '03:00',
      predictedKwh: 35.670,
      actualKwh: 34.800,
      difference: '2.2%',
    },
  ];

  const columns: ColumnsType<ForecastDataType> = [
    {
      title: (
        <div style={{ display: 'flex', alignItems: 'center', gap: 8 }}>
          <Checkbox />
          <span>Date</span>
          <SearchOutlined style={{ color: '#8c8c8c' }} />
        </div>
      ),
      dataIndex: 'date',
      key: 'date',
      width: 120,
      render: (text) => <span>{text}</span>,
    },
    {
      title: 'Hour',
      dataIndex: 'hour',
      key: 'hour',
      width: 80,
      render: (text) => <span>{text}</span>,
    },
    {
      title: 'Predicted kWh',
      dataIndex: 'predictedKwh',
      key: 'predictedKwh',
      width: 120,
      render: (value) => <span>{value.toFixed(3)}</span>,
    },
    {
      title: 'Actual kWh',
      dataIndex: 'actualKwh',
      key: 'actualKwh',
      width: 120,
      render: (value) => <span>{value.toFixed(3)}</span>,
    },
    {
      title: 'kWh',
      dataIndex: 'difference',
      key: 'difference',
      width: 100,
      render: (text) => <span>{text}</span>,
    },
  ];

  return (
    <Table<ForecastDataType>
      columns={columns}
      dataSource={data}
      pagination={false}
      size="small"
      bordered
      scroll={{ x: 600 }}
    />
  );
};
