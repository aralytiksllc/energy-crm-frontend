import { httpClient } from '@/providers/http-client';
import type { Task } from '../types';

interface CreateTaskInput {
  title: string;
  description?: string;
  type: string;
  dueDate?: Date;
  stageId: string;
  projectId: number;
  assignedTo?: number[];
}

interface UpdateTaskInput {
  taskId: number;
  stageId: string;
}

export const createTask = async (data: CreateTaskInput): Promise<Task> => {
  const response = await httpClient.post('tasks', { json: data }).json<Task>();
  return response;
};

export const getTasks = async (projectId: number): Promise<Task[]> => {
  const response = await httpClient
    .get(`tasks?projectId=${projectId}`)
    .json<Task[]>();
  return response;
};

export const updateTask = async (data: UpdateTaskInput): Promise<Task> => {
  const response = await httpClient
    .patch(`tasks/${data.taskId}`, {
      json: { stageId: data.stageId },
    })
    .json<Task>();
  return response;
};
