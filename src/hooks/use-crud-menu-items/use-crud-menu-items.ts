// External
import * as React from 'react';

// Internal
import { useShowMenuItem } from './use-show-menu-item';
import { useEditMenuItem } from './use-edit-menu-item';
import { useDeleteMenuItem } from './use-delete-menu-item';
import type {
  useCrudMenuItemsProps,
  UseCrudMenuItems,
} from './use-crud-menu-items.types';

export const useCrudMenuItems = (
  props: useCrudMenuItemsProps,
): UseCrudMenuItems => {
  const {
    resource,
    resourceId,
    showLabel,
    editLabel,
    deleteLabel,
    confirmTitle,
    confirmMessage,
  } = props;

  const showMenuItem = useShowMenuItem({
    resource,
    resourceId,
    label: showLabel,
  });

  const editMenuItem = useEditMenuItem({
    resource,
    resourceId,
    label: editLabel,
  });

  const deleteMenuItem = useDeleteMenuItem({
    resource,
    resourceId,
    label: deleteLabel,
    confirmTitle,
    confirmMessage,
  });

  return React.useMemo(
    () => [showMenuItem, editMenuItem, deleteMenuItem],
    [showMenuItem, editMenuItem, deleteMenuItem],
  );
};
