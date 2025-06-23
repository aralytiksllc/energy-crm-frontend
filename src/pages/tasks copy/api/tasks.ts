import { httpClient } from '@/helpers/http-client/http-client';
import type {
  Task,
  CreateTaskDto,
  UpdateTaskDto,
  TaskQueryParams,
  TaskPagedResponse,
} from '../types';
import { Operator } from '../types';

// Helper function to build query string
const buildQueryString = (params: TaskQueryParams): string => {
  const searchParams = new URLSearchParams();

  if (params.current) {
    searchParams.append('current', params.current.toString());
  }

  if (params.pageSize) {
    searchParams.append('pageSize', params.pageSize.toString());
  }

  if (params.filters && params.filters.length > 0) {
    searchParams.append('filters', JSON.stringify(params.filters));
  }

  if (params.sorters && params.sorters.length > 0) {
    searchParams.append('sorters', JSON.stringify(params.sorters));
  }

  return searchParams.toString();
};

// Get all tasks with pagination and filtering
export const getTasks = async (
  params?: TaskQueryParams,
): Promise<TaskPagedResponse> => {
  const queryString = params ? buildQueryString(params) : '';
  const url = queryString ? `tasks?${queryString}` : 'tasks';

  const response = await httpClient.get(url).json<TaskPagedResponse>();
  return response;
};

// Get single task by ID
export const getTask = async (id: number): Promise<Task> => {
  const response = await httpClient.get(`tasks/${id}`).json<Task>();
  return response;
};

// Create new task
export const createTask = async (data: CreateTaskDto): Promise<Task> => {
  const response = await httpClient.post('tasks', { json: data }).json<Task>();
  return response;
};

// Update task
export const updateTask = async (
  id: number,
  data: UpdateTaskDto,
): Promise<Task> => {
  const response = await httpClient
    .patch(`tasks/${id}`, { json: data })
    .json<Task>();
  return response;
};

// Delete task
export const deleteTask = async (id: number): Promise<void> => {
  await httpClient.delete(`tasks/${id}`);
};

// Convenience functions for common queries

// Get tasks by project
export const getTasksByProject = async (
  projectId: number,
  params?: Partial<TaskQueryParams>,
): Promise<TaskPagedResponse> => {
  const queryParams: TaskQueryParams = {
    ...params,
    filters: [
      { field: 'projectId', operator: Operator.EQ, value: projectId },
      ...(params?.filters || []),
    ],
  };
  return getTasks(queryParams);
};

// Get incomplete tasks
export const getIncompleteTasks = async (
  params?: Partial<TaskQueryParams>,
): Promise<TaskPagedResponse> => {
  const queryParams: TaskQueryParams = {
    ...params,
    filters: [
      { field: 'isCompleted', operator: Operator.EQ, value: false },
      ...(params?.filters || []),
    ],
  };
  return getTasks(queryParams);
};

// Get overdue tasks
export const getOverdueTasks = async (
  params?: Partial<TaskQueryParams>,
): Promise<TaskPagedResponse> => {
  const today = new Date().toISOString().split('T')[0];
  const queryParams: TaskQueryParams = {
    ...params,
    filters: [
      { field: 'dueDate', operator: Operator.LT, value: today },
      { field: 'isCompleted', operator: Operator.EQ, value: false },
      ...(params?.filters || []),
    ],
  };
  return getTasks(queryParams);
};

// Get tasks by type
export const getTasksByType = async (
  type: string,
  params?: Partial<TaskQueryParams>,
): Promise<TaskPagedResponse> => {
  const queryParams: TaskQueryParams = {
    ...params,
    filters: [
      { field: 'type', operator: Operator.EQ, value: type },
      ...(params?.filters || []),
    ],
  };
  return getTasks(queryParams);
};

// Get high priority tasks
export const getHighPriorityTasks = async (
  params?: Partial<TaskQueryParams>,
): Promise<TaskPagedResponse> => {
  const queryParams: TaskQueryParams = {
    ...params,
    filters: [
      { field: 'priority', operator: Operator.IN, value: ['High', 'Critical'] },
      ...(params?.filters || []),
    ],
  };
  return getTasks(queryParams);
};
