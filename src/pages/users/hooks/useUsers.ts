import { useQuery } from '@tanstack/react-query';
import { getUsers, type UserSummary } from '../api/users';

export const useUsers = () => {
  return useQuery<UserSummary[], Error>({
    queryKey: ['users'],
    queryFn: getUsers,
    staleTime: 5 * 60 * 1000, // 5 minutes
    retry: 2,
  });
};
