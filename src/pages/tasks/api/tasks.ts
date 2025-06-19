import { httpClient } from '@/providers/http-client';
import type { Task, CreateTaskInput, UpdateTaskInput } from '../types';

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

export const updateTask = async (input: UpdateTaskInput): Promise<Task> => {
  const { taskId, stageId, data } = input;
  const payload = {
    ...(stageId && { stageId }),
    ...(data && data),
  };

  const response = await httpClient
    .patch(`tasks/${taskId}`, { json: payload })
    .json<Task>();
  return response;
};
