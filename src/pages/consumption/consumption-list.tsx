// External
import * as React from 'react';
import { Card, Typography, Row, Col, Table, Button, Upload, Statistic } from 'antd';
import { CloudOutlined, DownloadOutlined } from '@ant-design/icons';
import { useParams } from 'react-router';
import { Area } from '@ant-design/plots';

// Internal

const { Title } = Typography;
const { Dragger } = Upload;

export type ConsumptionListProps = {};

export const ConsumptionList: React.FC<ConsumptionListProps> = () => {
  const { customerId } = useParams();

  // Mock data for consumption
  const mockData = [
    {
      id: '1',
      date: '2025-01-01',
      hour: '00:00',
      consumption: 125.4,
      unit: 'kWh',
    },
    {
      id: '2',
      date: '2025-01-01',
      hour: '01:00',
      consumption: 118.2,
      unit: 'kWh',
    },
    {
      id: '3',
      date: '2025-01-01',
      hour: '02:00',
      consumption: 112.8,
      unit: 'kWh',
    },
  ];

  // Mock data for the area chart
  const chartData = [
    { time: '00:00', consumption: 50 },
    { time: '02:00', consumption: 80 },
    { time: '04:00', consumption: 120 },
    { time: '06:00', consumption: 200 },
    { time: '08:00', consumption: 250 },
    { time: '10:00', consumption: 180 },
    { time: '12:00', consumption: 150 },
    { time: '14:00', consumption: 220 },
    { time: '16:00', consumption: 190 },
    { time: '18:00', consumption: 160 },
    { time: '20:00', consumption: 140 },
    { time: '22:00', consumption: 100 },
    { time: '24:00', consumption: 70 },
  ];

  const chartConfig = {
    data: chartData,
    xField: 'time',
    yField: 'consumption',
    smooth: true,
    areaStyle: {
      fill: 'l(270) 0:#e6f7ff 1:#b7eb8f',
    },
    line: {
      color: '#52c41a',
    },
    yAxis: {
      label: {
        formatter: (v: string) => `${v}`,
      },
    },
    xAxis: {
      label: {
        autoRotate: false,
      },
    },
    tooltip: {
      formatter: (datum: any) => {
        return { name: 'Consumption', value: `${datum.consumption} kWh` };
      },
    },
  };

  const columns = [
    {
      title: 'Date',
      dataIndex: 'date',
      key: 'date',
    },
    {
      title: 'Hour',
      dataIndex: 'hour',
      key: 'hour',
    },
    {
      title: 'Consumption',
      dataIndex: 'consumption',
      key: 'consumption',
      render: (value: number, record: any) => `${value} ${record.unit}`,
    },
  ];

  return (
    <div style={{ padding: '24px' }}>
      {/* Upload Section */}
      <Card style={{ marginBottom: '24px' }}>
        <Title level={4} style={{ marginBottom: '16px' }}>
          Upload Consumption Data
        </Title>
        <Dragger
          name="file"
          multiple={false}
          action="https://run.mocky.io/v3/435e224c-44fb-4773-9faf-380c5e6a2188"
          onChange={(info) => {
            console.log(info);
          }}
        >
          <p className="ant-upload-drag-icon">
            <CloudOutlined />
          </p>
          <p className="ant-upload-text">Click or drag file to this area to upload</p>
          <p className="ant-upload-hint">
            Support for a single or bulk upload. Strictly prohibited from uploading company data or other
            banned files.
          </p>
        </Dragger>
      </Card>

      {/* Data Summary */}
      <Row gutter={16} style={{ marginBottom: '24px' }}>
        <Col xs={24} sm={12} md={6}>
          <Card>
            <Statistic
              title="Total Consumption"
              value={356.4}
              suffix="kWh"
              valueStyle={{ color: '#1890ff' }}
            />
          </Card>
        </Col>
        <Col xs={24} sm={12} md={6}>
          <Card>
            <Statistic
              title="Average Consumption"
              value={118.8}
              suffix="kWh"
              valueStyle={{ color: '#52c41a' }}
            />
          </Card>
        </Col>
        <Col xs={24} sm={12} md={6}>
          <Card>
            <Statistic
              title="Peak Consumption"
              value={125.4}
              suffix="kWh"
              valueStyle={{ color: '#faad14' }}
            />
          </Card>
        </Col>
        <Col xs={24} sm={12} md={6}>
          <Card>
            <Statistic
              title="Data Points"
              value={3}
              valueStyle={{ color: '#722ed1' }}
            />
          </Card>
        </Col>
      </Row>

      {/* Data Preview Chart */}
      <Card style={{ marginBottom: '24px' }}>
        <Title level={4} style={{ marginBottom: '16px' }}>
          Data Preview
        </Title>
        <div style={{ height: '300px' }}>
          <Area {...chartConfig} />
        </div>
        <Row gutter={16} style={{ marginTop: '16px' }}>
          <Col span={8}>
            <Statistic
              title="874 Datapoints"
              value=""
              valueStyle={{ fontSize: '14px', color: '#8c8c8c' }}
            />
          </Col>
          <Col span={8}>
            <Statistic
              title="125.4 Avg kWh"
              value=""
              valueStyle={{ fontSize: '14px', color: '#8c8c8c' }}
            />
          </Col>
          <Col span={8}>
            <Statistic
              title="7 days Time Range"
              value=""
              valueStyle={{ fontSize: '14px', color: '#8c8c8c' }}
            />
          </Col>
        </Row>
      </Card>

      {/* Consumption Table */}
      <Card>
        <Title level={4} style={{ marginBottom: '16px' }}>
          Consumption Data
        </Title>
        <Table
          dataSource={mockData}
          columns={columns}
          pagination={false}
          rowKey="id"
        />
      </Card>

      {/* Export Button */}
      <div style={{ 
        position: 'fixed', 
        bottom: '24px', 
        right: '24px', 
        zIndex: 1000 
      }}>
        <Button type="primary" icon={<DownloadOutlined />} size="large">
          Export Data
        </Button>
      </div>
    </div>
  );
};
