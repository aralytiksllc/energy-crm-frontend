// External dependencies
import { useState, useMemo, useCallback } from 'react';
import type { Key } from 'react';

// Internal dependencies
import type { Options } from './use-selections.types';

export function useSelections<T>(items: T[], options: Options<T> = {}) {
  const { defaultSelected = [], itemKey } = options;

  const [selected, setSelected] = useState<T[]>(defaultSelected);

  const getKey = useCallback(
    (item: T): Key => {
      if (typeof itemKey === 'function') return itemKey(item);

      return item as any as Key;
    },
    [itemKey],
  );

  const selectedMap = useMemo(() => {
    const map = new Map<Key, T>();
    selected.forEach((item) => map.set(getKey(item), item));
    return map;
  }, [selected, getKey]);

  const isSelected = useCallback(
    (item: T) => selectedMap.has(getKey(item)),
    [getKey, selectedMap],
  );

  const select = useCallback(
    (item: T) => {
      const map = new Map(selectedMap);
      map.set(getKey(item), item);
      setSelected(Array.from(map.values()));
    },
    [getKey, selectedMap],
  );

  const unSelect = useCallback(
    (item: T) => {
      const map = new Map(selectedMap);
      map.delete(getKey(item));
      setSelected(Array.from(map.values()));
    },
    [getKey, selectedMap],
  );

  const toggle = useCallback(
    (item: T) => {
      isSelected(item) ? unSelect(item) : select(item);
    },
    [isSelected, select, unSelect],
  );

  const selectAll = useCallback(() => {
    const map = new Map<Key, T>();
    items.forEach((item) => map.set(getKey(item), item));
    setSelected(Array.from(map.values()));
  }, [items, getKey]);

  const unSelectAll = useCallback(() => setSelected([]), [setSelected]);

  const noneSelected = useMemo(
    () => items.every((item) => !selectedMap.has(getKey(item))),
    [items, selectedMap, getKey],
  );

  const allSelected = useMemo(
    () => items.every((item) => selectedMap.has(getKey(item))),
    [items, selectedMap, getKey],
  );

  const partiallySelected = !noneSelected && !allSelected;

  const toggleAll = allSelected ? unSelectAll : selectAll;

  return {
    selected,
    noneSelected,
    allSelected,
    partiallySelected,
    setSelected,
    isSelected,
    select,
    unSelect,
    toggle,
    selectAll,
    unSelectAll,
    toggleAll,
  } as const;
}
