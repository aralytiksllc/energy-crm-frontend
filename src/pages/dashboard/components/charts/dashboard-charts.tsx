import React, { useMemo } from 'react';
import { Row, Col, Card, Statistic, Space } from 'antd';
import { Pie } from '@ant-design/plots';
import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
  ResponsiveContainer,
  LabelList,
} from 'recharts';
import {
  TeamOutlined,
  ProjectOutlined,
  ClockCircleOutlined,
  CheckCircleOutlined,
  ArrowUpOutlined,
  ArrowDownOutlined,
} from '@ant-design/icons';
import type { Task } from '@interfaces/task';
import type { IProject } from '@interfaces/project';
import type { ICustomer } from '@interfaces/customer';
import { type Dayjs } from 'dayjs';
import { useDashboardStyles } from '@modules/dashboard/dashboard.styles';
import WordWrapLabel from '@components/charts/WordWrapLabel';

interface DateRange {
  startDate: Dayjs | null;
  endDate: Dayjs | null;
}

interface DashboardChartsProps {
  tasks: Task[];
  projects: IProject[];
  customers: ICustomer[];
  dateRange?: DateRange;
  onDateRangeChange?: (dates: DateRange) => void;
}

export const DashboardCharts: React.FC<DashboardChartsProps> = ({
  tasks,
  projects,
  customers,
}) => {
  const { styles, cx } = useDashboardStyles();

  const renderCustomLegend = (props: any) => {
    const { payload } = props;

    return (
      <div className={styles.legendWrapper}>
        {payload.map((entry: any, index: number) => (
          <div key={`item-${index}`} className={styles.legendItem}>
            <div
              className={cx(
                styles.legendColorBox,
                styles.legendColorBoxEnhanced,
              )}
              style={{ backgroundColor: entry.color }}
            />
            <span className={styles.legendLabel}>{entry.value}</span>
          </div>
        ))}
      </div>
    );
  };

  const stats = useMemo(() => {
    const activeProjects = projects.length;

    const plannedHours = tasks.reduce((sum, task) => {
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

    const uniqueCustomerIds = new Set(projects.map((p) => p.customerId));
    const totalClients = uniqueCustomerIds.size;

    return {
      totalClients,
      totalProjects: activeProjects,
      plannedHours,
      workedHours,
    };
  }, [tasks, projects]);

  const hoursByClient = useMemo(() => {
    if (!tasks || !projects || !customers) {
      return [];
    }

    const customerHours = new Map<string, number>();

    projects.forEach((project) => {
      const customer = customers.find((c) => c.id === project.customerId);
      const customerName = customer?.name || 'Unknown Customer';

      const projectTasks = tasks.filter(
        (task) => task.projectId === project.id,
      );
      const hours = projectTasks.reduce((sum, task) => {
        return (
          sum +
          (task.assignees?.reduce(
            (assigneeSum, assignee) =>
              assigneeSum + (assignee.estimatedHours || 0),
            0,
          ) || 0)
        );
      }, 0);

      customerHours.set(
        customerName,
        (customerHours.get(customerName) || 0) + hours,
      );
    });

    return Array.from(customerHours.entries())
      .map(([type, value]) => ({ type, value }))
      .sort((a, b) => b.value - a.value)
      .slice(0, 5);
  }, [tasks, projects, customers]);

  const hoursByProject = useMemo(() => {
    const mockData = [
      {
        name: 'E-Commerce Platform',
        plannedHours: 480,
        actualHours: 520,
        totalHours: 1000,
      },
      {
        name: 'Mobile App Development for Global Launch',
        plannedHours: 350,
        actualHours: 380,
        totalHours: 730,
      },
      {
        name: 'Data Migration Project',
        plannedHours: 280,
        actualHours: 320,
        totalHours: 600,
      },
      {
        name: 'Website Redesign',
        plannedHours: 200,
        actualHours: 180,
        totalHours: 380,
      },
      {
        name: 'API Integration',
        plannedHours: 150,
        actualHours: 170,
        totalHours: 320,
      },
    ];

    return mockData;
  }, []);

  return (
    <Space direction="vertical" size="large" className={styles.fullWidth}>
      <Row gutter={16}>
        <Col span={6}>
          <Card bordered>
            <Space>
              <TeamOutlined
                className={cx(styles.statIcon, styles.statIconPrimary)}
              />
              <Statistic
                title="Klientë Aktivë"
                value={stats.totalClients}
                className={styles.statValueTrendUp}
                prefix={<ArrowUpOutlined />}
              />
            </Space>
          </Card>
        </Col>

        <Col span={6}>
          <Card bordered>
            <Space>
              <ProjectOutlined
                className={cx(styles.statIcon, styles.statIconSuccess)}
              />
              <Statistic
                title="Projekte Aktive"
                value={stats.totalProjects}
                className={styles.statValueTrendUp}
                prefix={<ArrowUpOutlined />}
              />
            </Space>
          </Card>
        </Col>

        <Col span={6}>
          <Card bordered>
            <Space>
              <ClockCircleOutlined
                className={cx(styles.statIcon, styles.statIconWarning)}
              />
              <Statistic
                title="Ore të Planifikuara"
                value={stats.plannedHours}
                suffix="h"
                className={styles.statValueTrendUp}
                prefix={<ArrowUpOutlined />}
              />
            </Space>
          </Card>
        </Col>

        <Col span={6}>
          <Card bordered>
            <Space>
              <CheckCircleOutlined
                className={cx(styles.statIcon, styles.statIconInfo)}
              />
              <Statistic
                title="Ore të Punësuara"
                value={stats.workedHours}
                suffix="h"
                className={styles.statValueTrendDown}
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
              label={{
                content: ({
                  type,
                  percent,
                }: {
                  type: string;
                  percent: number;
                }) => `${type}\n${(percent * 100).toFixed(1)}%`,
                style: {
                  fontSize: 12,
                  textAlign: 'center',
                  fill: 'var(--color-text-white)',
                  fontWeight: 'bold',
                },
              }}
              height={250}
              innerRadius={0.6}
            />
          </Card>
        </Col>
        <Col span={12}>
          <Card title="Top 5 projektet sipas orëve të shpenzuara">
            <div
              className={cx(
                styles.hideChartTopLine,
                styles.fullWidth,
                styles.chartContainer,
              )}
              style={{
                height: Math.max(400, hoursByProject.length * 80),
              }}
            >
              <ResponsiveContainer width="100%" height="100%">
                <BarChart
                  data={hoursByProject}
                  layout="vertical"
                  margin={{
                    top: 15,
                    right: 30,
                    left: 20,
                    bottom: 20,
                  }}
                  barGap={4}
                  barCategoryGap={80}
                >
                  <CartesianGrid
                    strokeDasharray="none"
                    stroke="var(--color-border)"
                    horizontal={true}
                    vertical={false}
                  />
                  <XAxis
                    type="number"
                    domain={[0, 'dataMax + 50']}
                    tick={{ fontSize: 12 }}
                    tickLine={true}
                    axisLine={true}
                  />
                  <YAxis
                    type="category"
                    dataKey="name"
                    tick={false}
                    axisLine={false}
                    tickLine={false}
                    width={0}
                  />
                  <Tooltip
                    cursor={false}
                    formatter={(value: number, name: string) => [
                      `${value}h`,
                      name === 'Planned' ? 'Planned Hours' : 'Actual Hours',
                    ]}
                    labelFormatter={(label: string) => `Project: ${label}`}
                    itemSorter={(item) => (item.name === 'Planned' ? -1 : 1)}
                  />
                  <Legend content={renderCustomLegend} />
                  <Bar
                    dataKey="plannedHours"
                    name="Planned"
                    fill="var(--color-chart-planned)"
                    barSize={10}
                  />
                  <Bar
                    dataKey="actualHours"
                    name="Actual"
                    fill="var(--color-chart-actual)"
                    barSize={10}
                  >
                    <LabelList
                      dataKey="name"
                      content={
                        <WordWrapLabel
                          labelHeight={40}
                          style={{
                            color: 'var(--color-text-primary)',
                            fontWeight: 600,
                            fontSize: '11px',
                            textAlign: 'left',
                          }}
                        />
                      }
                    />
                  </Bar>
                </BarChart>
              </ResponsiveContainer>
            </div>
          </Card>
        </Col>
      </Row>
    </Space>
  );
};

export default DashboardCharts;
