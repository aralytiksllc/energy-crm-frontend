// External imports
import React from 'react';
import { EyeOutlined } from '@ant-design/icons';
import { useGo, useShowButton } from '@refinedev/core';
import type { MenuInfo } from 'rc-menu/lib/interface';

// Internal imports
import { useLatestRef } from '@hooks/use-latest-ref';
import type {
  UseShowMenuItemProps,
  UseShowMenuItem,
} from './use-show-menu-item.types';

export const useShowMenuItem = (
  props: UseShowMenuItemProps,
): UseShowMenuItem => {
  const { resource, resourceId, label } = props;

  const go = useGo();

  const goRef = useLatestRef(go);

  const { to } = useShowButton({
    resource,
    id: resourceId,
  });

  const handleClick = React.useCallback(
    (info: MenuInfo) => {
      info.domEvent.stopPropagation();
      goRef.current?.({ to });
    },
    [goRef, to],
  );

  return React.useMemo(
    () => ({
      label: label ?? 'View',
      icon: <EyeOutlined />,
      onClick: handleClick,
      key: 'show-action',
    }),
    [label, handleClick],
  );
};
