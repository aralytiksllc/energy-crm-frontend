// External
import React from 'react';
import { EditOutlined } from '@ant-design/icons';
import { useGo, useEditButton } from '@refinedev/core';
import type { MenuInfo } from 'rc-menu/lib/interface';

// Internal
import { useLatestRef } from '@/hooks/use-latest-ref';
import type {
  UseEditMenuItemProps,
  UseEditMenuItem,
} from './use-edit-menu-item.types';

export const useEditMenuItem = (
  props: UseEditMenuItemProps,
): UseEditMenuItem => {
  const { resource, resourceId, label } = props;

  const go = useGo();

  const goRef = useLatestRef(go);

  const { to } = useEditButton({
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
      label: label ?? 'Edit',
      icon: <EditOutlined />,
      onClick: handleClick,
      key: 'edit-action',
    }),
    [label, handleClick],
  );
};
