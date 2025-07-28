import { useMemo } from 'react';
import { useList } from '@refinedev/core';

export interface RelationshipInfo {
  hasRelated: boolean;
  message: string;
}

export interface UseRelationshipCheckOptions {
  resource: string;
  relatedResource: string;
  foreignKey: string;
  titleField: string;
  maxDisplayItems?: number;
}

export const useRelationshipCheck = (
  options: UseRelationshipCheckOptions,
): Record<number, RelationshipInfo> => {
  const {
    resource,
    relatedResource,
    foreignKey,
    titleField,
    maxDisplayItems = 3,
  } = options;

  const { data: relatedData } = useList({
    resource: relatedResource,
    pagination: { mode: 'off' },
  });

  const relationships = useMemo(() => {
    const items = relatedData?.data || [];
    const map: Record<number, RelationshipInfo> = {};

    // Build relationship map
    items.forEach((item: any) => {
      const key = Number(item[foreignKey]);
      if (!map[key]) {
        map[key] = { hasRelated: false, message: '' };
      }
      map[key].hasRelated = true;
    });

    // Generate messages for each relationship
    Object.keys(map).forEach((id) => {
      const relatedItems = items.filter(
        (item: any) => Number(item[foreignKey]) === Number(id),
      );

      if (relatedItems.length > 0) {
        const itemNames = relatedItems
          .slice(0, maxDisplayItems)
          .map((item: any) => item[titleField])
          .join(', ');

        const message = `This ${resource} cannot be deleted because it has active ${relatedResource}: ${itemNames}${
          relatedItems.length > maxDisplayItems
            ? ` (and ${relatedItems.length - maxDisplayItems} more)`
            : ''
        }. Please delete or reassign these ${relatedResource} first before deleting the ${resource}.`;

        map[Number(id)].message = message;
      }
    });

    return map;
  }, [
    relatedData,
    resource,
    relatedResource,
    foreignKey,
    titleField,
    maxDisplayItems,
  ]);

  return relationships;
};
