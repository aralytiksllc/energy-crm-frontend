// External imports
import * as React from 'react';
import { Avatar, Tooltip } from 'antd';

// Internal imports
import type { UserAvatarProps } from './user-avatar.types';
import { useFullname } from './use-fullname';
import { useInitials } from './use-initials';

export const UserAvatar: React.FC<UserAvatarProps> = (props) => {
  const { user } = props;

  const fullname = useFullname(user);
  const initials = useInitials(user);

  const text = !user.avatar && initials;

  return (
    <Tooltip title={fullname}>
      <Avatar src={user.avatar}>{text}</Avatar>
    </Tooltip>
  );
};
