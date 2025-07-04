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
  Modal,
  List,
  Popconfirm,
  message,
} from 'antd';
import {
  CalendarOutlined,
  PlusOutlined,
  DeleteOutlined,
  UserOutlined,
  ProjectOutlined,
  ClockCircleOutlined,
  CheckCircleOutlined,
} from '@ant-design/icons';
import { useList, useDelete } from '@refinedev/core';
import { EmailField, TextField } from '@refinedev/antd';
import dayjs, { Dayjs } from 'dayjs';

// Form validation
import { Calendar, type CalendarAssignment } from '@components/calendar';
import { type IUser } from '@interfaces/users';
import { type IProject } from '@interfaces/project';
import { type IPlanning } from '@interfaces/planning';
import PlanningForm from './components/planning-form';
import { createStyles } from './planning.styles';

const { Title, Text } = Typography;

interface PlanningAssignment extends CalendarAssignment {
  projectId: string | number;
  title: string;
  description?: string;
  isCompleted: boolean;
  completedDate?: string;
}

export const Planning: React.FC = () => {
  const { styles } = createStyles();

  const [selectedDate, setSelectedDate] = useState<Dayjs>(dayjs());
  const [currentMonth, setCurrentMonth] = useState<Dayjs>(dayjs());
  const [selectedProject, setSelectedProject] = useState<number | 'all'>('all');
  const [drawerVisible, setDrawerVisible] = useState(false);
  const [formDrawerVisible, setFormDrawerVisible] = useState(false);
  const [selectedDayAssignments, setSelectedDayAssignments] = useState<
    PlanningAssignment[]
  >([]);
  const [deleteModalVisible, setDeleteModalVisible] = useState(false);

  const { data: usersData, isLoading: usersLoading } = useList<IUser>({
    resource: 'users',
    pagination: { mode: 'off' },
  });

  const { data: projectsData, isLoading: projectsLoading } = useList<IProject>({
    resource: 'projects',
    pagination: { mode: 'off' },
  });

  const {
    data: planningsData,
    isLoading: planningsLoading,
    refetch: refetchPlannings,
  } = useList<IPlanning>({
    resource: 'plannings',
    pagination: { mode: 'off' },
  });

  const { mutate: deletePlanning, isLoading: deleteLoading } = useDelete();

  const users = usersData?.data || [];
  const projects = projectsData?.data || [];
  const plannings = planningsData?.data || [];

  const calendarAssignments: PlanningAssignment[] = plannings.map(
    (planning) => ({
      id: planning.id.toString(),
      userId: planning.assignedUserId,
      projectId: planning.projectId,
      startDate: planning.startDate,
      endDate: planning.endDate,
      title: planning.title,
      description: planning.description,
      notes: planning.notes,
      isCompleted: planning.isCompleted,
      completedDate: planning.completedDate,
      status: planning.isCompleted ? 'completed' : 'active',
      priority: 'medium',
    }),
  );

  const filteredAssignments = calendarAssignments.filter((assignment) => {
    const projectMatch =
      selectedProject === 'all' || assignment.projectId === selectedProject;
    return projectMatch;
  });

  const filteredPlanningsForDelete = plannings.filter((planning) => {
    const projectMatch =
      selectedProject === 'all' || planning.projectId === selectedProject;
    return projectMatch;
  });

  const handleDeletePlanning = (planningId: number) => {
    deletePlanning(
      {
        resource: 'plannings',
        id: planningId,
      },
      {
        onSuccess: () => {
          message.success('Planning deleted successfully');
          refetchPlannings();
        },
        onError: (error) => {
          message.error('Failed to delete planning');
          console.error('Delete planning error:', error);
        },
      },
    );
  };

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
      active: 'blue',
      planned: 'blue',
      completed: 'green',
      cancelled: 'red',
    };
    return colors[status as keyof typeof colors] || 'default';
  };

  const handleFormSuccess = () => {
    setFormDrawerVisible(false);
    refetchPlannings();
  };

  return (
    <div className={styles.planningContainer}>
      <div className={styles.pageHeader}>
        <Title level={2} className={styles.pageTitle}>
          <CalendarOutlined />
          Planning Calendar
        </Title>
        <Space>
          <Button
            type="primary"
            icon={<PlusOutlined />}
            onClick={() => setFormDrawerVisible(true)}
            className={styles.createButton}
          >
            Create Planning
          </Button>
          <Button
            danger
            icon={<DeleteOutlined />}
            onClick={() => setDeleteModalVisible(true)}
            disabled={filteredPlanningsForDelete.length === 0}
            className={styles.deleteButton}
          >
            Delete Planning
          </Button>
        </Space>
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
          loading={usersLoading || projectsLoading || planningsLoading}
          height={800}
        />
      </div>
      <Drawer
        title={`Planning for ${selectedDate?.format('MMMM D, YYYY')}`}
        placement="right"
        onClose={() => setDrawerVisible(false)}
        open={drawerVisible}
        width={400}
        destroyOnHidden
      >
        <div className={styles.drawerHeader}>
          <Title level={4} className={styles.drawerTitle}>
            {selectedDayAssignments.length} Planning
            {selectedDayAssignments.length !== 1 ? 's' : ''}
          </Title>
        </div>

        {selectedDayAssignments.length === 0 ? (
          <div className={styles.emptyState}>
            <Empty description="No planning for this day" />
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
                        <Text strong style={{ fontSize: '14px' }}>
                          {assignment.title}
                        </Text>
                      </div>

                      {assignment.description && (
                        <div>
                          <Text type="secondary" style={{ fontSize: '12px' }}>
                            {assignment.description}
                          </Text>
                        </div>
                      )}

                      <div>
                        <ProjectOutlined style={{ marginRight: 4 }} />
                        <TextField value={project?.name || 'Unknown Project'} />
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

                      {assignment.isCompleted && assignment.completedDate && (
                        <div>
                          <CheckCircleOutlined
                            style={{ marginRight: 4, color: 'green' }}
                          />
                          <Text type="secondary" style={{ fontSize: '12px' }}>
                            Completed:{' '}
                            {dayjs(assignment.completedDate).format(
                              'MMM D, YYYY',
                            )}
                          </Text>
                        </div>
                      )}
                    </Space>
                  </div>

                  <div className={styles.assignmentTags}>
                    <Space>
                      <Tag
                        color={getStatusColor(assignment.status || 'active')}
                      >
                        {assignment.isCompleted ? 'COMPLETED' : 'ACTIVE'}
                      </Tag>
                      <Popconfirm
                        title="Delete this planning?"
                        description="Are you sure you want to delete this planning? This action cannot be undone."
                        onConfirm={() =>
                          handleDeletePlanning(Number(assignment.id))
                        }
                        okText="Yes"
                        cancelText="No"
                        okType="danger"
                      >
                        <Button
                          danger
                          icon={<DeleteOutlined />}
                          size="small"
                          loading={deleteLoading}
                        >
                          Delete
                        </Button>
                      </Popconfirm>
                    </Space>
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
        <PlanningForm onSuccess={handleFormSuccess} />
      </Drawer>

      <Modal
        title="Delete Planning"
        open={deleteModalVisible}
        onCancel={() => setDeleteModalVisible(false)}
        footer={null}
        width={600}
      >
        {filteredPlanningsForDelete.length === 0 ? (
          <Empty
            description={
              selectedProject === 'all'
                ? 'No plannings found'
                : 'No plannings found for the selected project'
            }
          />
        ) : (
          <List
            dataSource={filteredPlanningsForDelete}
            renderItem={(planning) => {
              const user = getUserInfo(planning.assignedUserId);
              const project = getProjectInfo(planning.projectId);

              return (
                <List.Item
                  actions={[
                    <Popconfirm
                      title="Delete this planning?"
                      description="Are you sure you want to delete this planning? This action cannot be undone."
                      onConfirm={() => handleDeletePlanning(planning.id)}
                      okText="Yes"
                      cancelText="No"
                      okType="danger"
                    >
                      <Button
                        danger
                        icon={<DeleteOutlined />}
                        size="small"
                        loading={deleteLoading}
                      >
                        Delete
                      </Button>
                    </Popconfirm>,
                  ]}
                >
                  <List.Item.Meta
                    avatar={
                      <Avatar
                        size="small"
                        icon={<UserOutlined />}
                        src={user?.avatar}
                      />
                    }
                    title={
                      <Space
                        direction="vertical"
                        size="small"
                        style={{ width: '100%' }}
                      >
                        <Text strong>{planning.title}</Text>
                        <Space size="small">
                          <ProjectOutlined />
                          <Text type="secondary">
                            {project?.name || 'Unknown Project'}
                          </Text>
                        </Space>
                        <Space size="small">
                          <ClockCircleOutlined />
                          <Text type="secondary">
                            {planning.startDate === planning.endDate
                              ? dayjs(planning.startDate).format('MMM D, YYYY')
                              : `${dayjs(planning.startDate).format('MMM D')} - ${dayjs(planning.endDate).format('MMM D, YYYY')}`}
                          </Text>
                        </Space>
                        {planning.isCompleted && (
                          <Space size="small">
                            <CheckCircleOutlined style={{ color: '#52c41a' }} />
                            <Text type="success">Completed</Text>
                          </Space>
                        )}
                      </Space>
                    }
                    description={
                      <Space
                        direction="vertical"
                        size="small"
                        style={{ width: '100%' }}
                      >
                        {planning.description && (
                          <Text type="secondary">{planning.description}</Text>
                        )}
                        <Text type="secondary">
                          Assigned to: {user?.firstName} {user?.lastName}
                        </Text>
                      </Space>
                    }
                  />
                </List.Item>
              );
            }}
          />
        )}
      </Modal>
    </div>
  );
};

export default Planning;
