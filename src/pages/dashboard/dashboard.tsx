import React from 'react';
import { Row, Col, Card, Statistic, Typography, Space } from 'antd';
import { Pie, Bar } from '@ant-design/plots'; // për charts
import {
  TeamOutlined,
  ProjectOutlined,
  ClockCircleOutlined,
  CheckCircleOutlined,
  ArrowUpOutlined,
  ArrowDownOutlined,
} from '@ant-design/icons';

const stats = {
  totalClients: 12,
  totalProjects: 7,
  plannedHours: 320,
  workedHours: 278,
};

const hoursByClient = [
  { type: 'Client A', value: 100 },
  { type: 'Client B', value: 60 },
  { type: 'Client C', value: 45 },
  { type: 'Client D', value: 38 },
  { type: 'Client E', value: 35 },
];

const hoursByProject = [
  { name: 'Project Alpha', hours: 80 },
  { name: 'Project Beta', hours: 65 },
  { name: 'Project Gamma', hours: 55 },
  { name: 'Project Delta', hours: 45 },
  { name: 'Project Omega', hours: 33 },
];

const ticketStats = [
  { type: 'Bug', status: 'Open', count: 12 },
  { type: 'Bug', status: 'Closed', count: 8 },
  { type: 'Task', status: 'In Progress', count: 14 },
  { type: 'Feature', status: 'Open', count: 7 },
  { type: 'Feature', status: 'Completed', count: 10 },
];

export function Dashboard() {
  return (
    <Space direction="vertical" size="large" style={{ width: '100%' }}>
      {/* 1. Rreshti i parë */}
      <Row gutter={16}>
        <Col span={6}>
          <Card bordered>
            <Space>
              <TeamOutlined style={{ fontSize: 32, color: '#1890ff' }} />
              <Statistic
                title="Klientë Aktivë"
                value={12}
                valueStyle={{ color: '#3f8600' }}
                prefix={<ArrowUpOutlined />}
              />
            </Space>
          </Card>
        </Col>

        <Col span={6}>
          <Card bordered>
            <Space>
              <ProjectOutlined style={{ fontSize: 32, color: '#52c41a' }} />
              <Statistic
                title="Projekte Aktive"
                value={7}
                valueStyle={{ color: '#3f8600' }}
                prefix={<ArrowUpOutlined />}
              />
            </Space>
          </Card>
        </Col>

        <Col span={6}>
          <Card bordered>
            <Space>
              <ClockCircleOutlined style={{ fontSize: 32, color: '#faad14' }} />
              <Statistic
                title="Ore të Planifikuara"
                value={320}
                suffix="h"
                valueStyle={{ color: '#3f8600' }}
                prefix={<ArrowUpOutlined />}
              />
            </Space>
          </Card>
        </Col>

        <Col span={6}>
          <Card bordered>
            <Space>
              <CheckCircleOutlined style={{ fontSize: 32, color: '#13c2c2' }} />
              <Statistic
                title="Ore të Punësuara"
                value={278}
                suffix="h"
                valueStyle={{ color: '#cf1322' }}
                prefix={<ArrowDownOutlined />}
              />
            </Space>
          </Card>
        </Col>
      </Row>

      {/* 2. Rreshti i dytë */}
      <Row gutter={16}>
        <Col span={12}>
          <Card title="Shpërndarja e orëve për klient">
            <Pie
              data={hoursByClient}
              angleField="value"
              colorField="type"
              label={{ type: 'spider' }}
              height={250}
            />
          </Card>
        </Col>
        <Col span={12}>
          <Card title="Top 5 projektet sipas orëve të shpenzuara">
            <Bar
              data={hoursByProject}
              xField="hours"
              yField="name"
              seriesField="name"
              height={250}
              layout="horizontal"
            />
          </Card>
        </Col>
      </Row>

      {/* 3. Rreshti i tretë */}
      <Card title="Statistikat e Tiketave">
        <Row gutter={16}>
          {ticketStats.map((ticket, index) => (
            <Col span={6} key={index}>
              <Card>
                <Statistic
                  title={`${ticket.type} - ${ticket.status}`}
                  value={ticket.count}
                />
              </Card>
            </Col>
          ))}
        </Row>
      </Card>

      {/* 4. Rreshti i katërt – kreativ */}
      <Card title="Kohë reale: Raporti i produktivitetit (mock)">
        <Typography.Paragraph>
          Në këtë muaj janë kryer <strong>87%</strong> e orëve të planifikuara.
          Ekipi ka tejkaluar pritshmëritë në projektet kritike.
          <br />
          <br />
          <strong>Rekomandim:</strong> Rishiko prioritetet për klientin B, ku
          janë alokuar më shumë orë se sa është buxhetuar.
        </Typography.Paragraph>
      </Card>
    </Space>
  );
}
