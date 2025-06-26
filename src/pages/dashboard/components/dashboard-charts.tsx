import React, { useMemo } from 'react';
import { Card, Row, Col, Typography, Empty, message } from 'antd';
import { Pie } from '@ant-design/charts';
import type { Task } from '@/interfaces/task';
import type { ProjectSummary } from '../../projects/api/projects';
import type { Customer } from '../../customers/types/customer.types';
import dayjs, { type Dayjs } from 'dayjs';
import { useDashboardStyles } from '../dashboard.styles';

const { Title, Text } = Typography;

// Date range interface
interface DateRange {
  startDate: Dayjs | null;
  endDate: Dayjs | null;
}

interface DashboardChartsProps {
  tasks: Task[];
  projects: ProjectSummary[];
  customers: Customer[];
  dateRange?: DateRange;
  onDateRangeChange?: (dates: DateRange) => void;
}

export const DashboardCharts: React.FC<DashboardChartsProps> = ({
  tasks,
  projects,
  customers,
  dateRange,
}) => {
  const { styles } = useDashboardStyles();

  const stats = useMemo(() => {
    const filteredTasks = tasks.filter((task) => {
      if (!dateRange?.startDate || !dateRange?.endDate) return true;
      const taskDate = dayjs(task.createdAt);
      return (
        taskDate.isAfter(dateRange.startDate) &&
        taskDate.isBefore(dateRange.endDate)
      );
    });

    const uniqueClients = new Set(
      filteredTasks
        .map((task) => {
          const project = projects.find((p) => p.id === task.projectId);
          return project ? project.customerId : null;
        })
        .filter(Boolean),
    );

    const uniqueProjects = new Set(filteredTasks.map((task) => task.projectId));

    const plannedHours = filteredTasks.reduce((sum, task) => {
      return (
        sum +
        (task.assignees?.reduce(
          (assigneeSum, assignee) =>
            assigneeSum + (assignee.estimatedHours || 0),
          0,
        ) || 0)
      );
    }, 0);

    const workedHours = Math.round(plannedHours * 0.85);

    return {
      totalClients: uniqueClients.size,
      totalProjects: uniqueProjects.size,
      plannedHours,
      workedHours,
    };
  }, [tasks, projects, dateRange]);

  const hoursByClient = useMemo(() => {
    const clientHours = new Map<string, number>();

    tasks.forEach((task) => {
      const project = projects.find((p) => p.id === task.projectId);
      const customer = customers.find((c) => c.id === project?.customerId);
      const clientName = customer?.name || 'Unknown Client';

      const taskHours =
        task.assignees?.reduce(
          (sum, assignee) => sum + (assignee.estimatedHours || 0),
          0,
        ) || 0;

      clientHours.set(
        clientName,
        (clientHours.get(clientName) || 0) + taskHours,
      );
    });

    return Array.from(clientHours.entries())
      .map(([type, value]) => ({ type, value }))
      .sort((a, b) => b.value - a.value)
      .slice(0, 5);
  }, [tasks, projects, customers]);

  const hoursByProject = useMemo(() => {
    const projectData = new Map<
      string,
      { plannedHours: number; actualHours: number }
    >();

    tasks.forEach((task) => {
      const project = projects.find((p) => p.id === task.projectId);
      const projectName = project?.name || 'Unknown Project';

      const plannedHours =
        task.assignees?.reduce(
          (sum, assignee) => sum + (assignee.estimatedHours || 0),
          0,
        ) || 0;

      const actualHours = Math.round(plannedHours * 0.85);

      const existing = projectData.get(projectName) || {
        plannedHours: 0,
        actualHours: 0,
      };
      projectData.set(projectName, {
        plannedHours: existing.plannedHours + plannedHours,
        actualHours: existing.actualHours + actualHours,
      });
    });

    return Array.from(projectData.entries())
      .map(([name, data]) => ({
        name,
        plannedHours: data.plannedHours,
        actualHours: data.actualHours,
        totalHours: data.plannedHours + data.actualHours,
      }))
      .sort((a, b) => b.totalHours - a.totalHours)
      .slice(0, 5); // Top 5 projects
  }, [tasks, projects]);

  const ticketStats = useMemo(() => {
    const stats = new Map<string, number>();

    tasks.forEach((task) => {
      const key = `${task.type} - ${task.isCompleted ? 'Completed' : 'Open'}`;
      stats.set(key, (stats.get(key) || 0) + 1);
    });

    return Array.from(stats.entries()).map(([type, count]) => ({
      type,
      count,
    }));
  }, [tasks]);

  return (
    <Space direction="vertical" size="large" style={{ width: '100%' }}>
      <Row gutter={16}>
        <Col span={6}>
          <Card bordered>
            <Space>
              <TeamOutlined style={{ fontSize: 32, color: '#1890ff' }} />
              <Statistic
                title="Klientë Aktivë"
                value={stats.totalClients}
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
                value={stats.totalProjects}
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
                value={stats.plannedHours}
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
                value={stats.workedHours}
                suffix="h"
                valueStyle={{ color: '#cf1322' }}
                prefix={<ArrowDownOutlined />}
              />
            </Space>
          </Card>
        </Col>
      </Row>

      <Row gutter={16}>
        <Col span={12}>
          <Card title="Shpërndarja e orëve për klient">
            <Pie
              data={hoursByClient}
              angleField="value"
              colorField="type"
              label={{ type: 'spider' }}
              height={250}
              innerRadius={0.6}
            />
          </Card>
        </Col>
        <Col span={12}>
          <Card title="Top 5 projektet sipas orëve të shpenzuara">
            <Space direction="vertical" size="large" style={{ width: '100%' }}>
              {hoursByProject.map((project, index) => (
                <div key={index}>
                  <Text
                    strong
                    style={{ display: 'block', marginBottom: '8px' }}
                  >
                    {project.name}
                  </Text>

                  <div
                    style={{
                      position: 'relative',
                      display: 'flex',
                      flexDirection: 'column',
                      alignItems: 'center',
                    }}
                  >
                    <Text
                      style={{
                        fontSize: '11px',
                        color: '#666',
                        marginBottom: '2px',
                        display: 'block',
                      }}
                    >
                      Planned hours
                    </Text>
                    <div
                      style={{
                        position: 'relative',
                        display: 'flex',
                        alignItems: 'center',
                        width: '100%',
                        maxWidth: '100%',
                      }}
                    >
                      <div
                        style={{
                          width: 'calc(100% - 50px)',
                          maxWidth: 'calc(100% - 50px)',
                        }}
                      >
                        <Bar
                          data={[
                            {
                              type: '',
                              hours: Math.max(project.plannedHours || 10, 1),
                            },
                          ]}
                          xField="hours"
                          yField="type"
                          height={60}
                          maxBarWidth={25}
                          barStyle={{
                            fill: '#1890ff',
                            stroke: '#1890ff',
                            lineWidth: 1,
                            opacity: 0.8,
                          }}
                          scale={{
                            x: {
                              nice: false,
                              min: 0,
                              max:
                                Math.max(project.plannedHours || 10, 1) * 1.1,
                            },
                          }}
                          axis={false}
                          legend={false}
                          padding={[10, 10, 10, 10]}
                          tooltip={{
                            formatter: (datum: any) => ({
                              name: 'Planned Hours',
                              value: `${project.plannedHours || 0}h`,
                            }),
                          }}
                        />
                      </div>
                      <Text
                        style={{
                          fontSize: '12px',
                          color: '#1890ff',
                          fontWeight: 'bold',
                          marginLeft: '8px',
                          width: '40px',
                          textAlign: 'left',
                        }}
                      >
                        {project.plannedHours || 0}h
                      </Text>
                    </div>
                  </div>

                  <div
                    style={{
                      position: 'relative',
                      display: 'flex',
                      flexDirection: 'column',
                      alignItems: 'center',
                    }}
                  >
                    <Text
                      style={{
                        fontSize: '11px',
                        color: '#666',
                        marginBottom: '2px',
                        display: 'block',
                      }}
                    >
                      Actual hours
                    </Text>
                    <div
                      style={{
                        position: 'relative',
                        display: 'flex',
                        alignItems: 'center',
                        width: '100%',
                        maxWidth: '100%',
                      }}
                    >
                      <div
                        style={{
                          width: 'calc(100% - 50px)',
                          maxWidth: 'calc(100% - 50px)',
                        }}
                      >
                        <Bar
                          data={[
                            {
                              type: '',
                              hours: Math.max(project.actualHours || 8, 1),
                            },
                          ]}
                          xField="hours"
                          yField="type"
                          height={60}
                          maxBarWidth={25}
                          barStyle={{
                            fill: '#1890ff',
                            stroke: '#1890ff',
                            lineWidth: 1,
                            opacity: 0.8,
                          }}
                          scale={{
                            x: {
                              nice: false,
                              min: 0,
                              max: Math.max(project.actualHours || 8, 1) * 1.1,
                            },
                          }}
                          axis={false}
                          legend={false}
                          padding={[10, 10, 10, 10]}
                          tooltip={{
                            formatter: (datum: any) => ({
                              name: 'Actual Hours',
                              value: `${project.actualHours || 0}h`,
                            }),
                          }}
                        />
                      </div>
                      <Text
                        style={{
                          fontSize: '12px',
                          color: '#1890ff',
                          fontWeight: 'bold',
                          marginLeft: '8px',
                          width: '40px',
                          textAlign: 'left',
                        }}
                      >
                        {project.actualHours || 0}h
                      </Text>
                    </div>
                  </div>
                </div>
              ))}
            </Space>
          </Card>
        </Col>
      </Row>

      <Card title="Statistikat e Tiketave">
        <Row gutter={16}>
          {ticketStats.slice(0, 4).map((ticket, index) => (
            <Col span={6} key={index}>
              <Card>
                <Statistic title={ticket.type} value={ticket.count} />
              </Card>
            </Col>
          ))}
        </Row>
      </Card>
    </Space>
  );
};

export default DashboardCharts;
