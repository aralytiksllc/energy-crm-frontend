// External dependencies
import * as React from 'react';
import { Avatar } from 'antd';

// Internal dependencies
import { UserAvatar } from '@components/user-avatar';
import type { IUser } from '@interfaces/users';
import type { UserAvatarsProps } from './user-avatars.types';

export const UserAvatars: React.FC<UserAvatarsProps> = (props) => {
  const { users, ...restProps } = props;

  const renderUserAvatar = React.useCallback(
    (user: IUser) => <UserAvatar key={user.id} user={user} />,
    [],
  );

  return (
    <Avatar.Group max={{ count: 3 }} {...restProps}>
      {users.map(renderUserAvatar)}
    </Avatar.Group>
  );
};
