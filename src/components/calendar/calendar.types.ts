import type { Dayjs } from 'dayjs';

export interface CalendarAssignment {
  id: string | number;
  userId: string | number;
  startDate: string;
  endDate?: string;
  title?: string;
  notes?: string;
  status?: 'active' | 'planned' | 'completed' | 'cancelled';
  priority?: 'high' | 'medium' | 'low';
  [key: string]: any;
}

export interface CalendarUser {
  id: string | number;
  firstName?: string;
  lastName?: string;
  avatar?: string;
  [key: string]: any;
}

export interface CalendarProps {
  assignments: CalendarAssignment[];
  users: CalendarUser[];
  onDayClick?: (date: Dayjs, assignments: CalendarAssignment[]) => void;
  onAssignmentClick?: (assignment: CalendarAssignment) => void;
  selectedDate?: Dayjs;
  onDateChange?: (date: Dayjs) => void;
  loading?: boolean;
  height?: number;
  showHeader?: boolean;
}

export interface CalendarCellProps {
  date: Dayjs;
  assignments: CalendarAssignment[];
  users: CalendarUser[];
  onDayClick?: (date: Dayjs, assignments: CalendarAssignment[]) => void;
  onAssignmentClick?: (assignment: CalendarAssignment) => void;
  assignmentRows?: Record<string | number, number>;
}
