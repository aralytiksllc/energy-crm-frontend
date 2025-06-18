import { useMutation, useQueryClient } from '@tanstack/react-query';
import type { EditTaskInput } from '../types';

const editTask = async (input: EditTaskInput): Promise<void> => {
  console.log('Editing task:', input);

  await new Promise((resolve) => setTimeout(resolve, 1000));

  if (!input.title || input.title.trim().length === 0) {
    throw new Error('Task title is required');
  }
  return Promise.resolve();
};

export const useEditTask = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: editTask,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['tasks'] });
      queryClient.invalidateQueries({ queryKey: ['stages'] });
    },
    onError: (error) => {
      console.error('Error editing task:', error);
    },
  });
};
