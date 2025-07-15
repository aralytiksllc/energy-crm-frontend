import React from 'react';
import { Calendar as AntCalendar, Spin } from 'antd';
import { type Dayjs } from 'dayjs';
import { type CalendarProps } from './calendar.types';
import { useCalendarStyles } from './calendar.styles';
import CalendarCell from './calendar-cell';

const Calendar: React.FC<CalendarProps> = ({
  assignments = [],
  users = [],
  onDayClick,
  onAssignmentClick,
  selectedDate,
  onDateChange,
  loading = false,
  height = 800,
  showHeader = true,
}) => {
  const { styles } = useCalendarStyles({ minHeight: height });
  const assignmentRows = React.useMemo(() => {
    const spanningAssignments = assignments.filter(
      (assignment) =>
        assignment.endDate && assignment.startDate !== assignment.endDate,
    );
    const sortedSpanningAssignments = spanningAssignments.sort(
      (a, b) =>
        new Date(a.startDate).getTime() - new Date(b.startDate).getTime(),
    );
    const assignmentRows: Record<string | number, number> = {};
    sortedSpanningAssignments.forEach((assignment, index) => {
      assignmentRows[assignment.id] = index;
    });

    return assignmentRows;
  }, [assignments]);

  const handlePanelChange = (date: Dayjs) => {
    onDateChange?.(date);
  };

  const dateCellRender = (date: Dayjs) => {
    return (
      <CalendarCell
        date={date}
        assignments={assignments}
        users={users}
        onDayClick={onDayClick}
        onAssignmentClick={onAssignmentClick}
        assignmentRows={assignmentRows}
      />
    );
  };

  const headerRender = () => {
    if (!showHeader) return null;
  };

  return (
    <div className={`${styles.calendarContainer} ${styles.calendarWrapper}`}>
      {loading && (
        <div className={styles.loadingOverlay}>
          <Spin size="large" />
        </div>
      )}
      <AntCalendar
        value={selectedDate}
        onPanelChange={handlePanelChange}
        cellRender={dateCellRender}
        headerRender={headerRender}
        fullscreen
      />
    </div>
  );
};

export default Calendar;
