import dayjs from 'dayjs';
import {
  IProject,
  CreateProjectDto,
  UpdateProjectDto,
  ProjectStatus,
  ProjectPriority,
} from '../types/types';

/**
 * Transform frontend form data to CreateProjectDto for backend
 */
export const transformToCreateDto = (formData: any): CreateProjectDto => {
  const dto: CreateProjectDto = {
    name: formData.name,
    description: formData.description || undefined,
    category: formData.category || undefined,
    status: formData.status || ProjectStatus.NotStarted,
    priority: formData.priority || ProjectPriority.Medium,
    progress: formData.progress || 0,
    clientName: formData.clientName || undefined,
    projectManagerId: formData.projectManagerId || undefined,
    budget: formData.budget || 0,
    startDate: formData.startDate
      ? dayjs(formData.startDate).format('YYYY-MM-DD')
      : dayjs().format('YYYY-MM-DD'),
    deadline: formData.deadline
      ? dayjs(formData.deadline).format('YYYY-MM-DD')
      : undefined,
    endDate: formData.endDate
      ? dayjs(formData.endDate).format('YYYY-MM-DD')
      : undefined,
    isArchived: formData.isArchived || false,
    isPrivate: formData.isPrivate || false,
    technologies: formData.technologies || [],
    tags: formData.tags || [],
    color: formData.color || undefined,
    notes: formData.notes || undefined,
  };

  return dto;
};

/**
 * Transform frontend form data to UpdateProjectDto for backend
 */
export const transformToUpdateDto = (formData: any): UpdateProjectDto => {
  const dto: UpdateProjectDto = {};

  if (formData.name !== undefined) dto.name = formData.name;
  if (formData.description !== undefined)
    dto.description = formData.description;
  if (formData.category !== undefined) dto.category = formData.category;
  if (formData.status !== undefined) dto.status = formData.status;
  if (formData.priority !== undefined) dto.priority = formData.priority;
  if (formData.progress !== undefined) dto.progress = formData.progress;
  if (formData.clientName !== undefined) dto.clientName = formData.clientName;
  if (formData.projectManagerId !== undefined)
    dto.projectManagerId = formData.projectManagerId;
  if (formData.budget !== undefined) dto.budget = formData.budget;
  if (formData.startDate !== undefined) {
    dto.startDate = formData.startDate
      ? dayjs(formData.startDate).format('YYYY-MM-DD')
      : undefined;
  }
  if (formData.deadline !== undefined) {
    dto.deadline = formData.deadline
      ? dayjs(formData.deadline).format('YYYY-MM-DD')
      : undefined;
  }
  if (formData.endDate !== undefined) {
    dto.endDate = formData.endDate
      ? dayjs(formData.endDate).format('YYYY-MM-DD')
      : undefined;
  }
  if (formData.isArchived !== undefined) dto.isArchived = formData.isArchived;
  if (formData.isPrivate !== undefined) dto.isPrivate = formData.isPrivate;
  if (formData.technologies !== undefined)
    dto.technologies = formData.technologies;
  if (formData.tags !== undefined) dto.tags = formData.tags;
  if (formData.color !== undefined) dto.color = formData.color;
  if (formData.notes !== undefined) dto.notes = formData.notes;

  return dto;
};

/**
 * Transform backend project data to frontend format for editing
 */
export const transformFromBackend = (project: IProject): any => {
  return {
    ...project,
    budget:
      typeof project.budget === 'string'
        ? parseFloat(project.budget)
        : project.budget,
    progress:
      typeof project.progress === 'string'
        ? parseFloat(project.progress)
        : project.progress,
    startDate: project.startDate ? dayjs(project.startDate) : undefined,
    deadline: project.deadline ? dayjs(project.deadline) : undefined,
    endDate: project.endDate ? dayjs(project.endDate) : undefined,
  };
};

/**
 * Format project status for display
 */
export const formatProjectStatus = (status: ProjectStatus): string => {
  const statusMap = {
    [ProjectStatus.NotStarted]: 'Not Started',
    [ProjectStatus.InProgress]: 'In Progress',
    [ProjectStatus.Completed]: 'Completed',
    [ProjectStatus.OnHold]: 'On Hold',
    [ProjectStatus.Cancelled]: 'Cancelled',
  };
  return statusMap[status] || status;
};

/**
 * Format project priority for display
 */
export const formatProjectPriority = (priority: ProjectPriority): string => {
  return priority;
};

/**
 * Get status color for UI
 */
export const getStatusColor = (status: ProjectStatus): string => {
  const colorMap = {
    [ProjectStatus.NotStarted]: 'default',
    [ProjectStatus.InProgress]: 'processing',
    [ProjectStatus.Completed]: 'success',
    [ProjectStatus.OnHold]: 'warning',
    [ProjectStatus.Cancelled]: 'error',
  };
  return colorMap[status] || 'default';
};

/**
 * Get priority color for UI
 */
export const getPriorityColor = (priority: ProjectPriority): string => {
  const colorMap = {
    [ProjectPriority.Low]: 'green',
    [ProjectPriority.Medium]: 'blue',
    [ProjectPriority.High]: 'orange',
    [ProjectPriority.Critical]: 'red',
  };
  return colorMap[priority] || 'blue';
};
