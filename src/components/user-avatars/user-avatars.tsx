// External dependencies
import * as React from 'react';
import { Avatar } from 'antd';

// Internal dependencies
import { UserAvatar } from '@components/user-avatar';
import type { User } from '@components/user-avatar';
import type { UserAvatarsProps } from './user-avatars.types';

export const UserAvatars: React.FC<UserAvatarsProps> = (props) => {
  const { users, maxCount, ...restProps } = props;

  const renderUserAvatar = React.useCallback(
    (user: User) => <UserAvatar key={user.id} user={user} />,
    [],
  );

  return (
    <Avatar.Group
      max={maxCount ? { count: maxCount } : undefined}
      {...restProps}
    >
      {users.map(renderUserAvatar)}
    </Avatar.Group>
  );
};
