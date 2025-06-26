// External imports
import type { AvatarProps } from 'antd';

// Internal imports
import type { IUser } from '@/interfaces/users';

export interface UserAvatarProps extends AvatarProps {
  user: IUser;
}
