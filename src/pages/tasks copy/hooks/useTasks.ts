import { useQuery } from '@tanstack/react-query';
import {
  getTasks,
  getTasksByProject,
  getIncompleteTasks,
  getOverdueTasks,
  getTasksByType,
  getHighPriorityTasks,
} from '../api/tasks';
import type { TaskQueryParams, TaskPagedResponse } from '../types';

// Hook for getting all tasks with pagination and filtering
export const useTasks = (params?: TaskQueryParams) => {
  return useQuery({
    queryKey: ['tasks', params],
    queryFn: () => getTasks(params),
    staleTime: 5 * 60 * 1000, // 5 minutes
  });
};

// Hook for getting tasks by project
export const useTasksByProject = (
  projectId: number,
  params?: Partial<TaskQueryParams>,
) => {
  return useQuery({
    queryKey: ['tasks', 'project', projectId, params],
    queryFn: () => getTasksByProject(projectId, params),
    enabled: !!projectId,
    staleTime: 5 * 60 * 1000,
  });
};

// Hook for getting incomplete tasks
export const useIncompleteTasks = (params?: Partial<TaskQueryParams>) => {
  return useQuery({
    queryKey: ['tasks', 'incomplete', params],
    queryFn: () => getIncompleteTasks(params),
    staleTime: 2 * 60 * 1000, // 2 minutes for more frequent updates
  });
};

// Hook for getting overdue tasks
export const useOverdueTasks = (params?: Partial<TaskQueryParams>) => {
  return useQuery({
    queryKey: ['tasks', 'overdue', params],
    queryFn: () => getOverdueTasks(params),
    staleTime: 2 * 60 * 1000,
  });
};

// Hook for getting tasks by type
export const useTasksByType = (
  type: string,
  params?: Partial<TaskQueryParams>,
) => {
  return useQuery({
    queryKey: ['tasks', 'type', type, params],
    queryFn: () => getTasksByType(type, params),
    enabled: !!type,
    staleTime: 5 * 60 * 1000,
  });
};

// Hook for getting high priority tasks
export const useHighPriorityTasks = (params?: Partial<TaskQueryParams>) => {
  return useQuery({
    queryKey: ['tasks', 'high-priority', params],
    queryFn: () => getHighPriorityTasks(params),
    staleTime: 2 * 60 * 1000,
  });
};
