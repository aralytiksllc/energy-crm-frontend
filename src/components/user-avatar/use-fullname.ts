// External imports
import * as React from 'react';

// Internal imports
import type { User } from './user-avatar.types';

export function useFullname(user: User): string {
  const { firstName, lastName, name } = user;

  return React.useMemo(() => {
    if (name) return name;
    return [firstName, lastName].filter(Boolean).join(' ');
  }, [firstName, lastName, name]);
}
