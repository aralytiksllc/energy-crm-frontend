import { useMutation, useQueryClient } from '@tanstack/react-query';
import { createTask } from '../api/tasks';

export const useCreateTask = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: createTask,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['tasks'] });
    },
    onError: (error: Error) => {
      console.error('Failed to create task:', error);
    },
  });
};
