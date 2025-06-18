export interface IUser {
  id: number;

  firstName: string;
  lastName: string;
  email: string;
  password: string;

  dateOfBirth: Date | null;
  dateOfJoining: Date | null;
  settings: Record<string, unknown>;
  notes: string | null;

  avatar: string | null;

  isActive: boolean;

  createdBy?: IUser;
  updatedBy?: IUser;

  createdAt: Date;
  updatedAt: Date;
}
