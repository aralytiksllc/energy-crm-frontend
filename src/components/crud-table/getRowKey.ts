// === getRowKey.ts ===
export function getRowKey<T extends { id: string | number }>(
  key: keyof T = 'id',
): (record: T) => string | number {
  return (record: T) => record[key] as string | number;
}
