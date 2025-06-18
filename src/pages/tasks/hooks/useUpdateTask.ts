import { useMutation, useQueryClient } from '@tanstack/react-query';
import { message } from 'antd';
import { updateTask } from '../api/tasks';

interface UpdateTaskInput {
  taskId: number;
  stageId: string;
}

export const useUpdateTask = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (data: UpdateTaskInput) => updateTask(data),
    onSuccess: () => {
      message.success('Task updated successfully');
      queryClient.invalidateQueries({ queryKey: ['tasks'] });
    },
    onError: (error: Error) => {
      message.error(`Failed to update task: ${error.message}`);
    },
  });
};
