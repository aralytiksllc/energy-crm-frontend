// External imports
import * as React from 'react';

// Internal imports
import type { User } from './user-avatar.types';

export function useInitials(user: User): string {
  const { firstName, lastName, name } = user;

  return React.useMemo(() => {
    if (name) {
      const nameParts = name.trim().split(' ');
      const firstInitial = nameParts[0]?.charAt(0) ?? '';
      const lastInitial = nameParts[1]?.charAt(0) ?? '';
      return `${firstInitial}${lastInitial}`;
    }

    const firstInitial = firstName?.trim().charAt(0) ?? '';
    const lastInitial = lastName?.trim().charAt(0) ?? '';
    return `${firstInitial}${lastInitial}`;
  }, [firstName, lastName, name]);
}
