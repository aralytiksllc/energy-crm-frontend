import React, { useMemo } from 'react';
import { Card, Row, Col, Typography, Empty, message } from 'antd';
import { Pie } from '@ant-design/charts';
import type { Task } from '@/interfaces/task';
import type { ProjectSummary } from '../../projects/api/projects';
import type { Customer } from '../../customers/types/customer.types';
import dayjs, { type Dayjs } from 'dayjs';
import { useDashboardStyles } from '../dashboard.styles';

const { Title, Text } = Typography;

// Chart data interface
interface ChartDataItem {
  type: string;
  value: number;
}

// Chart click event data interface
interface ChartClickData {
  type: string;
  value: number;
}

// Chart configuration interface
interface ChartConfig {
  data: ChartDataItem[];
  angleField: string;
  colorField: string;
  radius: number;
  innerRadius: number;
  appendPadding: number[];
  width: number;
  height: number;
  label: {
    offset: string;
    autoHide?: boolean;
    content: (params: { percent: number }) => string;
    style: {
      fontSize: number;
      fontWeight: string;
      textAlign: string;
      fill: string;
    };
  };
  tooltip: {
    title: string;
    formatter: (datum: ChartTooltipDatum) => {
      name: string;
      value: string;
    };
  };
  legend: {
    color: {
      title: boolean;
      position: string;
      layout: string;
      maxItemWidth: number;
      itemName: {
        style: {
          fontSize: number;
          fontWeight: string;
        };
        formatter: (text: string, item: unknown) => string;
      };
    };
  };
  statistic: {
    title: {
      style: {
        whiteSpace: string;
        overflow: string;
        textOverflow: string;
        fontSize: string;
        fontWeight: string;
        color: string;
      };
      content: string;
    };
    content: {
      style: {
        whiteSpace: string;
        overflow: string;
        textOverflow: string;
        fontSize: string;
        fontWeight: string;
        color: string;
      };
      content: string;
    };
  };
  onElementClick: (evt: ChartClickEvent) => void;
  color?: string[];
}

// Chart tooltip datum interface
interface ChartTooltipDatum {
  type?: string;
  value?: number;
  data?: {
    type?: string;
    value?: number;
  };
}

// Chart click event interface
interface ChartClickEvent {
  data: ChartClickData;
}

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

  // Chart data calculations with useMemo optimization
  const chartData = useMemo(() => {
    const getTaskStage = (task: Task): string => {
      if (task.isCompleted) return 'COMPLETED';
      return 'TODO';
    };

    const filteredTasks = tasks.filter((task) => {
      if (!dateRange?.startDate || !dateRange?.endDate) return true;
      const taskDate = dayjs(task.createdAt);
      return (
        taskDate.isAfter(dateRange.startDate) &&
        taskDate.isBefore(dateRange.endDate)
      );
    });

    // Ensure we have data
    if (!tasks || tasks.length === 0) {
      return {
        tasksByClient: [],
        tasksByProject: [],
        tasksByType: [],
        tasksByPriority: [],
        tasksByStage: [],
      };
    }

    // Tasks by Client (through project)
    const clientTaskCounts = new Map<string, number>();
    filteredTasks.forEach((task) => {
      const clientName =
        customers.find(
          (c) =>
            projects.find((p) => p.id === task.projectId)?.customerId === c.id,
        )?.name || 'Unknown Client';
      clientTaskCounts.set(
        clientName,
        (clientTaskCounts.get(clientName) || 0) + 1,
      );
    });

    // Tasks by Project
    const projectTaskCounts = new Map<string, number>();
    filteredTasks.forEach((task) => {
      const projectName =
        projects.find((p) => p.id === task.projectId)?.name ||
        'Unknown Project';
      projectTaskCounts.set(
        projectName,
        (projectTaskCounts.get(projectName) || 0) + 1,
      );
    });

    // Tasks by Type
    const typeTaskCounts = new Map<string, number>();
    filteredTasks.forEach((task) => {
      typeTaskCounts.set(task.type, (typeTaskCounts.get(task.type) || 0) + 1);
    });

    // Tasks by Priority
    const priorityTaskCounts = new Map<string, number>();
    filteredTasks.forEach((task) => {
      const priority = task.priority || 'MEDIUM';
      priorityTaskCounts.set(
        priority,
        (priorityTaskCounts.get(priority) || 0) + 1,
      );
    });

    // Tasks by Stage
    const stageTaskCounts = new Map<string, number>();
    filteredTasks.forEach((task) => {
      const stage = getTaskStage(task);
      stageTaskCounts.set(stage, (stageTaskCounts.get(stage) || 0) + 1);
    });

    const result = {
      tasksByClient: Array.from(clientTaskCounts.entries()).map(
        ([type, value]) => ({ type, value }),
      ),
      tasksByProject: Array.from(projectTaskCounts.entries()).map(
        ([type, value]) => ({ type, value }),
      ),
      tasksByType: Array.from(typeTaskCounts.entries()).map(
        ([type, value]) => ({ type, value }),
      ),
      tasksByPriority: Array.from(priorityTaskCounts.entries()).map(
        ([type, value]) => ({ type, value }),
      ),
      tasksByStage: Array.from(stageTaskCounts.entries()).map(
        ([type, value]) => ({ type, value }),
      ),
    };

    return result;
  }, [tasks, customers, projects, dateRange]);

  // Click handlers for each chart
  const handleClientClick = (data: ChartClickData): void => {
    message.info(`Clicked on client: ${data.type} (${data.value} tasks)`);
  };

  const handleProjectClick = (data: ChartClickData): void => {
    message.info(`Clicked on project: ${data.type} (${data.value} tasks)`);
  };

  const handleTypeClick = (data: ChartClickData): void => {
    message.info(`Clicked on type: ${data.type} (${data.value} tasks)`);
  };

  const handlePriorityClick = (data: ChartClickData): void => {
    message.info(`Clicked on priority: ${data.type} (${data.value} tasks)`);
  };

  const handleStageClick = (data: ChartClickData): void => {
    message.info(`Clicked on stage: ${data.type} (${data.value} tasks)`);
  };

  // Large chart configuration (for first 2 charts)
  const getLargeChartConfig = (
    data: ChartDataItem[],
    colors?: string[],
    onElementClick?: (data: ChartClickData) => void,
  ): ChartConfig => {
    const totalTasks = data.reduce((sum, item) => sum + item.value, 0);

    return {
      data,
      angleField: 'value',
      colorField: 'type',
      radius: 0.65,
      innerRadius: 0.4,
      appendPadding: [10, 100, 10, 10],
      width: 600,
      height: 400,
      label: {
        offset: '-10%',
        autoHide: false,
        content: ({ percent }: { percent: number }) =>
          `${(percent * 100).toFixed(1)}%`,
        style: {
          fontSize: 10,
          fontWeight: 'bold',
          textAlign: 'center',
          fill: '#fff',
        },
      },
      tooltip: {
        title: 'type',
        formatter: (datum: ChartTooltipDatum) => {
          const name = datum.type || datum.data?.type || 'Unknown';
          const count = datum.value || datum.data?.value || 0;
          const percentage =
            totalTasks > 0 ? ((count / totalTasks) * 100).toFixed(1) : '0.0';
          return {
            name: name,
            value: `${count} task${count !== 1 ? 's' : ''} (${percentage}%)`,
          };
        },
      },
      legend: {
        color: {
          title: false,
          position: 'right',
          layout: 'vertical',
          maxItemWidth: 120,
          itemName: {
            style: {
              fontSize: 11,
              fontWeight: '500',
            },
            formatter: (text: string) => {
              const dataItem = data.find((d) => d.type === text);
              const count = dataItem?.value || 0;
              const shortText =
                text.length > 15 ? text.substring(0, 15) + '...' : text;
              return `${shortText}: ${count}`;
            },
          },
        },
      },
      statistic: {
        title: {
          style: {
            whiteSpace: 'pre-wrap',
            overflow: 'hidden',
            textOverflow: 'ellipsis',
            fontSize: '16px',
            fontWeight: 'bold',
            color: '#262626',
          },
          content: 'Total',
        },
        content: {
          style: {
            whiteSpace: 'pre-wrap',
            overflow: 'hidden',
            textOverflow: 'ellipsis',
            fontSize: '32px',
            fontWeight: 'bold',
            color: '#1890ff',
          },
          content: `${totalTasks}`,
        },
      },
      onElementClick: (evt: ChartClickEvent) => {
        const { data: clickData } = evt;
        if (onElementClick && clickData) {
          onElementClick(clickData);
        }
      },
      ...(colors && { color: colors }),
    };
  };

  // Small chart configuration (for last 3 charts)
  const getSmallChartConfig = (
    data: ChartDataItem[],
    colors?: string[],
    onElementClick?: (data: ChartClickData) => void,
  ): ChartConfig => {
    const totalTasks = data.reduce((sum, item) => sum + item.value, 0);

    return {
      data,
      angleField: 'value',
      colorField: 'type',
      radius: 0.75,
      innerRadius: 0.4,
      appendPadding: [5, 80, 5, 5],
      width: 400,
      height: 300,
      label: {
        offset: '-15%',
        content: ({ percent }: { percent: number }) =>
          `${(percent * 100).toFixed(1)}%`,
        style: {
          fontSize: 9,
          fontWeight: 'bold',
          textAlign: 'center',
          fill: '#fff',
        },
      },
      tooltip: {
        title: 'type',
        formatter: (datum: ChartTooltipDatum) => {
          const name = datum.type || datum.data?.type || 'Unknown';
          const count = datum.value || datum.data?.value || 0;
          const percentage =
            totalTasks > 0 ? ((count / totalTasks) * 100).toFixed(1) : '0.0';
          return {
            name: name,
            value: `${count} task${count !== 1 ? 's' : ''} (${percentage}%)`,
          };
        },
      },
      legend: {
        color: {
          title: false,
          position: 'right',
          layout: 'vertical',
          maxItemWidth: 100,
          itemName: {
            style: {
              fontSize: 10,
              fontWeight: '500',
            },
            formatter: (text: string) => {
              const dataItem = data.find((d) => d.type === text);
              const count = dataItem?.value || 0;
              const shortText =
                text.length > 12 ? text.substring(0, 12) + '...' : text;
              return `${shortText}: ${count}`;
            },
          },
        },
      },
      statistic: {
        title: {
          style: {
            whiteSpace: 'pre-wrap',
            overflow: 'hidden',
            textOverflow: 'ellipsis',
            fontSize: '14px',
            fontWeight: 'bold',
            color: '#262626',
          },
          content: 'Total',
        },
        content: {
          style: {
            whiteSpace: 'pre-wrap',
            overflow: 'hidden',
            textOverflow: 'ellipsis',
            fontSize: '28px',
            fontWeight: 'bold',
            color: '#1890ff',
          },
          content: `${totalTasks}`,
        },
      },
      onElementClick: (evt: ChartClickEvent) => {
        const { data: clickData } = evt;
        if (onElementClick && clickData) {
          onElementClick(clickData);
        }
      },
      ...(colors && { color: colors }),
    };
  };

  // Chart configurations - First 2 charts use large config
  const clientChartConfig = getLargeChartConfig(
    chartData.tasksByClient,
    [
      '#5B8FF9',
      '#5AD8A6',
      '#5D7092',
      '#F6BD16',
      '#E86452',
      '#6F5EF9',
      '#6DC8EC',
      '#945FB9',
      '#FF9845',
      '#1E9493',
    ],
    handleClientClick,
  );

  const projectChartConfig = getLargeChartConfig(
    chartData.tasksByProject,
    [
      '#5B8FF9',
      '#5AD8A6',
      '#5D7092',
      '#F6BD16',
      '#E86452',
      '#6F5EF9',
      '#6DC8EC',
      '#945FB9',
      '#FF9845',
      '#1E9493',
    ],
    handleProjectClick,
  );

  // Last 3 charts use small config
  const typeChartConfig = getSmallChartConfig(
    chartData.tasksByType,
    [
      '#5B8FF9',
      '#5AD8A6',
      '#5D7092',
      '#F6BD16',
      '#E86452',
      '#6F5EF9',
      '#6DC8EC',
      '#945FB9',
      '#FF9845',
      '#1E9493',
    ],
    handleTypeClick,
  );

  const priorityChartConfig = getSmallChartConfig(
    chartData.tasksByPriority,
    ['#52c41a', '#faad14', '#fa8c16', '#f5222d'],
    handlePriorityClick,
  );

  const stageChartConfig = getSmallChartConfig(
    chartData.tasksByStage,
    ['#d9d9d9', '#faad14', '#52c41a', '#f5222d'],
    handleStageClick,
  );

  // Render chart or empty state
  const renderChart = (config: ChartConfig, height: number): JSX.Element => {
    if (!config.data || config.data.length === 0) {
      return <Empty description="No data available" />;
    }

    try {
      return (
        <div
          style={{
            height,
            cursor: 'pointer',
            width: '100%',
            display: 'flex',
            justifyContent: 'center',
            alignItems: 'center',
            overflow: 'hidden',
          }}
        >
          <Pie {...config} />
        </div>
      );
    } catch (error) {
      return <Empty description="Chart failed to render" />;
    }
  };

  return (
    <div>
      {/* Charts Section */}
      <Row gutter={[24, 24]} style={{ marginBottom: 32 }}>
        {/* Tasks by Client */}
        <Col span={12}>
          <Card
            title={
              <div>
                <Title level={4} className={styles.chartTitle}>
                  Tasks by Client
                </Title>
                <Text className={styles.chartSubtitle}>
                  Distribution of tasks across clients (click to view details)
                </Text>
              </div>
            }
            className={styles.chartCard}
            bodyStyle={{ padding: '20px 24px' }}
          >
            {renderChart(clientChartConfig, 320)}
          </Card>
        </Col>

        {/* Tasks by Project */}
        <Col span={12}>
          <Card
            title={
              <div>
                <Title level={4} className={styles.chartTitle}>
                  Tasks by Project
                </Title>
                <Text className={styles.chartSubtitle}>
                  Task distribution per project (click to view details)
                </Text>
              </div>
            }
            className={styles.chartCard}
            bodyStyle={{ padding: '20px 24px' }}
          >
            {renderChart(projectChartConfig, 320)}
          </Card>
        </Col>
      </Row>

      <Row gutter={[24, 24]} style={{ marginBottom: 32 }}>
        {/* Tasks by Type */}
        <Col span={8}>
          <Card
            title={
              <div>
                <Title level={4} className={styles.chartTitle}>
                  Tasks by Type
                </Title>
                <Text className={styles.chartSubtitle}>
                  Task type distribution (click to view details)
                </Text>
              </div>
            }
            className={styles.chartCard}
            bodyStyle={{ padding: '20px 24px' }}
          >
            {renderChart(typeChartConfig, 300)}
          </Card>
        </Col>

        {/* Tasks by Priority */}
        <Col span={8}>
          <Card
            title={
              <div>
                <Title level={4} className={styles.chartTitle}>
                  Tasks by Priority
                </Title>
                <Text className={styles.chartSubtitle}>
                  Priority distribution (click to view details)
                </Text>
              </div>
            }
            className={styles.chartCard}
            bodyStyle={{ padding: '20px 24px' }}
          >
            {renderChart(priorityChartConfig, 300)}
          </Card>
        </Col>

        {/* Tasks by Stage */}
        <Col span={8}>
          <Card
            title={
              <div>
                <Title level={4} className={styles.chartTitle}>
                  Tasks by Stage
                </Title>
                <Text className={styles.chartSubtitle}>
                  Task completion stages (click to view details)
                </Text>
              </div>
            }
            className={styles.chartCard}
            bodyStyle={{ padding: '20px 24px' }}
          >
            {renderChart(stageChartConfig, 300)}
          </Card>
        </Col>
      </Row>
    </div>
  );
};

export default DashboardCharts;
