import { useQuery } from '@tanstack/react-query';
import { getProjects, type ProjectSummary } from '../api/projects';

export const useProjects = () => {
  const result = useQuery<ProjectSummary[], Error>({
    queryKey: ['projects'],
    queryFn: getProjects,
    staleTime: 5 * 60 * 1000, // 5 minutes
    retry: 2,
    onSuccess: (data) => {
      // Optional: handle successful data fetch
    },
    onError: (error) => {
      console.error('Error fetching projects:', error);
    },
  });

  return result;
};
