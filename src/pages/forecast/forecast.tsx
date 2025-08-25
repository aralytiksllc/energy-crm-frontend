import React from 'react';
import { Card, Typography, Row, Col, Select, DatePicker, Button, Statistic } from 'antd';
import { DownloadOutlined } from '@ant-design/icons';
import dayjs from 'dayjs';
import { ForecastChart } from './components/forecast-chart';
import { ForecastTable } from './components/forecast-table';

const { Title } = Typography;
const { Option } = Select;

export const Forecast: React.FC = () => {
  return (
    <div style={{ padding: 24 }}>
      {/* Header Section */}
      <Row justify="space-between" align="middle" style={{ marginBottom: 24 }}>
        <Title level={2} style={{ margin: 0 }}>Energy Consumption Forecast</Title>
        <Button type="primary" icon={<DownloadOutlined />} size="large">
          Export Data
        </Button>
      </Row>

      {/* Forecast Parameters Section */}
      <Card title="Forecast Parameters" style={{ marginBottom: 24 }}>
        <Row gutter={16}>
          <Col xs={24} sm={12} md={6}>
            <Select
              placeholder="Customer"
              defaultValue="all"
              style={{ width: '100%' }}
            >
              <Option value="all">All</Option>
            </Select>
          </Col>
          <Col xs={24} sm={12} md={6}>
            <Select
              placeholder="Portfolio"
              defaultValue="all"
              style={{ width: '100%' }}
            >
              <Option value="all">All</Option>
            </Select>
          </Col>
          <Col xs={24} sm={12} md={6}>
            <DatePicker
              placeholder="Start Date"
              defaultValue={dayjs('2025-01-01')}
              style={{ width: '100%' }}
            />
          </Col>
          <Col xs={24} sm={12} md={6}>
            <DatePicker
              placeholder="End Date"
              defaultValue={dayjs('2025-01-01')}
              style={{ width: '100%' }}
            />
          </Col>
        </Row>
      </Card>

      {/* Key Metrics Section */}
      <Row gutter={16} style={{ marginBottom: 24 }}>
        <Col xs={24} sm={12} md={6}>
          <Card>
            <Statistic
              title="MAPE %"
              value={3.2}
              suffix="%"
              valueStyle={{ color: '#1890ff', fontSize: 24, fontWeight: 'bold' }}
            />
            <div style={{ fontSize: 12, color: '#8c8c8c', marginTop: 4 }}>
              Mean Absolute Percentage Error
            </div>
          </Card>
        </Col>
        <Col xs={24} sm={12} md={6}>
          <Card>
            <Statistic
              title="Peak Demand"
              value={125.4}
              suffix="MW"
              valueStyle={{ color: '#1890ff', fontSize: 24, fontWeight: 'bold' }}
            />
            <div style={{ fontSize: 12, color: '#8c8c8c', marginTop: 4 }}>
              Maximum Forecasted demand
            </div>
          </Card>
        </Col>
        <Col xs={24} sm={12} md={6}>
          <Card>
            <Statistic
              title="Total Energy"
              value={2.847}
              suffix="MWh"
              valueStyle={{ color: '#1890ff', fontSize: 24, fontWeight: 'bold' }}
            />
            <div style={{ fontSize: 12, color: '#8c8c8c', marginTop: 4 }}>
              Forecasted Consumption
            </div>
          </Card>
        </Col>
        <Col xs={24} sm={12} md={6}>
          <Card>
            <Statistic
              title="Confidence Interval"
              value={5.8}
              suffix="%"
              valueStyle={{ color: '#1890ff', fontSize: 24, fontWeight: 'bold' }}
            />
          </Card>
        </Col>
      </Row>

      {/* Forecast vs Actual Chart */}
      <Card title="Forecast vs Actual Consumption" style={{ marginBottom: 24 }}>
        <ForecastChart />
      </Card>

      {/* Detailed Forecast Data Table */}
      <Card title="Detailed Forecast Data">
        <ForecastTable />
      </Card>
    </div>
  );
};
