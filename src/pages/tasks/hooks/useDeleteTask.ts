import { useMutation, useQueryClient } from '@tanstack/react-query';
import { deleteTask } from '../api/tasks';

export const useDeleteTask = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (id: number) => deleteTask(id),
    onSuccess: (_, deletedId) => {
      // Remove task from cache
      queryClient.removeQueries({ queryKey: ['task', deletedId] });
      // Invalidate task lists to refetch
      queryClient.invalidateQueries({ queryKey: ['tasks'] });
      queryClient.invalidateQueries({ queryKey: ['stages'] });
    },
    onError: (error: Error) => {
      console.error('Failed to delete task:', error);
    },
  });
};
