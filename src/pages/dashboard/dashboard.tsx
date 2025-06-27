import React from 'react';
import { Row, Col, Card, Statistic, Typography, Space } from 'antd';
import { DashboardChartsDefault } from '@modules/dashboard';

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

// Complete mock data to make the pie chart work
const mockTasks = [
  {
    id: 1,
    projectId: 1,
    title: 'Task 1',
    type: 'Bug',
    isCompleted: false,
    project: { id: 1, name: 'Project A' },
    assignees: [{ id: 1, name: 'John', estimatedHours: 100 }],
    createdAt: new Date('2024-01-01'),
    updatedAt: new Date('2024-01-01'),
    dueDate: new Date('2024-02-01'),
  },
  {
    id: 2,
    projectId: 2,
    title: 'Task 2',
    type: 'Feature',
    isCompleted: true,
    project: { id: 2, name: 'Project B' },
    assignees: [{ id: 2, name: 'Jane', estimatedHours: 60 }],
    createdAt: new Date('2024-01-01'),
    updatedAt: new Date('2024-01-01'),
    dueDate: new Date('2024-02-01'),
  },
  {
    id: 3,
    projectId: 3,
    title: 'Task 3',
    type: 'Task',
    isCompleted: false,
    project: { id: 3, name: 'Project C' },
    assignees: [{ id: 3, name: 'Bob', estimatedHours: 45 }],
    createdAt: new Date('2024-01-01'),
    updatedAt: new Date('2024-01-01'),
    dueDate: new Date('2024-02-01'),
  },
];

const mockProjects = [
  { id: 1, customerId: 1, name: 'Project A', status: 'active', isActive: true },
  { id: 2, customerId: 2, name: 'Project B', status: 'active', isActive: true },
  { id: 3, customerId: 3, name: 'Project C', status: 'active', isActive: true },
];

const mockCustomers = [
  {
    id: 1,
    name: 'Client A',
    isActive: true,
    createdAt: new Date('2024-01-01'),
    updatedAt: new Date('2024-01-01'),
  },
  {
    id: 2,
    name: 'Client B',
    isActive: true,
    createdAt: new Date('2024-01-01'),
    updatedAt: new Date('2024-01-01'),
  },
  {
    id: 3,
    name: 'Client C',
    isActive: true,
    createdAt: new Date('2024-01-01'),
    updatedAt: new Date('2024-01-01'),
  },
];

export function Dashboard() {
  return (
    <Space direction="vertical" size="large" style={{ width: '100%' }}>
      {/* 2. Rreshti i dytë */}
      <DashboardChartsDefault
        tasks={mockTasks}
        projects={mockProjects}
        customers={mockCustomers}
        dateRange={{ startDate: null, endDate: null }}
        onDateRangeChange={(_dates) => {
          // Handle date range change
        }}
      />

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
