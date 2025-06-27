import React, { useMemo } from 'react';
import { Card, Row, Col, Typography, Table, Tag, Avatar, Space } from 'antd';
import { CalendarOutlined } from '@ant-design/icons';
import type { Task } from '@interfaces/task';
import type { ProjectSummary } from '@modules/projects/api/projects';

const { Title, Text } = Typography;

interface DashboardTablesProps {
  tasks: Task[];
  projects: ProjectSummary[];
}

interface LatestLead {
  key: string;
  initials: string;
  name: string;
  source: string;
  status: string;
  createdAt: string;
}

interface UpcomingTask {
  key: string;
  name: string;
  dueDate: string;
  priority: string;
  status: string;
}

const DashboardTables: React.FC<DashboardTablesProps> = ({ tasks }) => {
  // Mock latest leads data (in real app, this would come from an API)
  const latestLeads: LatestLead[] = useMemo(
    () => [
      {
        key: '1',
        initials: 'WE',
        name: 'WEXMAC RTOP Greece',
        source: 'USG',
        status: 'LEAD',
        createdAt: '5/27/2025',
      },
      {
        key: '2',
        initials: 'KO',
        name: 'Kosovo Police Training',
        source: 'Non USG',
        status: 'LEAD',
        createdAt: '5/27/2025',
      },
      {
        key: '3',
        initials: 'CO',
        name: 'Construction Romania AFB',
        source: 'USG',
        status: 'LEAD',
        createdAt: '5/27/2025',
      },
    ],
    [],
  );

  // Get upcoming tasks from the actual tasks data
  const upcomingTasks: UpcomingTask[] = useMemo(() => {
    const today = new Date();
    const futureDate = new Date();
    futureDate.setDate(today.getDate() + 30); // Next 30 days

    return tasks
      .filter((task) => {
        if (!task.dueDate || task.isCompleted) return false;
        const dueDate = new Date(task.dueDate);
        return dueDate >= today && dueDate <= futureDate;
      })
      .sort(
        (a, b) =>
          new Date(a.dueDate!).getTime() - new Date(b.dueDate!).getTime(),
      )
      .slice(0, 5)
      .map((task) => ({
        key: task.id.toString(),
        name: task.title,
        dueDate: new Date(task.dueDate!).toLocaleDateString('en-US', {
          month: 'numeric',
          day: 'numeric',
          year: 'numeric',
        }),
        priority: task.priority || 'Medium',
        status: 'Pending',
      }));
  }, [tasks]);

  const leadsColumns = [
    {
      title: 'Name',
      dataIndex: 'name',
      key: 'name',
      render: (text: string, record: LatestLead) => (
        <Space>
          <Avatar
            style={{
              backgroundColor: '#1890ff',
              fontSize: 12,
              fontWeight: 'bold',
            }}
            size="small"
          >
            {record.initials}
          </Avatar>
          <Text strong style={{ color: '#262626' }}>
            {text}
          </Text>
        </Space>
      ),
    },
    {
      title: 'Source',
      dataIndex: 'source',
      key: 'source',
      render: (source: string) => (
        <Text style={{ color: '#8C8C8C' }}>{source}</Text>
      ),
    },
    {
      title: 'Status',
      dataIndex: 'status',
      key: 'status',
      render: (status: string) => (
        <Tag
          color="blue"
          style={{
            borderRadius: 12,
            fontSize: 11,
            fontWeight: 'bold',
            textTransform: 'uppercase',
          }}
        >
          {status}
        </Tag>
      ),
    },
    {
      title: 'Created At',
      dataIndex: 'createdAt',
      key: 'createdAt',
      render: (date: string) => (
        <Text style={{ color: '#8C8C8C', fontSize: 12 }}>{date}</Text>
      ),
    },
  ];

  const tasksColumns = [
    {
      title: 'Task',
      dataIndex: 'name',
      key: 'name',
      render: (text: string) => (
        <Text strong style={{ color: '#262626' }}>
          {text}
        </Text>
      ),
    },
    {
      title: 'Due Date',
      dataIndex: 'dueDate',
      key: 'dueDate',
      render: (date: string) => (
        <Space>
          <CalendarOutlined style={{ color: '#8C8C8C', fontSize: 12 }} />
          <Text style={{ color: '#8C8C8C', fontSize: 12 }}>{date}</Text>
        </Space>
      ),
    },
    {
      title: 'Priority',
      dataIndex: 'priority',
      key: 'priority',
      render: (priority: string) => {
        const colorMap = {
          Low: '#52c41a',
          Medium: '#faad14',
          High: '#ff7875',
          Critical: '#ff4d4f',
        };
        return <Text style={{ color: '#8C8C8C', fontSize: 12 }}>NA</Text>;
      },
    },
    {
      title: 'Status',
      dataIndex: 'status',
      key: 'status',
      render: (status: string) => (
        <Tag
          color="orange"
          style={{
            borderRadius: 12,
            fontSize: 11,
            fontWeight: 'bold',
          }}
        >
          {status}
        </Tag>
      ),
    },
  ];

  return (
    <Row gutter={[24, 24]}>
      {/* Latest Leads */}
      <Col span={12}>
        <Card
          style={{
            borderRadius: 12,
            boxShadow: '0 2px 8px rgba(0,0,0,0.06)',
            border: '1px solid #f0f0f0',
          }}
          bodyStyle={{ padding: '24px' }}
        >
          <div style={{ marginBottom: 20 }}>
            <Title level={4} style={{ margin: 0, color: '#262626' }}>
              Latest Leads
            </Title>
            <Text style={{ color: '#8C8C8C', fontSize: 14 }}>
              Most recent lead acquisitions
            </Text>
          </div>

          <Table
            dataSource={latestLeads}
            columns={leadsColumns}
            pagination={false}
            size="small"
            showHeader={true}
          />
        </Card>
      </Col>

      {/* Upcoming Tasks */}
      <Col span={12}>
        <Card
          style={{
            borderRadius: 12,
            boxShadow: '0 2px 8px rgba(0,0,0,0.06)',
            border: '1px solid #f0f0f0',
          }}
          bodyStyle={{ padding: '24px' }}
        >
          <div style={{ marginBottom: 20 }}>
            <Title level={4} style={{ margin: 0, color: '#262626' }}>
              Upcoming Tasks
            </Title>
            <Text style={{ color: '#8C8C8C', fontSize: 14 }}>
              Tasks due soon
            </Text>
          </div>

          {upcomingTasks.length > 0 ? (
            <div>
              {upcomingTasks.map((task, index) => (
                <div
                  key={task.key}
                  style={{
                    padding: '16px 0',
                    borderBottom:
                      index < upcomingTasks.length - 1
                        ? '1px solid #f5f5f5'
                        : 'none',
                    display: 'flex',
                    justifyContent: 'space-between',
                    alignItems: 'center',
                  }}
                >
                  <div>
                    <Text strong style={{ color: '#262626', display: 'block' }}>
                      {task.name}
                    </Text>
                    <Space style={{ marginTop: 4 }}>
                      <CalendarOutlined
                        style={{ color: '#8C8C8C', fontSize: 12 }}
                      />
                      <Text style={{ color: '#8C8C8C', fontSize: 12 }}>
                        {task.dueDate}
                      </Text>
                    </Space>
                  </div>
                  <div style={{ textAlign: 'right' }}>
                    <Text
                      style={{
                        color: '#8C8C8C',
                        fontSize: 12,
                        display: 'block',
                      }}
                    >
                      NA
                    </Text>
                    <Tag
                      color="orange"
                      style={{
                        borderRadius: 12,
                        fontSize: 11,
                        fontWeight: 'bold',
                        marginTop: 4,
                      }}
                    >
                      {task.status}
                    </Tag>
                  </div>
                </div>
              ))}
            </div>
          ) : (
            <div
              style={{
                textAlign: 'center',
                padding: '40px 0',
                color: '#8C8C8C',
              }}
            >
              <Text>No upcoming tasks</Text>
            </div>
          )}
        </Card>
      </Col>
    </Row>
  );
};

export default DashboardTables;
