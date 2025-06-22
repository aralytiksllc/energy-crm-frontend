import { useMutation, useQueryClient } from '@tanstack/react-query';
import { createTask } from '../api/tasks';
import type { CreateTaskDto } from '../types';

export const useCreateTask = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (data: CreateTaskDto) => createTask(data),
    onSuccess: () => {
      // Invalidate and refetch task lists
      queryClient.invalidateQueries({ queryKey: ['tasks'] });
      queryClient.invalidateQueries({ queryKey: ['task'] });
    },
    onError: (error: Error) => {
      console.error('Failed to create task:', error);
    },
  });
};
