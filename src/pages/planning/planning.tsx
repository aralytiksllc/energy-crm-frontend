import React, { useState } from 'react';
import {
  Button,
  Drawer,
  Typography,
  Avatar,
  Card,
  Tag,
  Empty,
  DatePicker,
  Space,
  Select,
} from 'antd';
import {
  CalendarOutlined,
  PlusOutlined,
  UserOutlined,
  ProjectOutlined,
  ClockCircleOutlined,
} from '@ant-design/icons';
import { useList } from '@refinedev/core';
import { EmailField, TextField } from '@refinedev/antd';
import dayjs, { Dayjs } from 'dayjs';

// Form validation
import { Calendar, type CalendarAssignment } from '@components/calendar';
import { type IUser } from '@interfaces/users';
import { type IProject } from '@interfaces/project';
import PlanningForm from './components/planning-form';
import { createStyles } from './planning.styles';
import { mockPlanningAssignments } from './mock-data';

const { Title, Text } = Typography;

interface PlanningAssignment extends CalendarAssignment {
  projectId: string | number;
  allocatedHours: number;
}

export const Planning: React.FC = () => {
  const { styles } = createStyles();

  const [selectedDate, setSelectedDate] = useState<Dayjs>(dayjs('2025-06-01'));
  const [currentMonth, setCurrentMonth] = useState<Dayjs>(dayjs('2025-06-01'));
  const [selectedProject, setSelectedProject] = useState<number | 'all'>('all');
  const [drawerVisible, setDrawerVisible] = useState(false);
  const [formDrawerVisible, setFormDrawerVisible] = useState(false);
  const [selectedDayAssignments, setSelectedDayAssignments] = useState<
    PlanningAssignment[]
  >([]);

  const { data: usersData, isLoading: usersLoading } = useList<IUser>({
    resource: 'users',
    pagination: { mode: 'off' },
  });

  const { data: projectsData, isLoading: projectsLoading } = useList<IProject>({
    resource: 'projects',
    pagination: { mode: 'off' },
  });

  const users = usersData?.data || [];
  const projects = projectsData?.data || [];

  const filteredAssignments = mockPlanningAssignments.filter((assignment) => {
    const projectMatch =
      selectedProject === 'all' || assignment.projectId === selectedProject;
    return projectMatch;
  });

  const handleDayClick = (date: Dayjs, assignments: CalendarAssignment[]) => {
    setSelectedDayAssignments(assignments as PlanningAssignment[]);
    setDrawerVisible(true);
  };

  const handleMonthChange = (date: Dayjs | null) => {
    if (date) {
      setCurrentMonth(date);
      setSelectedDate(date);
    }
  };

  const getProjectInfo = (projectId: string | number) => {
    return projects.find((project) => project.id === projectId);
  };

  const getUserInfo = (userId: string | number) => {
    return users.find((user) => user.id === userId);
  };

  const getStatusColor = (status: string) => {
    const colors = {
      active: 'green',
      planned: 'blue',
      completed: 'default',
      cancelled: 'red',
    };
    return colors[status as keyof typeof colors] || 'default';
  };

  const getPriorityColor = (priority: string) => {
    const colors = {
      high: 'red',
      medium: 'orange',
      low: 'blue',
    };
    return colors[priority as keyof typeof colors] || 'default';
  };

  return (
    <div className={styles.planningContainer}>
      <div className={styles.pageHeader}>
        <Title level={2} className={styles.pageTitle}>
          <CalendarOutlined />
          Calendar
        </Title>
        <Button
          type="primary"
          icon={<PlusOutlined />}
          onClick={() => setFormDrawerVisible(true)}
          className={styles.createButton}
        >
          Create Planning
        </Button>
      </div>
      <div className={styles.filtersContainer}>
        <div className={styles.filterItem}>
          <Text strong style={{ marginRight: 8 }}>
            Month/Year:
          </Text>
          <DatePicker
            picker="month"
            value={currentMonth}
            onChange={handleMonthChange}
            style={{ width: '100%' }}
            format="MMMM YYYY"
          />
        </div>
        <div className={styles.filterItem}>
          <Text strong style={{ marginRight: 8 }}>
            Project:
          </Text>
          <Select
            value={selectedProject}
            onChange={setSelectedProject}
            style={{ width: '100%' }}
          >
            <Select.Option value="all">All Projects</Select.Option>
            {projects.map((project) => (
              <Select.Option key={project.id} value={project.id}>
                {project.name}
              </Select.Option>
            ))}
          </Select>
        </div>
      </div>
      <div className={styles.calendarWrapper}>
        <Calendar
          assignments={filteredAssignments}
          users={users.map((user) => ({
            ...user,
            avatar: user.avatar || undefined,
          }))}
          onDayClick={handleDayClick}
          selectedDate={selectedDate}
          onDateChange={setSelectedDate}
          loading={usersLoading || projectsLoading}
          height={800}
        />
      </div>
      <Drawer
        title={`Assignments for ${selectedDate?.format('MMMM D, YYYY')}`}
        placement="right"
        onClose={() => setDrawerVisible(false)}
        open={drawerVisible}
        width={400}
        destroyOnHidden
      >
        <div className={styles.drawerHeader}>
          <Title level={4} className={styles.drawerTitle}>
            {selectedDayAssignments.length} Assignment
            {selectedDayAssignments.length !== 1 ? 's' : ''}
          </Title>
        </div>

        {selectedDayAssignments.length === 0 ? (
          <div className={styles.emptyState}>
            <Empty description="No assignments for this day" />
          </div>
        ) : (
          selectedDayAssignments.map((assignment) => {
            const user = getUserInfo(assignment.userId);
            const project = getProjectInfo(assignment.projectId);

            return (
              <Card
                key={assignment.id}
                className={styles.assignmentCard}
                size="small"
              >
                <div className={styles.assignmentContent}>
                  <div className={styles.assignmentHeader}>
                    <Avatar
                      src={user?.avatar}
                      icon={<UserOutlined />}
                      size={32}
                      className={styles.avatar}
                    >
                      {user?.firstName?.[0]}
                      {user?.lastName?.[0]}
                    </Avatar>
                    <div>
                      <Text strong>
                        {user
                          ? `${user.firstName} ${user.lastName}`
                          : 'Unknown User'}
                      </Text>
                      <br />
                      <EmailField value={user?.email} />
                    </div>
                  </div>

                  <div className={styles.assignmentMeta}>
                    <Space
                      direction="vertical"
                      size="small"
                      style={{ width: '100%' }}
                    >
                      <div>
                        <ProjectOutlined style={{ marginRight: 4 }} />
                        <TextField value={project?.name || 'Unknown Project'} />
                      </div>

                      <div>
                        <ClockCircleOutlined style={{ marginRight: 4 }} />
                        <Text>{assignment.allocatedHours} hours</Text>
                      </div>

                      <div>
                        <Text type="secondary">
                          {assignment.startDate === assignment.endDate
                            ? dayjs(assignment.startDate).format('MMM D, YYYY')
                            : `${dayjs(assignment.startDate).format('MMM D')} - ${dayjs(assignment.endDate).format('MMM D, YYYY')}`}
                        </Text>
                      </div>

                      {assignment.notes && (
                        <div>
                          <Text type="secondary" style={{ fontSize: '12px' }}>
                            {assignment.notes}
                          </Text>
                        </div>
                      )}
                    </Space>
                  </div>

                  <div className={styles.assignmentTags}>
                    <Tag color={getStatusColor(assignment.status || 'planned')}>
                      {assignment.status?.toUpperCase() || 'PLANNED'}
                    </Tag>
                    <Tag
                      color={getPriorityColor(assignment.priority || 'medium')}
                    >
                      {assignment.priority?.toUpperCase() || 'MEDIUM'} PRIORITY
                    </Tag>
                  </div>
                </div>
              </Card>
            );
          })
        )}
      </Drawer>
      <Drawer
        title="Create Planning"
        placement="right"
        onClose={() => setFormDrawerVisible(false)}
        open={formDrawerVisible}
        width={500}
        destroyOnHidden
        className={styles.formDrawer}
      >
        <PlanningForm onSuccess={() => setFormDrawerVisible(false)} />
      </Drawer>
    </div>
  );
};

export default Planning;
