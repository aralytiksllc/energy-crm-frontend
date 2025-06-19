import { useMutation, useQueryClient } from '@tanstack/react-query';
import { updateTask } from '../api/tasks';

export const useUpdateTask = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: updateTask,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['tasks'] });
    },
    onError: (error: Error) => {
      console.error('Failed to update task:', error);
    },
  });
};
