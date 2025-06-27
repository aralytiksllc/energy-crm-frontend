// External imports
import * as React from 'react';

// Internal imports
import type { IUser } from '@interfaces/users';

export function useFullname(user: IUser): string {
  const { firstName, lastName } = user;

  return React.useMemo(() => {
    return [firstName, lastName].filter(Boolean).join(' ');
  }, [firstName, lastName]);
}
