import React, { useCallback, useMemo } from 'react';
import { Avatar } from 'antd';
import type { IUser } from '@/interfaces/users';
import { UserAvatar } from '@/components/user-avatar';

interface UserAvatarsProps {
  users: IUser[];
}

export const UserAvatars: React.FC<UserAvatarsProps> = (props) => {
  const { users } = props;

  const renderUserAvatar = useCallback(
    (user: IUser) => <UserAvatar key={user.id} user={user} />,
    [],
  );

  return (
    <Avatar.Group
      max={{
        count: 3,
        style: { color: '#f56a00', backgroundColor: '#fde3cf' },
      }}
    >
      {users.map(renderUserAvatar)}
    </Avatar.Group>
  );
};
