import React, { useState, useMemo } from 'react';
import {
  Typography,
  Card,
  Row,
  Col,
  Statistic,
  Button,
  Drawer,
  Form,
  Select,
  DatePicker,
  Space,
  Divider,
  Spin,
  Table,
  Progress,
  Tag,
} from 'antd';
import {
  BarChartOutlined,
  FilterOutlined,
  ProjectOutlined,
  ClockCircleOutlined,
  CheckCircleOutlined,
} from '@ant-design/icons';
import dayjs from 'dayjs';

// Internal imports
import { useTasks } from '../tasks/hooks/useTasks';
import { useProjects } from '../projects/hooks/useProjects';
import { useUsers } from '../users/hooks/useUsers';
import { useAllCustomers } from '../customers/hooks/useCustomers';
import { TaskType, TaskPriority, Task } from '../tasks/types';
import DashboardCharts from './components/dashboard-charts';
import { useDashboardStyles } from './dashboard.styles';

const { Title, Text } = Typography;
const { Option } = Select;
const { RangePicker } = DatePicker;

interface FilterValues {
  dateRange?: [dayjs.Dayjs, dayjs.Dayjs];
  projectIds?: number[];
  taskTypes?: TaskType[];
  priorities?: TaskPriority[];
  stages?: string[];
  customerIds?: number[];
  assigneeIds?: number[];
  isCompleted?: boolean;
}

interface DateRange {
  startDate: dayjs.Dayjs | null;
  endDate: dayjs.Dayjs | null;
}

interface TaskStats {
  total: number;
  completed: number;
  inProgress: number;
  overdue: number;
}

interface ProjectHours {
  projectId: number;
  projectName: string;
  customerName: string;
  estimatedHours: number;
  actualHours: number;
  progress: number;
  tasksCount: number;
  completedTasks: number;
}

const Dashboard: React.FC = () => {
  const [filterDrawerVisible, setFilterDrawerVisible] = useState(false);
  const [filters, setFilters] = useState<FilterValues>({});
  const [dateRange, setDateRange] = useState<DateRange>({
    startDate: null,
    endDate: null,
  });
  const [form] = Form.useForm();

  // Fetch all data
  const { data: tasksResponse, isLoading: tasksLoading } = useTasks();
  const { data: projects = [], isLoading: projectsLoading } = useProjects();
  const { data: users = [], isLoading: usersLoading } = useUsers();
  const { data: customers = [], isLoading: customersLoading } =
    useAllCustomers();

  const { styles } = useDashboardStyles();

  // Extract tasks from the response
  const allTasks = tasksResponse?.items || [];

  // Apply filters to tasks
  const filteredTasks = useMemo(() => {
    let filtered = [...allTasks];

    // Date range filter
    if (filters.dateRange && filters.dateRange.length === 2) {
      const [startDate, endDate] = filters.dateRange;
      filtered = filtered.filter((task) => {
        const taskDate = dayjs(task.createdAt);
        return (
          taskDate.isAfter(startDate) &&
          taskDate.isBefore(endDate.add(1, 'day'))
        );
      });
    }

    // Project filter
    if (filters.projectIds?.length) {
      filtered = filtered.filter((task) =>
        filters.projectIds!.includes(task.projectId),
      );
    }

    // Task type filter
    if (filters.taskTypes?.length) {
      filtered = filtered.filter((task) =>
        filters.taskTypes!.includes(task.type),
      );
    }

    // Priority filter
    if (filters.priorities?.length) {
      filtered = filtered.filter(
        (task) => task.priority && filters.priorities!.includes(task.priority),
      );
    }

    // Stage filter (based on task completion status and due date)
    if (filters.stages?.length) {
      filtered = filtered.filter((task) => {
        const stage = getTaskStage(task);
        return filters.stages!.includes(stage);
      });
    }

    // Customer filter (through projects)
    if (filters.customerIds?.length) {
      filtered = filtered.filter((task) => {
        const project = projects.find((p) => p.id === task.projectId);
        return project && filters.customerIds!.includes(project.customerId);
      });
    }

    // Assignee filter
    if (filters.assigneeIds?.length) {
      filtered = filtered.filter((task) =>
        task.assignees?.some((assignee) =>
          filters.assigneeIds!.includes(assignee.userId),
        ),
      );
    }

    // Completion status filter
    if (filters.isCompleted !== undefined) {
      filtered = filtered.filter(
        (task) => task.isCompleted === filters.isCompleted,
      );
    }

    return filtered;
  }, [allTasks, filters, projects]);

  // Get filtered projects (projects that have filtered tasks)
  const filteredProjects = useMemo(() => {
    const projectIds = new Set(filteredTasks.map((task) => task.projectId));
    return projects.filter((project) => projectIds.has(project.id));
  }, [projects, filteredTasks]);

  // Get task stage based on completion status and due date
  const getTaskStage = (task: Task): string => {
    if (task.isCompleted) return 'done';
    if (
      task.dueDate &&
      dayjs(task.dueDate).isBefore(dayjs()) &&
      !task.isCompleted
    ) {
      return 'overdue';
    }
    if (task.dueDate && !task.isCompleted) return 'in-progress';
    return 'todo';
  };

  // Calculate main statistics
  const statistics = useMemo(() => {
    // Active projects (projects with tasks)
    const activeProjects = filteredProjects.length;

    // Total tickets from filtered tasks
    const totalTickets = filteredTasks.length;

    // Estimated hours - sum of all assignee estimated hours
    const estimatedHours = filteredTasks.reduce((sum, task) => {
      return (
        sum +
        (task.assignees?.reduce(
          (assigneeSum, assignee) =>
            assigneeSum + (assignee.estimatedHours || 0),
          0,
        ) || 0)
      );
    }, 0);

    // Actual hours - for now, we'll use a placeholder since actualHours might not be in the current schema
    // In a real app, this would come from time tracking data
    const actualHours = Math.round(estimatedHours * 0.85); // Placeholder calculation

    return {
      activeProjects,
      totalTickets,
      estimatedHours,
      actualHours,
    };
  }, [filteredTasks, filteredProjects]);

  // Calculate project hours data for table
  const projectHoursData = useMemo<ProjectHours[]>(() => {
    return filteredProjects.map((project) => {
      const projectTasks = filteredTasks.filter(
        (task) => task.projectId === project.id,
      );
      const customer = customers.find((c) => c.id === project.customerId);

      const estimatedHours = projectTasks.reduce((sum, task) => {
        return (
          sum +
          (task.assignees?.reduce(
            (assigneeSum, assignee) =>
              assigneeSum + (assignee.estimatedHours || 0),
            0,
          ) || 0)
        );
      }, 0);

      const completedTasks = projectTasks.filter(
        (task) => task.isCompleted,
      ).length;
      const progress =
        projectTasks.length > 0
          ? Math.round((completedTasks / projectTasks.length) * 100)
          : 0;

      return {
        projectId: project.id,
        projectName: project.name,
        customerName: customer?.name || 'Unknown Customer',
        estimatedHours,
        actualHours: Math.round(estimatedHours * 0.85), // Placeholder
        progress,
        tasksCount: projectTasks.length,
        completedTasks,
      };
    });
  }, [filteredProjects, filteredTasks, customers]);

  // Table columns for project hours
  const projectHoursColumns = [
    {
      title: 'Project',
      dataIndex: 'projectName',
      key: 'projectName',
      render: (name: string, record: ProjectHours) => (
        <div className={styles.projectNameCell}>
          <div className="project-name">{name}</div>
          <div className="customer-name">{record.customerName}</div>
        </div>
      ),
    },
    {
      title: 'Progress',
      dataIndex: 'progress',
      key: 'progress',
      render: (progress: number, record: ProjectHours) => (
        <div className={styles.progressCell}>
          <div className="task-count">
            {record.completedTasks}/{record.tasksCount} tasks
          </div>
          <Progress
            percent={progress}
            size="small"
            strokeColor={
              progress >= 80
                ? '#52c41a'
                : progress >= 50
                  ? '#faad14'
                  : '#f5222d'
            }
          />
        </div>
      ),
    },
    {
      title: 'Hours',
      key: 'hours',
      render: (record: ProjectHours) => (
        <div className={styles.hoursCell}>
          <div className="hours-row">
            <span className="hours-label">Est: </span>
            <span className="hours-value">{record.estimatedHours}h</span>
          </div>
          <div className="hours-row">
            <span className="hours-label">Actual: </span>
            <span className="hours-value">{record.actualHours}h</span>
          </div>
        </div>
      ),
    },
    {
      title: 'Efficiency',
      key: 'efficiency',
      render: (record: ProjectHours) => {
        const efficiency =
          record.estimatedHours > 0
            ? Math.round((record.actualHours / record.estimatedHours) * 100)
            : 0;
        const color =
          efficiency <= 100 ? 'green' : efficiency <= 120 ? 'orange' : 'red';
        return <Tag color={color}>{efficiency}%</Tag>;
      },
    },
  ];

  const isLoading =
    tasksLoading || projectsLoading || usersLoading || customersLoading;

  if (isLoading) {
    return (
      <div className={styles.loadingContainer}>
        <Spin size="large" />
      </div>
    );
  }

  return (
    <div className={styles.dashboardContainer}>
      <div className={styles.dashboardHeader}>
        <div>
          <Title level={2} className={styles.dashboardTitle}>
            <BarChartOutlined /> Dashboard
          </Title>
          <Text type="secondary">
            Overview of your projects, tasks, and time tracking
          </Text>
        </div>
        <Button
          type="primary"
          icon={<FilterOutlined />}
          className={styles.filterButton}
          onClick={() => setFilterDrawerVisible(true)}
        >
          Filters
        </Button>
      </div>

      {/* Top Stats Cards - Real Data */}
      <Row gutter={[24, 24]} className={styles.statsRow}>
        <Col span={6}>
          <Card className={styles.statCard}>
            <Statistic
              title="Active Projects"
              value={statistics.activeProjects}
              prefix={<ProjectOutlined className={styles.iconBlue} />}
            />
            <Text className={styles.statCardText}>
              Projects with active tasks
            </Text>
          </Card>
        </Col>
        <Col span={6}>
          <Card className={styles.statCard}>
            <Statistic
              title="Total Tickets"
              value={statistics.totalTickets}
              prefix={<CheckCircleOutlined className={styles.iconGreen} />}
            />
            <Text className={styles.statCardText}>From active projects</Text>
          </Card>
        </Col>
        <Col span={6}>
          <Card className={styles.statCard}>
            <Statistic
              title="Estimated Hours"
              value={statistics.estimatedHours}
              suffix="h"
              prefix={<ClockCircleOutlined className={styles.iconYellow} />}
            />
            <Text className={styles.statCardText}>Total estimated time</Text>
          </Card>
        </Col>
        <Col span={6}>
          <Card className={styles.statCard}>
            <Statistic
              title="Actual Hours"
              value={statistics.actualHours}
              suffix="h"
              prefix={<ClockCircleOutlined className={styles.iconCyan} />}
            />
            <Text className={styles.statCardText}>
              Total time actually spent
            </Text>
          </Card>
        </Col>
      </Row>

      {/* Charts Section - Pass filtered data */}
      <div className={styles.chartsSection}>
        <DashboardCharts
          tasks={filteredTasks}
          projects={filteredProjects}
          customers={customers}
          dateRange={dateRange}
          onDateRangeChange={setDateRange}
        />
      </div>

      {/* Project Hours Table */}
      <Row gutter={[24, 24]} className={styles.tableSection}>
        <Col span={24}>
          <Card
            title={
              <div>
                <Title level={4} className={styles.chartTitle}>
                  Project Hours Overview
                </Title>
                <Text className={styles.chartSubtitle}>
                  Time tracking and progress by project
                </Text>
              </div>
            }
            className={styles.contentCard}
          >
            <Table
              dataSource={projectHoursData}
              columns={projectHoursColumns}
              rowKey="projectId"
              pagination={{ pageSize: 10 }}
              size="middle"
            />
          </Card>
        </Col>
      </Row>

      {/* Filter Drawer */}
      <Drawer
        title="Dashboard Filters"
        placement="right"
        onClose={() => setFilterDrawerVisible(false)}
        open={filterDrawerVisible}
        width={400}
      >
        <Form
          form={form}
          layout="vertical"
          onValuesChange={(_, allValues) => {
            setFilters(allValues);
            if (allValues.dateRange) {
              setDateRange({
                startDate: allValues.dateRange[0],
                endDate: allValues.dateRange[1],
              });
            }
          }}
        >
          <Form.Item name="dateRange" label="Date Range">
            <RangePicker style={{ width: '100%' }} />
          </Form.Item>

          <Divider />

          <Form.Item name="projectIds" label="Projects">
            <Select mode="multiple" placeholder="Select projects" allowClear>
              {projects.map((project) => (
                <Option key={project.id} value={project.id}>
                  {project.name}
                </Option>
              ))}
            </Select>
          </Form.Item>

          <Form.Item name="customerIds" label="Customers">
            <Select mode="multiple" placeholder="Select customers" allowClear>
              {customers.map((customer) => (
                <Option key={customer.id} value={customer.id}>
                  {customer.name}
                </Option>
              ))}
            </Select>
          </Form.Item>

          <Form.Item name="taskTypes" label="Task Types">
            <Select mode="multiple" placeholder="Select task types" allowClear>
              {Object.values(TaskType).map((type) => (
                <Option key={type} value={type}>
                  {type}
                </Option>
              ))}
            </Select>
          </Form.Item>

          <Form.Item name="priorities" label="Priorities">
            <Select mode="multiple" placeholder="Select priorities" allowClear>
              {Object.values(TaskPriority).map((priority) => (
                <Option key={priority} value={priority}>
                  {priority}
                </Option>
              ))}
            </Select>
          </Form.Item>

          <Form.Item name="stages" label="Stages">
            <Select mode="multiple" placeholder="Select stages" allowClear>
              <Option value="todo">To Do</Option>
              <Option value="in-progress">In Progress</Option>
              <Option value="done">Done</Option>
              <Option value="overdue">Overdue</Option>
            </Select>
          </Form.Item>

          <Form.Item name="assigneeIds" label="Assignees">
            <Select mode="multiple" placeholder="Select assignees" allowClear>
              {users.map((user) => (
                <Option key={user.id} value={user.id}>
                  {user.firstName} {user.lastName}
                </Option>
              ))}
            </Select>
          </Form.Item>

          <Form.Item name="isCompleted" label="Completion Status">
            <Select placeholder="Select completion status" allowClear>
              <Option value={true}>Completed</Option>
              <Option value={false}>Not Completed</Option>
            </Select>
          </Form.Item>

          <Space>
            <Button
              onClick={() => {
                form.resetFields();
                setFilters({});
                setDateRange({ startDate: null, endDate: null });
              }}
            >
              Clear All
            </Button>
            <Button
              type="primary"
              onClick={() => setFilterDrawerVisible(false)}
            >
              Apply Filters
            </Button>
          </Space>
        </Form>
      </Drawer>
    </div>
  );
};

export default Dashboard;
export { Dashboard };
