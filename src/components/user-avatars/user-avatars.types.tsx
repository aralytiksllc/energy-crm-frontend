// External dependencies
import type { AvatarGroupProps } from 'antd/es/avatar/AvatarGroup';

// Internal dependencies
import type { IUser } from '@interfaces/users';

export interface UserAvatarsProps extends AvatarGroupProps {
  users: IUser[];
}
