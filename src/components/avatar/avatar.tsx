// External
import * as React from 'react';
import { Avatar as AntdAvatar } from 'antd';

// Internal
import { useAvatarInitials, useAvatarStyles } from './avatar.hooks';
import type { AvatarProps } from './avatar.types';

export const Avatar: React.FC<AvatarProps> = (props) => {
  const { name = '', src, ...rest } = props;

  const initials = useAvatarInitials(name);
  const styles = useAvatarStyles(name);

  return src ? (
    <AntdAvatar {...rest} src={src} />
  ) : (
    <AntdAvatar {...rest} style={styles}>
      {initials}
    </AntdAvatar>
  );
};
