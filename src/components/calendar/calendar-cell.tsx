import React from 'react';
import { Avatar } from 'antd';
import dayjs, { type Dayjs } from 'dayjs';
import {
  type CalendarCellProps,
  type CalendarAssignment,
} from './calendar.types';
import { createStyles } from './calendar.styles';

const CalendarCell: React.FC<CalendarCellProps> = ({
  date,
  assignments,
  users,
  onDayClick,
  onAssignmentClick,
  assignmentRows = {},
}) => {
  const { styles } = createStyles();

  const handleDayClick = () => {
    if (onDayClick) {
      const dayAssignments = getDayAssignments(date, assignments);
      onDayClick(date, dayAssignments);
    }
  };

  const getDayAssignments = (
    currentDate: Dayjs,
    allAssignments: CalendarAssignment[],
  ) => {
    return allAssignments.filter((assignment) => {
      const startDate = dayjs(assignment.startDate);
      const endDate = assignment.endDate
        ? dayjs(assignment.endDate)
        : startDate;

      return (
        currentDate.isSame(startDate, 'day') ||
        currentDate.isSame(endDate, 'day') ||
        (currentDate.isAfter(startDate, 'day') &&
          currentDate.isBefore(endDate, 'day'))
      );
    });
  };

  const getSpanningAssignments = (
    currentDate: Dayjs,
    allAssignments: CalendarAssignment[],
  ) => {
    return allAssignments.filter((assignment) => {
      if (!assignment.endDate) return false;

      const startDate = dayjs(assignment.startDate);
      const endDate = dayjs(assignment.endDate);

      return (
        startDate.isBefore(endDate, 'day') &&
        (currentDate.isSame(startDate, 'day') ||
          currentDate.isSame(endDate, 'day') ||
          (currentDate.isAfter(startDate, 'day') &&
            currentDate.isBefore(endDate, 'day')))
      );
    });
  };

  const getSingleDayAssignments = (
    currentDate: Dayjs,
    allAssignments: CalendarAssignment[],
  ) => {
    return allAssignments.filter((assignment) => {
      const startDate = dayjs(assignment.startDate);
      const endDate = assignment.endDate
        ? dayjs(assignment.endDate)
        : startDate;

      return (
        currentDate.isSame(startDate, 'day') && startDate.isSame(endDate, 'day')
      );
    });
  };

  const getAssignmentPosition = (
    assignment: CalendarAssignment,
    currentDate: Dayjs,
  ) => {
    const startDate = dayjs(assignment.startDate);
    const endDate = assignment.endDate ? dayjs(assignment.endDate) : startDate;

    if (startDate.isSame(endDate, 'day')) return 'single';
    if (currentDate.isSame(startDate, 'day')) return 'start';
    if (currentDate.isSame(endDate, 'day')) return 'end';
    return 'middle';
  };

  const getUserInfo = (userId: string | number) => {
    return users.find((user) => user.id === userId);
  };

  const getStatusColor = (status?: string) => {
    const colors = {
      active: '#52c41a',
      planned: '#1890ff',
      completed: '#722ed1',
      cancelled: '#ff4d4f',
    };
    return colors[status as keyof typeof colors] || '#1890ff';
  };

  const getPriorityColor = (priority?: string) => {
    const colors = {
      high: '#ff4d4f',
      medium: '#faad14',
      low: '#52c41a',
    };
    return colors[priority as keyof typeof colors] || '#faad14';
  };

  const spanningAssignments = getSpanningAssignments(date, assignments);
  const singleDayAssignments = getSingleDayAssignments(date, assignments);

  return (
    <div className={styles.calendarCell} onClick={handleDayClick}>
      {spanningAssignments.map((assignment) => {
        const user = getUserInfo(assignment.userId);
        const position = getAssignmentPosition(assignment, date);
        const statusColor = getStatusColor(assignment.status);
        const rowIndex = assignmentRows[assignment.id] ?? 0;

        return (
          <div
            key={`spanning-${assignment.id}`}
            className={`${styles.spanningAssignmentItem} assignment-${position}`}
            style={{
              top: `${4 + rowIndex * 24}px`,
              backgroundColor: `${statusColor}15`,
              borderColor: statusColor,
              opacity: assignment.status === 'cancelled' ? 0.5 : 1,
            }}
            onClick={(e) => {
              e.stopPropagation();
              onAssignmentClick?.(assignment);
            }}
          >
            {position === 'start' && user && (
              <Avatar size={16} src={user.avatar} className={styles.avatar}>
                {user.firstName?.[0]}
                {user.lastName?.[0]}
              </Avatar>
            )}
            <span
              className={styles.spanningAssignmentText}
              style={{
                color: statusColor,
                textDecoration:
                  assignment.status === 'cancelled' ? 'line-through' : 'none',
              }}
            >
              {position === 'start' && user
                ? `${user.firstName} ${user.lastName}`
                : position === 'middle'
                  ? '...'
                  : user
                    ? `${user.firstName} ${user.lastName}`
                    : 'Assignment'}
            </span>
            {position === 'start' && assignment.priority === 'high' && (
              <div
                style={{
                  width: '6px',
                  height: '6px',
                  borderRadius: '50%',
                  backgroundColor: getPriorityColor(assignment.priority),
                  marginLeft: 'auto',
                }}
              />
            )}
          </div>
        );
      })}

      <div
        style={{
          marginTop: `${spanningAssignments.length > 0 ? (Math.max(...spanningAssignments.map((a) => assignmentRows[a.id] ?? 0)) + 1) * 24 + 8 : 8}px`,
        }}
      >
        {singleDayAssignments.map((assignment) => {
          const user = getUserInfo(assignment.userId);
          const statusColor = getStatusColor(assignment.status);
          const priorityColor = getPriorityColor(assignment.priority);

          return (
            <div
              key={`single-${assignment.id}`}
              className={styles.assignmentItem}
              style={{
                backgroundColor: `${statusColor}10`,
                borderColor: statusColor,
                borderLeftWidth: assignment.priority === 'high' ? '3px' : '1px',
                borderLeftColor: priorityColor,
                opacity: assignment.status === 'cancelled' ? 0.5 : 1,
              }}
              onClick={(e) => {
                e.stopPropagation();
                onAssignmentClick?.(assignment);
              }}
            >
              {user && (
                <Avatar size={16} src={user.avatar} className={styles.avatar}>
                  {user.firstName?.[0]}
                  {user.lastName?.[0]}
                </Avatar>
              )}
              <span
                className={styles.assignmentText}
                style={{
                  color: statusColor,
                  textDecoration:
                    assignment.status === 'cancelled' ? 'line-through' : 'none',
                }}
              >
                {user
                  ? `${user.firstName} ${user.lastName}`
                  : assignment.title || 'Assignment'}
              </span>
              <div
                style={{
                  width: '4px',
                  height: '4px',
                  borderRadius: '50%',
                  backgroundColor: statusColor,
                  marginLeft: 'auto',
                  flexShrink: 0,
                }}
              />
            </div>
          );
        })}
      </div>
    </div>
  );
};

export default CalendarCell;
