import React, { useState } from 'react';
import {
  Card,
  Row,
  Col,
  Statistic,
  DatePicker,
  Select,
  Table,
  Progress,
  Typography,
  Space,
  Divider
} from 'antd';
import {
  ArrowUpOutlined,
  ArrowDownOutlined,
  UserOutlined,
  HomeOutlined,
  ThunderboltOutlined,
  FileTextOutlined
} from '@ant-design/icons';
import dayjs from 'dayjs';

const { RangePicker } = DatePicker;
const { Option } = Select;
const { Title, Text } = Typography;

const EnergyDashboard = () => {
  const [dateRange, setDateRange] = useState<[any, any]>([dayjs().startOf('month'), dayjs().endOf('month')]);
  const [selectedCustomer, setSelectedCustomer] = useState('all');
  
  // Të dhëna simuluese për dashboard
  const dashboardData = {
    totalConsumption: 125460,
    consumptionChange: 8.5,
    activeCustomers: 342,
    customersChange: 2.3,
    activeContracts: 512,
    contractsChange: -1.2,
    peakDemand: 98.7,
    peakChange: 5.4,
    recentConsumption: [
      {
        key: '1',
        customer: 'Kompania ABC Sh.p.k',
        meteringPoint: 'MP-00123',
        consumption: 2450,
        date: '2023-10-15'
      },
      {
        key: '2',
        customer: 'Fabrika XYZ',
        meteringPoint: 'MP-00456',
        consumption: 3870,
        date: '2023-10-15'
      },
      {
        key: '3',
        customer: 'Hotel International',
        meteringPoint: 'MP-00789',
        consumption: 1560,
        date: '2023-10-15'
      },
      {
        key: '4',
        customer: 'Qendra Tregtare Europa',
        meteringPoint: 'MP-00234',
        consumption: 4780,
        date: '2023-10-15'
      },
      {
        key: '5',
        customer: 'Spitali Rajonal',
        meteringPoint: 'MP-00987',
        consumption: 3250,
        date: '2023-10-15'
      }
    ]
  };

  const columns = [
    {
      title: 'Klienti',
      dataIndex: 'customer',
      key: 'customer',
    },
    {
      title: 'Pika e Matjes',
      dataIndex: 'meteringPoint',
      key: 'meteringPoint',
    },
    {
      title: 'Konsumi (kWh)',
      dataIndex: 'consumption',
      key: 'consumption',
      render: (value: number) => value.toLocaleString('sq-AL'),
    },
    {
      title: 'Data',
      dataIndex: 'date',
      key: 'date',
    },
  ];

  return (
    <div style={{ padding: '24px' }}>
      <Space direction="vertical" size="large" style={{ width: '100%' }}>
        <div>
          <Title level={2}>Dashboard e Energjisë Elektrike</Title>
          <Text>Monitoroni performancën e biznesit tuaj në kohë reale</Text>
        </div>
        
        <Card>
          <Space direction="vertical" style={{ width: '100%' }} size="middle">
            <Space wrap>
              <RangePicker
                // value={dateRange}
                // onChange={(dates) => setDateRange(dates)}
                style={{ marginRight: 16 }}
              />
              <Select 
                value={selectedCustomer} 
                onChange={setSelectedCustomer}
                style={{ width: 200 }}
                placeholder="Zgjidh klientin"
              >
                <Option value="all">Të gjithë klientët</Option>
                <Option value="commercial">Klientë komercial</Option>
                <Option value="industrial">Klientë industrial</Option>
                <Option value="residential">Klientë residential</Option>
              </Select>
            </Space>
            
            <Divider />
            
            <Row gutter={16}>
              <Col span={6}>
                <Card>
                  <Statistic
                    title="Konsumi Total (kWh)"
                    value={dashboardData.totalConsumption}
                    precision={0}
                    valueStyle={{ color: '#3f8600' }}
                    prefix={<ThunderboltOutlined />}
                    suffix="kWh"
                  />
                  <div style={{ marginTop: 8 }}>
                    <Text type={dashboardData.consumptionChange >= 0 ? 'success' : 'danger'}>
                      {dashboardData.consumptionChange >= 0 ? <ArrowUpOutlined /> : <ArrowDownOutlined />}
                      {Math.abs(dashboardData.consumptionChange)}%
                    </Text>
                    <Text type="secondary"> ndër muajin e kaluar</Text>
                  </div>
                </Card>
              </Col>
              <Col span={6}>
                <Card>
                  <Statistic
                    title="Klientë Aktivë"
                    value={dashboardData.activeCustomers}
                    prefix={<UserOutlined />}
                  />
                  <div style={{ marginTop: 8 }}>
                    <Text type={dashboardData.customersChange >= 0 ? 'success' : 'danger'}>
                      {dashboardData.customersChange >= 0 ? <ArrowUpOutlined /> : <ArrowDownOutlined />}
                      {Math.abs(dashboardData.customersChange)}%
                    </Text>
                    <Text type="secondary"> ndër muajin e kaluar</Text>
                  </div>
                </Card>
              </Col>
              <Col span={6}>
                <Card>
                  <Statistic
                    title="Kontrata Aktivë"
                    value={dashboardData.activeContracts}
                    prefix={<FileTextOutlined />}
                  />
                  <div style={{ marginTop: 8 }}>
                    <Text type={dashboardData.contractsChange >= 0 ? 'success' : 'danger'}>
                      {dashboardData.contractsChange >= 0 ? <ArrowUpOutlined /> : <ArrowDownOutlined />}
                      {Math.abs(dashboardData.contractsChange)}%
                    </Text>
                    <Text type="secondary"> ndër muajin e kaluar</Text>
                  </div>
                </Card>
              </Col>
              <Col span={6}>
                <Card>
                  <Statistic
                    title="Kërkesa Maksimale (MW)"
                    value={dashboardData.peakDemand}
                    precision={1}
                    suffix="MW"
                    prefix={<HomeOutlined />}
                  />
                  <div style={{ marginTop: 8 }}>
                    <Text type={dashboardData.peakChange >= 0 ? 'success' : 'danger'}>
                      {dashboardData.peakChange >= 0 ? <ArrowUpOutlined /> : <ArrowDownOutlined />}
                      {Math.abs(dashboardData.peakChange)}%
                    </Text>
                    <Text type="secondary"> ndër muajin e kaluar</Text>
                  </div>
                </Card>
              </Col>
            </Row>
            
            <Row gutter={16}>
              <Col span={12}>
                <Card title="Shpërndarja e Konsumit sipas Sektorëve" style={{ height: 300 }}>
                  <div style={{ marginBottom: 16 }}>
                    <Text>Industrial</Text>
                    <Progress percent={45} status="active" />
                  </div>
                  <div style={{ marginBottom: 16 }}>
                    <Text>Komerciel</Text>
                    <Progress percent={30} status="active" />
                  </div>
                  <div style={{ marginBottom: 16 }}>
                    <Text>Residencial</Text>
                    <Progress percent={20} status="active" />
                  </div>
                  <div>
                    <Text>Publike</Text>
                    <Progress percent={5} status="active" />
                  </div>
                </Card>
              </Col>
              <Col span={12}>
                <Card title="Konsumi i Fundit" style={{ height: 300 }}>
                  <Table 
                    dataSource={dashboardData.recentConsumption} 
                    columns={columns} 
                    pagination={false}
                    size="small"
                    scroll={{ y: 180 }}
                  />
                </Card>
              </Col>
            </Row>
          </Space>
        </Card>
      </Space>
    </div>
  );
};

export default EnergyDashboard;