// External imports
import * as React from 'react';

// Internal imports
import type { IUser } from '@/interfaces/users';

export function useInitials(user: IUser): string {
  const { firstName, lastName } = user;

  return React.useMemo(() => {
    const firstInitial = firstName?.trim().charAt(0) ?? '';
    const lastInitial = lastName?.trim().charAt(0) ?? '';
    return `${firstInitial}${lastInitial}`;
  }, [firstName, lastName]);
}
