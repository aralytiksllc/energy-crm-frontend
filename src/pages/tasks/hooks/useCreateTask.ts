import { useMutation, useQueryClient } from '@tanstack/react-query';
import { message } from 'antd';
import { createTask } from '../api/tasks';

interface CreateTaskInput {
  title: string;
  description?: string;
  type: string;
  dueDate?: Date;
  stageId: string;
  projectId: number;
  assignedTo?: number[];
}

export const useCreateTask = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (data: CreateTaskInput) => createTask(data),
    onSuccess: () => {
      message.success('Task created successfully');
      queryClient.invalidateQueries({ queryKey: ['tasks'] });
    },
    onError: (error: Error) => {
      message.error(`Failed to create task: ${error.message}`);
    },
  });
};
