// External imports
import type { AvatarProps } from 'antd';

// Internal imports

export interface User {
  id?: number | string;
  name?: string;
  firstName?: string;
  lastName?: string;
  email?: string;
  avatar?: string;
}

export interface UserAvatarProps extends AvatarProps {
  user: User;
}
