// External dependencies
import type { AvatarGroupProps } from 'antd/es/avatar/AvatarGroup';

// Internal dependencies
import type { User } from '@components/user-avatar';

export interface UserAvatarsProps extends AvatarGroupProps {
  users: User[];
  maxCount?: number;
}
