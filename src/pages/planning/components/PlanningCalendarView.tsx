import React, { useState } from 'react';
import { Drawer, Typography, Tag, Empty, List, Popconfirm } from 'antd';
import {
  ProjectOutlined,
  ClockCircleOutlined,
  CheckCircleOutlined,
  UserOutlined,
  DeleteOutlined,
} from '@ant-design/icons';
import { EmailField, TextField } from '@refinedev/antd';
import { Calendar } from '@components/calendar';
import { ExpandableCard } from '@components/expandable-card';
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
  const [expandedCard, setExpandedCard] = useState<number | null>(null);

  const toggleCardExpansion = (cardId: number) => {
    setExpandedCard((prev) => (prev === cardId ? null : cardId));
  };

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
          users={users
            .filter((user) => user.id !== undefined)
            .map((user) => ({
              id: user.id as string | number,
              firstName: user.firstName,
              lastName: user.lastName,
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
        {selectedDayAssignments.length > 0 ? (
          <List
            itemLayout="vertical"
            dataSource={selectedDayAssignments}
            split={false}
            renderItem={(item: PlanningAssignment) => {
              const project = getProjectInfo(item.projectId);
              const user = getUserInfo(item.userId);
              return (
                <List.Item key={item.id}>
                  <ExpandableCard<PlanningAssignment>
                    data={item}
                    title={
                      <div className={styles.cardTitle}>
                        <div className={styles.cardTitleContent}>
                          <ProjectOutlined />
                          <span>{project?.name || 'N/A'}</span>
                        </div>
                        <Popconfirm
                          title="Are you sure to delete this planning?"
                          onConfirm={() =>
                            handleDeletePlanning(item.id as number)
                          }
                          okText="Yes"
                          cancelText="No"
                          placement="left"
                        >
                          <DeleteOutlined className={styles.deleteIcon} />
                        </Popconfirm>
                      </div>
                    }
                    subtitle={
                      <div>
                        <TextField value={item.title} />
                        <div className={styles.cardSubtitleSpacing}>
                          <Tag
                            color={getStatusColor(item.status || 'active')}
                            className={styles.statusTag}
                          >
                            {item.status}
                          </Tag>
                          <Tag icon={<ClockCircleOutlined />} color="blue">
                            {item.startDate &&
                              new Date(
                                item.startDate,
                              ).toLocaleDateString()}{' '}
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
                        <div className={styles.cardSubtitleSpacing}>
                          <Text strong>
                            {user?.firstName} {user?.lastName}
                          </Text>
                          <br />
                          <EmailField value={user?.email} />
                        </div>
                      </div>
                    }
                    avatar={{
                      src: user?.avatar,
                      icon: <UserOutlined />,
                      size: 'small',
                    }}
                    expandableContent={
                      item.description && (
                        <Text
                          type="secondary"
                          className={styles.descriptionText}
                        >
                          {item.description}
                        </Text>
                      )
                    }
                    controlled={{
                      expanded: expandedCard === (item.id as number),
                      onToggle: () => toggleCardExpansion(item.id as number),
                    }}
                  />
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
      </Drawer>
    </>
  );
};
