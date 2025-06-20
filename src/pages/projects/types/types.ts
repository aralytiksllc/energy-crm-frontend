export enum ProjectStatus {
  NotStarted = 'NotStarted',
  InProgress = 'InProgress',
  Completed = 'Completed',
  OnHold = 'OnHold',
  Cancelled = 'Cancelled',
}

export enum ProjectRole {
  Manager = 'Manager',
  Developer = 'Developer',
  QA = 'QA',
  Designer = 'Designer',
  Stakeholder = 'Stakeholder',
}

export enum ProjectPriority {
  Low = 'Low',
  Medium = 'Medium',
  High = 'High',
  Critical = 'Critical',
}

// Backend User interface (simplified)
export interface IUser {
  id: number;
  name: string;
  email?: string;
}

// Backend Project Member interface
export interface IProjectMember {
  id: string;
  projectId: string;
  userId: string;
  role: ProjectRole;
  isActive: boolean;
  createdAt: Date;
  updatedAt: Date;
  project: IProject;
  user: IUser;
}

// Backend Project Entity - exactly matching the backend schema
export interface IProject {
  // Base fields from BaseEntity
  id: number;
  createdById?: number;
  updatedById?: number;
  createdAt: Date;
  updatedAt: Date;

  // Project-specific fields
  name: string;
  description?: string;
  category?: string;
  status: ProjectStatus;
  priority: ProjectPriority;
  progress: number;
  customerId: number;
  customer?: ICustomer;
  projectManagerId?: number;
  budget: number;
  startDate: Date;
  deadline?: Date;
  endDate?: Date;
  isArchived: boolean;
  isPrivate: boolean;
  technologies?: string[];
  tags?: string[];
  color?: string;
  notes?: string;
  members: IProjectMember[];
}

// Customer interface for project relations
export interface ICustomer {
  id: number;
  name: string;
  isActive: boolean;
}

// Create Project DTO - exactly matching backend
export interface CreateProjectDto {
  name: string; // Required
  description?: string;
  category?: string;
  status?: ProjectStatus;
  priority?: ProjectPriority;
  progress?: number;
  customerId: number; // Required - customer relationship
  projectManagerId?: number;
  budget?: number;
  startDate: string; // Required (ISO date string)
  deadline?: string; // ISO date string
  endDate?: string; // ISO date string
  isArchived?: boolean;
  isPrivate?: boolean;
  technologies?: string[];
  tags?: string[];
  color?: string;
  notes?: string;
}

// Update Project DTO - exactly matching backend
export interface UpdateProjectDto {
  name?: string;
  description?: string;
  category?: string;
  status?: ProjectStatus;
  priority?: ProjectPriority;
  progress?: number;
  customerId?: number;
  projectManagerId?: number;
  budget?: number;
  startDate?: string;
  deadline?: string;
  endDate?: string;
  isArchived?: boolean;
  isPrivate?: boolean;
  technologies?: string[];
  tags?: string[];
  color?: string;
  notes?: string;
}

// Legacy types for backward compatibility
export enum Stage {
  LEAD = 'LEAD',
  QUALIFIED = 'QUALIFIED',
  PROPOSAL = 'PROPOSAL',
  NEGOTIATION = 'NEGOTIATION',
  CLOSED_WON = 'CLOSED_WON',
  CLOSED_LOST = 'CLOSED_LOST',
}

export enum FunctionalArea {
  AREA1 = 'AREA1',
  AREA2 = 'AREA2',
}

export interface ITask {
  id: number;
  title: string;
}

export interface IDocument {
  id: number;
  name: string;
}

export interface INote {
  id: number;
  content: string;
}
