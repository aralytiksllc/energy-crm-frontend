export interface IUser {
  id?: number;
  firstName: string;
  lastName: string;
  email: string;
  password: string;
  dateOfBirth: string;
  dateOfJoining: string;
  isActive: boolean;
  notes?: string;
  settings?: Record<string, unknown> | string;
  createdById: number;
  updatedById: number;
}
