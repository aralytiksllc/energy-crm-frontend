import { type CalendarAssignment } from '@components/calendar';

export interface PlanningAssignment extends CalendarAssignment {
  projectId: string | number;
  title: string;
  description?: string;
  isCompleted: boolean;
  completedDate?: string;
}
