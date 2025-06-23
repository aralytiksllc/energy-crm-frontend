// === keyExtractor.ts ===
export function keyExtractor(columnOrField: {
  key?: React.Key;
  dataIndex?: string | number;
}): string {
  return (
    columnOrField?.key?.toString() ?? columnOrField?.dataIndex?.toString() ?? ''
  );
}
