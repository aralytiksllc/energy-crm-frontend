import { useMutation, useQueryClient } from '@tanstack/react-query';
import { updateTask } from '../api/tasks';
import type { UpdateTaskDto } from '../types';

interface UpdateTaskParams {
  id: number;
  data: UpdateTaskDto;
}

export const useUpdateTask = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: ({ id, data }: UpdateTaskParams) => updateTask(id, data),
    onSuccess: (updatedTask) => {
      // Invalidate and refetch task lists
      queryClient.invalidateQueries({ queryKey: ['tasks'] });
      // Update specific task in cache
      queryClient.setQueryData(['task', updatedTask.id], updatedTask);
    },
    onError: (error: Error) => {
      console.error('Failed to update task:', error);
    },
  });
};
