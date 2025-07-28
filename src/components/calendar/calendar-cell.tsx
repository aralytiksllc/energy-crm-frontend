import React from 'react';
import { Avatar } from 'antd';
import dayjs, { type Dayjs } from 'dayjs';
import {
  type CalendarCellProps,
  type CalendarAssignment,
} from './calendar.types';
import {
  useCalendarStyles,
  getSpanningAssignmentItemStyles,
  getAvatarStyles,
  getPriorityIndicatorStyles,
  getStatusIndicatorStyles,
  getSingleDayContainerStyles,
  getAssignmentItemStyles,
  getCancelledTextStyles,
} from './calendar.styles';

const CalendarCell: React.FC<CalendarCellProps> = ({
  date,
  assignments,
  users,
  onDayClick,
  onAssignmentClick,
  assignmentRows = {},
}) => {
  const { styles, cx } = useCalendarStyles({ minHeight: 0 });
  const defaultUserColor = '#1677ff';
  const defaultTextColor = '#fff';

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
        const userColor = user ? defaultUserColor : statusColor;
        const textColor = defaultTextColor;
        return (
          <div
            key={`spanning-${assignment.id}`}
            className={cx(
              styles.spanningAssignmentItem,
              `assignment-${position}`,
              getSpanningAssignmentItemStyles(
                userColor,
                textColor,
                assignment.status === 'cancelled' ? 0.5 : 1,
              ),
            )}
            style={{
              top: `${4 + rowIndex * 24}px`,
            }}
            onClick={(e) => {
              e.stopPropagation();
              onAssignmentClick?.(assignment);
            }}
          >
            {position === 'start' && user && (
              <Avatar
                size={16}
                src={user.avatar}
                className={cx(
                  styles.avatar,
                  getAvatarStyles(userColor, textColor),
                )}
              >
                {user.firstName?.[0]}
                {user.lastName?.[0]}
              </Avatar>
            )}
            <span
              className={cx(
                styles.spanningAssignmentText,
                assignment.status === 'cancelled'
                  ? styles.cancelledText
                  : styles.assignmentText,
                getCancelledTextStyles(textColor),
              )}
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
                className={cx(
                  styles.priorityIndicator,
                  getPriorityIndicatorStyles(
                    getPriorityColor(assignment.priority),
                  ),
                )}
              />
            )}
          </div>
        );
      })}

      <div
        className={cx(
          styles.singleDayAssignmentsContainer,
          getSingleDayContainerStyles(
            spanningAssignments.length > 0
              ? (Math.max(
                  ...spanningAssignments.map((a) => assignmentRows[a.id] ?? 0),
                ) +
                  1) *
                  24 +
                  8
              : 8,
          ),
        )}
      >
        {singleDayAssignments.map((assignment) => {
          const user = getUserInfo(assignment.userId);
          const statusColor = getStatusColor(assignment.status);
          const priorityColor = getPriorityColor(assignment.priority);
          const userColor = user ? defaultUserColor : statusColor;
          const textColor = defaultTextColor;
          return (
            <div
              key={`single-${assignment.id}`}
              className={cx(
                styles.assignmentItem,
                getAssignmentItemStyles(
                  userColor,
                  textColor,
                  priorityColor,
                  assignment.status === 'cancelled' ? 0.5 : 1,
                ),
              )}
              onClick={(e) => {
                e.stopPropagation();
                onAssignmentClick?.(assignment);
              }}
            >
              {user && (
                <Avatar
                  size={16}
                  src={user.avatar}
                  className={cx(
                    styles.avatar,
                    getAvatarStyles(userColor, textColor),
                  )}
                >
                  {user.firstName?.[0]}
                  {user.lastName?.[0]}
                </Avatar>
              )}
              <span
                className={cx(
                  styles.assignmentText,
                  assignment.status === 'cancelled'
                    ? styles.cancelledText
                    : styles.assignmentText,
                  getCancelledTextStyles(textColor),
                )}
              >
                {user
                  ? `${user.firstName} ${user.lastName}`
                  : assignment.title || 'Assignment'}
              </span>
              <div
                className={cx(
                  styles.statusIndicator,
                  getStatusIndicatorStyles(statusColor),
                )}
              />
            </div>
          );
        })}
      </div>
    </div>
  );
};

export default CalendarCell;
