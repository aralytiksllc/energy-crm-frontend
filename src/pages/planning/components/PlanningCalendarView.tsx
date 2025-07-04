import React from 'react';
import {
  Drawer,
  Typography,
  Avatar,
  Card,
  Tag,
  Empty,
  List,
  Popconfirm,
  message,
} from 'antd';
import {
  ProjectOutlined,
  ClockCircleOutlined,
  CheckCircleOutlined,
  UserOutlined,
  DeleteOutlined,
} from '@ant-design/icons';
import { EmailField, TextField } from '@refinedev/antd';
import { Calendar } from '@components/calendar';
import { PlanningAssignment } from '../types';
import { usePlanning } from '../usePlanning';
import { createStyles } from '../planning.styles';

const { Text } = Typography;

interface PlanningCalendarViewProps {
  planningHook: ReturnType<typeof usePlanning>;
}

export const PlanningCalendarView: React.FC<PlanningCalendarViewProps> = ({
  planningHook,
}) => {
  const { styles } = createStyles();
  const {
    users,
    selectedDate,
    drawerVisible,
    selectedDayAssignments,
    usersLoading,
    projectsLoading,
    planningsLoading,
    filteredAssignments,
    setSelectedDate,
    setDrawerVisible,
    handleDayClick,
    getProjectInfo,
    getUserInfo,
    handleDeletePlanning,
  } = planningHook;

  const getStatusColor = (status: string) => {
    const colors = {
      active: 'blue',
      planned: 'blue',
      completed: 'green',
      cancelled: 'red',
    };
    return colors[status as keyof typeof colors] || 'default';
  };

  return (
    <>
      <div className={styles.calendarWrapper}>
        <Calendar
          assignments={filteredAssignments}
          users={users.map((user) => ({
            ...user,
            avatar: user.avatar || undefined,
          }))}
          onDayClick={(date, assignments) =>
            handleDayClick(date, assignments as PlanningAssignment[])
          }
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
          {selectedDayAssignments.length > 0 ? (
            <List
              itemLayout="vertical"
              dataSource={selectedDayAssignments}
              renderItem={(item: PlanningAssignment) => {
                const project = getProjectInfo(item.projectId);
                const user = getUserInfo(item.userId);
                return (
                  <List.Item
                    key={item.id}
                    extra={
                      <Popconfirm
                        title="Are you sure to delete this planning?"
                        onConfirm={() =>
                          handleDeletePlanning(item.id as number)
                        }
                        okText="Yes"
                        cancelText="No"
                      >
                        <DeleteOutlined
                          style={{ color: 'red', cursor: 'pointer' }}
                        />
                      </Popconfirm>
                    }
                  >
                    <Card
                      style={{ marginBottom: 16 }}
                      title={
                        <div className={styles.cardTitle}>
                          <ProjectOutlined /> {project?.name || 'N/A'}
                        </div>
                      }
                    >
                      <TextField value={item.title} />
                      <div style={{ marginTop: 8 }}>
                        <Tag
                          color={getStatusColor(item.status || 'active')}
                          className={styles.statusTag}
                        >
                          {item.status}
                        </Tag>
                        <Tag icon={<ClockCircleOutlined />} color="blue">
                          {item.startDate &&
                            new Date(item.startDate).toLocaleDateString()}{' '}
                          -{' '}
                          {item.endDate &&
                            new Date(item.endDate).toLocaleDateString()}
                        </Tag>
                        {item.isCompleted && (
                          <Tag icon={<CheckCircleOutlined />} color="green">
                            Completed
                          </Tag>
                        )}
                      </div>
                      <div className={styles.userInfo}>
                        <Avatar
                          size="small"
                          src={user?.avatar}
                          icon={<UserOutlined />}
                        />
                        <div className={styles.userDetails}>
                          <Text strong>
                            {user?.firstName} {user?.lastName}
                          </Text>
                          <EmailField value={user?.email} />
                        </div>
                      </div>
                    </Card>
                  </List.Item>
                );
              }}
            />
          ) : (
            <Empty
              description="No planning entries for this day."
              className={styles.emptyState}
            />
          )}
        </div>
      </Drawer>
    </>
  );
};
