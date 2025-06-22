import { useQuery } from '@tanstack/react-query';
import { getTask } from '../api/tasks';

// Hook for getting a single task by ID
export const useTask = (id: number) => {
  return useQuery({
    queryKey: ['task', id],
    queryFn: () => getTask(id),
    enabled: !!id,
    staleTime: 5 * 60 * 1000, // 5 minutes
  });
};
