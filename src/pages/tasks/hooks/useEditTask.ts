import { useMutation, useQueryClient } from '@tanstack/react-query';
import { updateTask } from '../api/tasks';
import type { EditTaskInput } from '../types';

export const useEditTask = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: async (input: EditTaskInput) => {
      const { id, ...data } = input;
      return updateTask(id, data);
    },
    onSuccess: (updatedTask) => {
      // Invalidate and refetch task lists
      queryClient.invalidateQueries({ queryKey: ['tasks'] });
      queryClient.invalidateQueries({ queryKey: ['stages'] });
      // Update specific task in cache
      queryClient.setQueryData(['task', updatedTask.id], updatedTask);
    },
    onError: (error: Error) => {
      console.error('Failed to edit task:', error);
    },
  });
};
